import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./context/auth.context";
import { resetPassword } from "./actions/auth.action";

export default function forgotPassword() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  // const { setUser } = useUser();

  // useEffect(() => {
  //   if (loading === undefined) return;

  //   if (!loading && user && user.role === "user") {
  //     navigate("/dashboard");
  //   }

  // }, [user, loading, navigate]);

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
    const { email, oldPassword, newPassword } = credentials;

    if (!email || !oldPassword || !newPassword) {
      setError("Fill in all the fields!");
      return;
    }

    if(newPassword.length < 4) {
      setError("Password must be atleast four characters");
      return;
    }

    setCredentials({
      email: "",
      oldPassword: "",
      newPassword: "",
    });

    try {

      const result = await resetPassword({ email, oldPassword, newPassword });

      if(!result || !result.message) {
        throw new Error("Something went wrong");
      }

      navigate(`/login?message=${result.message}`, { replace: true });
    } catch (err) {
      console.error("Error occured while resetting the password", err);
      setError(err.message || "Something went wrong, pleasy try again.");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="w-xs sm:w-md py-8 px-6 bg-white rounded-md shadow-md border border-[#ddd]">
        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>
          <p className="text-xs text-gray-500">
            Fill in your credentials as per the labels
          </p>
        </div>

        <form className="mt-5 space-y-4 text-sm" onSubmit={handleSubmit}>

          <div className="space-y-1">
            <label htmlFor="email" className=" block">
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
            <label htmlFor="Current Password" className=" block">
              Current Password
            </label>
            <input
              name="oldPassword"
              type="password"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-2 outline-gray-500 outline-offset-4"
              value={credentials.oldPassword}
              onChange={handleChange}
            />
          </div>


          <div className="space-y-1">
            <label htmlFor="New Password" className=" block">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-2 outline-gray-500 outline-offset-4"
              value={credentials.newPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full flex gap-2 justify-center items-center h-9 py-2 px-3 rounded-md text-white font-medium bg-neutral-800 hover:bg-neutral-700 focus:outline-2 outline-offset-2 outline-gray-500 cursor-pointer text-xs"
          >
            Update
          </button>

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