import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/auth.context';
import { adminLogout } from '../actions/auth.action';
import { Clock, LayoutDashboard, LogOut, Upload, UserCheck, UsersIcon } from 'lucide-react';

const Dashboard = () => {
    const { user, setUser, error, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (loading === undefined) return;

        if (!loading && !user) {
            navigate("/admin/login", { replace: true });
        }

        if (!loading && user && user.role !== "admin") {
            navigate("/admin/login?message=Not a valid admin", { replace: true });
        }

    }, [user, loading, navigate]);

    if (loading || !user || user.role !== "admin") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 rounded-full border-gray-500 p-2 border-r-transparent animate-spin"></div>
            </div>
        )
    }

    async function handleLogout() {
        try {
            await adminLogout();
            setUser(null)
        } catch (error) {
            console.error('Logout error:', error);
            setError(error.message || "Something went wrong");
        }
    }

    return (
        <div className="w-full grid grid-cols-5 overflow-hidden h-screen">

            <aside className='col-span-1 text-sm text-gray-700 overflow-hidden py-5 px-4 border-r border-[#ddd] select-none h-full'>

                <div className='flex flex-col h-full justify-between'>

                    <ul className='flex flex-col'>
                        <li>
                            <Link data-active={location.pathname==="/admin/dashboard"}
                             to="/admin/dashboard"
                              className='data-[active=true]:bg-gray-100 p-2 hover:bg-gray-50 rounded inline-flex items-center w-full h-full gap-2.5 outline-blue-500'><LayoutDashboard className='w-4 h-4 text-gray-700' /> Overview</Link>
                        </li>

                        <li>
                            <Link data-active={location.pathname==="/admin/dashboard/users"} to="/admin/dashboard/users" className='data-[active=true]:bg-gray-100 p-2 hover:bg-gray-50 rounded w-full h-full inline-flex items-center gap-2.5 outline-blue-500' ><UsersIcon className='w-4 h-4 text-gray-700' />Users</Link>
                        </li>
                        <li>
                            <Link data-active={location.pathname==="/admin/dashboard/uploads"} to="/admin/dashboard/uploads"
                            className='data-[active=true]:bg-gray-100 p-2 hover:bg-gray-50 rounded w-full h-full inline-flex items-center gap-2.5 outline-blue-500'><Upload className='w-4 h-4 text-gray-700' /> Uploads</Link>
                        </li>
                        <li>
                            <Link data-active={location.pathname==="/admin/dashboard/attendance"} to="/admin/dashboard/attendance"
                            className='data-[active=true]:bg-gray-100 p-2 hover:bg-gray-50 rounded w-full h-full inline-flex items-center gap-2.5 outline-blue-500'>
                                <UserCheck className='w-4 h-4 text-gray-700' /> Attendance</Link>
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