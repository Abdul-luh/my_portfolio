"use client";

import { useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";
import { useRouter } from "next/navigation"; // for navigation on update
import { useProjectsFetch } from "@/app/hooks/useProjectsFetch";

interface Project {
  _id: string;
  title: string;
  header: string;
  description: string;
  image: string;
  repoLink: string;
  demoLink: string;
  technologies: { techName: string; _id: string }[];
}

const AllProjects = () => {
  const { projects, loading, error, refetch } = useProjectsFetch();
  const router = useRouter();

  // Delete handler
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      refetch(); // refresh the projects list after deletion
    } catch (err) {
      console.error(err);
      alert("Failed to delete project. Please try again.");
    }
  };

  // Update handler - navigates to update form page with project id in query string
  const handleUpdate = async (id: string): Promise<void> => {
    router.push(`/admin/home/add/projects?id=${id}`);
  };

  return (
    <section id="AllProjects" className="w-full p-4">
      <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
        <div className="grid gap-8">
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {projects.map((project) => (
            <Card
              key={project._id}
              id={project._id}
              text={project.title}
              handleDelete={() => handleDelete(project._id)}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
