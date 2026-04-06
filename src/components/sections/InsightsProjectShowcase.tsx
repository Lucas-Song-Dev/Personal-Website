"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/projects";
import { TechBadge } from "@/components/sections/TechBadge";
import { ProjectCardFooterLinks } from "@/components/sections/ProjectCardFooterLinks";
import { ProjectCardMedia } from "@/components/sections/ProjectCardMedia";

export function InsightsProjectShowcase({
  insightsProject,
  inTerminal,
}: {
  insightsProject: Project;
  inTerminal?: boolean;
}) {
  const insightsRef = useRef<HTMLDivElement>(null);
  const insightsImageRef = useRef<HTMLDivElement>(null);
  const insightsTitleRef = useRef<HTMLDivElement>(null);
  const insightsContentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: insightsRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const insightsInView = useInView(insightsRef, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={insightsRef}
      key={insightsProject.title}
      {...(inTerminal && {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0, duration: 0.35 },
      })}
      className={`md:col-span-2 lg:col-span-3 ${inTerminal ? "" : "min-h-[80vh] md:min-h-[90vh]"} relative overflow-visible`}
    >
      <motion.div
        style={inTerminal ? {} : { opacity }}
        className={`w-full h-full relative z-20 ${inTerminal || insightsInView ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="relative w-full h-full py-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="w-full md:w-3/4 space-y-5">
              <motion.div
                ref={insightsTitleRef}
                initial={{ opacity: 0, x: "100%" }}
                whileInView={{ opacity: 1, x: "0%" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h3 className="text-4xl md:text-5xl font-terminal text-secondary">
                  {insightsProject.title}
                </h3>
              </motion.div>

              <motion.div
                ref={insightsImageRef}
                style={{ y: imageY }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full h-64 md:h-auto md:aspect-video rounded-xl overflow-hidden bg-black/40"
              >
                {insightsProject.mediaType === "video" ? (
                  <>
                    <video
                      src={insightsProject.image}
                      className={`h-full w-full object-contain ${
                        insightsProject.mobileImage ? "hidden md:block" : ""
                      }`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                    />
                    {insightsProject.mobileImage ? (
                      <Image
                        src={insightsProject.mobileImage}
                        alt={insightsProject.title}
                        fill
                        className="md:hidden object-cover"
                        priority
                      />
                    ) : null}
                  </>
                ) : (
                  <Image
                    src={insightsProject.image}
                    alt={insightsProject.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {insightsProject.fullDescription}
              </motion.p>
            </div>

            <motion.div
              ref={insightsContentRef}
              initial={{ opacity: 0, x: "-100%" }}
              whileInView={{ opacity: 1, x: "0%" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
              className="w-full md:w-1/4 md:pt-16 space-y-6"
            >
              {insightsProject.keyFeatures && (
                <div>
                  <h4 className="text-xl font-terminal text-secondary mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {insightsProject.keyFeatures.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-secondary mr-2">▹</span>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {insightsProject.technologies.map((tech) => (
                  <TechBadge key={tech} size="md">
                    {tech}
                  </TechBadge>
                ))}
              </div>

              <ProjectCardFooterLinks
                variant="expanded"
                link={insightsProject.link}
                github={insightsProject.github}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {!inTerminal && (
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
          style={{
            pointerEvents: insightsInView ? "none" : "auto",
            display: insightsInView ? "none" : "block",
          }}
        >
          <Card className="bg-black/60 border-secondary/20 overflow-hidden h-full flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-black/40">
              <ProjectCardMedia
                project={insightsProject}
                imageClassName="object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-white font-terminal">
                {insightsProject.title}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {insightsProject.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {insightsProject.technologies.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>
            </CardContent>
            <ProjectCardFooterLinks
              link={insightsProject.link}
              github={insightsProject.github}
            />
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
