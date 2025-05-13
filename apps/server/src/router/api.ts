import express from "express";
import AuthRouter from "./auth.router";
import UserRouter from "./user.router";
import EntryRouter from "./entry.router";
import isAdmin from "../middleware/isadmin.middleware";
import isAuthenticated from "../middleware/isauthenticated.middleware";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
// router.use("/file", isAuthenticated, isAdmin, EntryRouter);
router.use("/entry", EntryRouter);

export default router;
