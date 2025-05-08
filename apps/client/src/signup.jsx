import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./context/auth.context";
import { signup } from "./actions/auth.action";

export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setUser } = useUser();

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
    const { username, email, password } = credentials;

    if (!username || !email || !password) {
      setError("Fill in all the fields!");
      return;
    }

    if(password.length < 4) {
      setError("Password must be atleast four characters");
      return;
    }

    setCredentials({
      username: "",
      email: "",
      password: "",
    });

    try {
      const user = await signup({ username, email, password });

      if (!user) {
        throw new Error("Error occured while logging in the user");
      }

      setUser(user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error", err);
      setError(err.message || "Something went wrong, pleasy try again.");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="w-xs sm:w-md py-8 px-6 bg-white rounded-md shadow-md border border-[#ddd]">
        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-2xl font-semibold text-gray-800">User Signup</h2>
          <p className="text-xs text-gray-500">
            Fill in your credentials as per the labels
          </p>
        </div>

        <form className="mt-5 space-y-4 text-sm" onSubmit={handleSubmit}>

          <div className="space-y-1">
            <label htmlFor="username" className=" block">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-2 outline-gray-500 outline-offset-4 sm:"
              placeholder="name"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className=" block">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-2 outline-gray-500 outline-offset-4 sm:"
              placeholder="name@example.com"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className=" block">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-2 outline-gray-500 outline-offset-4 sm:"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full flex gap-2 justify-center items-center h-9 py-2 px-3 rounded-md text-white font-medium bg-neutral-800 hover:bg-neutral-700 focus:outline-2 outline-offset-2 outline-gray-500 cursor-pointer text-xs"
          >
            Sign up
          </button>

          <div className=" flex justify-center items-center gap-2">
            <span className="text-gray-500">Already have an account?</span>
            <Link to="/login" className="hover:underline underline-offset-4">
              Login
            </Link>
          </div>

          {error && (
            <div className="text-red-500 text-center bg-gray-50 p-2 rounded-md">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}