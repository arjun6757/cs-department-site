import { Request, Response } from "express";
import User from "../models/user.model";

export async function getAllUsers(req: Request, res: Response) {
	try {
		const { type = "all" } = req.query;

		if (type !== "all") {
			const users = await User.find({ role: type }).select(
				"-hashedPassword",
			);

			res.status(200).json({
				message: "Users fetched successfully!",
				data: users,
			});
		} else {
			const users = await User.find().select("-hashedPassword");

			res.status(200).json({
				message: "Users fetched successfully!",
				data: users,
			});
		}
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}

export async function handleDeleteUser(req: Request, res: Response) {
	// api/user/delete/:id
	// TODO: refactor it to deactivate the user instead of deletion
	try {

		const { id } = req.params;

		if (!id) {
			res.status(400).json({ message: "Invalid request" });
			return;
		}

		const user = await User.findById(id.toString());

		if (!user) {
			res.status(404).json({
				message: "Id didn't match any existing user",
			});
			return;
		}

		if (user.role === "admin") {
			res.status(403).json({ message: "Not a valid request" });
			return;
		}

		const entry = await User.deleteOne({ _id: id.toString() });

		if (!entry) {
			throw new Error("Error occured while removing user entry!");
		}

		res.status(200).json({
			message: "User entry removed successfully!",
			data: entry,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}
