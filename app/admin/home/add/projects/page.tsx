import AddProject from "@/app/components/adminComponents/AddProject/AddProject";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <AddProject />
    </Suspense>
  );
}
