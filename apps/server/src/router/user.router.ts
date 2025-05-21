import express from "express";
import { getAllUsers, handleDeleteUser, handleUpdate } from "../controllers/user.controller";
import isAuthenticated from "../middleware/isauthenticated.middleware";
import isAdmin from "../middleware/isadmin.middleware";
const router = express.Router();

router.get("/all", isAuthenticated, isAdmin, getAllUsers);
router.patch("/update/:id", handleUpdate)
router.delete("/delete/:id", handleDeleteUser);

export default router;