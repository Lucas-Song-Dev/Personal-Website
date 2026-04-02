"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TERMINAL_PROMPT } from "@/lib/terminalConstants";
import { getSshBootSteps } from "@/components/terminal/terminalBootSteps";
import { TERMINAL_CMD_CLASS, TERMINAL_OUT_CLASS } from "@/components/terminal/terminalLineClasses";

export function SshBootTyping({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const terminalSteps = useMemo(() => getSshBootSteps(), []);

  useEffect(() => {
    if (currentStep < terminalSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((s) => s + 1);

        if (currentStep === terminalSteps.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 600);
        }
      }, terminalSteps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, terminalSteps, onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div
      className={`relative mb-2 border-b border-secondary/20 pb-4 font-terminal ${TERMINAL_OUT_CLASS}`}
    >
      <button
        type="button"
        onClick={handleSkip}
        className={`absolute bottom-0 right-0 z-10 ${TERMINAL_CMD_CLASS} text-gray-500 opacity-60 hover:opacity-100 transition-opacity`}
      >
        Skip
      </button>

      <div className={`flex gap-2 flex-wrap items-baseline ${TERMINAL_CMD_CLASS}`}>
        <span className="text-gray-500">$</span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="overflow-hidden whitespace-nowrap text-secondary"
        >
          {terminalSteps[0].text}
        </motion.div>
      </div>

      {terminalSteps.slice(1).map((step, i) => {
        const stepIndex = i + 1;
        return (
          <AnimatePresence key={stepIndex}>
            {currentStep >= stepIndex && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="whitespace-pre-wrap text-gray-400"
              >
                {step.isCommand ? (
                  <div className={`flex gap-2 flex-wrap items-baseline ${TERMINAL_CMD_CLASS}`}>
                    <span className="text-green-400 shrink-0">{TERMINAL_PROMPT}</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="overflow-hidden whitespace-nowrap text-secondary"
                    >
                      {step.text}
                    </motion.span>
                  </div>
                ) : (
                  <span>{step.text}</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {currentStep >= terminalSteps.length && (
        <div className={`flex gap-2 items-baseline mt-1 ${TERMINAL_CMD_CLASS}`}>
          <span className="text-green-400 shrink-0">{TERMINAL_PROMPT}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="inline-block w-2 h-[1.1em] bg-secondary align-middle"
          />
        </div>
      )}
    </div>
  );
}
