import React from "react";
import { motion } from "framer-motion";

export default function SkillsSection() {
  const skills = [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "HTML & CSS",
    "SQL",
    "React",
    "Redux",
    "Next.js",
    "Node.js",
    "Express",
    "FastAPI",
    "MongoDB",
    "AWS (DynamoDB, Lambda, ECR, EKS)",
    "Datadog",
    "Docker",
    "Heroku",
    "Git",
    "Jira",
    "Jest",
    "Pytest",
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
          3. SKILLS
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={item}
              className="px-4 py-2 bg-secondary/20 text-secondary rounded-md font-terminal text-sm md:text-base hover:bg-secondary/30 transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
