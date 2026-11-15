import AddTechnology from "@/app/components/adminComponents/AddTechology/AddTechnology";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <AddTechnology />
    </Suspense>
  );
}
