import { CalendarCheck, Cog, Loader, Mail, Shield, User } from "lucide-react";
import { useAuth } from "../context/auth.context";
import { useState, useEffect } from "react";
import { getUserAttendance } from "../actions/attendance.action";
import { formattedDate } from "../utils/date";

export default function UserOverview() {
  const { user, loading: userLoading, error } = useAuth();
  const [attendanceInfo, setAttendanceInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUserAttendance() {
      const now = new Date();
      const firstDayOfCurrentMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
      );
      const firstDayOfNextMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1,
      );

      try {
        setLoading(true);
        const data = await getUserAttendance(
          user._id,
          formattedDate(firstDayOfCurrentMonth),
          formattedDate(firstDayOfNextMonth),
        );
        setAttendanceInfo(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAttendance();
  }, []);

  if (userLoading === undefined || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="p-4 sm:p-6 pb-2">
        <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-8">
          <div className="overview_wrapper flex items-center gap-5 sm:gap-8">
            <div className="h-16 w-16 rounded-full border border-[#ddd] dark:border-[#555] flex items-center justify-center text-gray-500 dark:text-neutral-400 font-bold text-xl overflow-hidden ring-2 ring-gray-300 dark:ring-neutral-500 ring-offset-2 ring-offset-white dark:ring-offset-[#171717]">
              {user?.username
                ? user.username.substring(0, 1).toUpperCase()
                : "?"}
            </div>

            <div className="overview_sub_wrapper flex sm:flex-row flex-col gap-4 sm:items-center">
              <div>
                <h1 className="text-md sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                  Welcome, {user?.username}!
                </h1>
                <p className="flex items-center mt-1 text-gray-500 dark:text-neutral-500 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 mr-1 text-gray-400 dark:text-neutral-500" />
                  {user?.email}
                </p>
              </div>

              <div className="w-fit h-fit px-3 py-1 rounded-full border border-[#ddd] dark:border-[#333] bg-gray-50 dark:bg-[#212121] text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium inline-flex items-center shadow-xs">
                <Shield className="w-4 h-4 mr-1 text-blue-500 dark:text-green-500" />
                {user?.role || "Member"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-8 mt-4">
          <div className="space-y-4">
            <h3 className="text-[16px] font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <User className="w-5 h-5 text-blue-500 dark:text-green-500" />
              Profile Information
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="font-medium text-gray-600 dark:text-neutral-500">Username:</div>
                <div className="text-gray-700 dark:text-gray-300">{user?.username}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium text-gray-600 dark:text-neutral-500">Email:</div>
                <div className="text-gray-700 dark:text-gray-300">{user?.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium text-gray-600 dark:text-neutral-500">Role:</div>
                <div className="text-gray-700 dark:text-gray-300">{user?.role}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[16px] font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <CalendarCheck className="w-5 h-5 text-blue-500 dark:text-green-500" />
              Attendance (monthly)
            </h3>

            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-gray-600 dark:text-neutral-500">
                    Overall Presence (%):
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {attendanceInfo?.total_presents_percentage || "Unavailable"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium text-gray-600 dark:text-neutral-500">Days Present:</div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {attendanceInfo?.total_presents || "Unavailable"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium text-gray-600 dark:text-neutral-500">Days Absent:</div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {attendanceInfo?.total_absents || "Unavailable"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-[16px] font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Cog className="w-5 h-5 text-blue-500 dark:text-green-500" />
              Account Details
            </h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="font-medium text-gray-600 dark:text-neutral-500">Member since:</div>
                <div className="text-gray-700 dark:text-gray-300">
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
                <div className="font-medium text-gray-600 dark:text-neutral-500">Last updated:</div>
                <div className="text-gray-700 dark:text-gray-300">
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
      </div>
    </div>
  );
}
