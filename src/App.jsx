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
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-nature-lime selection:text-neutral-950 font-sans">
        
        {/* Floating Frosted Capsule Navigation */}
        <CapsuleNav />

        {/* Main Content Flow */}
        <main id="main-content">
          {/* 01 // HERO: Neo-Nature Rolling Green Hills & Light Twilight Sky */}
          <HeroNeoSection />

          {/* 02 // ABOUT & BENTO MATRIX: Light Bento, 3D Coral Sculpture & Chrome Ribbon */}
          <BentoMatrixSection />

          {/* 03 // CAPABILITIES & EXPERIENCE: Cerulean Sky & Diagonal Wildflower Landscape with Interactive Links */}
          <ServicesSection onSelectProject={setSelectedProject} />

          {/* 04 // PROJECTS: Asymmetric Staggered 2-Column Grid on Light Ground */}
          <ProjectsNeoSection onSelectProject={setSelectedProject} />

          {/* 05 // INTERACTIVE CANVAS CTA: Pitch-Black 2D Mouse-Proximity Dot Matrix Contrast Zone */}
          <InteractiveCanvasCTA />

          {/* 06 // CONTACT: Direct Contact Hub with Instant 1-Click Mail & Quick Channels (No Form/No Resend API) */}
          <ContactSection />
        </main>

        {/* 07 // FOOTER: Standalone Pale Mint Green Card Enclosure with Giant Bleed Watermark */}
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
