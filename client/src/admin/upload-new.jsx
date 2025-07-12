import { useRef, useState } from "react";
import { upload } from "../actions/entry.action";
import { Link} from "react-router-dom";
import { Loader } from "lucide-react";

export default function NewUpload() {
	const [file, setFile] = useState("No file chosen");
	const fileInputRef = useRef(null);
	const [pending, setPending] = useState(false);

	const handleChange = (e) => {
		const filename = e.target.files[0]?.name || "No file chosen";
		if (filename) {
			setFile(filename);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		e.target.reset();
		setFile("No file chosen");
		setPending(true);

		try {
			const result = await upload(formData);
		} catch (err) {
			console.error(err);
		} finally {
			setPending(false);
		}
	};

	return (
		<div className="text-sm w-full min-h-screen flex flex-col gap-4 py-5">
			<Link
				to="/admin/dashboard/uploads"
				className="hover:underline underline-offset-4 w-fit px-4 sm:px-6"
			>
				&larr; Back
			</Link>

			<div className="sm:w-lg w-[90vw] mx-auto border border-[#ddd] dark:border-[#333] shadow-xs rounded-md px-6 py-8">
				<form
					onSubmit={handleSubmit}
					className="space-y-4"
					encType="multipart/form-data"
				>
					<div className="flex flex-col gap-1 mb-5">
						<h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
							Upload Form
						</h1>
						<span className="text-xs text-gray-500 dark:text-neutral-400">
							Fill in the details as per the labels
						</span>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="department">Department</label>
						<input
							className="border border-[#ddd] dark:border-[#333] p-1 rounded outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500"
							type="text"
							name="department"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="sem">
							Semester <span className="text-red-500">*</span>
						</label>
						<input
							className="border border-[#ddd] dark:border-[#333] p-1 rounded outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500"
							type="number"
							max={6}
							name="sem"
							required
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="course">
							Course<span className="text-red-500">*</span>
						</label>
						<input
							className="border border-[#ddd] dark:border-[#333] p-1 rounded outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500"
							type="text"
							name="course"
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="year">
							Year <span className="text-red-500">*</span>
						</label>
						<input
							className="border border-[#ddd] dark:border-[#333] p-1 rounded outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500"
							type="number"
							name="year"
							min={2018}
							max={2050}
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="document">
							PYQ paper (.pdf)
							<span className="text-red-500">*</span>
						</label>

						<div className="flex flex-col gap-2">
							<span className="border border-[#ddd] dark:border-[#333] p-1 rounded truncate">
								{file}
							</span>

							<input
								ref={fileInputRef}
								className="hidden"
								type="file"
								name="document"
								onChange={handleChange}
								accept="application/pdf"
								required
							/>

							<button
								type="button"
								onClick={() => {
									if (fileInputRef.current) {
										fileInputRef.current.click();
									}
								}}
								className="outline-blue-500 outline-offset-2 w-fit px-4 py-1.5 rounded bg-blue-500 dark:bg-[#272727] hover:opacity-80 active:opacity-90 cursor-pointer text-gray-100"
							>
								Choose
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="note_link">
							Note link <span className="text-red-500">*</span>
						</label>
						<input
							className="border border-[#ddd] dark:border-[#333] p-1 rounded outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500"
							type="text"
							name="note_link"
							required
						/>
					</div>

					<button
						disabled={pending}
						className="disabled:cursor-not-allowed w-full px-4 py-1.5 rounded bg-blue-500 dark:bg-[#272727] hover:opacity-80 active:opacity-90 cursor-pointer text-gray-100 outline-offset-2 outline-blue-500 inline-flex gap-4 justify-center items-center"
					>
						{pending ? "Uploading..." : "Upload"}

						{pending && (
							<Loader className="w-5 h-5 text-gray-300 animate-spin" />
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
