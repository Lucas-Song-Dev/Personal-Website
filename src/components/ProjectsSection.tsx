"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github?: string;
  imageHalf?: string;
  isInsights?: boolean;
  fullDescription?: string;
  keyFeatures?: string[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    infrastructure?: string[];
  };
  projectHighlights?: string[];
}

export default function ProjectsSection() {
  const [hoveredImage, setHoveredImage] = useState<string>("");
  const insightsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const insightsImageRef = useRef<HTMLDivElement>(null);
  const insightsTitleRef = useRef<HTMLDivElement>(null);
  const insightsContentRef = useRef<HTMLDivElement>(null);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: insightsRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for different elements
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleX = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-50%"]);
  const contentX = useTransform(scrollYProgress, [0, 0.5, 1], ["-100%", "0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // In view detection for animations
  const insightsInView = useInView(insightsRef, { once: false, amount: 0.3 });
  const imageInView = useInView(insightsImageRef, { once: false, amount: 0.2 });
  const titleInView = useInView(insightsTitleRef, { once: false, amount: 0.2 });
  const contentInView = useInView(insightsContentRef, { once: false, amount: 0.2 });

  const projects: Project[] = [
    {
      title: "INSIGHTS",
      description:
        "AI-powered platform that analyzes Reddit discussions to identify product pain points and generate actionable recommendations for businesses.",
      fullDescription:
        "Enabled a local business to reconnect with inactive customers through targeted pain point analysis, driving a 50% increase in 6-month dormant user re-engagement by addressing critical product gaps. Scraped and analyzed 15,000+ Reddit posts across 50+ subreddits using automated NLP pipeline, processing 3.2M words of user feedback to generate actionable insights stored in MongoDB.",
      technologies: [
        "React",
        "Python/Flask",
        "MongoDB",
        "OpenAI/Claude API",
      ],
      techStack: {
        frontend: [
          "React 18 (Hooks, Context API)",
          "Vite",
          "SCSS",
          "Axios",
          "Vitest",
          "React Three Fiber (3D components)",
          "Lucide React (Icons)",
        ],
        backend: [
          "Python 3.11+",
          "Flask & Flask-RESTful",
          "MongoDB",
          "Reddit API (PRAW)",
          "Claude AI (Anthropic)",
          "NLP Pipeline: spaCy, transformers, scikit-learn, NLTK",
          "JWT Authentication",
          "Flask-CORS",
        ],
        infrastructure: [
          "MongoDB (data storage)",
          "JWT (authentication)",
          "Cookie-based sessions",
          "Rate limiting & security middleware",
        ],
      },
      keyFeatures: [
        "AI-Powered Discovery: Automatically finds and analyzes relevant discussions using Claude AI",
        "Advanced NLP Analysis: Sentiment analysis with 94% accuracy using spaCy and transformers",
        "Pain Point Detection: Identifies and categorizes user pain points by type and severity",
        "Smart Recommendations: Generates actionable recommendations using Claude AI",
        "Credits System: Fair usage system with credit-based operations",
        "Real-time Dashboard: Monitor analysis progress and results",
        "User Authentication: JWT-based authentication with secure cookie sessions",
        "Responsive Design: Works on desktop and mobile",
        "Error Handling: Error boundaries and graceful error recovery",
      ],
      projectHighlights: [
        "AI Integration: Claude AI for analysis and recommendations",
        "NLP Pipeline: Custom pipeline with 94% sentiment accuracy",
        "Full-Stack Architecture: RESTful API with React frontend",
        "User Management: Credit system, profiles, usage tracking",
        "Data Visualization: Interactive dashboards and filtering",
        "Testing: Comprehensive test coverage (Vitest, Pytest)",
        "Error Handling: Error boundaries and retry strategies",
        "Security: JWT authentication, secure headers, CORS",
      ],
      image: "documents/painpoint-1.png",
      link: "https://iinsightss.com/",
      github: "https://github.com/Lucas-Song-Dev/INSIGHT",
      isInsights: true,
    },
    {
      title: "2025 STK-market | WIP",
      description:
        "Heatmap stock market, useful for arbitrage backtesting momentum strategies",
      technologies: [
        "React",
        "Typescript",
        "CSS",
        "HTML",
        "Tailwind",
        "Python",
        "RESTful API",
      ],
      image: "documents/stk-market-1.png",
      imageHalf: "documents/stk-market-2.png",
      link: "https://github.com/Lucas-Song-Dev/StockHeatMap",
      github: "https://github.com/Lucas-Song-Dev/StockHeatMap",
    },
    {
      title: "2022 Pathfinding Visualizer",
      description:
        "grid-based visualizer to help your intuition on common pathfinding algorithms",
      technologies: ["React", "Node.js", "CSS", "HTML", "Tailwind"],
      image: "documents/SC_pathfinding.png",
      link: "https://lucas-song-dev.github.io/Shortest-Path/",
      github: "https://github.com/Lucas-Song-Dev/Shortest-Path",
    },
    {
      title: "2021 Old personal website",
      description: "My old website, proud of the animations and design",
      technologies: ["React", "Tailwind", "HTML"],
      image: "documents/Old_Website.png",
      link: "https://lucas-song-dev.github.io/Lucas02.Song/",
      github: "https://github.com/Lucas-Song-Dev/Lucas02.Song",
    },
    {
      title: "2022 Issue Hound",
      description:
        "Productivity tool for organizing tasks and ticketing system",
      technologies: ["React.js", "CSS", "HTML", "PostgreSQL"],
      image: "documents/issue_hound.png",
      link: "https://lucas-song-dev.github.io/Bug-Tracker/",
      github: "https://github.com/Lucas-Song-Dev",
    },
    {
      title: "2023 Asset_Ai",
      description:
        "Full-stack AI-powered asset generator to enhance digital communication | Taken down after heroku free trial",
      technologies: [
        "React.js",
        "CSS",
        "HTML",
        "MongoDB",
        "Express",
        "Google Auth",
        "OpenAI",
        "Heroku",
        "AWS",
      ],
      image: "documents/Asset_ai.png",
      link: "https://github.com/Lucas-Song-Dev/Asset_Ai",
      github: "https://github.com/Lucas-Song-Dev/Asset_Ai",
    },
  ];

  const insightsProject = projects.find((p) => p.isInsights);
  const otherProjects = projects.filter((p) => !p.isInsights);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40 py-20 relative"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-responsive-h2 font-terminal mb-12 border-b border-secondary/30 pb-4 flex flex-wrap items-baseline gap-2"
        >
          <span className="text-green-400 text-base md:text-lg opacity-70">[ec2-user@ip-172-31-14-88 ~]$</span>
          <span className="text-secondary">ls ~/projects/</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insightsProject && (
            <motion.div
              ref={insightsRef}
              key={insightsProject.title}
              className="md:col-span-2 lg:col-span-3 min-h-[80vh] md:min-h-[90vh] relative overflow-visible"
            >
              {/* Expanded inline view with parallax - always rendered, opacity controlled */}
              <motion.div
                style={{ opacity }}
                className={`w-full h-full relative z-20 ${insightsInView ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
                <div className="relative w-full h-full flex flex-col md:flex-row gap-6 md:gap-8 py-8">
                  {/* Large Image - loads in first with parallax */}
                  <motion.div
                    ref={insightsImageRef}
                    style={{ y: imageY }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full md:w-1/2 h-64 md:h-[600px] rounded-lg overflow-hidden"
                  >
                    <Image
                      src={insightsProject.image}
                      alt={insightsProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/2 flex flex-col justify-between">
                    {/* Title - slides in from top right */}
                    <motion.div
                      ref={insightsTitleRef}
                      initial={{ opacity: 0, x: "100%" }}
                      whileInView={{ opacity: 1, x: "0%" }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      className="mb-6"
                    >
                      <h3 className="text-4xl md:text-5xl font-terminal text-secondary mb-4">
                        {insightsProject.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {insightsProject.fullDescription}
                      </p>
                    </motion.div>

                    {/* Text Content - slides in from bottom left */}
                    <motion.div
                      ref={insightsContentRef}
                      initial={{ opacity: 0, x: "-100%" }}
                      whileInView={{ opacity: 1, x: "0%" }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      {insightsProject.keyFeatures && (
                        <div>
                          <h4 className="text-xl font-terminal text-secondary mb-3">
                            Key Features
                          </h4>
                          <ul className="space-y-2 max-h-64 overflow-y-auto">
                            {insightsProject.keyFeatures.slice(0, 5).map(
                              (feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-secondary mr-2">▹</span>
                                  <span className="text-gray-300 text-sm">
                                    {feature}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {insightsProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-secondary/20">
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={insightsProject.link}
                          className="px-4 py-2 bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors font-terminal rounded-md z-10 relative"
                        >
                          View Project →
                        </Link>
                        {insightsProject.github && (
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={insightsProject.github}
                            className="px-4 py-2 border border-secondary/30 text-gray-400 hover:text-white hover:border-secondary/50 transition-colors font-terminal rounded-md z-10 relative"
                          >
                            GitHub →
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Collapsed card view - shown when not in expanded view */}
              <motion.div
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-0"
                style={{ 
                  pointerEvents: insightsInView ? "none" : "auto",
                  display: insightsInView ? "none" : "block"
                }}
              >
                <Card className="bg-black/60 border-secondary/20 overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Link
                      target="_blank"
                      href={insightsProject.link}
                      className="text-xs text-black hover:text-secondary/70 transition-colors font-terminal"
                    >
                      <Image
                        src={insightsProject.image}
                        alt={insightsProject.title}
                        fill
                        className="object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
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
                        <span
                          key={tech}
                          className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-secondary/20 pt-4">
                    <Link
                      target="_blank"
                      href={insightsProject.link}
                      className="text-xs text-secondary hover:text-secondary/70 transition-colors font-terminal"
                    >
                      View Project →
                    </Link>
                    {insightsProject.github && (
                      <Link
                        target="_blank"
                        href={insightsProject.github}
                        className="text-xs text-gray-400 hover:text-white transition-colors font-terminal"
                      >
                        GitHub →
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {otherProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-secondary/20 overflow-hidden h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Link
                    target="_blank"
                    href={project.link}
                    className="text-xs text-black hover:text-secondary/70 transition-colors font-terminal"
                  >
                    {project.imageHalf ? (
                      <div className="relative w-full h-full flex">
                        {/* First image container */}
                        <div
                          className={`h-full overflow-hidden relative transition-all duration-500 
            ${
              hoveredImage === `${project.title}-first`
                ? "w-full"
                : hoveredImage === `${project.title}-second`
                ? "w-0"
                : "w-1/2"
            }`}
                          onMouseEnter={() =>
                            setHoveredImage(`${project.title}-first`)
                          }
                          onMouseLeave={() => setHoveredImage("")}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transform transition-transform duration-500 hover:scale-110"
                          />
                        </div>

                        {/* Second image container */}
                        <div
                          className={`h-full overflow-hidden relative transition-all duration-500 
            ${
              hoveredImage === `${project.title}-second`
                ? "w-full"
                : hoveredImage === `${project.title}-first`
                ? "w-0"
                : "w-1/2"
            }`}
                          onMouseEnter={() =>
                            setHoveredImage(`${project.title}-second`)
                          }
                          onMouseLeave={() => setHoveredImage("")}
                        >
                          <Image
                            src={project.imageHalf}
                            alt={project.title}
                            fill
                            className="object-cover transform transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </Link>
                </div>
                <CardHeader>
                  <CardTitle className="text-white font-terminal">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-secondary/20 pt-4">
                  <Link
                    target="_blank"
                    href={project.link}
                    className="text-xs text-secondary hover:text-secondary/70 transition-colors font-terminal"
                  >
                    View Project →
                  </Link>
                  {project.github && (
                    <Link
                      target="_blank"
                      href={project.github}
                      className="text-xs text-gray-400 hover:text-white transition-colors font-terminal"
                    >
                      GitHub →
                    </Link>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
