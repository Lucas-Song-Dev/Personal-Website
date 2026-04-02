import React from "react";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";

export interface ProjectCardFooterLinksProps {
  link: string;
  github?: string;
  /** `card` = small footer links; `expanded` = primary CTA buttons */
  variant?: "card" | "expanded";
}

export function ProjectCardFooterLinks({
  link,
  github,
  variant = "card",
}: ProjectCardFooterLinksProps) {
  if (variant === "expanded") {
    return (
      <div className="flex gap-4 pt-4 border-t border-secondary/20">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className="px-4 py-2 bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors font-terminal rounded-md z-10 relative"
        >
          View Project →
        </Link>
        {github && (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={github}
            className="px-4 py-2 border border-secondary/30 text-gray-400 hover:text-white hover:border-secondary/50 transition-colors font-terminal rounded-md z-10 relative"
          >
            GitHub →
          </Link>
        )}
      </div>
    );
  }

  return (
    <CardFooter className="flex justify-between border-t border-secondary/20 pt-4">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className="text-xs text-secondary hover:text-secondary/70 transition-colors font-terminal"
      >
        View Project →
      </Link>
      {github && (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={github}
          className="text-xs text-gray-400 hover:text-white transition-colors font-terminal"
        >
          GitHub →
        </Link>
      )}
    </CardFooter>
  );
}
