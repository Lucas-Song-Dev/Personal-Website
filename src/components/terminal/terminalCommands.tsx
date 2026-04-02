"use client";

import React from "react";
import { motion } from "framer-motion";
import { COMMANDS } from "@/lib/terminalCommandRegistry";
import ProjectsSection from "@/components/ProjectsSection";
import WorkSection from "@/components/WorkSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import ResumeSection from "@/components/ResumeSection";
import { TERMINAL_OUT_CLASS } from "@/components/terminal/terminalLineClasses";

const fade = (children: React.ReactNode, delay = 0.3) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.4 }}
  >
    {children}
  </motion.div>
);

export function whoamiOutputNode(): React.ReactNode {
  return (
    <span className={`text-gray-200 font-terminal ${TERMINAL_OUT_CLASS}`}>
      Lucas Song
    </span>
  );
}

export function aboutOutputNode(): React.ReactNode {
  return (
    <div className="flex flex-col gap-1 font-terminal">
      <span className={`text-gray-400 opacity-90 ${TERMINAL_OUT_CLASS}`}>
        Computer Engineering @ UBC
      </span>
    </div>
  );
}

export function buildOutput(
  canonical: string | null,
  raw: string
): React.ReactNode {
  switch (canonical) {
    case "whoami":
      return fade(whoamiOutputNode());

    case "about":
      return fade(aboutOutputNode());

    case "help":
      return fade(
        <div className={`font-terminal ${TERMINAL_OUT_CLASS}`}>
          <div className="text-gray-400 mb-3">Available commands:</div>
          <div className="grid gap-2">
            {COMMANDS.map((c) => (
              <div key={c.cmd} className="flex gap-4 items-baseline">
                <span className="text-secondary w-20 shrink-0">{c.cmd}</span>
                <span className="text-gray-500 w-40 shrink-0 hidden sm:block">
                  {c.syntax}
                </span>
                <span className="text-gray-400">{c.description}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-gray-600">
            tip: click the prompt or press Tab to open the command picker
          </div>
        </div>
      );

    case "projects":
      return <ProjectsSection inTerminal />;
    case "work":
      return <WorkSection inTerminal />;
    case "skills":
      return <SkillsSection inTerminal />;
    case "contact":
      return <ContactSection inTerminal />;
    case "resume":
      return <ResumeSection inTerminal />;

    default:
      return fade(
        <span className={`text-red-400 font-terminal ${TERMINAL_OUT_CLASS}`}>
          bash: {raw}: command not found
        </span>
      );
  }
}
