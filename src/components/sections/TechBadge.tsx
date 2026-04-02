import React from "react";
import { cn } from "@/lib/utils";

export interface TechBadgeProps {
  children: React.ReactNode;
  /** `sm` / `md`: compact tags; `chip`: skills list with pkg prefix. */
  size?: "sm" | "md" | "chip";
  className?: string;
}

export function TechBadge({
  children,
  size = "sm",
  className,
}: TechBadgeProps) {
  if (size === "chip") {
    return (
      <span
        className={cn(
          "px-4 py-2 bg-secondary/20 text-secondary rounded-md font-terminal text-sm md:text-base hover:bg-secondary/30 transition-colors flex items-center gap-1",
          className
        )}
      >
        <span className="text-gray-500 text-xs">pkg:</span>
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "bg-secondary/20 text-secondary text-xs rounded-md font-terminal",
        size === "sm" ? "px-2 py-1" : "px-3 py-1",
        className
      )}
    >
      {children}
    </span>
  );
}
