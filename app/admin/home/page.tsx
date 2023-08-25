import Navbar from "@/app/components/Navbar";
import React from "react";

const page = () => {
	return (
		<div className="w-full h-screen">
			<Navbar />
			<div className="grid md:grid-cols-8">
				{/* ALL PROJECTS ON THE LEFT  */}
				<div></div>
				{/* RIGHT SECTION ON THE LEFT  */}
				<div></div>
			</div>
		</div>
	);
};

export default page;
