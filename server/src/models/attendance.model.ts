import mongoose, { InferSchemaType, model, Schema } from "mongoose"

const AttendanceSchema = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',   //reference to user collection
		required: true,
		index: true   //for faster queries
	},

	status: {
		type: String,
		enum: [ "present", "absent"	],
		required: true
	},

	date: {
		type: Date,
		required: true,
		index: true
	}
}, { timestamps: true });

// preventing duplicate entries in the same date
AttendanceSchema.index({ user_id: 1, date: 1 }, { unique: true });

export type TypeAttendance = InferSchemaType<typeof AttendanceSchema>;
export const Attendance = model<TypeAttendance>("Attendance", AttendanceSchema);
