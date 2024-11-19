"use client";
import Image, { StaticImageData } from "next/image";
import Card from "../Card";
import axios from "axios";
import spinner from "@/public/Spinner@1x-1.0s-200px-200px.svg";
import { useDispatch } from "react-redux";
import { AppDistpatch, useAppSelector } from "@/app/redux/store";
import {
	deleteTechnologies,
	fetchTechnologies,
} from "@/app/redux/features/technology";
import useFetchEffect from "@/app/utils/fetchTechnologies";
// import useFetchEffect from "../../../utils/fetchTechnologies";
// import { useEffect } from "react";

const AllTechnologies = () => {
	const { error, loading, technologies } = useAppSelector(
		(state) => state.TechnologyReducer
	);
	const dispatch = useDispatch<AppDistpatch>();

	// if (error || !technologies.length) {

	// }
	useFetchEffect({
		depArr: [technologies.length],
		fetchFunc: fetchTechnologies,
	});

	const handleDelete = async (id: string) => {
		// try {
		// 	const res = await axios.delete(`/api/technologies/${id}`);
		// 	// const updatteTechnologies =
		// 	const data = await res.data;
		// 	console.log(data);
		// } catch (error: any) {
		// 	console.error(error);
		// }
		deleteTechnologies(id);
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
					{!error &&
						technologies &&
						technologies.map((tech) => {
							return (
								<Card
									key={tech._id}
									id={tech._id}
									handleDelete={handleDelete}
									text={tech.title}
								/>
							);
						})}

					{loading && (
						<Image
							src={spinner}
							alt="loading..."
							width={250}
							height={250}
							title="loading..."
							className="w-full mx-auto"
						/>
					)}

					{(!technologies.length || error) && (
						<div className="text-xl capitalize">
							Sorry, an error occurred, try to{" "}
							<span
								className="font-bold underline cursor-pointer "
								onClick={(e) => dispatch(fetchTechnologies())}>
								refresh🔄{" "}
							</span>
							<p className="text-red-700">{error}</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default AllTechnologies;
