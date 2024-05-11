import skills from "../../data/skill";
import { StaticImageData } from "next/image";
import Card from "../Card";

interface MySkills {
	id: number;
	img: StaticImageData;
	skillName: string;
}

const AllTechnologies = () => {
	return (
		<section id="AllTechnologies" className={"w-full  p-4"}>
			{/* <p className="text-xl tracking-widest uppercase text-[#5651e5]">
				Technologies
			</p> */}
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<div className="grid  gap-8">
					{skills.map((skill: MySkills) => {
						return (
							// <Card key={skill.id} imgProp={skill.img} text={skill.skillName} />
							<Card key={skill.id} text={skill.skillName} />
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AllTechnologies;
