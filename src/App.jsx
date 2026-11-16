import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import CapsuleNav from './components/CapsuleNav';
import HeroNeoSection from './components/HeroNeoSection';
import BentoMatrixSection from './components/BentoMatrixSection';
import ServicesSection from './components/ServicesSection';
import ProjectsNeoSection from './components/ProjectsNeoSection';
import InteractiveCanvasCTA from './components/InteractiveCanvasCTA';
import ContactSection from './components/ContactSection';
import FooterNeo from './components/FooterNeo';
import ProjectDetailDialog from './components/ProjectDetailDialog';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#07070a] text-white selection:bg-nature-lime selection:text-neutral-950 font-sans">
        
        {/* Floating Frosted Capsule Navigation */}
        <CapsuleNav />

        {/* Main Sections */}
        <main id="main-content">
          {/* 01 // HERO: Neo-Nature Rolling Landscape & Split Condensed Typography */}
          <HeroNeoSection />

          {/* 02 // ABOUT & BENTO MATRIX: Metrics, 3D Tactile Sculpture & Liquid Chrome Skill Ribbon */}
          <BentoMatrixSection />

          {/* 03 // SERVICES: Wildflower Hill Landscape & Interactive Row Accordions */}
          <ServicesSection />

          {/* 04 // PROJECTS: Asymmetric Staggered 2-Column Grid */}
          <ProjectsNeoSection onSelectProject={setSelectedProject} />

          {/* 05 // INTERACTIVE CANVAS CTA: Pitch-Black Mouse-Tracking 2D Dot Matrix */}
          <InteractiveCanvasCTA />

          {/* 06 // CONTACT: Minimalist Underline Inputs & Studio Coordinates */}
          <ContactSection />
        </main>

        {/* 07 // FOOTER: Standalone Mint Green Card Enclosure & Bleed Watermark */}
        <FooterNeo />

        {/* Project Inspection Modal (Native Top-Layer <dialog>) */}
        <ProjectDetailDialog
          project={selectedProject}
          onSelectProject={setSelectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
