import React from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { TerminalSectionHeading } from "@/components/sections/TerminalSectionHeading";

interface ResumeSectionProps {
  inTerminal?: boolean;
}

export default function ResumeSection({ inTerminal }: ResumeSectionProps) {
  return (
    <SectionShell sectionId="resume" inTerminal={inTerminal}>
      <TerminalSectionHeading inTerminal={inTerminal} commandLine="cat resume.pdf" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: inTerminal ? 0 : -50, y: inTerminal ? 8 : 0 }}
            animate={inTerminal ? { opacity: 1, x: 0, y: 0 } : undefined}
            whileInView={inTerminal ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: inTerminal ? 0.35 : 0.5, delay: inTerminal ? 0 : 0 }}
            viewport={inTerminal ? undefined : { once: true }}
            className="space-y-6"
          >
            <h3 className="text-responsive-h4 font-terminal mb-6">Education</h3>

            <div className="space-y-8">
              <div className="bg-black/30 p-6 rounded-lg border border-secondary/20">
                <h4 className="text-responsive-h5 font-terminal">
                  Bachelor’s Degree in Applied Science, Computer Engineering
                </h4>
                <p className="text-secondary font-terminal mb-2">
                  The University of British Columbia
                </p>
                <p className="text-gray-400">Expected 2026</p>
                <p className="mt-4">
                  Coursework: Software Construction, Computer Hardware, Data
                  Structures and Algorithms, Math Proofs, Linear Algebra.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: inTerminal ? 0 : 50, y: inTerminal ? 8 : 0 }}
            animate={inTerminal ? { opacity: 1, x: 0, y: 0 } : undefined}
            whileInView={inTerminal ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: inTerminal ? 0.35 : 0.5, delay: inTerminal ? 0.14 : 0 }}
            viewport={inTerminal ? undefined : { once: true }}
            className="space-y-6"
          >
            {/* <h3 className="text-responsive-h4 font-terminal mb-6">
              Certifications
            </h3>

            <div className="space-y-8">
              <div className="bg-black/30 p-6 rounded-lg border border-secondary/20">
                <h4 className="text-responsive-h5 font-terminal">
                  AWS Certified Developer
                </h4>
                <p className="text-secondary font-terminal mb-2">
                  Amazon Web Services
                </p>
                <p className="text-gray-400">2023</p>
                <p className="mt-4">
                  Expertise in developing and maintaining applications on the
                  AWS platform. Skills in EC2, S3, Lambda, DynamoDB, and
                  CloudFormation.
                </p>
              </div>
            </div> */}

            <div className="mt-12 flex justify-center">
              <a
                href="documents/lucas_song_resume.pdf"
                download
                className="bg-secondary text-background hover:bg-secondary/90 px-8 py-6 rounded-md text-responsive-h6 font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Full Resume
              </a>
            </div>
          </motion.div>
        </div>
    </SectionShell>
  );
}
