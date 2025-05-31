import { Link } from "react-router-dom";
import Carousel from "./carousel.jsx";
import {
	ChevronRight,
	Menu,
	Shield,
	UploadCloud,
	UserCheck,
} from "lucide-react";
import * as Icons from "./svg/index";
import { useState } from "react";

export default function Index() {
	const [isHidden, setIsHidden] = useState(true);
	const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

	const images = [
		{ src: "/images/department-1.jpg", alt: "department room" },
		{ src: "images/bora-bora.jpg", alt: "bora" },
		{ src: "images/ocean.jpg", alt: "ocean" },
		{ src: "images/sunrise.jpg", alt: "sunrise" },
	];

	return (
		<div className="min-h-screen text-sm text-gray-700">
			<header>
				<nav className="p-4 flex flex-col gap-2 bg-[#212121] text-gray-100">
					<button
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
								<a href="#features">About</a>
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
								<ul className="lg:absolute lg:left-0 lg:bg-white lg:text-gray-800 p-2 pl-6 lg:p-4 lg:rounded-md lg:shadow-md lg:z-10 flex flex-col gap-2">
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
									className="p-2 bg-blue-500 hover:opacity-90 active:opacity-80 rounded text-white"
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

				<div className="">
					<Carousel images={images} />
				</div>
			</header>

			<main className="my-6">
				<div
					id="home"
					className="my-[5rem] w-xs md:w-lg lg:w-4xl mx-auto flex flex-col gap-2 sm:gap-5 p-8 "
				>
					<h1 className="text-xl sm:text-2xl font-bold text-center ">
						Introduction
					</h1>
					<p className="text-gray-500 text-sm">
						A simple solution for students and faculty to access
						academic resources, manage attendance, and securely
						upload or download past question papers — built with the
						MERN stack.
					</p>
				</div>

				<div
					id="features"
					className="mt-[5rem] flex flex-col gap-1 items-center px-4 py-12 bg-gray-100"
				>
					<h2 className="text-lg sm:text-xl font-bold">Features</h2>

					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 sm:gap-8 xl:gap-20 mt-8 xl:p-4">
						<li className="space-y-2.5 sm:space-y-4 p-5 w-[18rem] xl:w-[20rem] h-[15rem] rounded-lg bg-white shadow-custom">
							<h3 className="text-[1em] xl:text-lg font-medium inline-flex gap-2 items-center">
								<UserCheck className="text-blue-500" />
								Online Attendance System
							</h3>
							<p className="text-gray-600 text-sm xl:text-[1em]">
								A planned system to manage and track student
								attendance online. Will include a role-based
								login for students and faculty, allowing faculty
								to mark attendance and students to view their
								records. The implementation will be handled on
								both the client and server side.
							</p>
						</li>
						<li className="space-y-2.5 sm:space-y-4 p-5 w-[18rem] xl:w-[20rem] h-[15rem] rounded-lg bg-white shadow-custom">
							<h3 className="text-[1em] xl:text-lg font-medium inline-flex gap-2 items-center">
								<UploadCloud className="text-blue-500" />
								Easily Upload & Get PYQs
							</h3>
							<p className="text-gray-600 text-sm xl:text-[1em]">
								Users can upload and download previous year
								question papers (PYQs). Uploaded entries are
								stored in a database along with optional note
								links. A dedicated route displays a table
								listing each PYQ's name, download link (PDF),
								and notes if available.
							</p>
						</li>
						<li className="space-y-2.5 sm:space-y-4 p-5 w-[18rem] xl:w-[20rem] h-[15rem] rounded-lg bg-white shadow-custom">
							<h3 className="text-[1em] xl:text-lg font-medium inline-flex gap-2 items-center">
								<Shield className="text-blue-500" />
								Role-Based User Access
							</h3>
							<p className="text-gray-600 text-sm xl:text-[1em]">
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

				<div
					id="tech-stack"
					className="flex flex-col gap-8 items-center py-12"
				>
					<h2 className="text-lg sm:text-xl font-bold ">
						Tech Stack
					</h2>

					<div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-5 md:gap-6 xl:gap-10">
						{Icons.svgIcons.map(
							({ name, component: Component }) => (
								<Component
									key={name}
									className="w-10 h-10 sm:w-12 sm:h-12 border border-[#ddd] p-2 rounded-lg shadow-xs select-none"
								/>
							),
						)}
					</div>
				</div>
			</main>

			<footer className="flex flex-col gap-0 bg-[#171717] text-gray-300 px-12 py-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-20 my-6 ">
					<div className="flex flex-col gap-4">
						<h3 className="font-bold text-lg sm:text-xl">
							CS Department Site
						</h3>
						<p className="text-xs">
							A place exclusively for the cs department of Bankura
							Sammilani College.
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="font-bold text-lg sm:text-xl">
							Quick Links
						</h3>
						<ul className="flex gap-8">
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
						<div>
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
						<a href="https://github.com/arjun6757" className="hover:underline underline-offset-4">Arjun Banerjee</a>
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
