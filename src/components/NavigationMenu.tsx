import React from "react";
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  activeSection: string;
  runCommand: (sectionId: string) => void;
}

export function MobileNavigation({
  activeSection,
  runCommand,
}: NavigationMenuProps) {
  const sections = ["about", "projects", "work", "skills", "contact", "resume"];

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col items-end">
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
