import skills from "../../data/skill";
import { StaticImageData } from "next/image";
import Card from "../Card";

interface MySkills {
	id: number;
	img: StaticImageData;
	skill: string;
}

const AllTechnologies = () => {
	return (
		<section id="AllTechnologies" className="w-full lg:h-screen p-4">
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<div className="grid  gap-8">
					{skills.map((skill: MySkills) => {
						return (
							<Card key={skill.id} imgProp={skill.img} text={skill.skill} />
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AllTechnologies;
