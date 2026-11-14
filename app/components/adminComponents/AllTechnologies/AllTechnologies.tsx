"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "../Card";
import spinner from "@/public/Spinner@1x-1.0s-200px-200px.svg";
import { useTechnologyFetch } from "@/app/hooks/useTechnologyFetch";
import Toast from "../Toast";
import { FaSyncAlt } from "react-icons/fa";
import axios from "axios";

const AllTechnologies = () => {
  const { technologies, isLoading, err, errMsg, refetch } = useTechnologyFetch();
  const router = useRouter();

  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSync = async () => {
    try {
      setSyncing(true);
      const res = await axios.post("/api/sync/github");
      const data = res.data;
      if (data.success) {
        setToast({
          type: "success",
          message: `Synced technologies from ${data.syncedCount} projects!`,
        });
        refetch();
      } else {
        setToast({ type: "error", message: data.error || "Sync failed" });
      }
    } catch (err: any) {
      console.error(err);
      setToast({ type: "error", message: "Failed to sync technologies" });
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this technology from portfolio?")) return;
    try {
      await fetch(`/api/technologies/${id}`, { method: "DELETE" });
      setToast({ type: "success", message: "Technology deleted." });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    router.push(`/admin/home/add/technologies?id=${id}`);
  };

  return (
    <section id="AllTechnologies" className="w-full py-4">
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
            <h2 className="text-xl sm:text-2xl font-bold">Technologies & Skills</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Aggregated from all featured projects on your portfolio ({technologies.length} skills discovered)
            </p>
          </div>

          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#5651e5] to-[#709dff] shadow-md hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <FaSyncAlt className={syncing ? "animate-spin" : ""} />
            <span>{syncing ? "Refreshing Tech Stacks..." : "Sync from Projects"}</span>
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Image src={spinner} alt="loading..." width={120} height={120} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {technologies.map((tech: any) => (
            <Card
              key={tech._id || tech.title}
              id={tech._id}
              text={tech.title}
              image={tech.image || tech.img}
              projectCount={tech.projectCount}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>

        {!technologies.length && !isLoading && (
          <div className="text-center py-16 flex flex-col items-center">
            <p className="text-gray-500 mb-4">
              {err ? errMsg || "Unable to load technologies." : "No technologies registered yet."}
            </p>
            <button
              onClick={handleSync}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-[#5651e5]"
            >
              Sync Technologies from GitHub
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTechnologies;
