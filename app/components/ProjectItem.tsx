"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub, FaLaptopCode } from "react-icons/fa";

interface ProjectItemProps {
  title: string;
  bgImg: string | StaticImageData;
  ProjectUrl: string;
  technologies: string;
  demoLink?: string;
  repoLink?: string;
}

const GRADIENTS = [
  "from-indigo-900 via-slate-900 to-purple-950",
  "from-blue-950 via-slate-900 to-cyan-950",
  "from-emerald-950 via-slate-900 to-teal-950",
  "from-violet-950 via-slate-900 to-pink-950",
  "from-amber-950 via-slate-900 to-rose-950",
  "from-cyan-950 via-slate-900 to-blue-950",
];

function getProjectGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function extractRepoName(repoLink?: string, title?: string): string {
  if (repoLink && repoLink.includes("github.com/")) {
    const afterGithub = repoLink.split("github.com/")[1];
    const parts = afterGithub.split("/");
    if (parts[1]) return parts[1].replace(/\.git$/, "");
    if (parts[0]) return parts[0].replace(/\.git$/, "");
  }
  return (title || "project").toLowerCase().replace(/[^a-z0-9_-]/g, "-");
}

const ProjectItem = ({
  title,
  bgImg,
  ProjectUrl,
  technologies,
  demoLink,
  repoLink,
}: ProjectItemProps) => {
  const repoName = extractRepoName(repoLink, title);
  const primaryOgUrl = `https://opengraph.githubassets.com/1/Abdul-luh/${repoName}`;

  // Initial image source
  const initialImg =
    typeof bgImg === "string" && bgImg.trim() && !bgImg.includes("portfolio-sample-mobile")
      ? bgImg
      : primaryOgUrl;

  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(initialImg);
  const [useCardFallback, setUseCardFallback] = useState(false);
  const isVercel = typeof demoLink === "string" && demoLink.includes(".vercel.app");

  const handleImageError = () => {
    // If we were trying a different image (like an old url or microlink), try GitHub OpenGraph
    if (typeof imgSrc === "string" && imgSrc !== primaryOgUrl) {
      setImgSrc(primaryOgUrl);
    } else {
      // If even OpenGraph fails, switch to generative unique gradient card
      setUseCardFallback(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full shadow-xl dark:shadow-gray-900 shadow-gray-400 rounded-2xl overflow-hidden group bg-white/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
      {/* Vercel / Live Badge */}
      {demoLink && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold tracking-wider border border-white/20 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{isVercel ? "Vercel Hosted" : "Live"}</span>
        </div>
      )}

      {/* Screenshot / Preview Image or Generative Card */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
        {!useCardFallback ? (
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
            onError={handleImageError}
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br ${getProjectGradient(
              title
            )} text-white`}
          >
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-md mb-2 border border-white/20 shadow-lg">
              <FaLaptopCode size={28} className="text-blue-400" />
            </div>
            <h4 className="font-bold text-base line-clamp-2 max-w-[90%] drop-shadow">
              {title}
            </h4>
            <span className="text-[11px] text-gray-300 font-mono mt-1">
              Abdul-luh/{repoName}
            </span>
          </div>
        )}

        {/* Hover overlay with quick action buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-10">
          <h3 className="text-xl font-bold tracking-wide text-white drop-shadow-md mb-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 mb-4 max-w-[85%] truncate">
            {technologies}
          </p>

          <div className="flex items-center gap-3">
            <Link
              href={ProjectUrl}
              className="px-4 py-2 rounded-xl bg-white text-gray-900 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-gray-100 transition-colors"
            >
              Overview
            </Link>
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#5651e5] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#433ec7] transition-colors"
              >
                <span>Live Demo</span>
                <FaExternalLinkAlt size={10} />
              </a>
            )}
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noreferrer"
                title="View Code on GitHub"
                className="p-2.5 rounded-xl bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-colors"
              >
                <FaGithub size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom info bar visible by default */}
      <div className="w-full p-4 flex flex-col justify-between flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-base tracking-wide truncate group-hover:text-[#5651e5] transition-colors">
            {title}
          </h4>
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              title="GitHub Repo"
            >
              <FaGithub size={16} />
            </a>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
          {technologies}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;
