import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/sections/SectionShell";
import { TerminalSectionHeading } from "@/components/sections/TerminalSectionHeading";

interface ContactSectionProps {
  inTerminal?: boolean;
}

export default function ContactSection({ inTerminal }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { id: any; value: any } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(
          "Failed to send message. (my Heroku server ran out of credits :c)"
        );
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred.");
    }
  };

  return (
    <SectionShell sectionId="contact" inTerminal={inTerminal}>
      <TerminalSectionHeading
        inTerminal={inTerminal}
        commandLine={'mail -s "hello" lucas@'}
      />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: inTerminal ? 0 : -50, y: inTerminal ? 8 : 0 }}
            animate={inTerminal ? { opacity: 1, x: 0, y: 0 } : undefined}
            whileInView={inTerminal ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: inTerminal ? 0.35 : 0.5, delay: inTerminal ? 0 : 0 }}
            viewport={inTerminal ? undefined : { once: true }}
            className="space-y-6"
          >
            <TerminalSectionHeading
              level={3}
              inTerminal={inTerminal}
              commandLine="sendmail lucas02.song@gmail.com"
            />
            <p className="text-gray-400">
              I&#39;m currently looking for new opportunities. Whether you have a
              question or just want to say hi, feel free to reach out and I&#39;ll
              get back to you!
            </p>

            <div className="space-y-4 mt-8 font-terminal">
              <a
                href="mailto:Lucas02.song@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors group"
              >
                <span className="text-secondary opacity-70 group-hover:opacity-100">--email</span>
                <span>Lucas02.song@gmail.com</span>
              </a>

              <a
                href="https://github.com/Lucas-Song-Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors group"
              >
                <span className="text-secondary opacity-70 group-hover:opacity-100">--github</span>
                <span>github.com/Lucas-Song-Dev</span>
              </a>

              <a
                href="https://www.linkedin.com/in/lucas01-song/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors group"
              >
                <span className="text-secondary opacity-70 group-hover:opacity-100">--linkedin</span>
                <span>in/Lucas01-song</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: inTerminal ? 0 : 50, y: inTerminal ? 8 : 0 }}
            animate={inTerminal ? { opacity: 1, x: 0, y: 0 } : undefined}
            whileInView={inTerminal ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: inTerminal ? 0.35 : 0.5, delay: inTerminal ? 0.14 : 0 }}
            viewport={inTerminal ? undefined : { once: true }}
            className="bg-black/30 p-6 rounded-lg border border-secondary/20"
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfeSJPa2lXKHLKJzWa5zFObkfSZIpI4bjhBWmVaMQo_-qxLEg/viewform?embedded=true"
              width="100%"
              height="824"
            >
              Loading…
            </iframe>
          </motion.div>
        </div>
    </SectionShell>
  );
}
