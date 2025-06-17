import { useEffect, useState } from "react";
import { changePassword } from "../actions/auth.action";
import { useAuth } from "../context/auth.context";

export default function ChangePassword() {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;

    const timeoutId = setTimeout(() => {
      setMessage("");
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
    const {  oldPassword, newPassword } = credentials;
    console.log( oldPassword, newPassword)

    if (!oldPassword || !newPassword) {
      setMessage("Fill in all the fields!");
      return;
    }

    if(newPassword.length < 4) {
      setMessage("Password must be atleast four characters");
      return;
    }

    setCredentials({
      oldPassword: "",
      newPassword: "",
    });


    try {

      const result = await changePassword({ email: user.email, oldPassword, newPassword });

      if(!result || !result.message) {
        throw new Error("Something went wrong");
      }

      setMessage(result?.message || "Something went wrong while requesting password change.");
    } catch (err) {
      console.error("Error occured while resetting the password", err);
      setMessage(err.message || "Something went wrong, pleasy try again.");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-xs sm:w-md py-8 px-6 rounded-md shadow-md border border-[#ddd] dark:border-[#333]">
        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Change Password</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Fill in your credentials as per the labels
          </p>
        </div>

        <form className="mt-5 space-y-4 text-sm" onSubmit={handleSubmit}>

          <div className="space-y-1">
            <label htmlFor="email" className=" block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              disabled={true}
              required
              className="disabled:opacity-70 rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-[#333] text-gray-800 dark:text-gray-100 focus:outline-2 outline-gray-500 outline-offset-4"
              placeholder="name@example.com"
              value={user.email}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="Current Password" className=" block text-gray-700 dark:text-gray-300">
              Current Password
            </label>
            <input
              name="oldPassword"
              type="password"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-[#333] text-gray-800 dark:text-gray-100 focus:outline-2 outline-gray-500 outline-offset-4"
              value={credentials.oldPassword}
              onChange={handleChange}
            />
          </div>


          <div className="space-y-1">
            <label htmlFor="New Password" className=" block text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-[#333] text-gray-800 dark:text-gray-100 focus:outline-2 outline-gray-500 outline-offset-4"
              value={credentials.newPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full flex gap-2 justify-center items-center h-9 py-2 px-3 rounded-md text-white font-medium bg-neutral-800 hover:opacity-90 active:opacity-80 focus:outline-2 outline-offset-2 outline-gray-500 cursor-pointer text-xs"
          >
            Save
          </button>

          {message && (
            <div className="text-gray-800 dark:text-gray-100 text-center bg-gray-50 dark:bg-[#202020] p-2 rounded-md">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}