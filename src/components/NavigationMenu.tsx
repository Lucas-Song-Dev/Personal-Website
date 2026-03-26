import React from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  title: string;
}

interface NavigationMenuProps {
  activeSection: string;
  runCommand: (sectionId: string) => void;
}

export default function NavigationMenu({
  activeSection,
  runCommand,
}: NavigationMenuProps) {
  const navItems: NavItem[] = [
    { id: "about",    title: "0. ABOUT" },
    { id: "projects", title: "1. PROJECTS" },
    { id: "work",     title: "2. WORK" },
    { id: "skills",   title: "3. SKILLS" },
    { id: "contact",  title: "4. CONTACT" },
    { id: "resume",   title: "5. RESUME" },
  ];

  return (
    <nav className="fixed top-8 right-8 z-50 hidden md:block">
      <ul className="flex items-center space-x-8 text-responsive-h6">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => runCommand(item.id)}
              className={cn(
                "relative transition-colors duration-300 hover:text-secondary font-terminal",
                activeSection === item.id ? "text-secondary" : "text-text"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileNavigation({
  activeSection,
  runCommand,
}: NavigationMenuProps) {
  const sections = ["about", "projects", "work", "skills", "contact", "resume"];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end md:hidden">
      <div className="flex flex-col items-end space-y-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => runCommand(section)}
            className="block"
            aria-label={`navigate to ${section}`}
          >
            <div
              className={cn(
                "nav-dot",
                activeSection === section ? "active" : ""
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
