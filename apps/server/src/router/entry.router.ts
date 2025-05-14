import express from "express";
import { upload } from "../middleware/multer.middleware";
import { getAllEntries, handleEntryDelete, handleUpload } from "../controllers/entry.controller";
import isAdmin from "../middleware/isadmin.middleware";

const router = express.Router();

// @ts-ignore
// as Request != ModRequest
router.post("/upload", isAdmin, upload.single("document"), handleUpload);

router.get("/all", getAllEntries);
router.post("/delete/:id", isAdmin, handleEntryDelete);

export default router;
