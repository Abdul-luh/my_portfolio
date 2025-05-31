"use client";
import ProjectItem from "@/app/components/ProjectItem";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useProjectsFetch } from "@/app/hooks/useProjectsFetch";
import { useEffect, useState } from "react";
import { Project } from "@/utils/interfaces";

const Page = ({ params }: { params: { skill: string } }) => {
  const { projects, loading, error } = useProjectsFetch();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  console.log(projects);

  useEffect(() => {
    if (projects.length > 0) {
      const result = projects.filter((project) =>
        project.technologies.some((tech) =>
          tech.techName.toLowerCase().includes(params.skill.toLowerCase())
        )
      );
      setFilteredProjects(result);
    }
  }, [projects, params.skill]);

  console.log(filteredProjects);

  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full">
        <div className="max-w-[1000px] mx-auto px-2 py-16">
          <h2 className="py-4 mt-4 text-[#5651e5] text-center w-full">
            All Projects:{" "}
            {params.skill.charAt(0).toUpperCase() + params.skill.slice(1)}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {filteredProjects.map((project) => (
              <ProjectItem
                key={project._id}
                title={project.title}
                bgImg={project.image}
                ProjectUrl={`/project/${project._id}`}
                technologies={project.header}
              />
            ))}
            {!filteredProjects.length && !loading && (
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

export default Page;
