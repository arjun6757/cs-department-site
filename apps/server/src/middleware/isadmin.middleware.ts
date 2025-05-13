import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
	// @ts-ignore
	if (req.user?.role !== "admin") {
		res.status(403).json({ message: "Not a valid admin" });
		return;
	}

	next();
}
