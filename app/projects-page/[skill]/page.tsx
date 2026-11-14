"use client";
import ProjectItem from "@/app/components/ProjectItem";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useProjectsFetch } from "@/app/hooks/useProjectsFetch";
import { useEffect, useState } from "react";
import { Project } from "@/utils/interfaces";

const Page = ({ params }: { params: { skill: string } }) => {
  const { projects, loading, error } = useProjectsFetch();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const skillName = decodeURIComponent(params.skill);

  useEffect(() => {
    if (projects.length > 0) {
      const result = projects.filter((project) =>
        project.technologies?.some((tech) =>
          tech.techName.toLowerCase().includes(skillName.toLowerCase())
        )
      );
      setFilteredProjects(result);
    }
  }, [projects, skillName]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/#skills"
              className="flex items-center gap-2 text-sm text-[#5651e5] hover:underline font-semibold"
            >
              <FaArrowLeft size={12} />
              <span>Back to Skills</span>
            </Link>
          </div>

          <div className="mb-10">
            <p className="text-sm font-bold tracking-widest uppercase text-[#5651e5]">
              Filtered by Technology
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold capitalize">
              {skillName} Projects
            </h1>
          </div>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse border border-gray-300 dark:border-gray-700"
                />
              ))}
            </div>
          )}

          {error && <p className="text-red-500 py-6">{error}</p>}

          {!loading && filteredProjects.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectItem
                  key={project._id}
                  title={project.title}
                  bgImg={project.image}
                  ProjectUrl={`/project/${project._id}`}
                  technologies={
                    project.header ||
                    project.technologies?.map((t) => t.techName).join(" • ") ||
                    "Web App"
                  }
                  demoLink={project.demoLink}
                  repoLink={project.repoLink}
                />
              ))}
            </div>
          )}

          {!filteredProjects.length && !loading && (
            <div className="text-center py-16 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 opacity-80">
                No projects found with {skillName} yet.
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Explore all other projects or sync newly added repos in the admin dashboard.
              </p>
              <Link href="/projects-page">
                <button className="py-2.5 px-6 rounded-xl text-sm font-semibold tracking-wider">
                  Browse All Projects
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
