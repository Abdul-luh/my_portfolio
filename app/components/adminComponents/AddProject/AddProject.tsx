"use client";
import React, { useState } from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import { StaticImageData } from "next/image";

export default function AddProject() {
	const [textInputValue, setTextInputValue] = useState({
		projectname: "",
		PojectHeader: "",
		repoLink: "",
		demoLink: "",
	});
	const [displayImage, setDisplayImage] = useState(null);
	const [textArea, setTextArea] = useState("");
	const [checkboxValue, setCheckboxValue] = useState("");

	const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTextInputValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCheckboxValue(e.target.name);
	};

	interface MySkills {
		id: number;
		img: StaticImageData;
		skill: string;
	}
	return (
		<div
			id="AddProject"
			className="md:col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
			<div className="p-4">
				<form>
					<div className="grid md:grid-cols-2 gap-4 w-full py-2">
						<InputComponent
							htmlLabelFor="projectName"
							inputType="text"
							htmlLabel="Project Name"
							inputValue={textInputValue}
							setValue={handleTextInput}
						/>
						<InputComponent
							htmlLabelFor="PojectHeader"
							inputType="text"
							htmlLabel="Poject header"
							inputValue={textInputValue}
							setValue={handleTextInput}
						/>
					</div>
					<InputComponent
						htmlLabelFor="repoLink"
						inputType="text"
						htmlLabel="Reopsitory Link"
						inputValue={textInputValue}
						setValue={handleTextInput}
					/>
					<InputComponent
						htmlLabelFor="demoLink"
						inputType="text"
						htmlLabel="demo link"
						inputValue={textInputValue}
						setValue={handleTextInput}
					/>
					<div className="flex flex-col py-2">
						<label htmlFor="emailBody" className="uppercase text-sm py-2 flex">
							Message
						</label>
						<textarea
							className="border-2 rounded-lg p-3 border-gray-300"
							name="emailBody"
							id="emailBody"
							rows={10}></textarea>
					</div>
					<div className="grid md:grid-cols-2 gap-4 px-2">
						{skills.map((skill: MySkills) => {
							return (
								<InputComponent
									key={skill.id}
									htmlLabelFor={skill.skill}
									inputType="checkbox"
									htmlLabel={skill.skill}
									inputValue={checkboxValue}
									setValue={handleCheckBox}
								/>
							);
						})}
					</div>
					<InputComponent
						htmlLabelFor="displayImage"
						htmlLabel="Upload Image"
						inputType="file"
						inputValue={displayImage}
						setValue={handleTextInput}
					/>
					<button className="w-full p-4 text-gray-100 mt-4">
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
}
