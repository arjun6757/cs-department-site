import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin-dashboard";
import AdminLogin from "./admin-login";
import Dashboard from "./dashboard";
import Login from "./login";
import Index from ".";
import Signup from "./signup";
import ForgotPassword from "./forgot-password";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}
