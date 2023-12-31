import React from "react";
import Navbar from "@/app/components/Navbar";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<div>{children}</div>
		</>
	);
}
