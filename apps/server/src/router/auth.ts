import express, { Router } from "express";
import { createUser, handleLogin, handleLogOut } from "../controllers/AuthController";

const router: Router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", createUser);
router.post("/logout", handleLogOut);

export default router;
