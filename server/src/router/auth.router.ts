import express from "express";
import {
	handleSignup,
	handleLogin,
	handleLogOut,
	handleAdminLogin,
	handleAdminLogout,
	whoAmI,
	handleChangePassword,
} from "../controllers/auth.controller";
import isAdmin from "../middleware/isadmin.middleware";
import isAuthenticated from "../middleware/isauthenticated.middleware";

const router = express.Router();

router.get("/whoami", isAuthenticated, whoAmI);
router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.post("/logout", handleLogOut);
router.post("/admin/login", handleAdminLogin);
router.post("/admin/logout", isAdmin, handleAdminLogout);
router.post("/change-password", handleChangePassword);

export default router;
