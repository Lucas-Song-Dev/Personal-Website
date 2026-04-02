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
      period: "Jun 2025 - Present",
      description: [
        "Led development of a full stack real-time job monitoring dashboard that reduced debugging time by ~75% for 200+ concurrent AI generation jobs, providing live progress tracking and instant slack failure notifications",
        "Created KPI dashboard elevating feature progress to executives and board for strategic decisions",
        "Reduced asset generation time by 20% by implementing caching and parallel processing in our pipeline",
        "Engineered multi-tier authorization system across Convex backend, admin dashboard, and consumer app enabling role-specific data access and operations",
      ],
      technologies: ["React", "TypeScript", "Convex", "Google AI Gemini", "Node.js"],
    },
    {
      id: "ibm-fullstack-intern-2024",
      company: "IBM",
      position: "Full Stack Developer Intern",
      period: "Jul 2023 - Aug 2024",
      description: [
        "Built 40+ AI-powered features for Cloudpak4aiops incident management, reducing manual alert triage for Fortune 500 clients",
        "Championed an internal product that slashed bug reproduction time by 85% to read, store and replay client state and data when reporting a bug",
        "Owned end-to-end delivery of a critical feature supporting 600k active incidents simultaneously with granular role-based access control",
        "Reduced backlog of bugs by 40%, over 130 over the course of 16 months",
        "Created decks and performed client presentations and training for 100s of attendees",
      ],
      technologies: ["React", "Python", "Node.js", "AI/ML"],
    },
    {
      id: "ibm-qa-intern-2023",
      company: "IBM",
      position: "Quality Assurance Intern",
      period: "May 2023 - Jul 2023",
      description: [
        "Delivered a testing system twice as reliable by rebuilding the 2-year-old end-to-end testing pipeline using Nightwatch on Selenium to automate testing across different browsers",
        "Developed internal tooling to automate the creation of new end-to-end tests by recording the actions of users on multiple different devices and browsers reducing developer frustration",
      ],
      technologies: [
        "Nightwatch",
        "Selenium",
        "JavaScript",
        "Python",
        "Jira",
      ],
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
                    </span>
                  ) : (
                    <span>
                      <span className="opacity-50">$ cd </span>
                      {experience.company}/
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

            <p className="text-gray-400 font-terminal mb-4">
              {experiences[activeTab].period}
            </p>

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
