import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import passport from "passport";
import bcrypt from "bcrypt";

const handleChangePassword = async (req: Request, res: Response) => {
	const { email, oldPassword, newPassword } = req.body;

	if(!email || !oldPassword || !newPassword) {
		res.status(400).json({ message: "Invalid user data" });
		return;
	}

	if (newPassword.length < 4) {
		res.status(400).json({ message: "Password must be atleast four characters" })
		return;
	}

	try {
		const user = await User.findByEmail(email);

		if(!user) {
			res.status(404).json({ message: "User doesn't exist by that email" })
			return;
		}

		if (user.role !== "user") {
			res.status(403).json({ message: "Not a valid user" });
			return;
		}

		const isValid = await user.verifyPassword(oldPassword);

		if(!isValid) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		await user.setPassword(newPassword);

		res.status(200).json({ message: "Password changed successfully!" });

	} catch (err: any) {
		console.error(err);
		res.status(500).json({ message: err.message || "Something went wrong" });
	}
}

const handleSignup = async (req: Request, res: Response, next: NextFunction) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.status(400).json({ message: "Invalid user data" });
		return;
	}

	if(password.length < 4) {
		res.status(400).json({ message: "Password must be atleast four characters" })
		return;
	}

	try {
		const row = await User.findByEmail(email);

		if (row) {
			res.status(409).json({ message: "Email already exists, try logging in" });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user: any = await User.create({ username, email, hashedPassword });

		req.logIn(user, (err: Error) => {

			if (err) return next(err);
			const { _doc } = user;
			const { hashedPassword: _, ...rest } = _doc;

			return res.status(200).json({
				message: "User signed up successfully!",
				data: rest,
			});
		})

	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Something went wrong!" });
	}
};

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate(
		"local",
		(err: Error, user: any, info?: { message: string }) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(401).json({ message: info?.message || "Invalid credentials!" })
			}

			if (user.role !== "user") {
				return res.status(403).json({ message: "Not a valid user" })
			}

			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}

				const { _doc } = user;
				const { hashedPassword: _, ...restOfDoc } = _doc;

				return res.status(200).json({ message: "Logged in successfully!", data: restOfDoc })
			});
		})(req, res, next);
};

const handleLogOut = async (req: Request, res: Response, next: NextFunction) => {
	req.logOut((err) => {
		if (err) return next(err);

		return res.status(200).json({ message: "Logged out successfully!" });
	})
}

const handleAdminLogin = async (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate(
		"local",
		(err: Error, user: any, info?: { message: string }) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(401).json({ message: info?.message || "Invalid credentials!" })
			}

			if (user.role !== "admin") {
				return res.status(403).json({ message: "Not a valid admin" })
			}

			req.logIn(user, (err) => {
				if (err) {
					return next(err);
				}

				const { _doc } = user;
				const { hashedPassword: _, ...restOfDoc } = _doc;

				return res.status(200).json({ message: "Logged in successfully!", data: restOfDoc })
			});
		})(req, res, next);
}

const handleAdminLogout = async (req: Request, res: Response, next: NextFunction) => {
	req.logOut((err) => {
		if (err) return next(err);

		return res.status(200).json({ message: "Logged out successfully!" });
	})
}

const whoAmI = async (req: Request, res: Response) => {
	res.status(200).json({ message: "User retrieved successfully!", data: req.user })
}

export { handleSignup, handleLogin, handleLogOut, handleAdminLogin, handleAdminLogout, whoAmI, handleChangePassword };