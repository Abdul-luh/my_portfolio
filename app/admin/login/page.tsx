"use client";
import InputComponent from "@/app/components/InputField";
import React, { useContext } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { AdminAuthContext } from "@/app/context/AdminAuth";

export default function Login() {
	const { handleSubmit, handleChange, input } = useContext(AdminAuthContext);
	return (
		<div className="flex relative overflow-x-hidden flex-col uppercase justify-center items-center w-full h-screen">
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-20 mr-64 w-20 rounded-full h-20 absolute -z-10"></div>
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-2 w-20 ml-48 rounded-full h-20 absolute -z-10"></div>
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-8 mt-72 w-10 rounded-full h-10 absolute -z-10"></div>
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-8 mt-50 mr-64 w-10 rounded-full h-10 absolute -z-10"></div>
			<div className="border-[#5651e5] blur-[1px] opacity border-16 mr-64 mb-72 w-40 rounded-full h-40 absolute"></div>

			<div className="border-[#5651e5] blur-[1px] opacity-50 border-8 ml-48 mt-72 w-64 rounded-full h-64 absolute "></div>
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-8 ml-64 mb-64 w-36 rounded-full h-36 absolute -z-10"></div>
			<form
				onSubmit={handleSubmit}
				className="backdrop-blur-sm flex flex-col rounded-2xl px-2 py-4 bg-white/30"
				action="">
				<h1 className="text-3xl tracking-widest uppercase text-[#5651e5]">
					Login
				</h1>
				<InputComponent
					htmlLabelFor="email"
					inputType="email"
					htmlLabel="email"
					inputValue={input.email}
					setValue={handleChange}
				/>
				<InputComponent
					htmlLabelFor="password"
					inputType="password"
					inputValue={input.password}
					htmlLabel="password"
					setValue={handleChange}
				/>
				<button
					type="submit"
					className="p-2 my-2 text-[#5651e5] hover:bg-[#5651e5] hover:text-white">
					submit
				</button>
				<div className="bg-white rounded-full flex items-center p-4 mt-2 hover:w-36 w-12 h-12 relative cursor-pointer text-[#5651e5] group duration-200">
					<Link href={"/"}>
						<FaArrowLeft className="group-hover:hidden durartion-500" />{" "}
						<p className="hidden w-36 group-hover:block duration-500">
							back home
						</p>
					</Link>
				</div>
			</form>
		</div>
	);
}
