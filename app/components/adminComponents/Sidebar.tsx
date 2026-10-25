"use client";

import AdminAuthContext from "@/app/context/AdminAuth/AdminAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { FaEye, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";

export default function Sidebar() {
  const pathname = usePathname();
  const auth = useContext(AdminAuthContext);
  const handleLogout = auth?.handleLogout;

  const links = [
    {
      name: "Home",
      href: "/admin/home",
      icon: <HiHome size={22} />,
      isActive: pathname === "/admin/home",
    },
    {
      name: "View All",
      href: "/admin/home/view/projects",
      icon: <FaEye size={20} />,
      isActive: pathname.includes("/admin/home/view"),
    },
    {
      name: "Add",
      href: "/admin/home/add/projects",
      icon: <FaPlus size={20} />,
      isActive: pathname.includes("/admin/home/add"),
    },
  ];

  return (
    <aside className="w-16 sm:w-20 md:w-48 shrink-0 p-2 sm:p-4 border-r border-gray-300 dark:border-gray-700 bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] sticky top-20 h-[calc(100vh-5rem)] flex flex-col items-center md:items-stretch gap-2 transition-all">
      <nav className="flex flex-col gap-2 w-full">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`w-full flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
              link.isActive
                ? "bg-[#5651e5] text-white shadow-md shadow-[#5651e5]/30 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <span className="shrink-0">{link.icon}</span>
            <span className="hidden md:inline text-sm font-medium">
              {link.name}
            </span>
          </Link>
        ))}
      </nav>

      {handleLogout && (
        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto w-full flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors cursor-pointer !shadow-none !bg-transparent border-0"
        >
          <FaSignOutAlt size={20} className="shrink-0" />
          <span className="hidden md:inline text-sm font-semibold">
            Logout
          </span>
        </button>
      )}
    </aside>
  );
}
