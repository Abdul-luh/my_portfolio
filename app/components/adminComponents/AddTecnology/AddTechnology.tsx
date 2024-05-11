"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
// import skills from "../../data/skill";
// import { StaticImageData } from "next/image";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function AddTechnology() {
	const [techName, setTechname] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [selectedImg, setSelectedImg] = useState("som");
	const [errMsg, setErrMsg] = useState("");
	const [msg, setMsg] = useState("");

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setSelectedImg(URL.createObjectURL(file));
		setImage(file); // Update the state with the selected image
	};

	const handleAddTechSubmitForm = async (
		e: React.ChangeEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const formData = new FormData();
		if (!image && !techName) return "Please don't leave an empty field";
		formData.append("image", image!);
		formData.append("text", techName);

		try {
			const res = await axios.post("/api/addnewtechnology", formData);
			const data = await res.data;
			if (data.error) {
				setErrMsg(data.error.message);
			}
			console.log(data);

			setMsg(data.message);
		} catch (error: any) {
			console.error("Error:", error.message);
			setErrMsg(error.message);
		}
	};

	return (
		<div
			id="AddTechnology"
			className="md:col-span-3 w-full h-auto shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl lg:p-4">
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
					{selectedImg && (
						<Link href={selectedImg}>
							<Image
								src={selectedImg}
								alt="selected logo"
								className="mx-auto"
								width={150}
								height={150}
							/>
						</Link>
					)}

					{errMsg && (
						<div
							className="relative bg-black/20 flex justify-center items-center"
							onClick={(e) => setErrMsg("")}>
							<FaTimes
								width={25}
								height={25}
								className="absolute top-4 right-3"
							/>
							<div className="bg-[bg-light] dark:bg-[bg-dark] dark:shadow-gray-700 shadow-gray-400 py-6 px-4 ">
								{errMsg}
							</div>
						</div>
					)}

					<button className="w-full p-4 text-gray-100 mt-4">
						Add Technology
					</button>
				</form>
			</div>
		</div>
	);
}
