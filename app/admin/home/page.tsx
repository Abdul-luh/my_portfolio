"use client";
import Navbar from "@/app/components/Navbar";
import AddProject from "@/app/components/adminComponents/AddProject/AddProject";
import AllProjects from "@/app/components/adminComponents/AllProjects/AllProjects";
import AllTechnologies from "@/app/components/adminComponents/AllTechnologies/AllTechnologies";
import AllCertificates from "@/app/components/adminComponents/AllCertificates/Allcertificates";
import React, { useState, useEffect } from "react";
import { HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2";

const AdminHome = () => {
	const slides = [
		AllProjects, //const AllProjects: () => JSX.Elemen,
		AllTechnologies, //const AllTechnologies: () => JSX.Elemen,
		AllCertificates, //const AllCertificates: () => JSX.Elemen,
	];
	const [currentSlide, setCurrentSlide] = useState(slides[0]);

	// ,
	// isActive: slides[0].isActive = true,

	// const [isActive, setIsActive] = useState((slides[0].isActive = false));

	const handleSlides = (item: number) => {
		setCurrentSlide(slides[item]);
		// isActive: (slides[item].isActive = true),
	};
	// useEffect(() => {
	// 	console.log(currentSlide);
	// });

	return (
		<div className="w-full h-screen">
			<Navbar />
			<div className="max-w-[1200px] grid pt-20 m-auto md:grid-cols-8">
				{/* ALL PROJECTS ON THE LEFT  */}
				<div className="md:col-span-3 w-full">
					<div className="mx-auto flex justify-between items-center p-4 gap-4 lg:overflow-x-scroll">
						<p
							className={
								currentSlide.props.id === "AllProjects"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleSlides(0)}>
							All Projects
						</p>
						<p
							className={
								currentSlide.props.id === "AllTechnologies"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleSlides(1)}>
							All Technologies
						</p>
						<p
							className={
								currentSlide.props.id === "AllCertificates"
									? "py-1 cursor-pointer font-semibold border-b border-b-[#5651e5]"
									: "py-1 cursor-pointer"
							}
							onClick={() => handleSlides(2)}>
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
								<p className="py-1" onClick={() => handleSlides(0)}>
									All Projects
								</p>
								<p className="py-1" onClick={() => handleSlides(1)}>
									All Technologies
								</p>
							</div>
						</div> */}
					</div>
					{currentSlide}
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
