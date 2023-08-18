"use client";
import React, { useState, useEffect } from "react";
import reactjs from "../../public/images/certificates/Reactjs-Certification_page-0001.jpg";
import introToHmtl from "../../public/images/certificates/Introduction to HTML_certificate.jpg";
import introToJs from "../../public/images/certificates/Introduction to JavaScript_certificate.jpg";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Certifucates = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const certificates = [
		{
			url: introToHmtl,
		},
		{
			url: introToJs,
		},
		{
			url: reactjs,
		},
	];

	const prevCert = () => {
		const isFirst = currentIndex === 0;
		const newIndex = isFirst ? certificates.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextCert = () => {
		const isLast = currentIndex === certificates.length - 1;
		const newIndex = isLast ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			nextCert();
		}, 5000);

		return () => clearInterval(intervalId);
	});

	return (
		<div className="max-w-[1000px] w-full m-auto px-4 py-16 relative">
			<p className="text-xl tracking-widest uppercase text-[#5651e5]">
				certificates
			</p>
			<h2 className="py-4">what I`ve achieved</h2>
			<div className="w-full h-full group rounded-2xl sm:px-14 md:px-36">
				<Image
					className="cursor-pointer w-full m-auto duration-500 ease-in-out"
					src={certificates[currentIndex].url}
					alt="something"
				/>
				{/* LEFT ARROW  */}
				<div
					onClick={prevCert}
					className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block ">
					<BsChevronCompactLeft size={30} />
				</div>
				{/* RIGHT ARROW  */}
				<div
					onClick={nextCert}
					className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block ">
					<BsChevronCompactRight size={30} />
				</div>

				{/* DOTS  */}
				<div className="flex top-4 items-center justify-center py-2">
					{certificates.map((cert, certIndex) => (
						<div
							onClick={() => setCurrentIndex(certIndex)}
							className="text-2xl p-2 cursor-pointer"
							key={certIndex}>
							<RxDotFilled size={currentIndex === certIndex ? 30 : 20} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Certifucates;
