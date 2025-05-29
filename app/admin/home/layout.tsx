"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/adminComponents/Sidebar";
import { AdminUIProvider } from "@/app/context/AdminAuth/AdminUIContext";
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
    <AdminUIProvider>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">
          <div className="w-full h-screen text-white">
            <div className="max-w-[1200px] h-[0%] pt-20 m-auto">
              {/* TAB HEADER */}
              {pathname !== "/admin/home" && (
                <div className="mx-auto flex justify-between items-center max-w-2xl p-4 gap-4 text-center">
                  {tabs.map((tab) => {
                    const href = `${basePath}/${tab.slug}`;
                    const isActive = pathname === href;

                    return (
                      <Link
                        key={tab.slug}
                        href={href}
                        className={`py-1 border-b-2 ${
                          isActive ? "border-[#5651e5]" : "border-transparent"
                        } hover:border-[#5651e5] transition-colors`}
                      >
                        {tab.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* MAIN CONTENT */}
              {children}
            </div>
          </div>
        </main>
      </div>
    </AdminUIProvider>
  );
}
