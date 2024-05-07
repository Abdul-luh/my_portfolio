import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// import allProps from "./data/Properties";

export default function SkillsCard({
	text,
	imgProp,
}: {
	text: string;
	imgProp: StaticImageData;
}) {
	return (
		<div>
			<Link href={`/projects-page/${text}`}>
				<div className="p-6 shadow-xl hover:scale-105 ease-in duration-300 w-full h-full rounded-xl">
					<div className="grid grid-cols-2 gap-4 justify-center items-center">
						<div className="m-auto">
							<Image src={imgProp} width="60" height="60" alt={text} />
						</div>
						<div
							className="flex flex-col items-center justify-center
							">
							<h3 className="uppercase">{text}</h3>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
