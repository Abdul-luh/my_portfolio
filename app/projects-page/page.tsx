import { StaticImageData } from "next/image";
import ProjectItem from "../components/ProjectItem";
import allProps from "@/app/components/data/Properties";
import Navbar from "../components/Navbar";

const Page = () => {
	interface Project {
		id: number;
		projName: string;
		projHead: string;
		projImg: StaticImageData;
		projDescr: string;
	}
	// console.log(
	// 	allProps.filter((proj) =>
	// 		proj.projTech.filter((smth) =>
	// 			smth.techName.toLowerCase().includes("typescript".toLowerCase())
	// 		)
	// 	)
	// );

	return (
		<>
			<Navbar />
			<div className="w-full">
				<div className="max-w-[1000px] mx-auto px-2 py-16">
					{/* <p className="text-xl tracking-widest uppercase text-[#5651e5]">
						Project
					</p> */}
					<h2 className="py-4 mt-4 text-[#5651e5] text-center w-full">
						All Projects
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* filter if query  = allProps.Projtech.techName  */}
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
			</div>
		</>
	);
};

export default Page;
