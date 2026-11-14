"use client";
import React, { useEffect, useState } from "react";
import AnalyticsDashboard from "@/app/components/adminComponents/Analytics";
import axios from "axios";
import { FaSyncAlt, FaLaptopCode, FaCheckCircle, FaLayerGroup } from "react-icons/fa";
import Toast from "@/app/components/adminComponents/Toast";
import { invalidateProjectsCache } from "@/app/hooks/useProjectsFetch";
import { invalidateTechCache } from "@/app/hooks/useTechnologyFetch";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalTechnologies: 0,
  });
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchStats = async () => {
    try {
      const [projRes, techRes] = await Promise.all([
        axios.get("/api/projects"),
        axios.get("/api/technologies"),
      ]);
      const projects = projRes.data.projects || [];
      const technologies = techRes.data.technologies || [];
      setStats({
        totalProjects: projects.length,
        featuredProjects: projects.filter((p: any) => p.featured).length,
        totalTechnologies: technologies.length,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      const res = await axios.post("/api/sync/github");
      const data = res.data;
      if (data.success) {
        invalidateProjectsCache();
        invalidateTechCache();
        setToast({
          type: "success",
          message: data.message || "Synced projects and technologies from GitHub & Vercel!",
        });
        fetchStats();
      } else {
        setToast({ type: "error", message: data.error || "Sync failed" });
      }
    } catch (err: any) {
      console.error(err);
      setToast({ type: "error", message: "Failed to sync with GitHub" });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="w-full py-4 space-y-8">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}

      {/* Sync & Stats Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#5651e5]/10 via-[#709dff]/10 to-transparent border border-[#5651e5]/20 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">
              Portfolio Admin Center
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Synchronize, curate, and showcase your live projects and tech stacks.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#5651e5] to-[#709dff] shadow-lg hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <FaSyncAlt className={syncing ? "animate-spin" : ""} />
            <span>{syncing ? "Syncing from GitHub..." : "Sync with GitHub & Vercel"}</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <FaLaptopCode size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-gray-500">Total Projects</p>
              <h3 className="text-2xl font-bold">{stats.totalProjects}</h3>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <FaCheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-gray-500">Featured on Home</p>
              <h3 className="text-2xl font-bold">{stats.featuredProjects}</h3>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FaLayerGroup size={24} />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-gray-500">Technologies</p>
              <h3 className="text-2xl font-bold">{stats.totalTechnologies}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Website Analytics */}
      <AnalyticsDashboard />
    </div>
  );
};

export default AdminHome;
