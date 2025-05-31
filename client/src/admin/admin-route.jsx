import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export default function AdminRoutes() {

	const { user, loading } = useAuth();

	if (loading === undefined || loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-8 h-8 border-4 rounded-full border-gray-500 p-2 border-r-transparent animate-spin"></div>
			</div>
		);
	}

	return user ? (
		user?.role === "admin" ? (
			<Outlet />
		) : (
			<Navigate replace to="/admin/login?message=Not a valid admin" />
		)
	) : (
		<Navigate replace to="/admin/login?message=Admin is not signed in" />
	);
}
