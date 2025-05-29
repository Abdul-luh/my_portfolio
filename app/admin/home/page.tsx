"use client";

import React, { useState } from "react";
import { useAdminUI } from "@/app/context/AdminAuth/AdminUIContext";
import AllProjects from "@/app/components/adminComponents/AllProjects/AllProjects";
import AllTechnologies from "@/app/components/adminComponents/AllTechnologies/AllTechnologies";
import AllCertificates from "@/app/components/adminComponents/AllCertificates/Allcertificates";
import AddProject from "@/app/components/adminComponents/AddProject/AddProject";
import AddTechnology from "@/app/components/adminComponents/AddTechology/AddTechnology";
import AddCertificate from "@/app/components/adminComponents/AddCertificate/AddCertificate";
import AnalyticsDashboard from "@/app/components/adminComponents/Analytics";

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
      <div className="max-w-[1200px] h-[0%] pt-4 m-auto">
        <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default AdminHome;
