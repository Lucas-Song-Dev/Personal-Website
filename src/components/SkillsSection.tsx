import React from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { TerminalSectionHeading } from "@/components/sections/TerminalSectionHeading";
import { TechBadge } from "@/components/sections/TechBadge";

interface SkillsSectionProps {
  inTerminal?: boolean;
}

export default function SkillsSection({ inTerminal }: SkillsSectionProps) {
  const skills = [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "HTML & CSS",
    "SQL",
    "React",
    "Redux",
    "Next.js",
    "Node.js",
    "Express",
    "FastAPI",
    "MongoDB",
    "AWS (DynamoDB, Lambda, ECR, EKS)",
    "Datadog",
    "Docker",
    "Heroku",
    "Git",
    "Jira",
    "Jest",
    "Pytest",
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <SectionShell sectionId="skills" inTerminal={inTerminal} fillViewport={false}>
      <TerminalSectionHeading
        inTerminal={inTerminal}
        commandLine="cat ~/.skills"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate={inTerminal ? "show" : undefined}
        whileInView={inTerminal ? undefined : "show"}
        viewport={inTerminal ? undefined : { once: true }}
        className="flex flex-wrap gap-3"
      >
        {skills.map((skill) => (
          <motion.span key={skill} variants={item} className="inline-flex">
            <TechBadge size="chip">{skill}</TechBadge>
          </motion.span>
        ))}
      </motion.div>
    </SectionShell>
  );
}
