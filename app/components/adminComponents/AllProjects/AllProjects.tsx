"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useProjectsFetch, invalidateProjectsCache } from "@/app/hooks/useProjectsFetch";
import Card from "../Card";
import Toast from "../Toast";
import { FaSyncAlt } from "react-icons/fa";

const AllProjects = () => {
  const { projects, loading, error, refetch } = useProjectsFetch();
  const router = useRouter();

  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Sync handler
  const handleSync = async () => {
    try {
      setSyncing(true);
      const res = await axios.post("/api/sync/github");
      const data = res.data;
      if (data.success) {
        setToast({
          type: "success",
          message: data.message || "Synced projects and technologies from GitHub & Vercel!",
        });
        invalidateProjectsCache();
      refetch();
      } else {
        setToast({
          type: "error",
          message: data.error || "Failed to sync with GitHub",
        });
      }
    } catch (err: any) {
      console.error(err);
      setToast({
        type: "error",
        message: err.response?.data?.error || err.message || "Sync failed",
      });
    } finally {
      setSyncing(false);
    }
  };

  // Toggle Featured handler
  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      await axios.patch(`/api/projects/${id}`, { featured: !current });
      setToast({
        type: "success",
        message: !current ? "Project marked as Featured on portfolio!" : "Project set to Standard.",
      });
      invalidateProjectsCache();
      refetch();
    } catch (err: any) {
      console.error(err);
      setToast({ type: "error", message: "Failed to update project status" });
    }
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      setToast({ type: "success", message: "Project deleted successfully" });
      invalidateProjectsCache();
      refetch();
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Failed to delete project." });
    }
  };

  // Update handler
  const handleUpdate = async (id: string): Promise<void> => {
    router.push(`/admin/home/add/projects?id=${id}`);
  };

  return (
    <section id="AllProjects" className="w-full py-4">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}

      <div className="max-w-[1240px] mx-auto w-full">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-300 dark:border-gray-700">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Manage Projects</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {projects.length} {projects.length === 1 ? "project" : "projects"} discovered (
              {projects.filter((p) => p.featured).length} featured on main page)
            </p>
          </div>

          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#5651e5] to-[#709dff] shadow-md hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <FaSyncAlt className={syncing ? "animate-spin" : ""} />
            <span>{syncing ? "Syncing from GitHub & Vercel..." : "Sync with GitHub & Vercel"}</span>
          </button>
        </div>

        {loading && <p className="text-center py-8">Loading projects...</p>}
        {error && <p className="text-red-500 text-center py-6">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((project) => (
            <Card
              key={project._id}
              id={project._id}
              text={project.title}
              header={project.header}
              image={project.image}
              demoLink={project.demoLink}
              repoLink={project.repoLink}
              technologies={project.technologies}
              featured={project.featured}
              onToggleFeatured={handleToggleFeatured}
              handleDelete={() => handleDelete(project._id)}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>

        {!loading && !projects.length && !error && (
          <div className="text-center py-16 flex flex-col items-center">
            <p className="text-gray-500 mb-4">No projects in database yet.</p>
            <button
              onClick={handleSync}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-[#5651e5]"
            >
              Sync GitHub Repositories Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;
