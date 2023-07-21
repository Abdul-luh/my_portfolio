import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProjectItem = ({ title, bgImg, ProjectUrl, technologies }) => {
	return (
		<div className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-4 group hover:bg-gradient-to-r from-[#000000db] to-[#00000070]">
			<Image
				src={bgImg}
				className="rounded-xl group-hover:opacity-30"
				alt="product image"
			/>
			<div className="hidden group-hover:block absolute top-[50%] left-[50%] text-white translate-x-[-50%] translate-y-[-50%]">
				<h3 className="text-2xl tracking-widest text-center">{title}</h3>
				<p className="pb-4 pt-2 text-center">{technologies}</p>
				<Link href={ProjectUrl}>
					<p className="text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer">
						More Info
					</p>
				</Link>
			</div>
		</div>
	);
};

export default ProjectItem;
