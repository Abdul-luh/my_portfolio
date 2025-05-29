"use client";

import { useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";
import { useRouter } from "next/navigation"; // for navigation on update

interface Project {
  _id: string;
  projName: string;
}

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/projects"); // ✅ Make sure this route exists
      console.log(response.data); // Debugging line to check response structure
      setProjects(response.data.projects); // assumes response is { projects: [...] }
    } catch (err: any) {
      setError("Failed to fetch projects.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete handler
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects(); // refresh the list after delete
    } catch (err) {
      console.error(err);
      setError("Failed to delete project.");
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
              text={project.projName}
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
