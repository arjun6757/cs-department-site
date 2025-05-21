import { useEffect, useRef, useState } from "react";
import { upload } from "../actions/entry.action";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth.context";

export default function NewUpload() {
	const [file, setFile] = useState("No file chosen");
	const fileInputRef = useRef(null);
	const { user, setUser, error, loading } = useAuth();
	const navigate = useNavigate();


	useEffect(() => {

		if (loading === undefined) return;

		if (!loading && !user) {
			navigate("/admin/login", { replace: true });
		}

		if (!loading && user && user.role !== "admin") {
			navigate("/admin/login?message=Not a valid admin", { replace: true });
		}

	}, [user, loading, navigate]);

	if (loading || !user || user.role !== "admin") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-8 h-8 border-4 rounded-full border-gray-500 p-2 border-r-transparent animate-spin"></div>
			</div>
		)
	}

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

		try {
			const result = await upload(formData);
			console.log(result);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="text-sm w-full h-full">

			<Link to="/admin/dashboard/uploads" className="sticky top-4 left-4 hover:underline underline-offset-4">
				&larr; All Uploads
			</Link>

			<div className="sm:w-lg w-xs mx-auto border border-[#ddd] shadow-sm rounded-md px-6 py-8 my-10">

				<form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data"  >
					<div className="flex flex-col gap-1 mb-5">
						<h1 className="text-lg font-semibold text-gray-800">
							Upload Form
						</h1>
						<span className="text-xs text-gray-500">
							Fill in the details as per the labels
						</span>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="department">Department</label>
						<input
							className="border border-[#ddd] p-1 rounded outline-blue-500"
							type="text"
							name="department"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="sem">
							Semester <span className="text-red-500">*</span>
						</label>
						<input
							className="border border-[#ddd] p-1 rounded outline-blue-500"
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
							className="border border-[#ddd] p-1 rounded outline-blue-500"
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
							className="border border-[#ddd] p-1 rounded outline-blue-500"
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
							<span className="border border-[#ddd] p-1 rounded truncate">{file}</span>

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
								onClick={() => {
									if (fileInputRef.current) {
										fileInputRef.current.click();
									}
								}}
								className="outline-blue-500 outline-offset-2 w-fit px-4 py-1.5 rounded bg-blue-500 active:opacity-90 cursor-pointer text-gray-100"
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
							className="border border-[#ddd] p-1 rounded outline-blue-500"
							type="text"
							name="note_link"
							required
						/>
					</div>

					<button className="w-full px-4 py-1.5 rounded bg-blue-500 active:opacity-90 cursor-pointer text-gray-100 outline-offset-2 outline-blue-500">
						Upload
					</button>

				</form>
			</div>
		</div>
	);
}
