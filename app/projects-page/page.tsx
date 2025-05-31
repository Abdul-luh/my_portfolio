"use client";

import { useEffect, useState } from "react";
import ProjectItem from "../components/ProjectItem";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Project } from "@/utils/interfaces";
const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/projects");
        // Assuming response.data.projects is an array of projects
        setProjects(response.data.projects);
        setError("");
      } catch (err: any) {
        setError("Failed to load projects.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="max-w-[1000px] mx-auto px-2 py-16">
          <h2 className="py-4 mt-4 text-[#5651e5] text-center w-full">
            All Projects
          </h2>

          {loading && (
            <p className="text-center text-white">Loading projects...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectItem
                key={project._id}
                title={project.title}
                bgImg={project.image} // make sure projImg is a URL string
                ProjectUrl={`/project/${project._id}`}
                technologies={project.header}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
