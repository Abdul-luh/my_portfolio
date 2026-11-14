"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface SkillsCardProps {
  text: string;
  imgProp: string | StaticImageData;
  projectCount?: number;
}

export default function SkillsCard({
  text,
  imgProp,
  projectCount,
}: SkillsCardProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(imgProp);
  const isSvg = typeof imgSrc === "string" && imgSrc.endsWith(".svg");

  return (
    <Link href={`/projects-page/${encodeURIComponent(text.toLowerCase())}`} className="block h-full">
      <div className="relative p-5 shadow-lg dark:shadow-gray-900 shadow-gray-300 hover:shadow-2xl hover:scale-105 ease-in duration-200 w-full h-full rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between group">
        {typeof projectCount === "number" && projectCount > 0 && (
          <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5651e5]/10 dark:bg-[#5651e5]/30 text-[#5651e5] dark:text-[#a09dff]">
            {projectCount} {projectCount === 1 ? "project" : "projects"}
          </span>
        )}

        <div className="flex items-center gap-4 my-auto">
          <div className="w-12 h-12 shrink-0 flex items-center justify-center p-1 rounded-xl bg-gray-100 dark:bg-gray-900/60 shadow-inner">
            {isSvg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgSrc as string}
                alt={text}
                className="w-8 h-8 object-contain"
                onError={() => setImgSrc("/images/skills/javascript.png")}
              />
            ) : (
              <Image
                src={imgSrc || "/images/skills/javascript.png"}
                width={40}
                height={40}
                alt={text}
                unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
                onError={() => setImgSrc("/images/skills/javascript.png")}
                className="w-8 h-8 object-contain"
              />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="uppercase text-sm sm:text-base font-bold tracking-wide truncate group-hover:text-[#5651e5] transition-colors">
              {text}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              View projects &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
