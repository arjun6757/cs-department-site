import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { login } from "../actions/auth.action";

export default function Login() {
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
    if (!error) return;

    const timeoutId = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  useEffect(() => {
    if (!message) return;

    const timeoutId = setTimeout(() => {
      setSearchParams("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [message]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      setError("Fill in all the fields!");
      return;
    }

    setCredentials({
      email: "",
      password: "",
    });

    try {
      
      const user = await login({ email, password });

      if (!user) {
        throw new Error("Error occured while logging in the user");
      }

      setUser(user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setUser(null);
      console.error("Login error", err);
      setError(err.message || "Something went wrong, pleasy try again.");
    }
  };

  return (
    <div className="w-full h-svh flex items-center justify-center bg-gray-50">
      <div className="w-xs sm:w-md py-8 px-6 bg-white rounded-md shadow-md border border-[#ddd]">

        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-2xl font-semibold text-gray-800">User Login</h2>
          <p className="text-xs text-gray-500">
            Fill in your credentials as per the labels
          </p>
        </div>

        <form className="mt-5 space-y-4 text-sm" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="email" className=" block text-gray-700">
              Email
            </label>
            <input
              tabIndex={1}
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
            <div className="flex justify-between items-center">
            <label htmlFor="password" className=" block text-gray-700">
              Password
            </label>
            <Link tabIndex={5} to="/forgot-password" className="hover:underline underline-offset-4 text-gray-700" >
              Forgot Password
            </Link>
            </div>
            <input
            tabIndex={2}
              name="password"
              type="password"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-2 outline-gray-500 outline-offset-4"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button
          tabIndex={3}
            type="submit"
            className="w-full flex gap-2 justify-center items-center h-9 py-2 px-3 rounded-md text-white font-medium bg-neutral-800 hover:bg-neutral-700 focus:outline-2 outline-offset-2 outline-gray-500 cursor-pointer text-xs"
          >
            Log in
          </button>

          <div className=" flex justify-center items-center gap-2">
            <span className="text-gray-500">Don't have an account?</span>
            <Link tabIndex={4} to="/signup" className="hover:underline underline-offset-4 text-gray-700">
              Sign up
            </Link>
          </div>

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
