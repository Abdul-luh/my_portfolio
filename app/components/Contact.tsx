import React from "react";
import Image from "next/image";
import Link from "next/link";
import img02 from "../../public/work-by-window.jpg";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";

const Contact = () => {
	return (
		<section id="contact" className="w-full lg:h-screen">
			<div className="max-w-[1000px] m-auto px-2 py-16 w-full">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Contact
				</p>
				<h2 className="py-4">Get In Touch</h2>

				<div className="grid md:grid-cols-5 gap-8">
					{/* LEFT  */}
					<div className="col-span-3 md:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl p-4">
						<div className="lg:p-4 h-full">
							<div>
								<Image
									src={img02}
									className="hover:scale-105 ease-in duration-300 rounded-xl"
									alt=""
								/>
							</div>
							<div>
								<h2 className="text-2xl md:text-3Zxl py-2">Abdullah Odulate</h2>
								<p className="py-4">Front-End Developer</p>
								<p className="py-2">
									I am available for freelance or full-time positions. Contact
									me and let`s talk.
								</p>
							</div>
							<div>
								<p className="uppercase pt-8">CONNECT ME WITH</p>
								<div className="flex justify-between py-4 items-center">
									<div className="rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 ">
										<FaLinkedinIn />
									</div>
									<div className="rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 ">
										<FaGithub />
									</div>
									<div className="rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 ">
										<AiOutlineMail />
									</div>
									<div className="rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 ">
										<BsFillPersonLinesFill />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* RIGHT  */}

					<div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
						<div className="p-4">
							<form>
								<div className="grid md:grid-cols-2 gap-4 w-full py-2">
									<div className="flex flex-col">
										<label htmlFor="" className="uppercase text-sm py-2">
											Name
										</label>
										<input
											type="text"
											className="border-2 border-gray-300 rounded-lg p-3 flex"
										/>
									</div>
									<div className="flex flex-col">
										<label htmlFor="" className="uppercase text-sm py-2">
											Phone Number
										</label>
										<input
											type="number"
											className="border-2 border-gray-300 rounded-lg p-3 flex"
										/>
									</div>
								</div>
								<div className="flex flex-col py-2">
									<label htmlFor="" className="uppercase text-sm py-2 flex">
										Email
									</label>
									<input
										type="email"
										className="border-2 rounded-lg p-3 flex border-gray-300"
									/>
								</div>
								<div className="flex flex-col py-2">
									<label htmlFor="" className="uppercase text-sm py-2 flex">
										Subject
									</label>
									<input
										type="text"
										className="border-2 rounded-lg p-3 flex border-gray-300"
									/>
								</div>
								<div className="flex flex-col py-2">
									<label htmlFor="" className="uppercase text-sm py-2 flex">
										Subject
									</label>
									<textarea
										className="border-2 rounded-lg p-3 border-gray-300"
										name=""
										id=""
										rows={10}></textarea>
								</div>
								<button className="w-full p-4 text-gray-100 mt-4">
									Send Message
								</button>
							</form>
						</div>
					</div>
				</div>
				<div className="flex justify-center items-center py-12">
					<Link href="#hero">
						<div className="rounded-full shadow-xl shadow-gray-400 cursor-pointer hover:scalw-105 ease-in duration-300 p-6 ">
							<HiOutlineChevronDoubleUp size={30} className="text-[#5651e5]" />
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Contact;
