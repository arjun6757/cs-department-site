import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	secure: process.env.NODE_ENV ==="production" ? true : false,
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (filePath: string) => {
	try {
		if (!filePath) throw new Error("Invalid file path");

		const file = await cloudinary.uploader.upload(filePath, {
			resource_type: "auto",
		});

		if (!file) throw new Error("Error occured while uploading the file");

		fs.unlinkSync(filePath);

		return file;
	} catch (err) {
		if(filePath) fs.unlinkSync(filePath); // stops the event loop until deletion
		throw err;
	}
};

export const deleteFromCloudinary = async (id: string) => {
	try {
		if(!id) throw new Error("Invalid asset id");

		const result = await cloudinary.uploader.destroy(id, {
			resource_type: "image",
			type: "upload",
			invalidate: true // delete it immediately from cdn too
		});

		if(!result) throw new Error("Error occured while deleting the asset");

		return result;
	} catch (err) {
		throw err;
	}
};
