import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalAnimationProps {
  onAnimationComplete: () => void;
}

export default function TerminalAnimation({
  onAnimationComplete,
}: TerminalAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(true);

  const terminalSteps = useMemo(
    () => [
      { text: "exec ./dLucas.dev", delay: 1000 },
      { text: "Server starting...", delay: 1000 },
      { text: "Server listening on http://localhost:5173", delay: 1500 },
      { text: "Loading portfolio...", delay: 1000 },
      { text: "Ready!", delay: 500 },
    ],
    []
  );

  useEffect(() => {
    if (currentStep < terminalSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);

        if (currentStep === terminalSteps.length - 1) {
          setTimeout(() => {
            onAnimationComplete();
          }, 500);
        }
      }, terminalSteps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, terminalSteps, onAnimationComplete]);

  const handleSkip = () => {
    setShowSkipButton(false);
    onAnimationComplete();
  };

  return (
    <section className="relative mx-4 h-[100dvh] overflow-hidden py-4 2xl:mx-40 2xl:py-28 flex flex-col gap-2 font-terminal text-secondary">
      {showSkipButton && (
        <button
          onClick={handleSkip}
          className="absolute bottom-12 right-0 flex items-center gap-2 text-responsive-h6 2xl:bottom-auto 2xl:top-20"
        >
          <span>Skip Animation</span>
        </button>
      )}

      <div className="flex gap-4">
        <div className="font-bold">myphz@archlinux:$</div>
        <AnimatePresence>
          <motion.div
            key={currentStep === 0 ? "typing" : "typed"}
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative h-fit w-fit"
            style={
              {
                "--text-length": "18",
                "--caret-color": "#69afff",
                "--delay": "500",
                "--speed": "10",
                "--disable-caret-after": "0.5",
              } as React.CSSProperties
            }
          >
            {currentStep >= 0 && terminalSteps[0].text}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {terminalSteps[1].text}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {terminalSteps[2].text}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {terminalSteps[3].text}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentStep >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {terminalSteps[4].text}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
