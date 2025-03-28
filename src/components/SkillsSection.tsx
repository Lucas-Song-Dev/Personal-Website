import React from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function SkillsSection() {
  const skills: Skill[] = [
    { name: "JavaScript", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 65, category: "Frontend" },
    { name: "React", level: 88, category: "Frontend" },
    { name: "Next.js", level: 82, category: "Frontend" },
    { name: "HTML/CSS", level: 95, category: "Frontend" },
    { name: "Tailwind CSS", level: 90, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Express", level: 78, category: "Backend" },
    { name: "MongoDB", level: 75, category: "Backend" },
    { name: "PostgreSQL", level: 72, category: "Backend" },
    { name: "Git", level: 85, category: "Tools" },
    { name: "Docker", level: 70, category: "DevOps" },
  ];

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="skills"
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
          1. SKILLS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-responsive-h4 font-terminal mb-6"
              >
                {category}
              </motion.h3>

              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <motion.li
                      key={skill.name}
                      variants={item}
                      className="mb-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-terminal text-responsive-h6">
                          {skill.name}
                        </span>
                        <span className="text-secondary text-responsive-h6">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2.5">
                        <motion.div
                          className="bg-secondary h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          viewport={{ once: true }}
                        ></motion.div>
                      </div>
                    </motion.li>
                  ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
