"use client";
import skills from "../../data/skill";
import Image, { StaticImageData } from "next/image";
import Card from "../Card";
import axios from "axios";
import { useEffect, useState } from "react";
import spinner from "@/public/Spinner@1x-1.0s-200px-200px.svg";

interface MySkills {
	_id: string;
	img: StaticImageData;
	title: string;
}

const AllTechnologies = () => {
	const [technologies, setTechnologies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [err, setErr] = useState(false);

	const fetchReq = async () => {
		try {
			setIsLoading(true);
			setErrMsg("");
			setErr(false);
			const res = await axios.get("/api/technologies");
			const data = await res.data;
			setTechnologies(data.technologies);
			if (data.error) {
				setErr(true);
				setErrMsg(data.error);
			}
			setIsLoading(false);
			console.log(data);
		} catch (error: any) {
			console.error(error);
			setErr(true);
			setErrMsg(error.message);
		}
	};
	useEffect(() => {
		fetchReq();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			const res = await axios.delete(`/api/technologies/${id}`);
			// const updatteTechnologies =
			const data = await res.data;
			console.log(data);
		} catch (error: any) {
			console.error(error);
		}
	};

	// const handleUpdate = async (id: string) => {
	// 	try {
	// 		const res = await axios.put(`/api/technologies/${id}`,);
	// 		// const updatteTechnologies =
	// 		const data = await res.data;
	// 		console.log(data);
	// 	} catch (error: any) {
	// 		console.error(error);
	// 	}
	// };

	return (
		<section id="AllTechnologies" className={"w-full  p-4"}>
			{/* <p className="text-xl tracking-widest uppercase text-[#5651e5]">
				Technologies
			</p> */}
			<div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center">
				<div className="grid  gap-8">
					{technologies &&
						technologies.map((tech: MySkills) => {
							return (
								// <Card key={skill.id} imgProp={skill.img} text={skill.title} />
								<Card
									key={tech._id}
									id={tech._id}
									handleDelete={handleDelete}
									text={tech.title}
								/>
							);
						})}
					{isLoading && (
						<Image
							src={spinner}
							alt="loading..."
							width={250}
							height={250}
							className="w-full mx-auto"
						/>
					)}
					{!technologies && err && (
						<div className="text-xl capitalize">
							Sorry, an error occurred, try to{" "}
							<span
								className="font-bold underline cursor-pointer "
								onClick={(e) => fetchReq()}>
								refresh🔄{" "}
							</span>
							<p className="text-red-700">{errMsg}</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default AllTechnologies;
