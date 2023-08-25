import React from "react";
import Image, { StaticImageData } from "next/image";

export default function SkillsCard({ text, imgProp }: any) {
	return (
		<div>
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
		</div>
	);
}
