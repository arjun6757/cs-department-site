import { Routes, Route } from "react-router-dom";
import Index from ".";
import Login from "./auth/login";
import Signup from "./auth/signup";
import AdminLogin from "./auth/admin-login";
import Dashboard from "./dashboard/dashboard";
import AdminDashboard from "./dashboard/admin-dashboard";
import Overview from "./admin/overview";
import Uploads from "./admin/uploads";
import Users from "./admin/users";
import NewUpload from "./admin/upload-new";
import UserOverview from "./user/overview";
import PYQ from "./user/pyq";
import Attendance from "./admin/attendance";
import UserRoutes from "./user/user-route";
import AdminRoutes from "./admin/admin-route";
import UploadsLayout from "./admin/uplods-layout";
import ChangePassword from "./user/change-password";

export default function App() {
  return (
    <Routes>
      {/*landing*/}
      <Route path="/" element={<Index />} />

      {/*All user routes*/}
      <Route element={<UserRoutes />}>
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<UserOverview />} />
          <Route path="pyqs" element={<PYQ />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      {/*All admin routes*/}
      <Route element={<AdminRoutes />}>
        <Route path="/admin/dashboard/*" element={<AdminDashboard />}>
          <Route index element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="uploads/*" element={<UploadsLayout />}>
            <Route index element={<Uploads />} />
            <Route path="new" element={<NewUpload />} />
          </Route>
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Route>
    </Routes>
  );
}
