"use client";

import React from "react";
import { motion } from "framer-motion";
import { TERMINAL_PROMPT_DISPLAY } from "@/lib/terminalConstants";
import { cn } from "@/lib/utils";

export interface TerminalSectionHeadingProps {
  /** Text or node after the green prompt (e.g. `ls ~/projects/`). */
  commandLine: React.ReactNode;
  inTerminal?: boolean;
  /** `h2` = page section title with border; `h3` = smaller inline title (e.g. contact column). */
  level?: 2 | 3;
}

export function TerminalSectionHeading({
  commandLine,
  inTerminal,
  level = 2,
}: TerminalSectionHeadingProps) {
  if (inTerminal && level === 2) return null;

  const promptClass =
    level === 2
      ? "text-green-400 text-base md:text-lg opacity-70"
      : "text-green-400 text-sm opacity-70";

  const inner = (
    <>
      <span className={promptClass}>{TERMINAL_PROMPT_DISPLAY}</span>
      <span className="text-secondary">{commandLine}</span>
    </>
  );

  if (level === 3) {
    return (
      <h3
        className={cn(
          "text-responsive-h4 font-terminal mb-6 flex flex-wrap items-baseline gap-2"
        )}
      >
        {inner}
      </h3>
    );
  }

  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-responsive-h2 font-terminal mb-12 border-b border-secondary/30 pb-4 flex flex-wrap items-baseline gap-2"
    >
      {inner}
    </motion.h2>
  );
}
