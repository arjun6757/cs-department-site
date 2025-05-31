import { Request, Response } from "express";
import { Attendance } from "../models/attendance.model";
import { Types } from "mongoose";
import User from "../models/user.model";

const ObjectId = Types.ObjectId;

export async function getTodaysAttendance(req: Request, res: Response) {
	try {
		const today = new Date();
		const startOfToday = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
		);
		const endOfToday = new Date(
			startOfToday.getTime() + 24 * 60 * 60 * 1000,
		);

		const users = await User.find({ role: "user" }).select(
			"-hashedPassword",
		);

		const todaysEntries = await Attendance.find({
			createdAt: {
				$gte: startOfToday,
				$lt: endOfToday,
			},
		});

		const userIdsPresentToday = new Map(
			todaysEntries.map((t) => [String(t.user_id), t.status]),
		);

		const entryIds = new Map(
			todaysEntries.map((t) => [String(t.user_id), String(t._id)]),
		);

		const data = users.map((u) => ({
			_id: entryIds.get(String(u._id)),
			user_id: u._id,
			username: u.username,
			email: u.email,
			status: userIdsPresentToday.has(String(u._id))
				? userIdsPresentToday.get(String(u._id))
				: null,
		}));

		res.status(200).json({
			message: "Successfully fetched todays attendance",
			data,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}

export async function getAllUserAttendance(req: Request, res: Response) {
	const { start, end } = req.query;

	if (!start || !end) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	const endDate = new Date(end.toString());
	const startDate = new Date(start.toString());
	const differenceInMs = Math.abs(endDate.valueOf() - startDate.valueOf());
	const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

	try {
		const attendanceReport = await Attendance.aggregate([
			{
				$match: {
					date: {
						$gte: new Date(start.toString()),
						$lt: new Date(end.toString()),
					},
				},
			},
			{
				$lookup: {
					// left outer join
					from: "users",
					localField: "user_id",
					foreignField: "_id",
					as: "user",
				},
			},

			{
				$unwind: {
					path: "$user",
				},
			},

			{
				$project: {
					"user.hashedPassword": 0,
				},
			},
			{
				$group: {
					_id: "$user_id",
					user_details: {
						$first: {
							username: "$user.username",
							email: "$user.email",
						},
					},
					total_presents: {
						$sum: {
							$cond: {
								if: { $eq: ["$status", "present"] },
								then: 1,
								else: 0,
							},
						},
					},
					total_absents: {
						$sum: {
							$cond: {
								if: { $eq: ["$status", "absent"] },
								then: 1,
								else: 0,
							},
						},
					},
				},
			},
			{
				$addFields: {
					total_days: { $literal: differenceInDays },
				},
			},
			{
				$addFields: {
					total_presents_percentage: {
						$floor: {
							$multiply: [
								{ $divide: ["$total_presents", "$total_days"] },
								100,
							],
						},
					},
				},
			},
		]);

		res.status(200).json({
			message: "User attendance report fetched successfully",
			data: attendanceReport,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({ message: "Something went wrong" });
	}
}

export async function getUserAttendance(req: Request, res: Response) {
	const { id } = req.params;

	const { start, end } = req.query;

	if (!id || !start || !end) {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	const endDate = new Date(end.toString());
	const startDate = new Date(start.toString());
	const differenceInMs = Math.abs(endDate.valueOf() - startDate.valueOf());
	const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

	try {
		const attendanceReport = await Attendance.aggregate([
			{
				$match: {
					user_id: new ObjectId(id),
					date: {
						$gte: new Date(start.toString()),
						$lt: new Date(end.toString()),
					},
				},
			},
			{
				$lookup: {
					// left outer join
					from: "users",
					localField: "user_id",
					foreignField: "_id",
					as: "user",
				},
			},

			{
				$unwind: {
					path: "$user",
				},
			},

			{
				$project: {
					"user.hashedPassword": 0,
				},
			},
			{
				$group: {
					_id: "$user_id",
					user_details: {
						$first: {
							username: "$user.username",
							email: "$user.email",
						},
					},
					total_presents: {
						$sum: {
							$cond: {
								if: { $eq: ["$status", "present"] },
								then: 1,
								else: 0,
							},
						},
					},
					total_absents: {
						$sum: {
							$cond: {
								if: { $eq: ["$status", "absent"] },
								then: 1,
								else: 0,
							},
						},
					},
				},
			},
			{
				$addFields: {
					total_days: { $literal: differenceInDays },
				},
			},
			{
				$addFields: {
					total_presents_percentage: {
						$floor: {
							$multiply: [
								{ $divide: ["$total_presents", "$total_days"] },
								100,
							],
						},
					},
				},
			},
		]);

		res.status(200).json({
			message: "User attendance report fetched successfully",
			data: attendanceReport,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({ message: "Something went wrong" });
	}
}

export async function handleAttendanceUpdate(req: Request, res: Response) {
	const { id } = req.params;
	const { status } = req.query;

	if (!id || !status) {
		res.status(400).json({
			message: "Invalid request",
		});
		return;
	}

	try {
		const attendanceEntry = await Attendance.findByIdAndUpdate(id, { status }, { new: true });

		res.status(200).json({
			message: "Attendance entry updated successfully!",
			data: attendanceEntry,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}

export async function createNewAttendanceEntry(req: Request, res: Response) {
	const { status, user_id, date } = req.query;

	if (!status || !user_id || !date) {
		res.status(400).json({
			message: "Invalid request, attribute not specified",
		});
		return;
	}

	try {
		const attendanceEntry = await Attendance.create({
			user_id: new ObjectId(user_id.toString()),
			status,
			date: new Date(date.toString()),
		});

		res.status(200).json({
			message: "Attendance entry created successfully",
			data: attendanceEntry,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}

export async function getAttendanceHistory(req: Request, res: Response) {
	try {
		const attendanceEntries = await Attendance.find().populate(
			"user_id",
			"-hashedPassword",
		);

		res.status(200).json({
			message: "Attendance history fetched successfully",
			data: attendanceEntries,
		});
	} catch (err: any) {
		console.error(err);
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
}
