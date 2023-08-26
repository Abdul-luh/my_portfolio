"use client";
import Navbar from "@/app/components/Navbar";
import AddProject from "@/app/components/adminComponents/AddProject/AddProject";
import AllTechnologies from "@/app/components/adminComponents/AllTechnologies/AllTechnologies";
import Link from "next/link";
import React, { useState } from "react";
import { HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2";

const AdminHome = () => {
	const [navdrop, setNavdrop] = useState(false);

	const handleNavdrop = () => {
		setNavdrop(!navdrop);
	};
	return (
		<div className="w-full h-screen">
			<Navbar />
			<div className="max-w-[1024px] grid pt-20  md:grid-cols-8">
				{/* ALL PROJECTS ON THE LEFT  */}
				<div className="md:col-span-3 w-full">
					<div className="mx-auto flex justify-between items-center px-4">
						<p className="text-xl tracking-widest uppercase text-[#5651e5]">
							Technologies
						</p>
						<div onClick={handleNavdrop} className="py-4 relative text-4xl">
							{navdrop ? <HiMiniBarsArrowUp /> : <HiMiniBarsArrowDown />}
							<div
								className={
									navdrop
										? "fixed block min-w-40 -ml-36 p-2 text-center text-lg shadow-xl bg-[#ecf0f3] rounded-xl"
										: "hidden"
								}>
								<p>
									<Link href={"/admin/home/#AllTechnologies"}>
										All Projects
									</Link>
								</p>
								<p>
									<Link href={"/admin/home/#AllProjects"}>
										All Technologies
									</Link>
								</p>
							</div>
						</div>
					</div>

					<AllTechnologies />
				</div>
				{/* RIGHT SECTION ON THE LEFT  */}
				<div className="w-full md:col-span-5 ">
					<div>
						<div></div>
					</div>
					<AddProject />
				</div>
			</div>
		</div>
	);
};

export default AdminHome;
