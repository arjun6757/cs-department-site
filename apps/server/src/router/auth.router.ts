import express, { NextFunction, Router } from "express";
import { createUser, handleLogin, handleLogOut, whoAmI } from "../controllers/auth.controller";

const router: Router = express.Router();

router.get("/whoami", whoAmI);
router.post("/login", handleLogin);
router.post("/signup", createUser);
router.post("/logout", handleLogOut);

export default router;
