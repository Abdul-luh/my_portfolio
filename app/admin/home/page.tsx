"use client";

import React, { useState } from "react";
import { useAdminUI } from "@/app/context/AdminAuth/AdminUIContext";
import AllProjects from "@/app/components/adminComponents/AllProjects/AllProjects";
import AllTechnologies from "@/app/components/adminComponents/AllTechnologies/AllTechnologies";
import AllCertificates from "@/app/components/adminComponents/AllCertificates/Allcertificates";
import AddProject from "@/app/components/adminComponents/AddProject/AddProject";
import AddTechnology from "@/app/components/adminComponents/AddTecnology/AddTechnology";
import AddCertificate from "@/app/components/adminComponents/AddCertificate/AddCertificate";

const AdminHome = () => {
  const { mode } = useAdminUI(); // ← Get current mode: "view" or "add"
  const [tab, setTab] = useState<"Projects" | "Technologies" | "Certificates">(
    "Projects"
  );

  const renderContent = () => {
    if (mode === "view") {
      if (tab === "Projects") return <AllProjects />;
      if (tab === "Technologies") return <AllTechnologies />;
      if (tab === "Certificates") return <AllCertificates />;
    }

    if (mode === "add") {
      if (tab === "Projects") return <AddProject />;
      if (tab === "Technologies") return <AddTechnology />;
      if (tab === "Certificates") return <AddCertificate />;
    }

    return null;
  };

  return (
    <div className="w-full h-screen text-white">
      <div className="max-w-[1200px] h-[0%] pt-20 m-auto">
        {/* TAB HEADER */}
        <div className="mx-auto flex justify-between items-center max-w-2xl p-4 gap-4 text-center">
          {["Projects", "Technologies", "Certificates"].map((item) => (
            <p
              key={item}
              className={`py-1 cursor-pointer ${
                tab === item ? "font-semibold border-b border-b-[#5651e5]" : ""
              }`}
              onClick={() => setTab(item as any)}
            >
              {item}
            </p>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-8 w-full max-h-screen overflow-y-auto rounded-xl border border-gray-700 p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
