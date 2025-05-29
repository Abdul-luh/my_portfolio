"use client";

import { useAdminUI } from "@/app/context/AdminAuth/AdminUIContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaEye, FaPlus } from "react-icons/fa"; // 👈 Import icons
import { HiHome } from "react-icons/hi";

export default function Sidebar() {
  const { mode, setMode } = useAdminUI();
  const pathname = usePathname();

  return (
    <aside className="md:w-40 w-16 p-4 border border-gray-600 rounded-2xl text-white pt-28 flex flex-col gap-6 items-center">
      <Link
        href="/admin/home"
        className={`w-full mb-4 flex items-center gap-2 cursor-pointer ${
          pathname === "/admin/home" ? "text-[#5651e5] font-semibold" : ""
        }`}
      >
        <HiHome size={20} />
        <span className="hidden md:inline">Home</span>
      </Link>
      <Link
        href="/admin/home/view/projects"
        className={`w-full mb-4 flex items-center gap-2 cursor-pointer ${
          pathname.includes("/admin/home/view")
            ? "text-[#5651e5] font-semibold"
            : ""
        }`}
      >
        <FaEye size={20} />
        <span className="hidden md:inline">View All</span>
      </Link>
      <Link
        href="/admin/home/add/projects"
        className={`w-full flex items-center gap-2 cursor-pointer ${
          pathname.includes("/admin/home/add")
            ? "text-[#5651e5] font-semibold"
            : ""
        }`}
      >
        <FaPlus size={20} />
        <span className="hidden md:inline">Add</span>
      </Link>
    </aside>
  );
}
