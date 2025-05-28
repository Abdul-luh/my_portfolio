"use client";

import { useAdminUI } from "@/app/context/AdminAuth/AdminUIContext";
import { FaEye, FaPlus } from "react-icons/fa"; // 👈 Import icons

export default function Sidebar() {
  const { mode, setMode } = useAdminUI();

  return (
    <aside className="w-40 p-4 border-r border-gray-600 text-white pt-40 flex flex-col gap-4 items-center">
      <p
        className={`mb-4 flex items-center gap-2 cursor-pointer ${
          mode === "view" ? "text-blue-400 font-semibold" : ""
        }`}
        onClick={() => setMode("view")}
      >
        <FaEye />
        View All
      </p>
      <p
        className={`flex items-center gap-2 cursor-pointer ${
          mode === "add" ? "text-blue-400 font-semibold" : ""
        }`}
        onClick={() => setMode("add")}
      >
        <FaPlus />
        Add
      </p>
    </aside>
  );
}
