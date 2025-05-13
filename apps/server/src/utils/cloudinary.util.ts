import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import fs from "fs";

config()

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (filePath: string) => {
	try {

		if(!filePath) throw new Error("Invalid file path");

		const file = await cloudinary.uploader.upload(filePath, {
			// resource_type: "raw", // auto doesnt work so raw
			resource_type: "auto",
		})

		if(!file) throw new Error("Error occured while uploading the file");

		return { ...file, local_path: filePath };
	} catch (err) {
		fs.unlinkSync(filePath)  // stops the event loop until deletion
		throw err;
	}
}
