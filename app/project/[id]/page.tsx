import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import project01 from "../../../public/images/img01.jpg";
import allProps from "@/app/components/data/Properties.json";
import { RiRadioButtonFill } from "react-icons/ri";

const page = ({ params }: any) => {
	interface Project {
		id: number;
		projName: string;
		projHead: string;
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
		<>
			<Navbar />

			{/* MAPPING THROUGH THE PROJECT LIST  */}
			{allProps.map((project: Project) => {
				if (params.id == project.id)
					return (
						<div key={project.id} className="w-full overflow-x-hidden">
							<div className="w-screen h-[40vh] lg:h-[50vh] relative overflow-y-hidden">
								<div className="absolute top-0 left-0 w-full h-[40vh] lg:h-[50vh] bg-black/80 z-10 overflow-y-hidden" />
								<Image
									className="absolute z-[-1] object-cover"
									src={project01}
									alt="img"
								/>
								<div className="absolute top-[70%] max-w-[1000px] w-full left-[50%] -translate-x-1/2 -translate-y-1/2 text-white z-10 p-2">
									<h2 className="py-2 uppercase">
										{parseInt(params.id) === project.id
											? project.projName
											: "Nothing Here!"}
									</h2>
									<h3>React JS / Tailwind / Firebase </h3>
								</div>
							</div>
							<div className="max-w-[1000px] mx-auto p-2 grid md:grid-cols-5 gap-2 pt-8 ">
								<div className="col-span-4">
									<p>Project</p>
									<h2>Overview</h2>
									<p>{project.projDescr}</p>
									<button className="px-8 py-2 mt-4 mr-8">
										<Link href={project.demoLink}>DEMO</Link>
									</button>
									<button className="px-8 py-2 mt-4">
										<Link href={project.repoLink}>CODE</Link>
									</button>
								</div>

								<div className="col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4">
									<div className="p-2">
										<p className="text-center font-bold pb-2">Technologies</p>

										{/* MAPPING THOUGH THE TECH SKILLS LIST WITHIN EACH OF THE PROJECT LIST */}
										{project.projTech.map((tech: Technology) => {
											return (
												<div
													key={tech.id}
													className="grid gap-[auto] sm:grid-cols-3 md:grid-cols-1">
													<p className="text-gray-600 text-center uppercase py-2 flex items-center">
														<RiRadioButtonFill className="mr-1 " />{" "}
														{tech.techName}
													</p>
												</div>
											);
										})}
									</div>
								</div>
								<Link href="/">
									<p className="cursor-pointer underline uppercase">back</p>
								</Link>
							</div>
						</div>
					);
			})}
		</>
	);
};

export default page;
