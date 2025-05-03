import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUserDocument } from "../models/user"

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async function (email, password, done) {
			const user = await User.findByEmail(email);
			if(!user) return done(null, false);
			const valid = await user.verifyPassword(password);
			if(!valid) return done(null, false);

			return done(null, user);
		},
	),
);

passport.serializeUser((user, done) => {
	const MongoUser = user as IUserDocument;
	done(null, MongoUser._id);
})

passport.deserializeUser( async (id, done) => {
	const user = await User.findById(id);
	if(!user) return done(null, false);
	done(null, user);
})