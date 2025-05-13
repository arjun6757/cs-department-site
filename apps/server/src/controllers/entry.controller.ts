import { Request, Response } from "express";
import Entry from "../models/entries.model";

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

		const entry = Entry.deleteOne({ _id: id.toString() });

		// TODO: cloudinary asset delete after entry delete

		if (!entry) {
			throw new Error("Failed to remove entry");
		}

		res.status(200).json({
			message: "Entry removed successfully",
			data: entry,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}

// export async function handleEntryEdit(req: Request, res: Response) {
// 	try {
// 		const { id } = req.params;
// 		const { sem, course, year, filename }

// 		if(!id) {
// 			res.status(400).json({ message: "Invalid Request" });
// 			return;
// 		}



// 	} catch (err) {

// 	}
// }