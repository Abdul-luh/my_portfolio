import React from "react";
import Image from "next/image";

const Skills = () => {
	return (
		<section id="skills" className="w-full lg:h-screen p-4">
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Skills
				</p>
				<h2 className="py-4">What I can do</h2>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* HTML SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/html.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>HTML</h3>
							</div>
						</div>
					</div>

					{/* CSS SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/css3.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>CSS</h3>
							</div>
						</div>
					</div>
					{/* JAVASCRIPT SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/javascript.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>JAVASCRIPT</h3>
							</div>
						</div>
					</div>

					{/* REACT SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/react.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>REACT</h3>
							</div>
						</div>
					</div>

					{/* TAILWIND SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/tailwind.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>TAILWIND</h3>
							</div>
						</div>
					</div>

					{/* SASS SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/sass.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>SASS</h3>
							</div>
						</div>
					</div>

					{/* GIT SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/git.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>GIT</h3>
							</div>
						</div>
					</div>

					{/* GITHUB SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/github.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>GITHUB</h3>
							</div>
						</div>
					</div>

					{/* TYPESCRIPT SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/typescript.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>TYPESCRIPT</h3>
							</div>
						</div>
					</div>

					{/* NEXT.JS SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/next-js.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>NEXT.JS</h3>
							</div>
						</div>
					</div>

					{/* MYSQL SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/mysql.png"
									width="80"
									height="80"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>MYSQL</h3>
							</div>
						</div>
					</div>

					{/* REACT-TESTING LIBRARY SKILL CARD */}
					<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
						<div className="grid grid-cols-2 gap-4 justify-center items-center">
							<div className="m-auto">
								<Image
									src="/../public/assets/images/react-testing-library.png"
									width="60"
									height="60"
									alt="html png"
								/>
							</div>
							<div className="flex flex-col items-center justify-center">
								<h3>REACT-TESTING LIBRARY</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Skills;
