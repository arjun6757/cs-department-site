import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import passport from "passport";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.status(400).json({ message: "Invalid user data" });
		return;
	}

	try {
		const row = await User.findByEmail(email);

		if (row) {
			res.status(409).json({ message: "Duplicate data" });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({ username, email, hashedPassword });
		res.status(200).json({
			message: "User signed up successfully!",
			data: user,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Something went wrong!" });
	}
};

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate(
		"local",
		(err: Error, user: typeof User, info?: { message: string }) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(401).json({ message: info?.message || "Invalid credentials!" })
			}

			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}

				return res.status(200).json({ message: "Login successfully!", data: user })
			});
		})(req, res, next);
};

export { createUser, handleLogin };