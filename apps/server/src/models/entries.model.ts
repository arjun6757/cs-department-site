import mongoose from "mongoose";
import { Model, Document, Schema } from "mongoose";

interface EntryDocument extends Document {
	owner: string;
	sem: string;
	course: string;
	year: string;
	filename: string;
	download_link: string;
	note_link: string;
}

interface EntryModel extends Model<EntryDocument> {
	findByLink: (download_link: string) => Promise<EntryDocument>;
}

const EntrySchema: Schema<EntryDocument> = new Schema(
	{
		owner: {
			type: String,
			required: true,
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

EntrySchema.statics.findByLink = async function (download_link: string) {
	this.findOne({ download_link });
};

const Entry = mongoose.model<EntryDocument, EntryModel>("Entry", EntrySchema);
export default Entry;
