"use client";
import React from "react";

import AnalyticsDashboard from "@/app/components/adminComponents/Analytics";

const AdminHome = () => {
  return (
    <div className="w-full h-screen text-white">
      <div className="max-w-[1200px] h-[0%] pt-4 m-auto">
        <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default AdminHome;
