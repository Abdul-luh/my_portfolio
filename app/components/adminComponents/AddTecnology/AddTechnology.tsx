"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
// import skills from "../../data/skill";
// import { StaticImageData } from "next/image";
import axios from "axios";

export default function AddTechnology() {
	// const [technology, setTechnology] = useState({
	// 	name: "",
	// 	image: "",
	// });
	const [techName, setTechname] = useState("");
	const [techImage, setTechImage] = useState<File | null>(null);

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setTechImage(file); // Update the state with the selected image
	};

	const handleAddTechSubmitForm = async (
		e: React.ChangeEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const formData = new FormData();
		console.log(techImage);
		if (techImage && techName) {
			formData.append("image", techImage);
			formData.append("text", techName);
		}

		try {
			const resp = await axios.post("/api/addnewtechnology", formData);
			const res = await resp.data;
			console.log(res);
		} catch (error: any) {
			console.error("Error:", error.message);
		}
	};

	return (
		<div
			id="AddTechnology"
			className="md:col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
			<div className="p-4">
				<form onSubmit={handleAddTechSubmitForm}>
					<div className="grid md:grid-cols-2 gap-4 w-full py-2 items-end">
						<InputComponent
							htmlLabelFor="techName"
							inputType="text"
							htmlLabel="Technology Name"
							inputValue={techName}
							setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
								setTechname(e.target.value)
							}
						/>
						<InputComponent
							htmlLabelFor="image"
							htmlLabel="Upload logo"
							inputType="file"
							inputValue={null}
							setValue={handleImage}
						/>
					</div>

					<button className="w-full p-4 text-gray-100 mt-4">
						Add Technology
					</button>
				</form>
			</div>
		</div>
	);
}
