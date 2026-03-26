import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalAnimationProps {
  onAnimationComplete: () => void;
}

const HOST = "ec2-54-213-42-101.us-west-2.compute.amazonaws.com";
const IP = "172-31-14-88";
const PROMPT = `[ec2-user@ip-${IP} ~]$`;

export default function TerminalAnimation({
  onAnimationComplete,
}: TerminalAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(true);

  const terminalSteps = useMemo(
    () => [
      // Step 0 — the ssh command itself (typed out with animation)
      { text: `ssh -i "~/.ssh/lucas-key.pem" ec2-user@${HOST}`, delay: 1200, isCommand: true },
      // Step 1 — host authenticity warning
      {
        text: `The authenticity of host '${HOST}' cannot be established.\nED25519 key fingerprint is SHA256:dLucasSong/xK9mZ3HvQpR2wN7cBfYtUe.\nThis key is not known by any other names.\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes`,
        delay: 1400,
        isCommand: false,
      },
      // Step 2 — known hosts warning
      {
        text: `Warning: Permanently added '${HOST}' (ED25519) to the list of known hosts.`,
        delay: 800,
        isCommand: false,
      },
      // Step 3 — Amazon Linux MOTD banner
      {
        text: `\n       __|  __|_  )\n       _|  (     /   Amazon Linux 2\n      ___|\\__|___|  \n\nhttps://aws.amazon.com/amazon-linux-2/\n`,
        delay: 1000,
        isCommand: false,
      },
      // Step 4 — last login line
      {
        text: `Last login: Wed Mar 25 10:42:03 2026 from 68.174.55.203`,
        delay: 600,
        isCommand: false,
      },
      // Step 5 — run the portfolio script
      { text: `./portfolio.sh`, delay: 1000, isCommand: true },
      // Step 6 — loading output
      { text: `Loading Lucas Song's portfolio... done.`, delay: 700, isCommand: false },
    ],
    []
  );

  useEffect(() => {
    if (currentStep < terminalSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((s) => s + 1);

        if (currentStep === terminalSteps.length - 1) {
          setTimeout(() => {
            onAnimationComplete();
          }, 600);
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
          className="absolute bottom-12 right-0 flex items-center gap-2 text-responsive-h6 2xl:bottom-auto 2xl:top-20 opacity-60 hover:opacity-100 transition-opacity"
        >
          <span>Skip Animation</span>
        </button>
      )}

      {/* Step 0 — ssh command with typing animation */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-gray-500">$</span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="overflow-hidden whitespace-nowrap"
        >
          {terminalSteps[0].text}
        </motion.div>
      </div>

      {/* Steps 1-6 — fade in sequentially */}
      {terminalSteps.slice(1).map((step, i) => {
        const stepIndex = i + 1;
        return (
          <AnimatePresence key={stepIndex}>
            {currentStep >= stepIndex && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="whitespace-pre-wrap"
              >
                {step.isCommand ? (
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-green-400">{PROMPT}</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {step.text}
                    </motion.span>
                  </div>
                ) : (
                  <span className="text-gray-300">{step.text}</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {/* Blinking cursor after last step */}
      {currentStep >= terminalSteps.length && (
        <div className="flex gap-2">
          <span className="text-green-400">{PROMPT}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="inline-block w-2 h-5 bg-secondary align-middle"
          />
        </div>
      )}
    </section>
  );
}
