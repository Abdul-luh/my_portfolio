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
						Aspiring frontend developer with a solid grasp of modern web
						technologies, including React, Tailwind CSS, and Next.js. Eager to
						apply my knowledge and build real-world projects to gain hands-on
						experience. Passionate about creating user-friendly interfaces and
						continuously enhancing my skills. Excited to contribute my
						enthusiasm and dedication to collaborative development teams.
					</p>
					<p className="py-2 text-gray-600">
						My dedication to honing my frontend skills and eagerness to apply
						them in real-world projects is truly commendable. My passion for
						crafting user-friendly interfaces reflects a deep understanding of
						the end-users` needs. My drive to continuously enhance my expertise
						showcases a growth mindset, which is invaluable in the ever-evolving
						tech industry. My enthusiasm and commitment to collaborative
						teamwork will undoubtedly make you a valuable asset to any
						development team. Keep shining and soaring high on my journey to
						frontend excellence! 🚀✨
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
