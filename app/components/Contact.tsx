"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import img02 from "../../public/images/work-by-window.jpg";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import InputComponent from "./InputField";

const Contact = () => {
	const [textInputValue, setTextInputValue] = useState({
		name: "",
		phoneNumber: "",
		email: "",
		subject: "",
	});
	const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTextInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<section id="contact" className="w-full lg:h-screen">
			<div className="max-w-[1000px] m-auto px-2 py-16 w-full">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Contact
				</p>
				<h2 className="py-4">Get In Touch</h2>

				<div className="grid md:grid-cols-5 gap-8">
					{/* LEFT  */}
					<div className="col-span-3 md:col-span-2 w-full h-full shadow-xl  dark:shadow-gray-700 shadow-gray-400 rounded-xl p-4">
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
									<div className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 ">
										<Link
											target="_blank"
											href="https://www.linkedin.com/in/abdullah-odulate-a0264024b/">
											<FaLinkedinIn />
										</Link>
									</div>
									<div className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 ">
										<Link target="_blank" href="https://github.com/Abdul-luh">
											<FaGithub />
										</Link>
									</div>
									<div className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 ">
										<Link
											target="_blank"
											href="mailto:abdulluhodulate@gmail.com">
											<AiOutlineMail />
										</Link>
									</div>
									<div className="rounded-full shadow-lg dark:shadow-gray-700 shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300 ">
										<Link target="_blank" href="tel:+2347033824496">
											<BsFillPersonLinesFill />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* RIGHT  */}

					<div className="col-span-3 w-full h-auto shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl lg:p-4">
						<div className="p-4">
							<form>
								<div className="grid md:grid-cols-2 gap-4 w-full py-2">
									<InputComponent
										htmlLabelFor="name"
										inputType="text"
										htmlLabel="name"
										inputValue={textInputValue.name}
										setValue={handleTextInput}
									/>
									<InputComponent
										htmlLabelFor="phoneNumber"
										inputType="number"
										htmlLabel="phone number"
										inputValue={textInputValue.phoneNumber}
										setValue={handleTextInput}
									/>
								</div>
								<InputComponent
									htmlLabelFor="email"
									inputType="email"
									htmlLabel="Email"
									inputValue={textInputValue.email}
									setValue={handleTextInput}
								/>
								<InputComponent
									htmlLabelFor="subject"
									inputType="text"
									htmlLabel="Subject"
									inputValue={textInputValue.subject}
									setValue={handleTextInput}
								/>
								<div className="flex flex-col py-2">
									<label
										htmlFor="emailBody"
										className="uppercase text-sm py-2 flex">
										Message
									</label>
									<textarea
										className="border-2 rounded-lg p-3 border-gray-300"
										name="emailBody"
										id="emailBody"
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
						<div className="rounded-full shadow-xl shadow-gray-400 dark:shadow-gray-700 cursor-pointer hover:scalw-105 ease-in duration-300 p-6 ">
							<HiOutlineChevronDoubleUp size={30} className="text-[#5651e5]" />
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Contact;
