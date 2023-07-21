import React from "react";
import Image from "next/image";
import Link from "next/link";
import project01 from "../../public/assets/images/img01.jpg";
import ProjectItem from "./ProjectItem";
const Projects = () => {
	return (
		<section id="projects" className="w-full">
			<div className="max-w-[1000px] mx-auto px-2 py-16">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Project
				</p>
				<h2 className="py-4">What I have built</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<ProjectItem
						title="Project Title"
						bgImg={project01}
						ProjectUrl="/property"
						technologies="React JS"
					/>

					<ProjectItem
						title="Project Title"
						bgImg={project01}
						ProjectUrl="/property"
						technologies="React JS"
					/>

					<ProjectItem
						title="Project Title"
						bgImg={project01}
						ProjectUrl="/property"
						technologies="React JS"
					/>

					<ProjectItem
						title="Project Title"
						bgImg={project01}
						ProjectUrl="/property"
						technologies="React JS"
					/>
				</div>
			</div>
		</section>
	);
};

export default Projects;
