"use client";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useState } from "react";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<nav className="fixed w-full h-20 bg-white shadow-xl z-[100] px-5 ">
			<div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
				{/* <Image src={} width={} height={} alt=""/> */}
				<div className="logo">
					<Link href={"/#hero"}>
						<h4 className="logo-text">
							Abdullah
							<span className="logo-span">.dev</span>
						</h4>
					</Link>
				</div>
				<div>
					{/* <Icon icon="ep:menu" /> */}
					<ul className="hidden md:flex">
						{/* <Link href="/#hero">
							<li className="ml-10 text-sm uppercase hover:border-b">Home</li>
						</Link> */}
						<Link href="/#about">
							<li className="ml-10 text-sm uppercase hover:border-b">About</li>
						</Link>
						<Link href="/#skills">
							<li className="ml-10 text-sm uppercase hover:border-b">Skills</li>
						</Link>
						<Link href="/#projects">
							<li className="ml-10 text-sm uppercase hover:border-b">
								Projects
							</li>
						</Link>
						<Link href="/#contact">
							<li className="ml-10 text-sm uppercase hover:border-b">
								Contact
							</li>
						</Link>
					</ul>
					<div onClick={handleNav} className="md:hidden">
						<AiOutlineMenu size={25} />
					</div>
				</div>
			</div>

			<div
				className={
					nav ? "fixed top-0 left-0 w-full h-screen bg-black/70 md:hidden" : ""
				}>
				<div
					className={
						nav
							? "fixed top-0 left-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500 md:hidden"
							: "fixed md:hidden top-0 left-[-100%] w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
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
							className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
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
							{/* <Link href="#hero">
								<li className="py-4 text-sm">Home</li>
							</Link> */}
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
							<Link href="/#projects">
								<li onClick={handleNav} className="py-4 text-sm">
									Projects
								</li>
							</Link>
							<Link href="/#contact">
								<li onClick={handleNav} className="py-4 text-sm">
									Contact
								</li>
							</Link>
						</ul>

						<div className="pt-24">
							<p className="tracking-widest text-[#5651e5]">let`s Connect</p>
							<div className="flex justify-between items-center my-4 w-full sm:w-[60%]">
								<div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ">
									<FaLinkedinIn />
								</div>
								<div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ">
									<FaGithub />
								</div>
								<div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ">
									<AiOutlineMail />
								</div>
								<div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ">
									<BsFillPersonLinesFill />
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
