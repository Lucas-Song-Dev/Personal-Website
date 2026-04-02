import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

const linkClass =
  "text-xs text-black hover:text-secondary/70 transition-colors font-terminal";

export function ProjectCardMedia({
  project,
  imageClassName = "object-cover transform hover:scale-110 transition-transform duration-500",
}: {
  project: Pick<Project, "title" | "image" | "link" | "mediaType" | "mobileImage">;
  imageClassName?: string;
}) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={project.link}
      className={`${linkClass} block relative h-full w-full`}
    >
      {project.mediaType === "video" ? (
        <>
          <video
            src={project.image}
            className="hidden md:block h-full w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <Image
            src={project.mobileImage ?? "documents/painpoint-1.png"}
            alt={project.title}
            fill
            className="md:hidden object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </>
      ) : (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={imageClassName}
        />
      )}
    </Link>
  );
}
