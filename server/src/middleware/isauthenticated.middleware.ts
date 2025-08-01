import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
	if (!req.user) {
		res.status(401).json({ message: "Unauthorized access", data: null });
		return;
	}

	next();
}
