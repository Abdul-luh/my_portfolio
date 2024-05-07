import skills from "./data/skill";
import { StaticImageData } from "next/image";
import SkillsCard from "./SkillsCard";

interface MySkills {
	id: number;
	img: StaticImageData;
	skillName: string;
}

const Skills = () => {
	return (
		<section id="skills" className="w-full lg:h-screen p-4">
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Skills
				</p>
				<h2 className="py-4">What I can do</h2>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* When a skill is clicked link to  projects that this skill was used  */}
					{skills.map((skill: MySkills) => {
						return (
							<SkillsCard
								key={skill.id}
								imgProp={skill.img}
								text={skill.skillName}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Skills;
