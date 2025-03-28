import React from "react";
import { motion } from "framer-motion";
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
}

export default function ProjectsSection() {
  const projects: Project[] = [
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
      description: "My old website, really proud of the animations and design",
      technologies: ["React", "Tailwind", "HTML"],
      image: "documents/Old_Website.png",
      link: "https://lucas-song-dev.github.io/Lucas02.Song/",
      github: "https://github.com/Lucas-Song-Dev/Lucas02.Song",
    },
    // {
    //   title: 'Task Management App',
    //   description: 'Productivity tool for organizing tasks with drag-and-drop functionality and team collaboration.',
    //   technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    //   image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000',
    //   link: '#',
    //   github: 'https://github.com',
    // },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center px-4 md:px-20 2xl:px-40 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-responsive-h2 font-terminal text-secondary mb-12 border-b border-secondary/30 pb-4"
        >
          3. PROJECTS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
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
                    href={project.link}
                    className="text-xs text-black hover:text-secondary/70 transition-colors font-terminal"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform hover:scale-110 transition-transform duration-500"
                    />
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
                    href={project.link}
                    className="text-xs text-secondary hover:text-secondary/70 transition-colors font-terminal"
                  >
                    View Project →
                  </Link>
                  {project.github && (
                    <Link
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
