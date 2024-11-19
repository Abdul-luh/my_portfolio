"use client";
import skills from "../data/skill";
import { StaticImageData } from "next/image";
import SkillsCard from "./SkillsCard";
import { AppDistpatch, useAppSelector } from "@/app/redux/store";
import useFetchEffect from "@/app/utils/fetchTechnologies";
import { fetchTechnologies } from "@/app/redux/features/technology";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface MySkills {
	id: number;
	img: string;
	skillName: string;
}

const Skills = () => {
	const { technologies } = useAppSelector((state) => state.TechnologyReducer);
	console.log(technologies);
	const dispatch = useDispatch<AppDistpatch>();

	useEffect(() => {
		// const abortControl = new AbortController();
		dispatch(fetchTechnologies());
		// console.log(depArr);
		// return () => abortControl.abort();
	}, [dispatch]);

	return (
		<section id="skills" className="w-full lg:h-screen p-4">
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Skills
				</p>
				<h2 className="py-4">What I can do</h2>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* When a skill is clicked link to  projects that this skill was used  */}
					{technologies.map((skill) => {
						console.log(skill.image);
						return (
							<SkillsCard
								key={skill._id}
								imgProp={skill.image}
								text={skill.title}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Skills;
