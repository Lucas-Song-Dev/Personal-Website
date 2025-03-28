import React, { useState, useEffect } from 'react';
import NavigationMenu, { MobileNavigation } from './NavigationMenu';
import DragAnywhere from './DragAnywhere';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import WorkSection from './WorkSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import ResumeSection from './ResumeSection';
import { motion } from 'framer-motion';

export default function MainContent() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'work', 'projects', 'contact', 'resume'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-text"
    >
      <DragAnywhere />
      <NavigationMenu activeSection={activeSection} />
      <MobileNavigation activeSection={activeSection} />

      <main>
        <HeroSection />
        <SkillsSection />
        <WorkSection />
        <ProjectsSection />
        <ContactSection />
        <ResumeSection />
      </main>
    </motion.div>
  );
}
