"use client";
import Navbar from "@/app/components/Navbar";
import AddProject from "@/app/components/adminComponents/AddProject/AddProject";
import AllProjects from "@/app/components/adminComponents/AllProjects/AllProjects";
import AllTechnologies from "@/app/components/adminComponents/AllTechnologies/AllTechnologies";
import AllCertificates from "@/app/components/adminComponents/AllCertificates/Allcertificates";
import React, { useState, useEffect } from "react";
import { HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2";
import AddCertificate from "@/app/components/adminComponents/AddCertificate/AddCertificate";
import AddTechnology from "@/app/components/adminComponents/AddTecnology/AddTechnology";

const AdminHome = () => {
	const leftSlide = [
		<AllProjects key={"AllProjects"} />,
		<AllTechnologies key={"AllTechnologies"} />,
		<AllCertificates key={"AllCertificates"} />,
	];

	const rightSlider = [
		<AddProject key={"AddProject"} />,
		<AddTechnology key={"AddTechnology"} />,
		<AddCertificate key={"AddCertificate"} />,
	];

	const [currentLeftSlides, setCurrentLeftSlides] = useState(leftSlide[0]);
	const [currentRightSlide, setCurrentRightSlide] = useState(rightSlider[0]);

	const handleLeftSlides = (item: number) => {
		return setCurrentLeftSlides(leftSlide[item]);
	};

	const handleRightSlides = (item: number) => {
		return setCurrentRightSlide(rightSlider[item]);
	};

	// useEffect(() => {
	// 	console.log(currentLeftSlides);
	// });

	return (
		<div className="w-full h-screen">
			<Navbar />
			<div className="max-w-[1200px] grid pt-20 m-auto md:grid-cols-8">
				{/* ALL PROJECTS ON THE LEFT  */}
				<div
					className="md:col-span-3 w-full max-h-screen overflow-y-scroll
				">
					<div className="mx-auto flex justify-between items-center max-w-2xl p-4 gap-4 lg:overflow-x-scroll text-center">
						<p
							className={
								currentLeftSlides.key === "AllProjects"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleLeftSlides(0)}>
							All Projects
						</p>
						<p
							className={
								currentLeftSlides.key === "AllTechnologies"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleLeftSlides(1)}>
							All Technologies
						</p>
						<p
							className={
								currentLeftSlides.key === "AllCertificates"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleLeftSlides(2)}>
							All Certificates
						</p>
						{/* <div onClick={handleNavdrop} className="py-4 relative text-4xl">
							{navdrop ? <HiMiniBarsArrowUp /> : <HiMiniBarsArrowDown />}
							<div
								className={
									navdrop
										? "fixed block min-w-40 -ml-36 p-4 text-center text-lg shadow-xl bg-[#ecf0f3] rounded-xl"
										: "hidden"
								}>
								<p className="py-1" onClick={() => handleLeftSlides(0)}>
									All Projects
								</p>
								<p className="py-1" onClick={() => handleLeftSlides(1)}>
									All Technologies
								</p>
							</div>
						</div> */}
					</div>
					{currentLeftSlides}
				</div>

				{/* RIGHT SECTION  */}
				<div
					className="w-full md:col-span-5 max-h-screen overflow-y-scroll
				 ">
					<div className="mx-auto flex justify-between items-center p-4 gap-4 max-w-[450px] text-center">
						<p
							className={
								currentRightSlide.key === "AddProject"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleRightSlides(0)}>
							Add Projects
						</p>
						<p
							className={
								currentRightSlide.key === "AddTechnology"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleRightSlides(1)}>
							Add Technologies
						</p>
						<p
							className={
								currentRightSlide.key === "AddCertificate"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleRightSlides(2)}>
							Add Certificates
						</p>
					</div>

					{currentRightSlide}
				</div>
			</div>
		</div>
	);
};

export default AdminHome;
