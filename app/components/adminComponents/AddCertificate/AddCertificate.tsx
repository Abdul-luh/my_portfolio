"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import { StaticImageData } from "next/image";

export default function AddCertificate() {
	const [textInputValue, setTextInputValue] = useState({
		certname: "",
		certImage: "",
	});
	const [displayImage, setDisplayImage] = useState(null);
	const [checkboxValue, setCheckboxValue] = useState("");

	const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTextInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCheckboxValue(e.target.value);
	};

	interface MySkills {
		id: number;
		img: StaticImageData;
		skill: string;
	}
	return (
		<div
			id="AddCertificate"
			className="md:col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
			<div className="p-4">
				<form>
					<div className="grid md:grid-cols-2 gap-4 w-full py-2">
						<InputComponent
							htmlLabelFor="certName"
							inputType="text"
							htmlLabel="Certificate Name"
							inputValue={textInputValue}
							setValue={handleTextInput}
						/>
					</div>

					<InputComponent
						htmlLabelFor="displayImage"
						htmlLabel="Upload Image"
						inputType="file"
						inputValue={displayImage}
						setValue={handleTextInput}
					/>
					<button className="w-full p-4 text-gray-100 mt-4">
						Add Certificate
					</button>
				</form>
			</div>
		</div>
	);
}
