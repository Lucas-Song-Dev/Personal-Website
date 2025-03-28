import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import ASCIIText from "./ui/ASCIIText";

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40"
    >
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-900/30 to-transparent opacity-30"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 absolute top-0 left-0 w-full h-full"
      >
        <ASCIIText text="Lucas_Song   " enableWaves={true} asciiFontSize={8} />
        <div className="absolute left-20 top-40">
          <h2 className="text-responsive-h3 font-terminal text-secondary mb-6">
            FULL STACK DEVELOPER
          </h2>
          <p className="text-responsive-h5 max-w-2xl mb-8 opacity-90">
            Computer Engineering @ UBC
            <br />
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-secondary text-background hover:bg-secondary/90 px-8 py-6 rounded-md text-responsive-h6 font-medium"
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
