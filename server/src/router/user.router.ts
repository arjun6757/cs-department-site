import { Router } from "express";
import { getAllUsers, handleDeleteUser } from "../controllers/user.controller";
import isAuthenticated from "../middleware/isauthenticated.middleware";
import isAdmin from "../middleware/isadmin.middleware";

const router = Router();

router.get("/all", isAuthenticated, isAdmin, getAllUsers);
router.delete("/delete/:id", handleDeleteUser);

export default router;