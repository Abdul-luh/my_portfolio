"use client";
import InputComponent from "@/app/components/InputField";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { AdminAuthContext } from "@/app/context/AdminAuth/AdminAuth";
import Toast from "@/app/components/adminComponents/Toast";
import { useRouter } from "next/navigation";

export default function Login() {
	const auth = useContext(AdminAuthContext)!;
	const { handleLoginSubmit, handleChange, input, err, setErr } = auth;
	const router = useRouter();

	// Clean up any sensitive query params that may have leaked into the URL bar from native GET submission
	useEffect(() => {
		if (typeof window !== "undefined" && window.location.search) {
			router.replace("/admin/login");
		}
	}, [router]);

	return (
		<div className="flex relative overflow-x-hidden flex-col uppercase justify-center items-center w-full h-screen p-4">
			{err && (
				<Toast
					type="error"
					message={err}
					onClose={() => setErr(null)}
					duration={3000}
				/>
			)}

			<div className="border-[#5651e5] blur-[1px] opacity-50 border-20 mr-64 w-20 rounded-full h-20 absolute -z-10"></div>
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-2 w-20 ml-48 rounded-full h-20 absolute -z-10"></div>
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-8 mt-72 w-10 rounded-full h-10 absolute -z-10"></div>
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-8 mt-50 mr-64 w-10 rounded-full h-10 absolute -z-10"></div>
			<div className="border-[#5651e5] blur-[1px] opacity border-16 mr-64 mb-72 w-40 rounded-full h-40 absolute"></div>

			<div className="border-[#5651e5] blur-[1px] opacity-50 border-8 ml-48 mt-72 w-64 rounded-full h-64 absolute "></div>
			<div className="border-[#5651e5] blur-[1px] opacity-50 border-8 ml-64 mb-64 w-36 rounded-full h-36 absolute -z-10"></div>

			<form
				onSubmit={handleLoginSubmit}
				method="POST"
				className="backdrop-blur-sm flex flex-col rounded-2xl p-6 sm:p-8 bg-white/40 dark:bg-gray-800/40 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-sm sm:max-w-md z-10"
			>
				<h1 className="text-3xl tracking-widest uppercase text-[#5651e5] mb-4 text-center">
					Login
				</h1>

				{err && (
					<div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 text-xs sm:text-sm font-semibold text-center normal-case">
						{err}
					</div>
				)}

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
					className="p-3 my-4 font-semibold text-white rounded-xl shadow-lg transition-all hover:opacity-90 cursor-pointer"
				>
					submit
				</button>
				<div className="bg-white dark:bg-gray-700 rounded-full flex items-center p-3 mt-2 hover:w-36 w-12 h-12 relative cursor-pointer text-[#5651e5] dark:text-[#709dff] group duration-200 shadow-md">
					<Link href={"/"}>
						<FaArrowLeft className="group-hover:hidden duration-500" />{" "}
						<p className="hidden w-36 group-hover:block duration-500 text-xs font-semibold">
							back home
						</p>
					</Link>
				</div>
			</form>
		</div>
	);
}
