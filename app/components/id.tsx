import React from "react";
import Link from "next/link";
import Image from "next/image";
import project01 from "../../public/img01.jpg";
import { RiRadioButtonFill } from "react-icons/ri";

const id = () => {
	return (
		<div className="w-full overflow-x-hidden">
			<div className="w-screen h-[30vh] lg:h-[40vh] relative overflow-y-hidden">
				<div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10 overflow-y-hidden" />
				<Image
					className="absolute z-[-1] object-cover"
					src={project01}
					alt="img"
				/>
				<div className="absolute top-[70%] max-w-[1000px] w-full left-[50%] -translate-x-1/2 -translate-y-1/2 text-white z-10 p-2">
					<h2 className="py-2">Property Finder</h2>
					<h3>React JS / Tailwind / Firebase </h3>
				</div>
			</div>
			<div className="max-w-[1000px] mx-auto p-2 grid md:grid-cols-5 gap-2 pt-8 ">
				<div className="col-span-4">
					<p>Project</p>
					<h2>Overview</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
						inventore id recusandae deleniti, aliquam veniam eveniet,
						necessitatibus ipsam molestias fuga error? Libero ipsum aut
						molestiae, tempore sunt placeat mollitia, id eos quam, tempora ea
						rerum. Maxime omnis ex nesciunt tempora officiis, odio sint
						veritatis fuga alias vero, eos nam eius.
					</p>
					<button className="px-8 py-2 mt-4 mr-8">DEMO</button>
					<button className="px-8 py-2 mt-4">CODE</button>
				</div>

				<div className="col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4">
					<div className="p-2">
						<p className="text-center font-bold pb-2">Technologies</p>
						<div className="grid gap-[auto] sm:grid-cols-3 md:grid-cols-1">
							<p className="text-gray-600 text-center uppercase py-2 flex items-center">
								<RiRadioButtonFill className="mr-1 " /> REACT
							</p>
							<p className="text-gray-600 text-center uppercase py-2 flex items-center">
								<RiRadioButtonFill className="mr-1 " /> tailwind
							</p>
							<p className="text-gray-600 text-center uppercase py-2 flex items-center">
								<RiRadioButtonFill className="mr-1 " /> javascript
							</p>
							<p className="text-gray-600 text-center uppercase py-2 flex items-center">
								<RiRadioButtonFill className="mr-1 " /> firebase
							</p>
							<p className="text-gray-600 text-center uppercase py-2 flex items-center">
								<RiRadioButtonFill className="mr-1 " /> google api
							</p>
							<p className="text-gray-600 text-center uppercase py-2 flex items-center">
								<RiRadioButtonFill className="mr-1 " /> zillow api
							</p>
						</div>
					</div>
				</div>
				<Link href="/">
					<p className="cursor-pointer underline uppercase">back</p>
				</Link>
			</div>
		</div>
	);
};

export default id;
