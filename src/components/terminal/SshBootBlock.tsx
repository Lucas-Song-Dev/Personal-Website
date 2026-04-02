import React from "react";
import { TERMINAL_PROMPT } from "@/lib/terminalConstants";
import { getSshBootSteps } from "@/components/terminal/terminalBootSteps";
import { TERMINAL_CMD_CLASS, TERMINAL_OUT_CLASS } from "@/components/terminal/terminalLineClasses";

export function SshBootBlock() {
  const steps = getSshBootSteps();

  return (
    <div
      className={`flex flex-col gap-2 mb-2 border-b border-secondary/20 pb-4 font-terminal ${TERMINAL_OUT_CLASS}`}
    >
      <div className={`flex gap-2 flex-wrap items-baseline ${TERMINAL_CMD_CLASS}`}>
        <span className="text-gray-500">$</span>
        <span className="text-secondary break-all">{steps[0].text}</span>
      </div>
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className="whitespace-pre-wrap text-gray-400">
          {steps[i].text}
        </span>
      ))}
      <div className={`flex gap-2 flex-wrap items-baseline ${TERMINAL_CMD_CLASS}`}>
        <span className="text-green-400 shrink-0">{TERMINAL_PROMPT}</span>
        <span className="text-secondary">{steps[5].text}</span>
      </div>
      <span className="text-gray-400">{steps[6].text}</span>
    </div>
  );
}
