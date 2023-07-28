import Image from "next/image";
import skills from "./data/skill.json";

const Skills = () => {
	interface MySkills {
		id: number;
		img: string;
		skill: string;
	}
	return (
		<section id="skills" className="w-full lg:h-screen p-4">
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Skills
				</p>
				<h2 className="py-4">What I can do</h2>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{skills.map((skill: MySkills) => {
						return (
							<div
								key={skill.id}
								className="p-6 shadow-xl hover:scale-105 ease-in duration-300 rounded-xl">
								<div className="grid grid-cols-2 gap-4 justify-center items-center">
									<div className="m-auto">
										<Image
											src={skill.img}
											width="60"
											height="60"
											alt={skill.skill}
										/>
									</div>
									<div
										className="flex flex-col items-center justify-center
							">
										<h3 className="uppercase">{skill.skill}</h3>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Skills;
