import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";
interface ProjectItemProps {
  title: string;
  bgImg: string | StaticImageData;
  ProjectUrl: string;
  technologies: string;
}

const ProjectItem = ({
  title,
  bgImg,
  ProjectUrl,
  technologies,
}: ProjectItemProps) => {
  return (
    <div className="relative flex items-center justify-center h-auto w-full shadow-xl dark:shadow-gray-700 shadow-gray-400 rounded-xl p-4 group hover:bg-gradient-to-r from-[#000000db] to-[#00000070]">
      <Image
        src={bgImg}
        width={500}
        height={300}
        className="rounded-xl group-hover:opacity-30"
        alt="product image"
      />
      <div className="hidden group-hover:block absolute top-[50%] left-[50%] text-white translate-x-[-50%] translate-y-[-50%]">
        <h3 className="text-2xl lg:text-xl tracking-widest text-center">
          {title}
        </h3>
        <p className="pb-4 pt-2 text-center">{technologies}</p>
        <Link href={ProjectUrl}>
          <p className="text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer">
            More Info
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProjectItem;
