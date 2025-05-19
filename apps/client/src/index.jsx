import { Link } from "react-router-dom";

export default function Index() {
	return (
		<div className="space-y-2 text-sm h-screen flex flex-col justify-center items-center">
			<Link to="/login" className="w-xs rounded block p-2 border border-black hover:bg-black hover:text-white">User Login</Link>
			<Link to="/admin/login" className="w-xs rounded block p-2 border border-black hover:bg-black hover:text-white">Admin Login</Link>
			<Link to="/dashboard" className="w-xs rounded block p-2 border border-black hover:bg-black hover:text-white">User Dashboard</Link>
			<Link to="/admin/dashboard" className="w-xs rounded block p-2 border border-black hover:bg-black hover:text-white">Admin Dashboard</Link>
			<Link to="/signup" className="w-xs rounded block p-2 border border-black hover:bg-black hover:text-white" >User Signup</Link>
		</div>
		)
}