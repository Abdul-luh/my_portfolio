"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import axios from "axios";

export default function AddCertificate() {
	const [textValue, setTextValue] = useState("");
	const [image, setImage] = useState<File>();
	const [selectedImg, setSelectedImg] = useState("");

	const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTextValue(e.target.value);
	};

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setSelectedImg(URL.createObjectURL(file));
		setImage(file);
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formdata = new FormData();
		if (!image && !textValue) return "Please don't leave an empty field";
		formdata.append("image", image!);
		formdata.append("text", textValue);

		try {
			const resp = await axios.post("/api/addcertificate", formdata);
			const data = await resp.data;
			console.log(data);
		} catch (error: any) {
			console.error(error.message);
		}
	};
	return (
		<div
			id="AddCertificate"
			className="md:col-span-3 w-full h-auto shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl lg:p-4">
			<div className="p-4">
				<form onSubmit={handleSubmit}>
					<div className="grid md:grid-cols-2 gap-4 w-full py-2">
						<InputComponent
							htmlLabelFor="certName"
							inputType="text"
							htmlLabel="Certificate Name"
							inputValue={textValue}
							setValue={handleTextInput}
						/>
						<InputComponent
							htmlLabelFor="image"
							htmlLabel="Upload Image"
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
								width={250}
								height={250}
							/>
						</Link>
					)}
					<button className="w-full p-4 text-gray-100 mt-4">
						Add Certificate
					</button>
				</form>
			</div>
		</div>
	);
}
