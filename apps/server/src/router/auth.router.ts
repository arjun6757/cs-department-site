import express from "express";
import { handleSignup, handleLogin, handleLogOut, handleAdminLogin, handleAdminLogout, whoAmI, handleForgotPassword } from "../controllers/auth.controller";

const router = express.Router();

router.get("/whoami", whoAmI);
router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.post("/logout", handleLogOut);
router.post("/admin/login", handleAdminLogin)
router.post("/admin/logout", handleAdminLogout);
router.post("/forgot-password", handleForgotPassword)

export default router;