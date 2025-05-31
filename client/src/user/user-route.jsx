import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export default function UserRoutes() {
	const { user, loading } = useAuth();

	if (loading === undefined || loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-8 h-8 border-4 rounded-full border-gray-500 p-2 border-r-transparent animate-spin"></div>
			</div>
		);
	}

	return user ? (
		user?.role === "user" ? (
			<Outlet />
		) : (
			<Navigate replace to="/login?message=Not a valid user" />
		)
	) : (
		<Navigate replace to="/login?message=User is not signed in" />
	);
}
