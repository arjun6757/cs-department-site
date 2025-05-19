import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { useEffect, useState } from 'react';
import { logout } from '../actions/auth.action';
import { LogOut, LayoutDashboard, Download } from 'lucide-react';

const Dashboard = () => {
    const { user, setUser, error: userError, loading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {

        if (loading === undefined)  return;

        if (!loading && !user) {
            navigate("/login", { replace: true });
        }

        if(!loading && user && user.role !== "user") {
            navigate("/login?message=Not a valid user", { replace: true });
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
        } catch (error) {
            console.error('Logout error:', error);
            setError(error.message);
        }
    }

    return (

        <div className="w-full grid grid-cols-5 overflow-hidden h-screen">

            <aside className='col-span-1 text-sm text-gray-700 overflow-hidden py-5 px-4 border-r border-[#ddd] select-none h-full'>

                <div className='flex flex-col h-full justify-between'>

                    <ul className='flex flex-col'>
                        <li>
                            <Link data-active={location.pathname==="/dashboard"}
                             to="/dashboard"
                              className='data-[active=true]:bg-gray-100 p-2 hover:bg-gray-50 rounded inline-flex items-center w-full h-full gap-2.5 outline-blue-500'><LayoutDashboard className='w-4 h-4 text-gray-700' /> Overview</Link>
                        </li>

                        <li>
                            <Link data-active={location.pathname==="/dashboard/pyqs"} to="/dashboard/pyqs"
                            className='data-[active=true]:bg-gray-100 p-2 hover:bg-gray-50 rounded w-full h-full inline-flex items-center gap-2.5 outline-blue-500'><Download className='w-4 h-4 text-gray-700' /> PYQs</Link>
                        </li>
                    </ul>

                    <button onClick={handleLogout} className='cursor-pointer inline-flex gap-2.5 outline-blue-500 items-center p-2 rounded hover:bg-gray-100'>
                        <LogOut className='w-4 h-4' /> Logout
                    </button>

                </div>
            </aside>

            <main className='col-span-4 overflow-y-scroll h-full'>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;