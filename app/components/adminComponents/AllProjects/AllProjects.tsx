"use client";

import axios from "axios";
import { useRouter } from "next/navigation"; // for navigation on update
import { useProjectsFetch } from "@/app/hooks/useProjectsFetch";
import Card from "../Card";

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
    <section id="AllProjects" className="w-full py-4">
      <div className="max-w-[1240px] mx-auto w-full">
        {loading && <p className="text-center py-6">Loading...</p>}
        {error && <p className="text-red-500 text-center py-6">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
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
