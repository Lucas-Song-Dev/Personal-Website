"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ASCIIText from "./ui/ASCIIText";

const PROMPT = "[ec2-user@ip-172-31-14-88 ~]$";

const heroSteps = [
  { command: "whoami", output: "Lucas Song", delay: 600 },
  { command: "cat about.txt", output: "Computer Engineering @ UBC\nFull Stack Developer", delay: 900 },
];

export default function HeroSection() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    let total = 0;
    heroSteps.forEach((step, i) => {
      total += step.delay;
      const t = setTimeout(() => setVisibleSteps(i + 1), total);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40"
    >
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-900/30 to-transparent opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 absolute top-0 left-0 w-full h-full"
      >
        {/* ASCII name art */}
        <ASCIIText text="Lucas_Song   " enableWaves={true} asciiFontSize={8} />

        {/* Haze layer between ASCII background and foreground content */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/60 via-background/40 to-background/70 backdrop-blur-[2px]" />

        {/* Terminal whoami / cat sequence */}
        <div className="absolute left-20 top-40 font-terminal flex flex-col gap-2 z-10">
          {heroSteps.slice(0, visibleSteps).map((step, i) => (
            <AnimatePresence key={i}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-1"
              >
                {/* command line */}
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-green-400 text-sm md:text-base">{PROMPT}</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="overflow-hidden whitespace-nowrap text-secondary"
                  >
                    {step.command}
                  </motion.span>
                </div>
                {/* output */}
                <div className="pl-0 whitespace-pre-wrap text-gray-300">
                  {i === 1 ? (
                    <>
                      <span className="text-responsive-h6 opacity-90">
                        Computer Engineering @ UBC
                      </span>
                      <br />
                      <h2 className="text-responsive-h1 font-terminal text-secondary">
                        FULL STACK DEVELOPER
                      </h2>
                    </>
                  ) : (
                    <span className="text-responsive-h6 opacity-90">{step.output}</span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ))}

          {/* blinking cursor on last active prompt */}
          {visibleSteps >= heroSteps.length && (
            <div className="flex gap-2 items-center mt-1">
              <span className="text-green-400 text-sm md:text-base">{PROMPT}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-2 h-5 bg-secondary align-middle"
              />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
