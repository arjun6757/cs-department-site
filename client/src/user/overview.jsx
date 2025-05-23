import { Calendar, Mail, Shield, User } from "lucide-react"
import { useAuth } from "../context/auth.context"

export default function UserOverview() {
  const { user, loading, error } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4">

      <div className="p-4 sm:p-6 pb-2">

        <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-8">

          <div className="overview_wrapper flex items-center gap-5 sm:gap-8">

            <div className="h-16 w-16 rounded-full ring-2 border border-[#ddd] ring-gray-300 ring-offset-2 flex items-center justify-center text-gray-500 font-bold text-xl overflow-hidden">
              {user?.username ? user.username.substring(0, 1).toUpperCase() : "?"}
            </div>

            <div className="overview_sub_wrapper flex sm:flex-row flex-col gap-4 sm:items-center">
              <div>
                <h1 className="text-md sm:text-2xl font-semibold text-gray-700">Welcome, {user?.username}!</h1>
                <p className="flex items-center mt-1 text-gray-500 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 mr-1 text-gray-400" />
                  {user?.email}
                </p>
              </div>

              <div className="w-fit h-fit px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-gray-700 text-xs sm:text-sm font-medium inline-flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                {user?.role || "Member"}
              </div>
            </div>

          </div>




        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-8 mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2 text-gray-800">
              <User className="w-5 h-5 text-gray-700" />
              Profile Information
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium text-gray-600">Username:</div>
                <div className="text-gray-800">{user?.username}</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium text-gray-600">Email:</div>
                <div className="text-gray-800">{user?.email}</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium text-gray-600">Role:</div>
                <div className="text-gray-800">{user?.role}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2 text-gray-800">
              <Calendar className="w-5 h-5 text-gray-700" />
              Account Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium text-gray-600">Member since:</div>
                <div className="text-gray-800">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })
                    : "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium text-gray-600">Last updated:</div>
                <div className="text-gray-800">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="mt-6 p-4 border border-red-200 bg-red-50 text-red-600 rounded-md">{error}</div>}
      </div>
    </div>
  )
}
