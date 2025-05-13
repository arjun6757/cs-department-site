import express from "express";
import { upload } from "../middleware/multer.middleware";
import { uploadToCloudinary } from "../utils/cloudinary.util";
import fs from "fs"
import Entry from "../models/entries.model";

const router = express.Router();
// upload.single can be any name just need to specify it too in the form input type=file and name=exactsame as in upload.single
router.post("/upload", upload.single("document"), async (req: any, res: any) => {
	const { sem, course, year } = req.body;

	if (!req.file) {
		res.status(400).json({ message: "Failed to upload file" });
		return;
	}

	try {
		const file = await uploadToCloudinary(req.file.path);

		fs.unlinkSync(file.local_path);

		await Entry.create({ owner: req.user || "null" , sem, course, year, filename: file.original_filename, download_link: file.secure_url, note_link: file.url });

		res.status(200).json({
			message: `File uploaded: ${req.file.filename} and document uploaded to mongodb 😁`,
		});

	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
});

export default router;
