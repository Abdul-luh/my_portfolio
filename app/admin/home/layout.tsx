import React from "react";
import Navbar from "@/app/components/general/Navbar";

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
