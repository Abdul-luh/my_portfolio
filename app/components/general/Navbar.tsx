"use client";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const [navbg, setNavBg] = useState({
		dark: "var(--bg-dark)",
		light: "var(--bg-light)",
	});
	const [linkColor, setLinkColor] = useState({
		dark: "#eee",
		light: "#333",
	});
	const pathname = usePathname();

	useEffect(() => {
		if (pathname !== "/" && pathname !== "/projects-page") {
			setNavBg((w) => ({ ...w, light: "transparent" }));
			setLinkColor((w) => ({ ...w, light: "#f8f8f8" }));
		}
		// console.log(pathname);
	}, [pathname]);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<nav
			className={`bg-[${navbg.light}] dark:bg-[${navbg.dark}] fixed w-full h-20 shadow-xl z-[100] px-5`}>
			<div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
				{/* LOGO */}
				<div className="logo">
					<Link href={"/"}>
						<h4 className="logo-text">
							Abdullah
							<span className="logo-span">.dev</span>
						</h4>
					</Link>
				</div>
				<div>
					<ul className="hidden md:flex">
						<Link
							style={{
								color: `${linkColor}`,
							}}
							href="/#about">
							<li className="ml-10 text-sm uppercase hover:border-b">About</li>
						</Link>
						<Link
							style={{
								color: `${linkColor}`,
							}}
							href="/#skills">
							<li className="ml-10 text-sm uppercase hover:border-b">Skills</li>
						</Link>
						<Link
							style={{
								color: `${linkColor}`,
							}}
							href="/projects-page">
							<li className="ml-10 text-sm uppercase hover:border-b">
								Projects
							</li>
						</Link>
						<Link
							style={{
								color: `${linkColor}`,
							}}
							href="/#contact">
							<li className="ml-10 text-sm uppercase hover:border-b">
								Contact
							</li>
						</Link>
						<Link
							style={{
								color: `${linkColor}`,
							}}
							href="/admin/home">
							<li className="ml-10 text-sm uppercase hover:border-b">Admin</li>
						</Link>
					</ul>
					<div
						style={{
							color: `${linkColor}`,
						}}
						onClick={handleNav}
						className="md:hidden cursor-pointer">
						<AiOutlineMenu size={25} />
					</div>
				</div>
			</div>

			<div
				className={
					nav ? "fixed top-0 left-0 w-full h-screen bg-black/70 md:hidden" : ""
				}>
				<div onClick={handleNav} className="h-full w-full"></div>
				<div
					className={
						nav
							? "fixed top-0 left-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen dark:bg-[var(--bg-dark)] bg-[var(--bg-light)] p-10 ease-in duration-500 md:hidden"
							: "fixed md:hidden top-0 left-[-100%] w-[75%] sm:w-[60%] md:w-[45%] h-screen  dark:bg-[var(--bg-dark)] bg-[var(--bg-light)]  p-10 ease-in duration-500"
					}>
					<div className="flex justify-between w-full items-center">
						<div className="logo">
							<Link href={"/#hero"}>
								<h4 className="logo-text">
									Abdullah
									<span className="logo-span">.dev</span>
								</h4>
							</Link>
						</div>
						<div
							onClick={handleNav}
							className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-3 cursor-pointer">
							<AiOutlineClose />
						</div>
					</div>
					<div className="border-b border-gray-300 my-4">
						<p className="w-[85%] md:w-[90%] py-4">
							Let`s Build something legandary together
						</p>
					</div>

					<div className="py-3 flex flex-col">
						<ul className="uppercase">
							<Link href="/#about">
								<li onClick={handleNav} className="py-4 text-sm">
									About
								</li>
							</Link>
							<Link href="/#skills">
								<li onClick={handleNav} className="py-4 text-sm">
									Skills
								</li>
							</Link>
							<Link href="/projects-page">
								<li onClick={handleNav} className="py-4 text-sm">
									Projects
								</li>
							</Link>
							<Link href="/#contact">
								<li onClick={handleNav} className="py-4 text-sm">
									Contact
								</li>
							</Link>
							<Link href="/admin/home">
								<li onClick={handleNav} className="py-4 text-sm">
									Admin
								</li>
							</Link>
						</ul>

						<div className="pt-3">
							<p className="tracking-widest text-[#5651e5]">let`s Connect</p>
							<div className="flex justify-between items-center my-4 w-full sm:w-[60%]">
								<div className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ">
									<Link href="https://www.linkedin.com/in/abdullah-odulate-a0264024b/">
										<FaLinkedinIn />
									</Link>
								</div>
								<div className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ">
									<Link href="https://github.com/Abdul-luh">
										<FaGithub />
									</Link>
								</div>
								<div className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ">
									<Link href="mailto:abdulluhodulate@gmail.com">
										<AiOutlineMail />
									</Link>
								</div>
								<div className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ">
									<Link href="tel:+2347044824496">
										<BsFillPersonLinesFill />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
