import { Request, Response } from "express";
import Entry from "../models/entry.model";
import { deleteFromCloudinary } from "../utils/cloudinary.util";

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