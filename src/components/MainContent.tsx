"use client";

import React, { useState, useRef, useEffect } from "react";
import { MobileNavigation } from "./NavigationMenu";
import TerminalShell, { TerminalShellHandle } from "./TerminalShell";
import { motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

interface Line {
  from: Point;
  to: Point;
}

/** Distinct hues for pointer SVGs and drag strokes (not gradients / spheres). */
const CURSOR_COLORS = [
  "#22d3ee", // cyan
  "#e879f9", // fuchsia
  "#60a5fa", // blue
  "#4ade80", // green
  "#fb923c", // orange
  "#f472b6", // pink
];

function CursorPointerIcon({
  color,
  size,
}: {
  color: string;
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "block", filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.45))" }}
      aria-hidden
    >
      <path
        d="M5 2.5 5 19.5 10.2 14.3 14.5 22.5 17.2 20.8 13 12.8 20.5 12.8 5 2.5z"
        fill={color}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CursorTrail: React.FC = () => {
  const [trail, setTrail] = useState<{ point: Point; timestamp: number }[]>([]);
  const [lines, setLines] = useState<
    { line: Line; color: string; timestamp: number }[]
  >([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<Point | null>(null);
  const [lastDrawTime, setLastDrawTime] = useState<number>(0);
  const strokeColorIdxRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      setTrail((prev) =>
        [
          ...prev,
          { point: { x: e.clientX, y: e.clientY }, timestamp: now },
        ].slice(-10)
      );

      if (dragging && lastPos && now - lastDrawTime > 50) {
        const idx = strokeColorIdxRef.current % CURSOR_COLORS.length;
        strokeColorIdxRef.current =
          (strokeColorIdxRef.current + 1) % CURSOR_COLORS.length;
        setLines((prev) => [
          ...prev,
          {
            line: { from: lastPos, to: { x: e.clientX, y: e.clientY } },
            color: CURSOR_COLORS[idx],
            timestamp: now,
          },
        ]);
        setLastDrawTime(now);
      }
      setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      setDragging(true);
      setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setDragging(false);
      setLastPos(null);
      setTimeout(() => setLines([]), 500);
    };

    const interval = setInterval(() => {
      const now = Date.now();
      setLines((prev) => prev.filter((line) => now - line.timestamp < 500));
      setTrail((prev) =>
        prev.filter((trailPoint) => now - trailPoint.timestamp < 500)
      );
    }, 50);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, lastPos, lastDrawTime]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {trail.map(({ point, timestamp }, index) => {
        const fade = Math.max(0, (500 - (Date.now() - timestamp)) / 500);
        const hue = CURSOR_COLORS[index % CURSOR_COLORS.length];
        const size = Math.max(16, 30 - index * 1.4);
        return (
          <div
            key={`${timestamp}-${point.x}-${point.y}-${index}`}
            style={{
              position: "absolute",
              left: point.x,
              top: point.y,
              transform: "translate(-2px, -2px)",
              opacity: fade,
              transition: "opacity 0.35s ease-out",
              pointerEvents: "none",
            }}
          >
            <CursorPointerIcon color={hue} size={size} />
          </div>
        );
      })}
      {lines.map(({ line, color, timestamp }, index) => (
        <svg
          key={`line-${timestamp}-${index}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
          }}
        >
          <line
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            opacity={Math.max(0, (500 - (Date.now() - timestamp)) / 500)}
          />
        </svg>
      ))}
    </div>
  );
};

// Map section ids to the commands that reveal them
const SECTION_COMMANDS: Record<string, string> = {
  about:    "whoami",
  projects: "projects",
  work:     "work",
  skills:   "skills",
  contact:  "contact",
  resume:   "resume",
};

const MainContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("about");
  const terminalRef = useRef<TerminalShellHandle>(null);

  const runCommand = (sectionId: string) => {
    const cmd = SECTION_COMMANDS[sectionId] ?? sectionId;
    terminalRef.current?.runCommand(cmd);
    if (SECTION_COMMANDS[sectionId]) {
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-text"
    >
      {/* Terminal shell fills the fixed viewport */}
      <TerminalShell ref={terminalRef} />

      {/* Overlay elements rendered on top */}
      <MobileNavigation activeSection={activeSection} runCommand={runCommand} />

      {/* Cursor trail last so it's always on top */}
      <CursorTrail />
    </motion.div>
  );
};

export default MainContent;
