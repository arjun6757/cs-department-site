import express from "express";
import AuthRouter from "./auth.router";
import UserRouter from "./user.router";
import EntryRouter from "./entry.router";
import isAuthenticated from "../middleware/isauthenticated.middleware";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/entry", isAuthenticated, EntryRouter);

export default router;
