import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUserDocument } from "../models/user.model"

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async function (email, password, done) {
			const user = await User.findByEmail(email);
			if (!user) return done(null, false);
			const valid = await user.verifyPassword(password);
			if (!valid) return done(null, false);

			return done(null, user);
		},
	),
);

passport.serializeUser((user, done) => {
	const MongoUser = user as IUserDocument;
	console.log('MongoUser: ', MongoUser, MongoUser._id);
	done(null, MongoUser._id);
})

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id).select('-hashedPassword');
	if (!user) return done(null, false);
	console.log('user object at deserializeUser: ', user)
	done(null, user);
})