import { useEffect, useState } from 'react'
import { Download, Search, Trash, Upload } from 'lucide-react'
import { deleteEntry, getAllEntry } from '../actions/entry.action';
import { Link } from 'react-router-dom';

export default function Uploads() {

    const [entries, setEntries] = useState([])
    const [query, setQuery] = useState("");
    const [filteredEntries, setFilteredEntries] = useState([]);

    useEffect(() => {

        const fetchEntries = async () => {
            try {
                const entries = await getAllEntry();
                console.log(entries);
                setEntries(entries);
            } catch (error) {
                console.error("Error fetching entries:", error);
            }
        }

        fetchEntries();

    }, [])

    useEffect(() => {

        if (!entries || entries.length === 0) {
            setFilteredEntries([]);
            return;
        }

        if (!query) {
            setFilteredEntries(entries);
            return;
        }

        const result = entries.filter(u => (
            u.username.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
        ))

        setFilteredEntries(result);

    }, [entries, query])

    const handleDelete = async (entryId) => {
        try {
            // Call the delete user API here
            const result = await deleteEntry(entryId);
            console.log(result);
            setFilteredEntries(entries.filter(e => e._id !== entryId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return (
        <div className='p-6 text-sm text-gray-700'>
            <div className='flex gap-2 items-center relative'>

                <div className='absolute left-0 top-0 w-fit h-full p-2'>
                    <Search className='w-6 h-full text-gray-500' />
                </div>

                <input type="text" placeholder='Type here to search...' className='border border-gray-300 rounded w-full py-2 pl-10 outline-blue-500' value={query} onChange={(e) => setQuery(e.target.value)} />

                <Link to="/new" className='p-2 inline-flex gap-2 items-center text-white rounded bg-blue-500 hover:bg-blue-400 h-full'>
                    <Upload className='w-4 h-4' /> New
                </Link>
            </div>
            <div className='overflow-x-auto mt-4'>
                <table className='w-full border-collapse text-sm min-h-[50px]'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>No</th>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>
                                Department
                            </th>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>
                                Sem
                            </th>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>Course</th>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>Year</th>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>Filename</th>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>Download</th>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>Note</th>
                            <th className='border border-[#ddd] font-normal p-2 text-gray-800'>Actions</th>

                        </tr>
                    </thead>

                    <tbody>

                        {filteredEntries.length === 0 && (
                            <tr>
                                <td colSpan={9} className='border border-[#ddd] p-2 text-center'>No users found</td>
                            </tr>
                        )}

                        {filteredEntries.map((entry, index) => (
                            <tr key={entry._id}>
                                <td className='border border-[#ddd] p-2 text-center'>{index + 1}</td>
                                <td className='border border-[#ddd] p-2 text-center'>{entry.department}</td>
                                <td className='border border-[#ddd] p-2 text-center'>{entry.sem}</td>
                                <td className='border border-[#ddd] p-2 text-center'>{entry.course}</td>
                                <td className='border border-[#ddd] p-2 text-center'>{entry.year}</td>
                                <td className='border border-[#ddd] p-2 text-center'>{entry.filename}</td>
                                <td className='border border-[#ddd] p-2 text-center'><a target='_blank' href={entry.download_link}>
                                    <Download className='w-4 h-4 text-gray-500 mx-auto' />
                                </a></td>
                                <td className='border border-[#ddd] p-2 text-center'>
                                    <a target='_blank' href={entry.note_link} className='text-blue-500 hover:underline underline-offset-4'>view</a>
                                </td>
                                <td className='border border-[#ddd] p-2 text-center text-red-500 hover:text-red-400'>
                                    <button className='cursor-pointer' onClick={() => handleDelete(entry._id)}>
                                        <Trash className='w-4 h-4 mx-auto' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
