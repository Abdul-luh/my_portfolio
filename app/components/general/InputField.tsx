"use client";
import React, { useState } from "react";
import skills from "../data/skill";

interface InputProps {
	inputType: string;
	htmlLabelFor: string;
	htmlLabel: string;
	inputValue: any;
	setValue: any;
}

function InputComponent({
	inputType,
	htmlLabelFor,
	htmlLabel,
	inputValue,
	setValue,
}: InputProps) {
	return (
		<div
			className={
				inputType === "checkbox"
					? "flex justify-end flex-row-reverse gap-4 text-left"
					: "flex flex-col"
			}>
			<label
				htmlFor={htmlLabelFor}
				className={
					// border uppercase text-sm py-2 rounded-lg p-3 w-full my-4  focus:outline-[#5651e5] border-gray-300
					"uppercase text-sm py-2"
				}>
				{htmlLabel}
			</label>
			<input
				id={htmlLabelFor}
				type={inputType}
				name={htmlLabelFor}
				// value={inputValue}
				onChange={setValue}
				// checked={
				// 	inputType === "checkbox" ? inputValue === htmlLabel : inputValue
				// }
				className={
					"border-2 text-black border-gray-300 focus:outline-[#5651e5] rounded-lg p-3 flex"
				}
			/>
		</div>
	);
}
export default InputComponent;
