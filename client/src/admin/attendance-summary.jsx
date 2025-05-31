import { useEffect, useState } from "react";
import { formattedDate, getLastMonthDate } from "../utils/date";
import { getAllUserAttendanceSummary } from "../actions/attendance.action";
import { Search } from "lucide-react";

export default function AttendanceSummary() {
    const [query, setQuery] = useState("");
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [dates, setDates] = useState({
        startDate: formattedDate(getLastMonthDate(new Date())),
        endDate: formattedDate(new Date()),
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserAttendance = async () => {
            try {
                setLoading(true);
                const result = await getAllUserAttendanceSummary(
                    dates.startDate,
                    dates.endDate,
                );
                setEntries(result);
            } catch (error) {
                console.error("Error fetching attendance entries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAttendance();
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
                entry.user_details.username
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                entry.user_details.email
                    .toLowerCase()
                    .includes(query.toLowerCase()),
        );

        setFilteredEntries(result);
    }, [entries, query]);

    async function handleApply() {
        try {
            setLoading(true);
            const result = await getAllUserAttendanceSummary(
                dates.startDate,
                dates.endDate,
            );
            setEntries(result);
        } catch (error) {
            console.error("Error fetching attendance entries:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-sm">Attendance summary for this month</h3>

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
                <div className="flex gap-4">
                    <div className="space-x-2">
                        <label className="text-sm" htmlFor="startDate">
                            From:
                        </label>
                        <input
                            className="px-2 py-1 border border-[#ddd] rounded"
                            type="date"
                            value={dates.startDate}
                            onChange={(e) =>
                                setDates((p) => ({
                                    ...p,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            name="startDate"
                        />
                    </div>
                    <div className="space-x-2">
                        <label className="text-sm" htmlFor="endDate">
                            To:
                        </label>
                        <input
                            className="px-2 py-1 border border-[#ddd] rounded"
                            type="date"
                            value={dates.endDate}
                            onChange={(e) =>
                                setDates((p) => ({
                                    ...p,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            name="endDate"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleApply}
                        disabled={loading}
                        className="disabled:opacity-50 border border-[#ddd] px-3 py-1 rounded hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                    >
                        Apply
                    </button>
                </div>

                <table className="w-full border-collapse min-h-[50px]">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-[#ddd] font-normal p-2 text-gray-800">
                                No
                            </th>
                            <th className="border border-[#ddd] font-normal p-2 text-gray-800">
                                User
                            </th>

                            <th className="border border-[#ddd] font-normal p-2 text-gray-800">
                                Total Days
                            </th>
                            <th className="border border-[#ddd] font-normal p-2 text-gray-800">
                                Presents (days)
                            </th>
                            <th className="border border-[#ddd] font-normal p-2 text-gray-800">
                                Absents (days)
                            </th>
                            <th className="border border-[#ddd] font-normal p-2 text-gray-800">
                                Overall Presence (%)
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredEntries.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="border border-[#ddd] p-2 text-center"
                                >
                                    No entries found
                                </td>
                            </tr>
                        )}

                        {filteredEntries.map((entry, index) => (
                            <tr key={entry._id}>
                                <td className="border border-[#ddd] p-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-[#ddd] p-2 text-start">
                                    <span className="text-gray-800">
                                        {entry.user_details.username}
                                    </span>
                                    <p className="text-gray-500">
                                        {entry.user_details.email}
                                    </p>
                                </td>

                                <td className="border border-[#ddd] p-2 text-center">
                                    {entry.total_days}
                                </td>

                                <td className="border border-[#ddd] p-2 text-center">
                                    {entry.total_presents}
                                </td>
                                <td className="border border-[#ddd] p-2 text-center">
                                    {entry.total_absents}
                                </td>
                                <td className="border border-[#ddd] p-2 text-center">
                                    {entry.total_presents_percentage}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
