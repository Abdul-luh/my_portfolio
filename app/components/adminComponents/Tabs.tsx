// components/Tabs.tsx
"use client";

import { useState } from "react";
import { useAdminUI } from "@/app/context/AdminAuth/AdminUIContext";
import TechnologyForm from "./forms/TechnologyForm";
import ProjectForm from "./forms/ProjectForm";
import CertificateForm from "./forms/CertificateForm";
import TechnologyList from "./Add/TechnologyList";
import CertificateList from "./Add/CertificateList";
import ProjectList from "./Add/ProjectList";

export default function Tabs() {
  const [tab, setTab] = useState<"Technologies" | "Projects" | "Certificates">(
    "Projects"
  );
  const { mode, setMode } = useAdminUI();

  const renderContent = () => {
    if (mode === "view") {
      switch (tab) {
        case "Technologies":
          return <TechnologyList />;
        case "Projects":
          return <ProjectList />;
        case "Certificates":
          return <CertificateList />;
        default:
          return null;
      }
    }

    if (tab === "Technologies") return <TechnologyForm />;
    if (tab === "Projects") return <ProjectForm />;
    if (tab === "Certificates") return <CertificateForm />;
    return null;
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex space-x-4 bg-gray-700 text-white px-4 py-2">
        {["Technologies", "Projects", "Certificates"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`${tab === t ? "underline" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1">{renderContent()}</div>
      {mode !== "view" && (
        <button className="mt-4 text-blue-400" onClick={() => setMode("view")}>
          Back to List
        </button>
      )}
    </div>
  );
}
