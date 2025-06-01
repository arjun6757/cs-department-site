import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useState } from "react";
import { logout } from "../actions/auth.action";
import {
    LogOut,
    LayoutDashboard,
    Download,
    Menu,
    ChevronRight,
    Palette,
    Laptop,
    Sun,
    Moon,
} from "lucide-react";
import { useTheme } from "../context/theme.context";

const Dashboard = () => {
    const location = useLocation();
    const { setUser } = useAuth();
    const [isHidden, setIsHidden] = useState(true);
    const { theme, setTheme } = useTheme();

    async function handleLogout() {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <div className="w-full grid grid-cols-4 sm:grid-cols-5 overflow-hidden h-svh relative">
            <header className="sm:hidden fixed left-0 top-0 w-full h-fit flex items-center p-4 border-b border-[#ddd] dark:border-[#333] bg-gray-50 dark:bg-[#171717] z-10">
                <button
                    data-hidden={isHidden}
                    onClick={() => setIsHidden((p) => !p)}
                    className="text-gray-700 dark:text-gray-300 rounded w-6 h-6"
                >
                    <Menu />
                </button>
            </header>

            <div
                className="data-[hidden=true]:hidden data-[hidden=false]:absolute data-hidden:sm:hidden top-0 left-0 w-full h-full bg-white/30 dark:bg-black/30 backdrop-blur-xs z-10"
                data-hidden={isHidden}
                onClick={() => setIsHidden(true)}
            ></div>

            <aside
                data-hidden={isHidden}
                className={`data-[hidden=false]:block data-[hidden=true]:hidden data-hidden:sm:grid absolute left-0 top-0 w-[60vw] sm:w-auto sm:static sm:col-span-1 text-sm text-gray-700 dark:text-gray-300 overflow-hidden py-5 px-4 border-r border-[#ddd] dark:border-[#333] select-none h-full bg-gray-50 dark:bg-[#171717] z-20`}
            >
                <div className="flex flex-col h-full justify-between">
                    <ul className="flex flex-col">
                        <li>
                            <Link
                                data-active={location.pathname === "/dashboard"}
                                to="/dashboard"
                                className="data-[active=true]:bg-[#eee] dark:data-[active=true]:bg-[#272727] p-2 hover:bg-gray-100 dark:hover:bg-[#202020] rounded inline-flex items-center w-full h-full gap-2.5 outline-blue-500"
                            >
                                <LayoutDashboard className="w-4 h-4" />{" "}
                                Overview
                            </Link>
                        </li>

                        <li>
                            <Link
                                data-active={
                                    location.pathname === "/dashboard/pyqs"
                                }
                                to="/dashboard/pyqs"
                                className="data-[active=true]:bg-[#eee] dark:data-[active=true]:bg-[#272727] p-2 hover:bg-gray-100 dark:hover:bg-[#202020] rounded w-full h-full inline-flex items-center gap-2.5 outline-blue-500"
                            >
                                <Download className="w-4 h-4" />{" "}
                                PYQs
                            </Link>
                        </li>
                        <li>
                            <details className="group cursor-pointer rounded">
                                <summary className="outline-blue-500 rounded p-2 flex justify-between items-center">
                                    <span className="flex gap-2.5 items-center">
                                        <Palette className="w-4 h-4" /> Theme
                                    </span>
                                    <ChevronRight className="group-open:rotate-90 w-4 h-4 transition-transform duration-300" />
                                </summary>
                                <ul className="flex flex-col pl-6">
                                    <li>
                                        <button
                                            data-active={theme === "system"}
                                            onClick={(e) =>
                                                setTheme(e.target.name)
                                            }
                                            name="system"
                                            className="data-[active=true]:bg-[#eee] dark:data-[active=true]:bg-[#272727] p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202020] rounded inline-flex items-center w-full h-full gap-2.5 outline-blue-500"
                                        >
                                            <Laptop className="w-4 h-4" />{" "}
                                            System
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            data-active={theme === "light"}
                                            onClick={(e) =>
                                                setTheme(e.target.name)
                                            }
                                            name="light"
                                            className="data-[active=true]:bg-[#eee] dark:data-[active=true]:bg-[#272727] p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202020] rounded inline-flex items-center w-full h-full gap-2.5 outline-blue-500"
                                        >
                                            <Sun className="w-4 h-4" /> Light
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            data-active={theme === "dark"}
                                            onClick={(e) =>
                                                setTheme(e.target.name)
                                            }
                                            name="dark"
                                            className="data-[active=true]:bg-[#eee] dark:data-[active=true]:bg-[#272727] p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#202020] rounded inline-flex items-center w-full h-full gap-2.5 outline-blue-500"
                                        >
                                            <Moon className="w-4 h-4" /> Dark
                                        </button>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>

                    <button
                        onClick={handleLogout}
                        className="cursor-pointer inline-flex gap-2.5 outline-blue-500 items-center p-2 rounded hover:bg-[#ececec] dark:hover:bg-[#272727]"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </aside>

            <main className="col-span-4 overflow-y-scroll h-full pt-14 sm:pt-0">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
