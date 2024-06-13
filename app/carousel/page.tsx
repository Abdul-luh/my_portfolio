"use client";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
// import Image from "next/image";

import React, { useEffect, useState } from "react";

const imgs = [
	"/images/acme-solutions.png",
	"/images/acme.png",
	"/images/calculator.png",
	"/images/img01.jpg",
	"/images/img01.jpeg",
	"/images/segam.png",
	"/images/todo-list.png",
];

const dragBuffer = 30;
const springOptions = {
	type: "spring",
	mass: 3,
	stiffness: 400,
	damping: 50,
};

export default function SwipeCarousel() {
	const [dragging, setDragging] = useState(false);
	const [imgIdx, setImgIdx] = useState(0);
	const dragX = useMotionValue(0);
	const dragXProgress = useMotionValue(0);

	useMotionValueEvent(dragX, "change", (latest) => {
		if (typeof latest === "number" && dragging) {
			dragXProgress.set(latest);
		} else {
			dragXProgress.set(0);
		}
	});

	useEffect(() => {
		const intervalRef = setInterval(() => {
			const x = dragXProgress.get();
			if (x === 0) {
				setImgIdx((pv) => {
					if (pv === imgs.length - 1) {
						return 0;
					}
					return pv + 1;
				});
			}
		}, 1000 * 5);
		return () => clearInterval(intervalRef);
	});

	function handleDragStart() {
		setDragging(true);
	}
	function handleDragEnd() {
		setDragging(false);
		const x = dragX.get();
		if (x <= -dragBuffer && imgIdx < imgs.length - 1) {
			setImgIdx((pv) => pv + 1);
		} else if (x >= dragBuffer && imgIdx > 0) {
			setImgIdx((pv) => pv - 1);
		}
	}

	return (
		<div className="relative w-screen h-[50vh] md:h-screen overflow-hidden py-8">
			<motion.div
				drag="x"
				dragConstraints={{
					left: 0,
					right: 0,
				}}
				style={{
					x: dragXProgress,
				}}
				animate={{
					translateX: `-${imgIdx * 100}%`,
				}}
				transition={springOptions}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				className="flex items-center h-[400px] cursor-grab active:cursor-grabbing  ">
				<Images imgIdx={imgIdx} />
			</motion.div>
			<Dots imgIdx={imgIdx} setImgIdx={setImgIdx} />
		</div>
	);
}

function Images({ imgIdx }: { imgIdx: number }) {
	return (
		<>
			{imgs.map((img, idx) => (
				<motion.div
					key={idx}
					style={{
						backgroundImage: `url(${img})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
					animate={{
						scale: idx === imgIdx ? 0.9 : 0.7,
					}}
					transition={springOptions}
					className="aspect-video w-screen h-full shrink-0 rounded-xl bg-neutral-800 object-cover"
				/>
			))}
		</>
	);
}

function Dots({
	imgIdx,
	setImgIdx,
}: {
	imgIdx: number;
	setImgIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<div className="flex w-full justify-center items-center gap-2 mt-4">
			{imgs.map((_, idx) => (
				<button
					key={idx}
					onClick={() => setImgIdx(idx)}
					className={`h-3 w-3 rounded-full bg-white transition-colors ${
						idx === imgIdx ? "bg-white h-4 w-4" : "bg-neutral-500"
					}`}
				/>
			))}
		</div>
	);
}
