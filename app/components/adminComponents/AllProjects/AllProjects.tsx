"use client";
import { useEffect } from "react";
import allProps from "../../data/Properties";
import { StaticImageData } from "next/image";
import Card from "../Card";
import { usePathname } from "next/navigation";

interface Project {
	id: number;
	projName: string;
}

const AllProjects = () => {
	const path = usePathname();

	return (
		<section id="AllProjects" className={"w-full  p-4"}>
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<div className="grid  gap-8">
					{allProps.map((ProjectProp: Project) => {
						return <Card key={ProjectProp.id} text={ProjectProp.projName} />;
					})}
				</div>
			</div>
		</section>
	);
};

export default AllProjects;
