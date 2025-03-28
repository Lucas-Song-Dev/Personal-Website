import React from "react";
import { motion } from "framer-motion";

export default function ResumeSection() {
  return (
    <section
      id="resume"
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
          5. RESUME
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
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
      </div>
    </section>
  );
}
