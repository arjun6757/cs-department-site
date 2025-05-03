import express, { Router } from "express"
import AuthRouter from "./auth"
// import { Request, Response } from "express"

const router: Router = express.Router()

router.use("/auth", AuthRouter)
// router.get("/hello", homepage)

export default router;