"use client";
import React, { useState } from "react";
import { MdUpdate, MdDelete, MdStar, MdStarBorder } from "react-icons/md";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface CardProps {
  text: string;
  id: string;
  header?: string;
  image?: string | StaticImageData;
  demoLink?: string;
  repoLink?: string;
  technologies?: Array<{ techName: string }> | string[];
  featured?: boolean;
  projectCount?: number;
  onToggleFeatured?: (id: string, current: boolean) => void;
  handleDelete?: (id: string) => Promise<void> | void;
  handleUpdate?: (id: string) => Promise<void> | void;
}

export default function Card({
  text,
  id,
  header,
  image,
  demoLink,
  repoLink,
  technologies = [],
  featured,
  projectCount,
  onToggleFeatured,
  handleDelete = async (id) => {
    console.log(id);
  },
  handleUpdate = async (id) => {
    console.log(id);
  },
}: CardProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData | undefined>(image);
  const isSvg = typeof imgSrc === "string" && imgSrc.endsWith(".svg");

  return (
    <div className="p-5 shadow-lg dark:shadow-gray-950/40 shadow-gray-200 hover:shadow-xl transition-all duration-200 w-full rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between group">
      {/* Top Section with optional thumbnail and featured badge */}
      <div>
        {image && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            {typeof onToggleFeatured === "function" && (
              <button
                type="button"
                onClick={() => onToggleFeatured(id, !!featured)}
                title={featured ? "Featured on Main Page (Click to unfeature)" : "Not featured (Click to feature)"}
                className={`absolute top-2 left-2 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-md !shadow-none border-0 cursor-pointer ${
                  featured
                    ? "!bg-amber-400 !text-gray-900"
                    : "!bg-black/60 !text-white/80 hover:!bg-black/80"
                }`}
              >
                {featured ? <MdStar size={16} className="text-amber-900" /> : <MdStarBorder size={16} />}
                <span>{featured ? "Featured" : "Standard"}</span>
              </button>
            )}

            {isSvg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgSrc as string}
                alt={text}
                className="max-h-24 max-w-[80%] object-contain"
                onError={() => setImgSrc("/images/portfolio-sample-mobile.png")}
              />
            ) : (
              <Image
                src={imgSrc || "/images/portfolio-sample-mobile.png"}
                alt={text}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
                className="object-cover object-top"
                onError={() => setImgSrc("/images/portfolio-sample-mobile.png")}
              />
            )}
          </div>
        )}

        {/* Title and subtitle */}
        <div className="flex items-start justify-between gap-2 mb-1">
          {header ? (
            <Link href={`/project/${id}`} className="min-w-0">
              <h3 className="uppercase text-sm sm:text-base font-bold truncate hover:text-[#5651e5] transition-colors">
                {text}
              </h3>
            </Link>
          ) : (
            <h3 className="uppercase text-sm sm:text-base font-bold truncate">
              {text}
            </h3>
          )}

          {typeof projectCount === "number" && (
            <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
              {projectCount} projects
            </span>
          )}
        </div>

        {header && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
            {header}
          </p>
        )}

        {/* Technologies chips if present */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 my-2">
            {technologies.slice(0, 4).map((tech: any, idx: number) => {
              const name = typeof tech === "string" ? tech : tech.techName;
              return (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-gray-200 dark:bg-gray-700 font-medium"
                >
                  {name}
                </span>
              );
            })}
            {technologies.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md text-gray-500">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer with Links and Actions */}
      <div className="flex items-center justify-between gap-2 pt-3 mt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noreferrer"
              title="Open Live Website / Vercel"
              className="flex items-center gap-1 text-xs text-[#5651e5] hover:underline font-semibold"
            >
              <span>Demo</span>
              <FaExternalLinkAlt size={10} />
            </a>
          )}
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noreferrer"
              title="Open GitHub Repository"
              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <FaGithub size={14} />
            </a>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            title="Update"
            onClick={() => handleUpdate(id)}
            className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors !shadow-none !bg-transparent border-0 cursor-pointer"
          >
            <MdUpdate size={22} />
          </button>
          <button
            type="button"
            title="Delete"
            onClick={() => handleDelete?.(id)}
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors !shadow-none !bg-transparent border-0 cursor-pointer"
          >
            <MdDelete size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
