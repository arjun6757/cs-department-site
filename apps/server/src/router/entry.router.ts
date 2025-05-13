import express from "express";
import { upload } from "../middleware/multer.middleware";
import { uploadToCloudinary } from "../utils/cloudinary.util";
import fs from "fs"
import Entry from "../models/entries.model";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

router.post("/upload", upload.single("document"), async (req: any, res: any) => {
	const { sem, course, year, note_link } = req.body;

	if (!req.file) {
		res.status(400).json({ message: "Failed to upload file" });
		return;
	}

	try {
		const file = await uploadToCloudinary(req.file.path);

		fs.unlinkSync(file.local_path);

		const download_link = cloudinary.url(file.public_id, {
			resource_type: 'image',
			type: 'upload',
			secure: true,
			transformation: [
				{ flags: 'attachment' },
			],
		});

		const entry = await Entry.create({ owner: req.user?.username || "null" , sem, course, year, filename: file.original_filename, download_link, note_link });

		res.status(200).json({
			message: `File uploaded: ${req.file.filename}`,
			data: entry
		});

	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
});

export default router;
