"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionShell } from "@/components/sections/SectionShell";
import { TerminalSectionHeading } from "@/components/sections/TerminalSectionHeading";
import { InsightsProjectShowcase } from "@/components/sections/InsightsProjectShowcase";
import { ProjectGridCard } from "@/components/sections/ProjectGridCard";

interface ProjectsSectionProps {
  inTerminal?: boolean;
}

export default function ProjectsSection({ inTerminal }: ProjectsSectionProps) {
  const [hoveredImage, setHoveredImage] = useState("");

  const insightsProjects = projects.filter((p) => p.isInsights);
  const otherProjects = projects.filter((p) => !p.isInsights);

  return (
    <SectionShell
      sectionId="projects"
      inTerminal={inTerminal}
      className="relative"
    >
      <TerminalSectionHeading
        inTerminal={inTerminal}
        commandLine="ls ~/projects/"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insightsProjects.map((insightsProject) => (
          <InsightsProjectShowcase
            key={insightsProject.title}
            insightsProject={insightsProject}
            inTerminal={inTerminal}
          />
        ))}

        {otherProjects.map((project, index) => {
          const cardMotion = inTerminal
            ? {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.35, delay: (index + 1) * 0.14 },
              }
            : {
                initial: { opacity: 0, y: 50 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: index * 0.1 },
                viewport: { once: true },
              };
          return (
            <motion.div key={project.title} {...cardMotion}>
              <ProjectGridCard
                project={project}
                hoveredImage={hoveredImage}
                setHoveredImage={setHoveredImage}
              />
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
