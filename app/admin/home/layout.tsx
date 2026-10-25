"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/adminComponents/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: "Projects", slug: "projects" },
    { name: "Technologies", slug: "technologies" },
    { name: "Certificates", slug: "certificates" },
  ];

  // Determine if it's an "add" or "view" route
  const basePath = pathname?.includes("/add/")
    ? "/admin/home/add"
    : "/admin/home/view";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)]">
      <Navbar />
      <div className="flex flex-1 pt-20 w-full">
        <Sidebar />
        <main className="flex-1 min-w-0 p-3 sm:p-6 md:p-8 overflow-y-auto">
          <div className="max-w-[1200px] w-full mx-auto">
            {/* TAB HEADER */}
            {pathname !== "/admin/home" && (
              <div className="mx-auto flex justify-center items-center flex-wrap max-w-xl p-2 mb-6 gap-3 sm:gap-6 text-center border-b border-gray-300 dark:border-gray-700">
                {tabs.map((tab) => {
                  const href = `${basePath}/${tab.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={tab.slug}
                      href={href}
                      className={`py-2 px-3 text-sm sm:text-base font-semibold border-b-2 transition-all ${
                        isActive
                          ? "border-[#5651e5] text-[#5651e5]"
                          : "border-transparent hover:text-[#5651e5] opacity-70 hover:opacity-100"
                      }`}
                    >
                      {tab.name}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* MAIN CONTENT */}
            <div className="w-full">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
