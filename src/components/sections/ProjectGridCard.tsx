"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/projects";
import { TechBadge } from "@/components/sections/TechBadge";
import { ProjectCardFooterLinks } from "@/components/sections/ProjectCardFooterLinks";

const mediaLinkClass =
  "text-xs text-black hover:text-secondary/70 transition-colors font-terminal";

export function ProjectGridCard({
  project,
  hoveredImage,
  setHoveredImage,
}: {
  project: Project;
  hoveredImage: string;
  setHoveredImage: (v: string) => void;
}) {
  return (
    <Card className="bg-black/60 border-secondary/20 overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={project.link}
          className={mediaLinkClass}
        >
          {project.imageHalf ? (
            <div className="relative w-full h-full flex">
              <div
                className={`h-full overflow-hidden relative transition-all duration-500 ${
                  hoveredImage === `${project.title}-first`
                    ? "w-full"
                    : hoveredImage === `${project.title}-second`
                      ? "w-0"
                      : "w-1/2"
                }`}
                onMouseEnter={() => setHoveredImage(`${project.title}-first`)}
                onMouseLeave={() => setHoveredImage("")}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div
                className={`h-full overflow-hidden relative transition-all duration-500 ${
                  hoveredImage === `${project.title}-second`
                    ? "w-full"
                    : hoveredImage === `${project.title}-first`
                      ? "w-0"
                      : "w-1/2"
                }`}
                onMouseEnter={() => setHoveredImage(`${project.title}-second`)}
                onMouseLeave={() => setHoveredImage("")}
              >
                <Image
                  src={project.imageHalf}
                  alt={project.title}
                  fill
                  className="object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transform hover:scale-110 transition-transform duration-500"
            />
          )}
        </Link>
      </div>
      <CardHeader>
        <CardTitle className="text-white font-terminal">{project.title}</CardTitle>
        <CardDescription className="text-gray-400">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>
      </CardContent>
      <ProjectCardFooterLinks link={project.link} github={project.github} />
    </Card>
  );
}
