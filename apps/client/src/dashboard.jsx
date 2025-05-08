import { useNavigate } from 'react-router-dom';
import { useUser } from './context/auth.context';
import { useEffect, useState } from 'react';
import { logout } from './actions/auth.action';

const Dashboard = () => {
    const { user, setUser, error: userError, loading } = useUser();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {

        if (loading === undefined)  return;

        if (!loading && !user) {
            navigate("/login", { replace: true });
        }

        if(!loading && user && user.role !== "user") {
            navigate("/login", { replace: true });
        }

    }, [user, loading, navigate]);

    if (loading || !user || user.role !== "user") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 rounded-full border-gray-500 p-2 border-r-transparent animate-spin"></div>
            </div>
        )
    }

    async function handleLogout() {
        try {
            await logout()
            setUser(null)
            navigate("/login", { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            setError(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow p-6">


                    <div className="flex items-center space-x-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Welcome, {user?.username}!
                            </h1>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h2 className="text-lg font-medium text-blue-800">Profile Info</h2>
                            <div className="mt-3 space-y-2">
                                <p className="text-gray-600">Role: {user?.role}</p>
                                <p className="text-gray-600">Member since: {new Date(user?.createdAt).toLocaleDateString("IN", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: '2-digit'
                                })}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Logout
                    </button>

                    {error && <p className='mt-5 text-red-500'>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;