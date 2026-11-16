import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import EditorialNav from './components/EditorialNav';
import HeroSection from './components/HeroSection';
import ShowcaseReelSection from './components/ShowcaseReelSection';
import ProjectsGridSection from './components/ProjectsGridSection';
import SkillsStackSection from './components/SkillsStackSection';
import AboutProcessSection from './components/AboutProcessSection';
import ContactSection from './components/ContactSection';
import ProjectDetailDialog from './components/ProjectDetailDialog';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-void text-hud-text">
        <EditorialNav />

        <main id="main-content">
          <HeroSection />
          <ShowcaseReelSection onSelectProject={setSelectedProject} />
          <ProjectsGridSection onSelectProject={setSelectedProject} />
          <SkillsStackSection />
          <AboutProcessSection />
          <ContactSection />
        </main>

        <ProjectDetailDialog
          project={selectedProject}
          onSelectProject={setSelectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
