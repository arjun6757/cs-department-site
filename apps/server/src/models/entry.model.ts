import { InferSchemaType, Schema, model } from "mongoose";

const EntrySchema = new Schema(
	{
		owner: {
			type: String,
			required: true,
		},
		owner_id: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
			default: "CS"
		},
		sem: {
			type: String,
			required: true,
		},
		course: {
			type: String,
			required: true,
		},
		year: {
			type: String,
			required: true,
		},
		filename: {
			type: String,
			required: true,
		},
		file_id: {
			type: String,
			required: true,
		},
		download_link: {
			type: String,
			required: true,
		},
		note_link: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

type EntryType = InferSchemaType<typeof EntrySchema>;
const Entry = model<EntryType>("Entry", EntrySchema);

export default Entry;