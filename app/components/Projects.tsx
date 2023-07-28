import React from "react";
import Image from "next/image";
import Link from "next/link";
import project01 from "../../public/assets/images/img01.jpg";
import ProjectItem from "./ProjectItem";
import allProps from "@/app/components/data/Properties.json";

const Projects = () => {
	interface Project {
		id: number;
		projName: string;
		projHead: string;
		projImg: string;
		projDescr: string;
		projTech: Technology[];
		demoLink: string;
		repoLink: string;
	}

	interface Technology {
		id: number;
		techName: string;
	}

	return (
		<section id="projects" className="w-full">
			<div className="max-w-[1000px] mx-auto px-2 py-16">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Project
				</p>
				<h2 className="py-4">What I have built</h2>
				<div className="grid md:grid-cols-2 gap-8">
					{allProps.map((projectProp: Project) => {
						return (
							<ProjectItem
								key={projectProp.id}
								title={projectProp.projName}
								bgImg={projectProp.projImg}
								ProjectUrl={`/project/${projectProp.id}`}
								technologies={projectProp.projHead}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Projects;
