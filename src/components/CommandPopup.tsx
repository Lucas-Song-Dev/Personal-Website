"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { COMMANDS } from "@/lib/terminalCommandRegistry";

export type { CommandDef } from "@/lib/terminalCommandRegistry";
export { COMMANDS } from "@/lib/terminalCommandRegistry";

interface CommandPopupProps {
  highlightIndex: number;
  onSelect: (cmd: string) => void;
  filter?: string;
}

export default function CommandPopup({ highlightIndex, onSelect, filter }: CommandPopupProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = filter
    ? COMMANDS.filter(
        (c) =>
          c.cmd.startsWith(filter.toLowerCase()) ||
          c.syntax.startsWith(filter.toLowerCase())
      )
    : COMMANDS;

  const safeHighlight = Math.min(Math.max(0, highlightIndex), filtered.length - 1);

  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.children[safeHighlight] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [safeHighlight]);

  if (filtered.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-auto absolute bottom-full left-0 mb-2 w-full max-w-2xl bg-black/95 border border-secondary/30 rounded-md overflow-hidden font-terminal shadow-2xl z-[210]"
    >
      <div className="px-3 py-2 border-b border-secondary/20 text-green-400 text-sm opacity-70 tracking-wide">
        available commands — click or use ↑↓ enter
      </div>
      <ul ref={listRef} className="max-h-64 overflow-y-auto">
        {filtered.map((c, i) => (
          <li
            key={c.cmd}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(c.cmd);
            }}
            className={`flex items-baseline gap-3 px-3 py-2 cursor-pointer transition-colors ${
              i === safeHighlight
                ? "bg-secondary/20 text-secondary"
                : "text-gray-300 hover:bg-secondary/10 hover:text-secondary"
            }`}
          >
            <span className="text-secondary w-20 shrink-0 text-sm">{c.cmd}</span>
            <span className="text-gray-500 w-44 shrink-0 hidden sm:block text-sm">{c.syntax}</span>
            <span className="text-gray-400 text-sm">{c.description}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
