import { useEffect, useState } from "react";
import { getAllAttendanceHistory } from "../actions/attendance.action";
import { Search } from "lucide-react";

export default function AttendanceHistory() {
    const [query, setQuery] = useState("");
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);

    useEffect(() => {

        const fetchAttendanceHistory = async () => {
            try {
                const result = await getAllAttendanceHistory();
                setEntries(result);
                setFilteredEntries(result);
            } catch (error) {
                console.error("Error fetching attendance entries:", error);
            }
        }

        fetchAttendanceHistory();

    }, [])


    useEffect(() => {

        if (entries.length === 0) {
            setFilteredEntries([]);
            return;
        }

        if (!query) {
            setFilteredEntries(entries);
            return;
        }

        const result = entries.filter(entry => (
            entry?.user_id.username.toLowerCase().includes(query.toLowerCase()) || entry?.user_id.email.toLowerCase().includes(query.toLowerCase()) || entry?.status.toLowerCase().includes(query.toLowerCase()) || (new Date(entry?.date).toDateString()).toLowerCase().includes(query.toLowerCase())
        ))

        setFilteredEntries(result);

    }, [entries, query])

    return (
        <div className="space-y-4">
            <h3 className="text-sm">Attendance history for all entries</h3>

            <div className="space-y-4">
                <div className='flex items-center relative'>
                    <div className='absolute left-0 top-0 w-fit h-full p-2'>
                        <Search className='w-6 h-full text-gray-500' />
                    </div>
                    <input type="text" placeholder='Type here to search...' className='border border-gray-300 rounded w-full py-2 pl-10 outline-blue-500' value={query} onChange={(e) => setQuery(e.target.value)} />

                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#ddd]">
                            <th className="p-2 font-semibold">User</th>
                            <th className="p-2 font-semibold">Status</th>
                            <th className="p-2 font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEntries.length === 0 && (
                            <tr className="border-b border-[#ddd]">
                                <td colSpan={3} className="text-center h-10">
                                    It's empty here
                                </td>
                            </tr>
                        )}

                        {filteredEntries.map((f, index) => (
                            <tr data-lastindex={index === filteredEntries.length - 1} key={f._id} className="data-[lastindex=false]:border-b data-[lastindex=false]:border-[#ddd]">
                                <td className="p-2 font-medium">
                                    <span className="text-gray-700 text-sm">{f?.user_id.username}</span>
                                    <p className="text-gray-500">{f?.user_id.email}</p>
                                </td>
                                <td className="p-2 font-medium text-center">
                                    <span data-present={f.status === "present"} className="data-[present=true]:text-green-700 data-[present=false]:text-red-700 data-present:font-semibold data-[present=true]:bg-green-200 data-[present=false]:bg-red-200 px-3 py-2 rounded-full">{f.status}</span>
                                </td>
                                <td className="p-2 font-medium text-center">{new Date(f.date).toDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
