import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { adminLogin } from "../actions/auth.action";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (!message) return;

    const timeoutId = setTimeout(() => {
      setSearchParams("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [message]);

  useEffect(() => {
    if (!error) return;

    const timeoutId = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    setCredentials({
      email: "",
      password: "",
    });

    try {
      const user = await adminLogin({ email, password });

      if (!user) {
        throw new error("Error occured while logging in the admin");
      }

      setUser(user);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setUser(null);
      console.error("Login error:", err);
      setError(err.message || "Something went wrong, please try again.");
    }
  };

  return (
    <div className="w-full h-svh flex items-center justify-center bg-gray-50">
      <div className="w-xs sm:w-md py-8 px-6 bg-white rounded-md shadow-md border border-[#ddd]">
        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Login</h2>
          <p className="text-xs text-gray-500">
            Please sign in with your admin credentials
          </p>
        </div>

        <form className="mt-5 space-y-4 text-sm" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="email" className=" block text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-2 outline-gray-500 outline-offset-4"
              placeholder="name@example.com"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className=" block text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-2 outline-gray-500 outline-offset-4"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full flex gap-2 justify-center items-center h-9 py-2 px-3 rounded-md text-white font-medium bg-neutral-800 hover:bg-neutral-700 focus:outline-2 outline-offset-2 outline-gray-500 cursor-pointer text-xs"
          >
            Log in
          </button>

          {error && (
            <div className="text-red-500 text-center bg-gray-100 p-2 rounded-md">
              {error}
            </div>
          )}

          {message && (
            <div className="text-neutral-700 text-center bg-gray-100 p-2 rounded-md">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
