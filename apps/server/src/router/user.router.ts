import express from "express";
import { getAllUsers, handleDeleteUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/all", getAllUsers);
router.delete("/delete/:id", handleDeleteUser);

export default router;