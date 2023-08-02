import Link from "next/link";
import { StaticImageData } from "next/image";
import ProjectItem from "./ProjectItem";
import allProps from "@/app/components/data/Properties";

interface Project {
	id: number;
	projName: string;
	projHead: string;
	projImg: StaticImageData;
	projDescr: string;
}

const Projects = () => {
	const topfour = allProps.slice(0, 4);

	return (
		<section id="projects" className="w-full">
			<div className="max-w-[1000px] mx-auto px-2 py-16">
				<p className="text-xl tracking-widest uppercase text-[#5651e5]">
					Project
				</p>
				<h2 className="py-4">What I have built</h2>
				<div className="grid md:grid-cols-2 gap-8">
					{topfour.map((projectProp: Project) => {
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

				<div className="w-full flex justify-center items-center my-4">
					<Link href={"/projects-page"}>
						<button className="py-4 px-6 text-[#5651e5] hover:text-white rounded-xl bg-none hover:bg-[#5651e5]">
							view more . . .
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Projects;
