import express, { Router } from "express"
import AuthRouter from "./auth.router"

const router: Router = express.Router()

router.use("/auth", AuthRouter)

export default router;