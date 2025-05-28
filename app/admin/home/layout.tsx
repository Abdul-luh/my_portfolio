import React from "react";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/adminComponents/Sidebar";
import { AdminUIProvider } from "@/app/context/AdminAuth/AdminUIContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminUIProvider>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </AdminUIProvider>
  );
}
