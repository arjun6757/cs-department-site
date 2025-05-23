import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads"),
	filename: (req, file, cb) => {
		const dotIndex = file.originalname.lastIndexOf(".")
		const fileName = file.originalname.slice(0, dotIndex)
		const fileExtension = file.originalname.slice(dotIndex)

		cb(null, fileName + '_' + Date.now() + fileExtension);
	},
});

export const upload = multer({ storage });
