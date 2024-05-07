import { StaticImageData } from "next/image";
import ProjectItem from "@/app/components/ProjectItem";
import allProps from "@/app/components/data/Properties";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const page = ({ params }: { params: { skill: string } }) => {
	interface Project {
		id: number;
		projName: string;
		projHead: string;
		projImg: StaticImageData;
		projDescr: string;
	}
	const filteredPorp = allProps.filter((prop) => {
		for (let i in prop.projTech) {
			console.log(prop.projTech[i].id);
			if (
				prop.projTech[i].techName
					.toLocaleLowerCase()
					.includes(params.skill.toLowerCase())
			) {
				return prop.projTech[i].techName;
			}
		}
	});

	// console.log(filteredPorp.map((prop) => prop.id));

	return (
		<>
			<Navbar />
			<div className="w-full">
				<div className="max-w-[1000px] mx-auto px-2 py-16">
					{/* <p className="text-xl tracking-widest uppercase text-[#5651e5]">
						Project
					</p> */}
					<h2 className="py-4 mt-4 text-[#5651e5] text-center w-full">
						All Projects:{" "}
						{params.skill.charAt(0).toUpperCase() + params.skill.slice(1)}
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* filter if query  = allProps.Projtech.techName  */}
						{filteredPorp.map((projectProp: Project) => {
							// if(params.skill ===projectProp. )
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
						{!filteredPorp.length && (
							<div className="text-center col-span-2 row-span-2 py-8 w-full flex flex-col items-center">
								<h3 className="text-3xl text-center col-span-2 row-span-2 py-8 w-full">
									No Projects with this skill!
								</h3>
								<div className="bg-white rounded-full flex items-center py-4 mt-2 hover:w-36 w-12 h-12 relative cursor-pointer text-[#5651e5] group duration-200">
									<Link href={"/"}>
										<FaArrowLeft className="group-hover:hidden durartion-500 mx-4" />{" "}
										<p className="hidden w-36 group-hover:block px-2 duration-500">
											back home
										</p>
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
