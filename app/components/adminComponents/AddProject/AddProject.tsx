import React from "react";
import InputComponent from "../../InputField";
import skills from "../../data/skill";
import { StaticImageData } from "next/image";

export default function AddProject() {
	interface MySkills {
		id: number;
		img: StaticImageData;
		skill: string;
	}
	return (
		<div className="md:col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
			<div className="p-4">
				<form>
					<div className="grid md:grid-cols-2 gap-4 w-full py-2">
						<InputComponent
							htmlLabelFor="name"
							inputType="text"
							htmlLabel="Project Name"
							inputValue=""
						/>
						<InputComponent
							htmlLabelFor="PojectHeader"
							inputType="text"
							htmlLabel="Poject header"
							inputValue=""
						/>
					</div>
					<InputComponent
						htmlLabelFor="repoLink"
						inputType="text"
						htmlLabel="Reopsitory Link"
						inputValue=""
					/>
					<InputComponent
						htmlLabelFor="demo"
						inputType="text"
						htmlLabel="demo link"
						inputValue=""
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
					<div className="grid md:grid-cols-2 gap-4">
						{skills.map((skill: MySkills) => {
							return (
								<InputComponent
									key={skill.id}
									htmlLabelFor="demo"
									inputType="checkbox"
									htmlLabel={skill.skill}
									inputValue={false}
								/>
							);
						})}
					</div>
					<button className="w-full p-4 text-gray-100 mt-4">
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
}
