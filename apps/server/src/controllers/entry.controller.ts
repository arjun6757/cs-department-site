import { Request, Response } from "express";
import Entry from "../models/entry.model";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.util";
import { v2 as cloudinary } from "cloudinary";
import type { User } from "../models/user.model";

interface ModRequest extends Request {
	user?: User | undefined;
}

export async function handleUpload(req: ModRequest, res: Response) {
	const { sem, course, year, note_link } = req.body;

	if (!req.file) {
		res.status(400).json({ message: "Failed to upload file" });
		return;
	}

	try {
		const file = await uploadToCloudinary(req.file.path);

		const download_link = cloudinary.url(file.public_id, {
			resource_type: "image",
			type: "upload",
			secure: true,
			transformation: [{ flags: "attachment" }],
		});

		const entry = await Entry.create({
			owner: req.user?.username,
			owner_id: req.user?._id,
			sem,
			course,
			year,
			filename: file.original_filename,
			download_link,
			note_link,
			file_id: file.public_id,
		});

		res.status(200).json({
			message: `File uploaded: ${req.file.filename}`,
			data: entry,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}

export async function getAllEntries(req: Request, res: Response) {
	try {
		const entries = await Entry.find();

		if (!entries)
			throw new Error("Error while trying to fetch all entries!");

		res.status(200).json({
			message: "Entries fetched successfully!",
			data: entries,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}

export async function handleEntryDelete(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ message: "Invalid Request" });
			return;
		}

		const entry = await Entry.findByIdAndDelete(id.toString());

		if (!entry) {
			throw new Error("Failed to remove entry");
		}

		const asset = await deleteFromCloudinary(entry.file_id);

		res.status(200).json({
			message: "Entry removed successfully",
			data: { entry, asset },
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}
