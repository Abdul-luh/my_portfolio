import React from "react";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-admin min-h-screen">
      {children}
    </div>
  );
}
