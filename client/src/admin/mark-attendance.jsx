import { useEffect, useRef, useState } from "react";
import {
    createAttendanceEntry,
    getTodaysAttendance,
    updateAttendanceEntry,
} from "../actions/attendance.action";
import { Search } from "lucide-react";
import { formattedDate } from "../utils/date";

export default function MarkAttendance() {
    const [query, setQuery] = useState("");
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const entryRef = useRef(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const result = await getTodaysAttendance();
                setEntries(result);
                setFilteredEntries(result);
                entryRef.current = new Map(
                    result.map((r) => [r.user_id, r.status]),
                );
            } catch (error) {
                console.error("Error fetching attendance entries:", error);
            }
        };

        fetchReport();
    }, []);

    useEffect(() => {
        if (entries.length === 0) {
            setFilteredEntries([]);
            return;
        }

        if (!query) {
            setFilteredEntries(entries);
            return;
        }

        const result = entries.filter(
            (entry) =>
                entry?.username.toLowerCase().includes(query.toLowerCase()) ||
                entry?.email.toLowerCase().includes(query.toLowerCase()) ||
                entry?.status?.toLowerCase().includes(query.toLowerCase()),
        );

        setFilteredEntries(result);
    }, [entries, query]);

    async function handleClick(name, entryId, userId) {
        if (!entryRef.current) return;

        if (entryRef.current.get(userId)) {
            handleUpdateEntry(name, entryId, userId);
        } else {
            handleCreateEntry(name, userId);
        }
    }

    async function handleCreateEntry(name, userId) {
        try {
            setLoading(true);
            const result = await createAttendanceEntry(
                name,
                userId,
                formattedDate(new Date()),
            );
            const newEntries = entries.map((e) =>
                e.user_id === userId
                    ? { ...e, _id: result?._id, status: result?.status }
                    : e,
            );

            setEntries(newEntries);
            setFilteredEntries(newEntries);
            entryRef.current.set(userId, result?.status);
        } catch (err) {
            console.error("Error creating attendance entry", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdateEntry(name, entryId, userId) {
        try {
            setLoading(true);
            const result = await updateAttendanceEntry(name, entryId);
            const newEntries = entries.map((e) =>
                e.user_id === userId ? { ...e, status: result?.status } : e,
            );

            setEntries(newEntries);
            setFilteredEntries(newEntries);
            entryRef.current.set(userId, result?.status);
        } catch (err) {
            console.error("Error updating attendance entry", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-sm">Mark attendance for today</h3>

            <div className="space-y-4">
                <div className="flex items-center relative">
                    <div className="absolute left-0 top-0 w-fit h-full p-2">
                        <Search className="w-6 h-full text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Type here to search..."
                        className="border border-gray-300 rounded w-full py-2 pl-10 outline-blue-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#ddd]">
                            <th className="p-2 font-semibold">User</th>
                            <th className="p-2 font-semibold">Status</th>
                            <th className="p-2 font-semibold">Actions</th>
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
                            <tr
                                key={f.user_id || index}
                                data-lastindex={
                                    index === filteredEntries.length - 1
                                }
                                className="data-[lastindex=false]:border-b data-[lastindex=false]:border-[#ddd]"
                            >
                                <td className="p-2 font-medium">
                                    <span className="text-gray-700 text-sm">
                                        {f?.username}
                                    </span>
                                    <p className="text-gray-500">{f?.email}</p>
                                </td>

                                <td className="p-2 font-medium text-center">
                                    <span
                                        data-status={
                                            f?.status ? f?.status : "none"
                                        }
                                        className="data-[status=present]:text-green-700 data-[status=absent]:text-red-700 data-status:font-semibold data-[status=present]:bg-green-200 data-[status=absent]:bg-red-200 px-3 py-2 rounded-full data-[status=none]:border data-[status=none]:border-[#ddd]"
                                    >
                                        {f?.status ? f?.status : "blank"}
                                    </span>
                                </td>
                                <td className="p-2 font-medium text-center space-y-2 sm:space-y-0 sm:space-x-2.5 _actions">
                                    <button
                                        data-active={f?.status === "present"}
                                        disabled={
                                            loading || f?.status === "present"
                                        }
                                        onClick={(e) =>
                                            handleClick(
                                                e.target.name,
                                                f._id,
                                                f.user_id,
                                            )
                                        }
                                        name="present"
                                        className="w-18 sm:w-auto disabled:cursor-default transition-colors duration-300 data-[active=true]:bg-[#111] data-[active=true]:border-none  data-[active=true]:text-white border border-[#ddd] rounded px-2 py-1.5 md:px-3 md:py-2 hover:bg-gray-50 cursor-pointer shadow-sm"
                                    >
                                        Present
                                    </button>
                                    <button
                                        data-active={f?.status === "absent"}
                                        disabled={
                                            loading || f?.status === "absent"
                                        }
                                        onClick={(e) =>
                                            handleClick(
                                                e.target.name,
                                                f._id,
                                                f.user_id,
                                            )
                                        }
                                        name="absent"
                                        className="w-18 sm:w-auto disabled:cursor-default transition-colors duration-300 data-[active=true]:bg-[#111] data-[active=true]:border-none data-[active=true]:text-white border border-[#ddd] rounded px-2 py-1.5 md:px-3 md:py-2 hover:bg-gray-50 cursor-pointer shadow-sm"
                                    >
                                        Absent
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
