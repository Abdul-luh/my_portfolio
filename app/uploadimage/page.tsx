"use client";
import axios from "axios";
import { useState } from "react";
import InputComponent from "../components/general/InputField";
export default function Page() {
	const [file, setFile] = useState<File>();
	const [fVals, setFVals] = useState({
		f1: "",
		f2: "",
		f3: "",
		f4: "",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file) {
			console.log("please input an image file");
			return;
		}
		try {
			const data = new FormData();
			data.set("file", file);

			data.append("fieldname", JSON.stringify(fVals));
			console.log(JSON.stringify(fVals));

			// data.append("fieldname", "another thing");

			console.log(data.getAll("fieldname"));

			const res = await axios.post("api/upload/", data);
			console.log(res.data);

			// const res = await fetch("api/upload/", {
			// 	method: "POST",
			// 	body: data ,
			// });
			// console.log(res);
			// if (!res.ok) throw new Error(await res.text());
		} catch (err: any) {
			console.error(err);
		}
	};
	const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFVals((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	return (
		<main className="h-screen w-screen flex items-center justify-center">
			<form
				className="max-w-[800px] border shadow-xl rounded-lg mx-auto p-4"
				onSubmit={handleSubmit}>
				<InputComponent
					inputType="text"
					htmlLabelFor="f1"
					inputValue={fVals.f1}
					htmlLabel="f1"
					setValue={handleTextInput}
				/>
				<InputComponent
					inputType="text"
					htmlLabelFor="f2"
					inputValue={fVals.f2}
					htmlLabel="f2"
					setValue={handleTextInput}
				/>
				<InputComponent
					inputType="text"
					htmlLabelFor="f3"
					inputValue={fVals.f3}
					htmlLabel="f3"
					setValue={handleTextInput}
				/>
				<InputComponent
					inputType="text"
					htmlLabelFor="f4"
					inputValue={fVals.f4}
					htmlLabel="f4"
					setValue={handleTextInput}
				/>

				<div className="my-4">
					<input
						type="file"
						name="file"
						onChange={(e) => setFile(e.target.files?.[0])}
					/>
					<input
						type="submit"
						className="rounded-xl bg-[#5651e5] text-white p-2"
						value={"upload"}
					/>
				</div>
			</form>
		</main>
	);
}
