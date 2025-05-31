import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import { Document, Model, Schema } from "mongoose";

interface IUser {
	username: string;
	email: string;
	hashedPassword: string;
	role: string;
	// attendance?: string;
}

export interface IUserDocument extends IUser, Document {
	setPassword: (password: string) => Promise<void>;
	verifyPassword: (password: string) => Promise<boolean>;
	setAttendance: (value: number) => Promise<void>;
}

interface IUserModel extends Model<IUserDocument> {
	findByEmail: (email: string) => Promise<IUserDocument>;
}

const UserSchema: Schema<IUserDocument> = new Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		hashedPassword: { type: String, required: true },
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		// attendance: {
		// 	type: Number,
		// 	default: "0",
		// }
	},
	{ timestamps: true },
);

UserSchema.methods.verifyPassword = async function (password: string) {
	// here () => won't work don't know why
	const result = await bcrypt.compare(password, this.hashedPassword);
	return result;
};

UserSchema.methods.setPassword = async function (password: string) {
	const hashed = await bcrypt.hash(password, 10);
	this.hashedPassword = hashed;
	await this.save();
};

UserSchema.statics.findByEmail = async function (email: string) {
	return this.findOne({ email });
};

export type User = InferSchemaType<typeof UserSchema>;

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
export default User;
