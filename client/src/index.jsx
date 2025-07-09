import { Link } from "react-router-dom";
import {
	ChevronRight,
	Menu,
	Shield,
	UploadCloud,
	UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Index() {
	const [isHidden, setIsHidden] = useState(true);
	const [demo, setDemo] = useState("/images/demo-desktop.png");

	const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => removeEventListener("resize", handleResize);
	}, []);

	const handleResize = () => {
		if (window.innerWidth >= 640) {
			setDemo("/images/demo-desktop.png");
		} else {
			setDemo("/images/demo-mobile.jpeg");
		}
	};

	return (
		<div className="min-h-screen w-full text-sm bg-[#171717] text-gray-100">
			<header className="sticky top-0">
				<nav className="p-4 flex flex-col gap-2 bg-[#171717]/80 backdrop-blur-md text-gray-100 border-b border-[#333] transition-colors">
					<button
						title="Menu"
						data-hidden={isHidden}
						onClick={() => setIsHidden((p) => !p)}
						className="lg:data-hidden:hidden text-gray-100 cursor-pointer w-6 h-6"
					>
						<Menu />
					</button>

					<ul
						data-hidden={isHidden}
						className="data-[hidden=true]:hidden data-[hidden=false]:flex lg:data-hidden:flex lg:flex-row flex-col lg:justify-between gap-6 py-2 xl:py-0"
					>
						<div className="flex flex-col lg:flex-row">
							<li className="p-2 border-b border-[#555] lg:border-none">
								<a href="#home">Home</a>
							</li>
							<li className="p-2 border-b border-[#555] lg:border-none">
								<a href="#about">About</a>
							</li>
							<li className="p-2 border-b border-[#555] lg:border-none">
								<a href="#contact">Contact</a>
							</li>

							<details
								onMouseEnter={(e) =>
									touch
										? undefined
										: (e.currentTarget.open = true)
								}
								onMouseLeave={(e) =>
									touch
										? undefined
										: (e.currentTarget.open = false)
								}
								className="group p-2 border-b border-[#555] lg:border-none relative"
							>
								<summary className="flex items-center gap-2 cursor-pointer">
									<span>Student</span>
									<ChevronRight className="w-4 h-4 sm:rotate-90 sm:group-open:-rotate-90 group-open:rotate-90 transition-transform duration-300" />
								</summary>
								<ul className="lg:absolute lg:left-0 lg:bg-white lg:text-gray-700 p-2 pl-6 lg:p-4 lg:rounded-md lg:shadow-md lg:z-10 flex flex-col gap-2">
									<li className="lg:hover:text-blue-500">
										<Link to="/login">Login</Link>
									</li>
									<li className="lg:hover:text-blue-500">
										<Link to="/dashboard">Dashboard</Link>
									</li>
									<li className="lg:hover:text-blue-500">
										<Link to="/signup">Signup</Link>
									</li>
								</ul>
							</details>

							<details
								onMouseEnter={(e) =>
									touch
										? undefined
										: (e.currentTarget.open = true)
								}
								onMouseLeave={(e) =>
									touch
										? undefined
										: (e.currentTarget.open = false)
								}
								className="group p-2 border-b border-[#555] lg:border-none relative"
							>
								<summary className="flex items-center gap-2 cursor-pointer">
									<span>Admin</span>
									<ChevronRight className="w-4 h-4 sm:rotate-90 sm:group-open:-rotate-90 group-open:rotate-90 transition-transform duration-300" />
								</summary>
								<ul className="lg:absolute lg:left-0 lg:bg-white lg:text-gray-800 p-2 pl-6 lg:p-4 lg:rounded-md lg:shadow-md lg:z-10 flex flex-col gap-2">
									<li className="lg:hover:text-blue-500">
										<Link to="/admin/login">Login</Link>
									</li>
									<li className="lg:hover:text-blue-500">
										<Link to="/admin/dashboard">
											Dashboard
										</Link>
									</li>
								</ul>
							</details>
						</div>

						<div className="flex gap-4 lg:items-center">
							<li>
								<Link
									to="/login"
									className="p-2 bg-purple-500 hover:opacity-90 active:opacity-80 rounded text-white"
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									to="/dashboard"
									className="p-2 bg-white hover:opacity-90 active:opacity-80 text-black rounded"
								>
									Dashboard
								</Link>
							</li>
						</div>
					</ul>
				</nav>
			</header>

			<main className="my-6">
				<div
					id="home"
					className="mt-[2rem] sm:mt-[5rem] _mobile-width sm:w-xl md:w-2xl lg:w-4xl mx-auto flex flex-col gap-5 sm:gap-6 p-2 sm:p-8 text-sm lg:text-[16px]"
				>
					<h1 className="_mobile-text text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center">
						Department of Computer Science
					</h1>

					<p className="_mobile-description text-gray-400 text-sm md:text-[16px]">
						A centralized platform for students and faculty to track
						attendance, access academic resources, and manage past
						question papers — all in one place.
					</p>

					<div className="flex gap-4 justify-center items-center mt-3 sm:mt-2">
						<Link
							to="/dashboard"
							className="px-4 py-2 bg-purple-500 hover:opacity-90 active:opacity-80 rounded text-white"
						>
							Get Started
						</Link>
						<Link
							to="/signup"
							className="px-4 py-2 bg-white hover:opacity-90 active:opacity-80 text-black rounded flex gap-2 items-center"
						>
							Signup
						</Link>
					</div>

					<div className="border border-[#333] rounded-lg overflow-hidden mt-4 sm:mt-2">
						<img
							width={800}
							height={600}
							style={{ width: "100%", height: "auto" }}
							loading="eager"
							src={demo}
							alt="cs-department-site demo image"
						/>
					</div>
				</div>

				<div
					id="about"
					className="p-2 sm:p-8 md:px-4 py-6 sm:py-12 sm:px-0 _mobile-width sm:w-fit mx-auto "
				>
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 xl:gap-20 xl:p-4">
						<li className="border border-[#333] hover:border-gray-500 space-y-2.5 sm:space-y-4 p-5 sm:w-lg md:w-[18rem] xl:w-[20rem] md:h-[15rem] rounded-lg">
							<h3 className="text-[1em] xl:text-lg font-medium inline-flex gap-2 items-center">
								<UserCheck className="text-blue-500" />
								Online Attendance System
							</h3>
							<p className="text-gray-400 text-sm xl:text-[1em]">
								A planned system to manage and track student
								attendance online. Will include a role-based
								login for students and faculty, allowing faculty
								to mark attendance and students to view their
								records. The implementation will be handled on
								both the client and server side.
							</p>
						</li>
						<li className="border border-[#333] hover:border-gray-500 space-y-2.5 sm:space-y-4 p-5 sm:w-lg md:w-[18rem] xl:w-[20rem] md:h-[15rem] rounded-lg">
							<h3 className="text-[1em] xl:text-lg font-medium inline-flex gap-2 items-center">
								<UploadCloud className="text-blue-500" />
								Easily Upload & Get PYQs
							</h3>
							<p className="text-gray-400 text-sm xl:text-[1em]">
								Users can upload and download previous year
								question papers (PYQs). Uploaded entries are
								stored in a database along with optional note
								links. A dedicated route displays a table
								listing each PYQ's name, download link (PDF),
								and notes if available.
							</p>
						</li>
						<li className="border border-[#333] hover:border-gray-500 space-y-2.5 sm:space-y-4 p-5 sm:w-lg md:w-[18rem] xl:w-[20rem] md:h-[15rem] rounded-lg">
							<h3 className="text-[1em] xl:text-lg font-medium inline-flex gap-2 items-center">
								<Shield className="text-blue-500" />
								Role-Based User Access
							</h3>
							<p className="text-gray-400 text-sm xl:text-[1em]">
								Role verification is handled on both client and
								server sides to control access to different
								sections of the site. For example, only admins
								can upload new PYQs, while students can view and
								download them. This helps maintain secure and
								organized data access.
							</p>
						</li>
					</ul>
				</div>
			</main>

			<footer className="flex flex-col gap-0 px-12 py-6 border-t border-[#333]">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-20 my-6 ">
					<div className="flex flex-col gap-4">
						<h3 className="font-bold text-lg sm:text-xl">
							CS Department Site
						</h3>
						<p className="text-sm text-gray-400">
							A simple fullstack app to mimic a college site —
							built with the MERN stack.
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="font-bold text-lg sm:text-xl">
							Quick Links
						</h3>
						<ul className="flex gap-8 text-gray-400">
							<div className="flex flex-col gap-2">
								<li>
									<Link to="/login">User Login</Link>
								</li>
								<li>
									<Link to="/dashboard">User Dashboard</Link>
								</li>
								<li>
									<Link to="/signup">User Signup</Link>
								</li>
							</div>

							<div className="flex flex-col gap-2">
								<li>
									<Link to="/admin/login">Admin Login</Link>
								</li>
								<li>
									<Link to="/admin/dashboard">
										Admin Dashboard
									</Link>
								</li>
							</div>
						</ul>
					</div>

					<div id="contact" className="flex flex-col gap-2">
						<h3 className="font-bold text-lg sm:text-xl">
							Contact Us
						</h3>
						<div className="text-gray-400 flex flex-col gap-2">
							<p>
								Bankura Sammilani College, Kenduadihi, Bankura,
								West Bengal - 722102
							</p>
							<p>Email: arjunbanerjee13@gmail.com</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-center items-center gap-2 p-2 pt-8">
					<p className="text-gray-400 text-xs">
						Copyright &copy; {new Date().getFullYear()}{" "}
						<a
							href="https://github.com/arjun6757"
							className="hover:underline underline-offset-4"
						>
							Arjun Banerjee
						</a>
					</p>
					<span className="hidden sm:block text-gray-400 text-xs">
						{" "}
						|{" "}
					</span>

					<div className="flex gap-2">
						<p className="text-gray-400 text-xs">
							College website:
						</p>
						<a
							href="https://www.bankurasammilanicollege.net/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 text-xs hover:underline underline-offset-4"
						>
							Bankura Sammilani College
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
