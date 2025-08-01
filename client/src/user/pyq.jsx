import { useEffect, useState } from 'react'
import { Download, Loader, Search } from 'lucide-react'
import { getAllEntry } from '../actions/entry.action';

export default function Uploads() {

    const [entries, setEntries] = useState([])
    const [query, setQuery] = useState("");
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const fetchEntries = async () => {
            try {
                setLoading(true);
                const entries = await getAllEntry();
                setEntries(entries);
            } catch (error) {
                console.error("Error fetching entries:", error);
            } finally {
                setLoading(false);
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

        const result = entries.filter(e => (
            e.department.toLowerCase().includes(query.toLowerCase()) || e.sem.toLowerCase().includes(query.toLowerCase()) || e.course.toLowerCase().includes(query.toLowerCase()) || e.year.toLowerCase().includes(query.toLowerCase()) || e.filename.toLowerCase().includes(query.toLowerCase())
        ))

        setFilteredEntries(result);

    }, [entries, query])

    return (
        <div className='p-6 text-sm text-gray-700 dark:text-gray-300'>
            <div className='flex gap-2 items-center relative'>

                <div className='absolute left-0 top-0 w-fit h-full p-2'>
                    <Search className='w-6 h-full text-gray-500 dark:text-neutral-400' />
                </div>

                <input type="text" placeholder='Type here to search...' className='border border-gray-300 dark:border-[#333] rounded w-full py-2 pl-10 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500' value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <div className='overflow-x-auto mt-4'>
                <table className='w-full border-collapse text-sm min-h-[50px]'>
                    <thead>
                        <tr className='bg-gray-100 dark:bg-[#212121]'>
                            <th className='border border-[#ddd] dark:border-[#333] font-normal p-2 dark:text-gray-200 text-gray-800'>No</th>
                            <th className='border border-[#ddd] dark:border-[#333] font-normal p-2 dark:text-gray-200 text-gray-800'>
                                Department
                            </th>
                            <th className='border border-[#ddd] dark:border-[#333] font-normal p-2 dark:text-gray-200 text-gray-800'>
                                Sem
                            </th>
                            <th className='border border-[#ddd] dark:border-[#333] font-normal p-2 dark:text-gray-200 text-gray-800'>Course</th>
                            <th className='border border-[#ddd] dark:border-[#333] font-normal p-2 dark:text-gray-200 text-gray-800'>Year</th>
                            <th className='border border-[#ddd] dark:border-[#333] font-normal p-2 dark:text-gray-200 text-gray-800'>Filename</th>
                            <th className='border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200'>Download</th>
                            <th className='border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200'>Note</th>

                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (
                            <tr>
                                <td colSpan={9} className='border border-[#ddd] dark:border-[#333] p-2 text-center'>
                                    <Loader className='text-gray-700 dark:text-gray-300 animate-spin w-5 h-5 mx-auto' />
                                </td>
                            </tr>
                            ) : filteredEntries.length === 0 && (
                            <tr>
                                <td colSpan={9} className='border border-[#ddd] dark:border-[#333] p-2 text-center'>It&apos;s empty here</td>
                            </tr>
                        )}

                        {filteredEntries.map((entry, index) => (
                            <tr key={entry._id}>
                                <td className='border border-[#ddd] dark:border-[#333] p-2 text-center'>{index + 1}</td>
                                <td className='border border-[#ddd] dark:border-[#333] p-2 text-center'>{entry.department}</td>
                                <td className='border border-[#ddd] dark:border-[#333] p-2 text-center'>{entry.sem}</td>
                                <td className='border border-[#ddd] dark:border-[#333] p-2 text-center'>{entry.course}</td>
                                <td className='border border-[#ddd] dark:border-[#333] p-2 text-center'>{entry.year}</td>
                                <td className='border border-[#ddd] dark:border-[#333] p-2 text-center'>{entry.filename}</td>
                                <td className='border border-[#ddd] dark:border-[#333] p-2 text-center'><a target='_blank' href={entry.download_link}>
                                    <Download className='w-4 h-4 text-gray-500 dark:text-neutral-400 mx-auto' />
                                </a></td>
                                <td className='border border-[#ddd] dark:border-[#333] p-2 text-center'>
                                    <a target='_blank' href={entry.note_link} className='text-blue-500  dark:text-blue-300 hover:underline underline-offset-4'>view</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
