import { Routes, Route } from "react-router-dom";
import Index from ".";
import Login from "./auth/login";
import Signup from "./auth/signup";
import ForgotPassword from "./auth/forgot-password";
import AdminLogin from "./auth/admin-login";
import Dashboard from "./dashboard/dashboard";
import AdminDashboard from "./dashboard/admin-dashboard";
import Home from "./admin/home";
import Uploads from "./admin/uploads";
import Users from "./admin/users";
import NewUpload from "./upload-new";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/new" element={<NewUpload />} ></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard/*" element={<AdminDashboard />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="uploads" element={<Uploads />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}
