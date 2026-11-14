"use client";
import React from "react";
import SkillsCard from "./SkillsCard";
import { useTechnologyFetch } from "@/app/hooks/useTechnologyFetch";

const Skills = () => {
  const { technologies, isLoading, err } = useTechnologyFetch();

  return (
    <section id="skills" className="w-full py-16">
      <div className="max-w-[1240px] mx-auto px-4 flex flex-col justify-center">
        <div className="mb-8">
          <p className="text-xl tracking-widest uppercase text-[#5651e5] font-bold">
            Skills & Tech Stack
          </p>
          <h2 className="py-2 text-3xl sm:text-4xl">What I Can Do</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl">
            Technologies automatically extracted from my featured projects on GitHub and Vercel. Click on any skill to explore the projects where it is implemented.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse border border-gray-300 dark:border-gray-700"
              />
            ))}
          </div>
        )}

        {err && !isLoading && (
          <p className="text-center text-red-500 py-6">
            Failed to load technologies. Please try again.
          </p>
        )}

        {!isLoading && technologies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {technologies.map((tech: any) => (
              <SkillsCard
                key={tech._id || tech.title}
                imgProp={tech.image || tech.img}
                text={tech.title}
                projectCount={tech.projectCount}
              />
            ))}
          </div>
        )}

        {!isLoading && !technologies.length && !err && (
          <p className="text-center py-10 opacity-70">
            No technologies discovered yet. Sync projects from the Admin dashboard!
          </p>
        )}
      </div>
    </section>
  );
};

export default Skills;
