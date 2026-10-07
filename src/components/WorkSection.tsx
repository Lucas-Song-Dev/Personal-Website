import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { TerminalSectionHeading } from "@/components/sections/TerminalSectionHeading";
import { TechBadge } from "@/components/sections/TechBadge";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  context?: string;
  description: string[];
  technologies: string[];
}
interface WorkSectionProps {
  inTerminal?: boolean;
}

export default function WorkSection({ inTerminal }: WorkSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const experiences: WorkExperience[] = [
    {
      id: "genies-fullstack-2025",
      company: "GENIES",
      position: "Full Stack Developer",
      period: "Jun 2025 – Jun 2026",
      location: "Los Angeles, CA · Remote",
      context: "AI avatar company partnered with Unity, NBPA, and UMG.",
      description: [
        "Designed a Python wrapper library to automatically catch and report pipeline failures at their exact origin, and personally implemented it across 3 teams' codebases despite no formal mandate.",
        "Built a real-time dashboard (React, DynamoDB, S3) surfacing 200+ daily assets via instant Slack failure alerts, eliminating manual cross-team failure hunting.",
        "Reduced asset generation time from 20 minutes to 7 minutes by refactoring a sequential build pipeline into parallel AWS Step Functions workflows.",
        "Engineered a multi-tier authorization system across the Convex backend, admin dashboard, and consumer app, enabling role-specific data access and operations that scaled to dozens of teams and hundreds of users.",
      ],
      technologies: [
        "Python",
        "React",
        "DynamoDB",
        "S3",
        "AWS Step Functions",
        "Convex",
        "Slack",
      ],
    },
    {
      id: "ibm-fullstack-intern-2024",
      company: "IBM",
      position: "Full Stack Intern",
      period: "Aug 2023 – Aug 2024",
      location: "Markham, ON · Hybrid",
      context: "Cloud Pak for AIOps",
      description: [
        "Built ~10 AI-powered features for Cloud Pak for AIOps incident management, reducing manual alert triage for Fortune 500 clients.",
        "Developed an internal debugging tool that reduced bug reproduction time by 85% by capturing and replaying client state and data.",
        "Partnered with design and QA to build and ship an incident management feature that filtered and surfaced the top 10–100 priority incidents from a pool of up to 600k concurrent incidents per client, owning the full-stack implementation.",
      ],
      technologies: ["AI/ML"],
    },
    {
      id: "ibm-qa-intern-2023",
      company: "IBM",
      position: "QA Intern",
      period: "May 2023 – Aug 2023",
      location: "Markham, ON · Hybrid",
      context: "Cloud Pak for AIOps",
      description: [
        "Migrated a 2-year-old end-to-end testing pipeline to Nightwatch.js (Selenium-based), modernizing test execution across thousands of tests and 5 browser combinations.",
        "Built a GitHub Actions workflow to auto-scan the DOM and regenerate tests using self-healing data-id selectors instead of brittle CSS and ID selectors, eliminating flaky cross-browser failures.",
      ],
      technologies: ["Nightwatch.js", "Selenium", "GitHub Actions"],
    },
  ];

  return (
    <SectionShell sectionId="work" inTerminal={inTerminal}>
      <TerminalSectionHeading inTerminal={inTerminal} commandLine="ls ~/work/" />

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            className="md:w-1/3 mb-6 md:mb-0"
            {...(inTerminal && {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0, duration: 0.35 },
            })}
          >
            <div className="sticky top-24 space-y-2 font-terminal">
              {experiences.map((experience, index) => (
                <button
                  key={experience.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    activeTab === index
                      ? "bg-secondary/20 text-secondary border-l-2 border-secondary"
                      : "hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {activeTab === index ? (
                    <span>
                      <span className="text-green-400 opacity-70">→ </span>
                      {experience.company}/
                      <span className="block text-xs mt-1 opacity-80">
                        {experience.position}
                      </span>
                    </span>
                  ) : (
                    <span>
                      <span className="opacity-50">$ cd </span>
                      {experience.company}/
                      <span className="block text-xs mt-1 opacity-60">
                        {experience.position}
                      </span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: inTerminal ? 8 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: inTerminal ? 0.35 : 0.3, delay: inTerminal ? 0.14 : 0 }}
            className="md:w-2/3"
          >
            <h3 className="text-responsive-h4 font-terminal">
              {experiences[activeTab].position}
              <span className="text-secondary">
                {" "}
                @ {experiences[activeTab].company}
              </span>
            </h3>

            <p className="text-gray-400 font-terminal">
              {experiences[activeTab].period}
            </p>
            <p className="text-gray-500 font-terminal text-sm mb-1">
              {experiences[activeTab].location}
            </p>
            {experiences[activeTab].context && (
              <p className="text-gray-400 mb-4">
                {experiences[activeTab].context}
              </p>
            )}

            <ul className="space-y-4 mb-6">
              {experiences[activeTab].description.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary mr-2">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
              {experiences[activeTab].technologies.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </motion.div>
        </div>
    </SectionShell>
  );
}
