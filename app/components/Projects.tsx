"use client";
import React from "react";
import Link from "next/link";
import ProjectItem from "./ProjectItem";
import { useProjectsFetch } from "@/app/hooks/useProjectsFetch";

const Projects = () => {
  const { projects, loading, error } = useProjectsFetch(true);

  // Take the featured projects (show top 4 or 6 on main page)
  const displayProjects = projects && projects.length > 0 ? projects.slice(0, 6) : [];

  return (
    <section id="projects" className="w-full py-16">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="flex flex-col items-center sm:items-start mb-10">
          <p className="text-xl tracking-widest uppercase text-[#5651e5] font-bold">
            Projects
          </p>
          <h2 className="py-2 text-3xl sm:text-4xl">What I Have Built</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl">
            Featured applications connected directly with GitHub and hosted on Vercel, showcasing responsive design, full-stack architectures, and modern web frameworks.
          </p>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-full aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse border border-gray-300 dark:border-gray-700"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 py-8">
            Unable to load projects right now. Please try again.
          </p>
        )}

        {!loading && displayProjects.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <ProjectItem
                key={project._id}
                title={project.title}
                bgImg={project.image}
                ProjectUrl={`/project/${project._id}`}
                technologies={
                  project.header ||
                  project.technologies?.map((t) => t.techName).join(" • ") ||
                  "Web Application"
                }
                demoLink={project.demoLink}
                repoLink={project.repoLink}
              />
            ))}
          </div>
        )}

        <div className="w-full flex justify-center items-center mt-12">
          <Link href="/projects-page">
            <button className="py-3 px-8 text-sm font-semibold tracking-wider uppercase rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105">
              View All Projects &rarr;
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
