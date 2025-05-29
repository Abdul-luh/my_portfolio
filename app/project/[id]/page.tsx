"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { RiRadioButtonFill } from "react-icons/ri";
import { useProjectsFetch } from "@/app/hooks/useProjectsFetch";
import { useEffect, useState } from "react";
import { Project, Technology } from "@/utils/interfaces";
const Page = ({ params }: { params: { id: string } }) => {
  // console.log(params)
  const { projects, loading, error } = useProjectsFetch();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projects.length > 0) {
      const found = projects.find((proj) => proj._id === params.id);
      if (found) {
        // Map the found object to the Project interface
        const mappedProject: Project = {
          _id: found._id ?? parseInt(found._id) ?? 0,
          title: found.title,
          header: found.header,
          image: found.image,
          description: found.description,
          technologies: found.technologies,
          demoLink: found.demoLink,
          repoLink: found.repoLink,
        };
        setProject(mappedProject);
      } else {
        setProject(null);
      }
    }
  }, [projects, params.id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!project)
    return <p className="text-white text-center mt-20">Project not found!</p>;

  return (
    <>
      <Navbar />

      {/* MAPPING THROUGH THE PROJECT LIST  */}
      {projects.map((project: Project) => {
        if (params.id == project._id.toString())
          return (
            <div key={project._id} className="w-full overflow-x-hidden">
              <div className="w-screen h-[40vh] lg:h-[50vh] mt-14 relative overflow-y-hidden">
                <div className="absolute top-0 left-0 w-full h-[40vh] lg:h-[50vh] bg-black/80 z-10 overflow-y-hidden" />
                <Image
                  className="absolute z-[-1] object-cover mt-6"
                  src={project.image}
                  alt="img"
                  width={1200}
                  height={500}
                />
                <div className="absolute top-[70%] max-w-[1000px] w-full left-[50%] -translate-x-1/2 -translate-y-1/2 text-white z-10 p-2">
                  <h2 className="py-2 uppercase">
                    {params.id === project._id
                      ? project.title
                      : "Nothing Here!"}
                  </h2>
                  <h3> {project.header}</h3>
                </div>
              </div>
              <div className="max-w-[1000px] mx-auto p-2 grid md:grid-cols-5 gap-2 pt-8 ">
                <div className="col-span-4">
                  <p>Project</p>
                  <h2>Overview</h2>
                  <p>{project.description}</p>
                  <button className="px-8 py-2 mt-4 mr-8">
                    <Link href={project.demoLink}>DEMO</Link>
                  </button>
                  <button className="px-8 py-2 mt-4">
                    <Link href={project.repoLink}>CODE</Link>
                  </button>
                </div>

                <div className="col-span-4 md:col-span-1 shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl p-4">
                  <div className="p-2">
                    <p className="text-center font-bold pb-2">Technologies</p>

                    {/* MAPPING THOUGH THE TECH SKILLS LIST WITHIN EACH OF THE PROJECT LIST */}
                    {project.technologies.map((tech: Technology) => {
                      return (
                        <div
                          key={tech._id}
                          className="grid gap-[auto] sm:grid-cols-3 md:grid-cols-1"
                        >
                          <p className="text-gray-600 dark:text-gray-400 text-center uppercase py-2 flex items-center">
                            <RiRadioButtonFill className="mr-1 " />{" "}
                            {tech.techName}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Link href="/">
                  <p className="cursor-pointer py-4 underline uppercase">
                    back
                  </p>
                </Link>
              </div>
            </div>
          );
      })}
    </>
  );
};

export default Page;
