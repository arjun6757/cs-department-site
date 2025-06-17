import express from "express";
import AuthRouter from "./auth.router";
import UserRouter from "./user.router";
import EntryRouter from "./entry.router";
import AttendanceRouter from "./attendance.router";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/entry", EntryRouter);
router.use("/attendance", AttendanceRouter);

export default router;
