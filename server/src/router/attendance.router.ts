import { Router } from "express";
import isauthenticatedMiddleware from "../middleware/isauthenticated.middleware";
import isadminMiddleware from "../middleware/isadmin.middleware";
import { createNewAttendanceEntry, getAllUserAttendance, getAttendanceHistory, getTodaysAttendance, getUserAttendance, handleAttendanceUpdate } from "../controllers/attendance.controller";

const router = Router();

router.post("/", isauthenticatedMiddleware, isadminMiddleware, createNewAttendanceEntry);
router.get("/today", isauthenticatedMiddleware, isadminMiddleware, getTodaysAttendance);
router.get("/all", isauthenticatedMiddleware, isadminMiddleware, getAllUserAttendance);
router.get("/history", isauthenticatedMiddleware, isadminMiddleware, getAttendanceHistory);
router.patch("/update/:id", isauthenticatedMiddleware, isadminMiddleware, handleAttendanceUpdate);
router.get("/user/:id", isauthenticatedMiddleware, getUserAttendance);

export default router;