"use client";

import { useState } from "react";
import ProjectItem from "../components/ProjectItem";
import Navbar from "../components/Navbar";
import { useProjectsFetch } from "../hooks/useProjectsFetch";

const Page = () => {
  const { projects, loading, error } = useProjectsFetch();
  const [selectedTech, setSelectedTech] = useState<string>("All");

  // Collect unique technologies across all projects for quick filter pills
  const allTechs = ["All", ...Array.from(
    new Set(
      projects.flatMap((p) => p.technologies?.map((t) => t.techName) || [])
    )
  ).slice(0, 10)];

  const filteredProjects =
    selectedTech === "All"
      ? projects
      : projects.filter((p) =>
          p.technologies?.some(
            (t) => t.techName.toLowerCase() === selectedTech.toLowerCase()
          )
        );

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-24 pb-16">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#5651e5] mb-3">
              All Projects
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Explore all my open-source and deployed applications on Vercel and GitHub with live previews and tech stacks.
            </p>
          </div>

          {/* Filter Pills */}
          {allTechs.length > 1 && (
            <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    selectedTech === tech
                      ? "!bg-[#5651e5] !text-white shadow-md shadow-[#5651e5]/30"
                      : "!bg-gray-200 dark:!bg-gray-800 !text-gray-700 dark:!text-gray-300 hover:!bg-gray-300 dark:hover:!bg-gray-700 !shadow-none"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-full aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse border border-gray-300 dark:border-gray-700"
                />
              ))}
            </div>
          )}

          {error && <p className="text-center text-red-500 py-6">{error}</p>}

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

          {!loading && !filteredProjects.length && !error && (
            <p className="text-center py-16 opacity-70">
              No projects found for the selected category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
