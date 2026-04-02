import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SectionShellProps {
  /** Applied as `id` only when not embedded in the terminal (scroll/nav). */
  sectionId?: string;
  inTerminal?: boolean;
  /** When true and not `inTerminal`, section gets `min-h-screen`. Default true. */
  fillViewport?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    { sectionId, inTerminal, fillViewport = true, className, children },
    ref
  ) {
    return (
      <section
        ref={ref}
        {...(!inTerminal && sectionId ? { id: sectionId } : {})}
        className={cn(
          "flex flex-col justify-center section-shell",
          !inTerminal && fillViewport && "min-h-screen",
          className
        )}
      >
        <div className="section-inner">{children}</div>
      </section>
    );
  }
);
