import React, { useState } from "react";
import { motion } from "framer-motion";

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}
export default function WorkSection() {
  const [activeTab, setActiveTab] = useState(0);
  console.log("🚀 ~ WorkSection ~ activeTab:", activeTab);
  const experiences: WorkExperience[] = [
    {
      id: "ibm-software-dev-2024",
      company: "IBM",
      position: "Software Developer Intern",
      period: "Jan - Aug 2024",
      description: [
        "Developed 15+ features to enhance IT performance visibility, improving AI automation.",
        "Designed an upgraded filter selection system for 600k+ alerts, enhancing customer efficiency.",
        "Created training decks and presented to 100’s of client and internal stakeholder attendees.",
        "Built an internal Python tool to replay specific product API calls, cutting bug reproduction time by 30%.",
      ],
      technologies: ["React", "HTML5", "CSS3", "Python"],
    },
    {
      id: "ibm-frontend-dev-2023",
      company: "IBM",
      position: "Front-End Developer Intern",
      period: "Sep - Dec 2023",
      description: [
        "Maintained and optimized AI IT operations dashboards for performance improvements.",
        "Collaborated with a 5-person global team across design, QA, and backend engineering.",
        "Integrated 20+ React components with RESTful and GraphQL APIs.",
        "Refactored React hooks, reducing unnecessary renders on affected pages by up to 50%.",
      ],
      technologies: ["React", "HTML", "CSS", "Node.js", "Redux"],
    },
    {
      id: "ibm-qa-intern-2023",
      company: "IBM",
      position: "Quality Assurance Intern",
      period: "May - Aug 2023",
      description: [
        "Rebuilt a 2-year-old end-to-end (e2e) testing pipeline using Nightwatch, Selenium, and JavaScript.",
        "Logged and resolved 100+ issues via Zenhub and Jira, streamlining development.",
        "Benchmarked backend performance of new features before production releases.",
        "Automated e2e test creation, reducing test failure rate on new releases by 50%.",
      ],
      technologies: [
        "Zenhub",
        "Python",
        "Jira",
        "Nightwatch",
        "Selenium",
        "Jenkins",
      ],
    },
  ];

  console.log("🚀 ~ WorkSection ~ experiences:", experiences);
  return (
    <section
      id="work"
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
          2. WORK
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="sticky top-24 space-y-2 font-terminal">
              {experiences.map((experience, index) => (
                <button
                  key={experience.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    activeTab === index
                      ? "bg-secondary/20 text-secondary border-l-2 border-secondary"
                      : "hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {experience.company}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:w-2/3"
          >
            <h3 className="text-responsive-h4 font-terminal">
              {experiences[activeTab].position}
              <span className="text-secondary">
                {" "}
                @ {experiences[activeTab].company}
              </span>
            </h3>

            <p className="text-gray-400 font-terminal mb-4">
              {experiences[activeTab].period}
            </p>

            <ul className="space-y-4 mb-6">
              {experiences[activeTab].description.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary mr-2">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
              {experiences[activeTab].technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md font-terminal"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
