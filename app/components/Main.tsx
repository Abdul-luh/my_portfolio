import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const Main = () => {
	return (
		<section id="hero" className="w-full h-screen text-center">
			<div className="max-w-[1240px] w-full h-full mx-auto flex justify-center items-center">
				<div>
					<p className="uppercase text-sm tracking-widest text-gray-600 dark:text-gray-400">
						LET`S BUILD SOMETHING TOGETHER
					</p>
					<h1 className="py-4 text-gray-700 dark:text-gray-300 ">
						Hi, I`m <span className="text-[#5651e5]">Abdullah</span>
					</h1>
					<h1 className="py-2  text-gray-700 dark:text-gray-300">
						A front-end Developer
					</h1>
					<p className="py-4  text-gray-700 dark:text-gray-300 max-w-[70%] m-auto">
						I`m a front-end web developer specializing in building exceptional
						digital experinces. Currently, I`m focused on building responsive
						front-end web applications while learning backend-technologies
					</p>

					<div className="flex justify-between items-center py-4 w-[330px] m-auto">
						<div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300 ">
							<Link
								target="_blank"
								href="https://www.linkedin.com/in/abdullah-odulate-a0264024b/">
								<FaLinkedinIn />
							</Link>
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300 ">
							<Link target="_blank" href="https://github.com/Abdul-luh">
								<FaGithub />
							</Link>
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300 ">
							<Link target="_blank" href="mailto:abdulluhodulate@gmail.com">
								<AiOutlineMail />
							</Link>
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300 ">
							<Link target="_blank" href="tel:+2347033824496">
								<BsFillPersonLinesFill />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Main;
