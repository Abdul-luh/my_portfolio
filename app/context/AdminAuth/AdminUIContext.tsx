// context/AdminUIContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "view" | "add";

interface AdminUIContextProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const AdminUIContext = createContext<AdminUIContextProps | undefined>(
  undefined
);

export function AdminUIProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("view");

  return (
    <AdminUIContext.Provider value={{ mode, setMode }}>
      {children}
    </AdminUIContext.Provider>
  );
}

export function useAdminUI() {
  const context = useContext(AdminUIContext);
  if (!context) {
    throw new Error("useAdminUI must be used within AdminUIProvider");
  }
  return context;
}
