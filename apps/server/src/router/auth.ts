import express, { Router } from "express";
import { createUser, handleLogin } from "../controllers/AuthController";

const router: Router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", createUser);

export default router;
