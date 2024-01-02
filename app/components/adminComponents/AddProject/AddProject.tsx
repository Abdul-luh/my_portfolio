"use client";
import React, { useEffect, useState } from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import { StaticImageData } from "next/image";
import axios from "axios";

export default function AddProject() {
	const [textInputValue, setTextInputValue] = useState({
		projectName: "",
		PojectHeader: "",
		repoLink: "",
		demoLink: "",
	});
	const [displayImage, setDisplayImage] = useState(null);
	const [textArea, setTextArea] = useState("");
	const [image, setImage] = useState<File | "">("");

	const [checkboxValue, setCheckboxValue] = useState<
		{
			name: string;
			checked: boolean;
		}[]
	>([]);

	const checkboxfield = skills.map((skill) => ({
		name: skill.skill,
		checked: false,
	}));

	useEffect(() => {
		setCheckboxValue(checkboxfield);
	}, []);

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files !== null) {
			setImage(files[0]);
		}
	};

	const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTextInputValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	// const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setCheckboxValue(!e.target.value);
	// };

	const handleAddform = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const checked = checkboxValue.filter((skill) => skill.checked);

		const newProject = {
			textInputValue,
			textArea,
			checked,
			image,
		};
		console.log(newProject);
		try {
			const response = await axios.post("/api/additem", newProject);
			const result = await response.data;
			console.log(result);
		} catch (error: any) {
			console.log(error);
			// setErr(error.message)
		}
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
				<form onSubmit={handleAddform}>
					<div className="grid md:grid-cols-2 gap-4 w-full py-2">
						<InputComponent
							htmlLabelFor="projectName"
							inputType="text"
							htmlLabel="Project Name"
							inputValue={textInputValue.projectName}
							setValue={handleTextInput}
						/>
						<InputComponent
							htmlLabelFor="PojectHeader"
							inputType="text"
							htmlLabel="Poject header"
							inputValue={textInputValue.PojectHeader}
							setValue={handleTextInput}
						/>
					</div>
					<InputComponent
						htmlLabelFor="repoLink"
						inputType="text"
						htmlLabel="Reopsitory Link"
						inputValue={textInputValue.repoLink}
						setValue={handleTextInput}
					/>
					<InputComponent
						htmlLabelFor="demoLink"
						inputType="text"
						htmlLabel="demo link"
						inputValue={textInputValue.demoLink}
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
							value={textArea}
							onChange={(e) => setTextArea(e.target.value)}
							rows={10}></textarea>
					</div>
					<div className="grid md:grid-cols-2 gap-4 px-2">
						{checkboxValue.map((skill: { name: string; checked: boolean }) => {
							return (
								<InputComponent
									key={skill.name}
									htmlLabelFor={skill.name}
									inputType="checkbox"
									htmlLabel={skill.name}
									inputValue={skill.checked}
									setValue={(e: React.ChangeEvent<HTMLInputElement>) => {
										if (skill.name === e.target.name) {
											const checked = checkboxValue.map((smth) =>
												smth.name === e.target.name
													? {
															name: skill.name,
															checked: skill.checked ? false : true,
													  }
													: smth
											);
											console.log(checked);
											setCheckboxValue(checked);
										}
									}}
								/>
							);
						})}
					</div>
					<InputComponent
						htmlLabelFor="displayImage"
						htmlLabel="Upload Image"
						inputType="file"
						inputValue={displayImage}
						setValue={handleImage}
					/>
					<button
						type="submit"
						className="w-full p-4 mt-4 bg-gradient-to-tr from-[#5651e5] to-[#709dff]">
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
}
