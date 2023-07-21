import React from "react";
import Image from "next/image";
const About = () => {
	return (
		<section
			id="about"
			className="w-full md:h-screen p-4 flex items-center py-16">
			<div className="max-w-[1000px] m-auto md:grid grid-cols-3 gap-0">
				<div className="col-span-2">
					<p className="uppercase text-xl tracking-widest text-[#5651e5]">
						About
					</p>
					<h2 className="py-4">Who I am</h2>
					<p className="py-2 text-gray-600">I am not your normal developer</p>
					<p className="py-2 text-gray-600">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit magni
						voluptatem officiis repudiandae praesentium molestiae voluptate
						nesciunt, perspiciatis, ab cum odio tempora aperiam molestias
						doloremque tempore possimus voluptates? Sed eius ut quibusdam quis
						labore deserunt aperiam maiores eos ipsum sequi commodi consequatur
						enim nam esse doloribus nihil et, fugiat minus.
					</p>
					<p className="py-2 text-gray-600">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
						voluptatum maiores sed magnam nemo voluptates quam minima! Libero
						expedita neque, ex repellat consequuntur blanditiis voluptate fuga
						nam pariatur. Quia iure consequatur aliquid corporis officia
						exercitationem quam nihil, provident voluptate animi! Quibusdam
						consequuntur distinctio, asperiores officia fugiat perferendis
						deserunt aperiam suscipit.
					</p>
					<p className="py-2 underline cursor-pointer text-gray-600">
						Check out som of my lates projects
					</p>
				</div>
				<div className="p-2 w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center hover:scale-105 ease-in duration-300">
					<Image
						src="/../public/assets/images/img01.jpeg"
						width="900"
						height="900"
						className="rounded-xl"
						alt="image"
					/>
				</div>
			</div>
		</section>
	);
};

export default About;
