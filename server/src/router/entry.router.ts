import express from "express";
import { upload } from "../middleware/multer.middleware";
import { getAllEntries, handleEntryDelete, handleUpload } from "../controllers/entry.controller";
import isAdmin from "../middleware/isadmin.middleware";
import isAuthenticated from "../middleware/isauthenticated.middleware";

const router = express.Router();

// @ts-ignore
// as Request != ModRequest

router.post("/upload", isAuthenticated, isAdmin, upload.single("document"), handleUpload);

router.get("/all", isAuthenticated, getAllEntries);
router.post("/delete/:id", isAuthenticated, isAdmin, handleEntryDelete);

export default router;
