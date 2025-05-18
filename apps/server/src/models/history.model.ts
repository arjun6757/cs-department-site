import { InferSchemaType, model, Schema } from "mongoose";

const HistorySchema = new Schema({
	user_id: {
		type: String,
		required: true,
	},
	action: {
		name: {
			type: String,
			required: true
		},

		details: {
			type: String,
			required: true
		}
	}
}, { timestamps: true })

export type HistoryType = InferSchemaType<typeof HistorySchema>;
const History = model<HistoryType>("History", HistorySchema);
export default History;