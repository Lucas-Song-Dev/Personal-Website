import React, { useState, useEffect } from "react";
import NavigationMenu, { MobileNavigation } from "./NavigationMenu";
import DragAnywhere from "./DragAnywhere";
import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import WorkSection from "./WorkSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import ResumeSection from "./ResumeSection";
import { motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

interface Line {
  from: Point;
  to: Point;
}

const colors = ["cyan", "magenta", "blue", "cyan", "magenta", "blue"];

const CursorTrail: React.FC = () => {
  const [trail, setTrail] = useState<{ point: Point; timestamp: number }[]>([]);
  const [lines, setLines] = useState<
    { line: Line; color: string; timestamp: number }[]
  >([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<Point | null>(null);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [lastDrawTime, setLastDrawTime] = useState<number>(0);

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
        // Cooldown of 50ms
        setLines((prev) => [
          ...prev,
          {
            line: { from: lastPos, to: { x: e.clientX, y: e.clientY } },
            color: colors[colorIndex],
            timestamp: now,
          },
        ]);
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
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
  }, [dragging, lastPos, colorIndex, lastDrawTime]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    >
      {trail.map(({ point, timestamp }, index) => (
        <div
          key={`${timestamp} + ${point.x} + ${index}`}
          style={{
            position: "absolute",
            left: point.x,
            top: point.y,
            width: `${50 - index}px`,
            height: `${50 - index}px`,
            background: `linear-gradient(45deg, ${
              colors[(colorIndex + index) % colors.length]
            }, transparent)`,
            borderRadius: "50%",
            filter: "blur(5px)",
            transform: "translate(-50%, -50%)",
            opacity: Math.max(0, (500 - (Date.now() - timestamp)) / 500),
            transition: "opacity 0.5s ease-out",
          }}
        />
      ))}
      {lines.map(({ line, color, timestamp }, index) => (
        <svg
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
        >
          <line
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke={color}
            strokeWidth="50"
            strokeLinecap="round"
            opacity={Math.max(0, (500 - (Date.now() - timestamp)) / 500)}
          />
        </svg>
      ))}
    </div>
  );
};

const MainContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "projects",
        "work",
        "skills",
        "contact",
        "resume",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-text"
    >
      <CursorTrail />
      <DragAnywhere />
      <NavigationMenu activeSection={activeSection} />
      <MobileNavigation activeSection={activeSection} />

      <main>
        <HeroSection />
        <ProjectsSection />
        <WorkSection />
        <SkillsSection />
        <ContactSection />
        <ResumeSection />
      </main>
    </motion.div>
  );
};

export default MainContent;
