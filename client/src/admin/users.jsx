import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../actions/user.action";
import { Loader, Search, Trash } from "lucide-react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const users = await getAllUsers();
                setUsers(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!users || users.length === 0) {
            setFilteredUsers([]);
            return;
        }

        if (!query) {
            setFilteredUsers(users);
            return;
        }

        const result = users.filter(
            (u) =>
                u.username.toLowerCase().includes(query.toLowerCase()) ||
                u.email.toLowerCase().includes(query.toLowerCase()),
        );

        setFilteredUsers(result);
    }, [users, query]);

    const handleDelete = async (userId) => {
        try {
            const result = await deleteUser(userId);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="p-6 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center relative">
                <div className="absolute left-0 top-0 w-fit h-full p-2">
                    <Search className="w-6 h-full text-gray-500 dark:text-neutral-400" />
                </div>

                <input
                    type="text"
                    placeholder="Type here to search..."
                    className="border border-gray-300 dark:border-[#333] rounded w-full py-2 pl-10 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse text-sm min-h-[50px]">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-[#212121]">
                            <th className="border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200">
                                No
                            </th>
                            <th className="border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200">
                                Username
                            </th>
                            <th className="border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200">
                                Email
                            </th>
                            <th className="border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200">
                                Role
                            </th>
                            <th className="border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200">
                                Created At
                            </th>
                            <th className="border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200">
                                Updated At
                            </th>
                            <th className="border border-[#ddd] dark:border-[#333] font-normal p-2 text-gray-800 dark:text-gray-200">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="p-2">
                                    <Loader className="w-5 h-5 mx-auto text-gray-700 dark:text-gray-300 animate-spin" />
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="border border-[#ddd] dark:border-[#333] p-2 text-center"
                                    >
                                        No users found
                                    </td>
                                </tr>
                            )
                        )}

                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td className="border border-[#ddd] dark:border-[#333] p-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-[#ddd] dark:border-[#333] p-2 text-center">
                                    {user.username}
                                </td>
                                <td className="border border-[#ddd] dark:border-[#333] p-2 text-center">
                                    {user.email}
                                </td>
                                <td className="border border-[#ddd] dark:border-[#333] p-2 text-center">
                                    {user.role}
                                </td>
                                <td className="border border-[#ddd] dark:border-[#333] p-2 text-center">
                                    {new Date(
                                        user.createdAt,
                                    ).toLocaleDateString()}
                                </td>
                                <td className="border border-[#ddd] dark:border-[#333] p-2 text-center">
                                    {new Date(
                                        user.updatedAt,
                                    ).toLocaleDateString()}
                                </td>
                                <td className="border border-[#ddd] dark:border-[#333] p-2 text-center">
                                    <button
                                        disabled={user.role === "admin"}
                                        onClick={() => handleDelete(user._id)}
                                        className="disabled:opacity-50 text-red-400 hover:text-red-500 disabled:pointer-events-none p-1.5 rounded-full cursor-pointer outline-blue-500"
                                    >
                                        <Trash className="w-4 h-4" />
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
