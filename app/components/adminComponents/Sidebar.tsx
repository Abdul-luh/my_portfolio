// components/Sidebar.tsx
"use client";

import { useAdminUI } from "@/app/context/AdminAuth/AdminUIContext";

export default function Sidebar() {
  const { setMode } = useAdminUI();

  return (
    <aside className="w-40 p-4 border-r border-gray-600">
      <button className="mb-4 block" onClick={() => setMode("view")}>
        View All
      </button>
      <button onClick={() => setMode("add")}>Add</button>
    </aside>
  );
}
