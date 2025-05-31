import MarkAttendance from "./mark-attendance";
import AttendanceSummary from "./attendance-summary";
import AttendanceHistory from "./attendance-history";
import { useState } from "react";

export default function Attendance() {
    const [options, setOptions] = useState({
        mark_attendance: true,
        attendance_summary: false,
        attendance_history: false,
    });

    return (
        <div className="p-6 text-gray-700 space-y-4 text-sm">
            <div className="border-b border-[#ddd]">
                <ul className="flex">
                    <li>
                        <button
                            data-active={options["mark_attendance"] === true}
                            onClick={(e) => {
                                setOptions((o) => {
                                    const obj = { ...o };
                                    for (let key in obj) {
                                        obj[key] =
                                            key === e.target.name
                                                ? true
                                                : false;
                                    }
                                    return obj;
                                });
                            }}
                            name="mark_attendance"
                            className="p-2 cursor-pointer data-[active=true]:text-gray-800 data-[active=false]:text-gray-500 data-[active=true]:font-medium data-[active=true]:border-b-2 border-b-gray-800"
                        >
                            Mark Attendance
                        </button>
                    </li>

                    <li>
                        <button
                            data-active={options["attendance_summary"] === true}
                            onClick={(e) => {
                                setOptions((o) => {
                                    const obj = { ...o };
                                    for (let key in obj) {
                                        obj[key] =
                                            key === e.target.name
                                                ? true
                                                : false;
                                    }
                                    return obj;
                                });
                            }}
                            name="attendance_summary"
                            className="p-2 cursor-pointer data-[active=true]:text-gray-800 data-[active=false]:text-gray-500 data-[active=true]:font-medium data-[active=true]:border-b-2 border-b-gray-800"
                        >
                            Attendance Summary
                        </button>
                    </li>
                    <li>
                        <button
                            data-active={options["attendance_history"] === true}
                            onClick={(e) => {
                                setOptions((o) => {
                                    const obj = { ...o };
                                    for (let key in obj) {
                                        obj[key] =
                                            key === e.target.name
                                                ? true
                                                : false;
                                    }
                                    return obj;
                                });
                            }}
                            name="attendance_history"
                            className="p-2 cursor-pointer data-[active=true]:text-gray-800 data-[active=false]:text-gray-500 data-[active=true]:font-medium data-[active=true]:border-b-2 border-b-gray-800"
                        >
                            Attendance History
                        </button>
                    </li>
                </ul>
            </div>

            <main>
                {options.mark_attendance && <MarkAttendance />}

                {options.attendance_summary && <AttendanceSummary />}

                {options.attendance_history && <AttendanceHistory />}
            </main>
        </div>
    );
}
