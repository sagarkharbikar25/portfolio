import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Code2, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function ProjectsNeoSection({ onSelectProject }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-label="Selected Production Projects"
      className="relative py-28 sm:py-36 bg-[#07070a] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-nature-lime/10 rounded-full blur-[140px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Condensed Headline (Exact Reference Typography) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-neutral-300 uppercase tracking-widest mb-4">
              <span>FEATURED WORK</span>
            </div>
            <h2 className="font-condensed text-7xl sm:text-9xl md:text-[10rem] tracking-tight leading-[0.85] text-white uppercase select-none">
              PROJECTS
            </h2>
          </div>

          <p className="text-base sm:text-lg text-neutral-400 max-w-md font-normal leading-relaxed text-pretty">
            Production systems, deterministic state machines, and scaled backends built to perform under live load.
          </p>
        </div>

        {/* 2-Column Asymmetric Staggered Grid (Matching Screenshots 4 & 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Column 1 (Left Column) */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {PROJECTS.filter((_, i) => i % 2 === 0).map((project, idx) => (
              <motion.article
                key={project.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: EASE_OUT }}
                onClick={() => onSelectProject?.(project)}
                className="group relative rounded-3xl bg-neutral-900/70 border border-white/15 overflow-hidden p-6 sm:p-8 cursor-pointer hover:border-nature-lime/40 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* Visual Preview / Screenshot Frame */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 mb-6 border border-white/10 group-hover:border-white/20 transition-all">
                  <img
                    src={project.image}
                    alt={project.imageAlt || project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle corner badge */}
                  {project.award && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-amber-400/40 text-[11px] font-bold text-amber-300 flex items-center gap-1.5 shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{project.award}</span>
                    </div>
                  )}

                  {/* Circular Hover Arrow Action */}
                  <div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/25 group-hover:bg-nature-lime group-hover:border-nature-lime flex items-center justify-center transition-all duration-300 shadow-lg">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:text-neutral-950 group-hover:rotate-45 transition-all duration-300" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.stack.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-wider text-neutral-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Title & Summary */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-nature-lime transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                  {project.outcomeLead || project.summary}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Column 2 (Right Column - Staggered Lower for Asymmetry) */}
          <div className="flex flex-col gap-8 lg:gap-12 md:mt-16">
            {PROJECTS.filter((_, i) => i % 2 !== 0).map((project, idx) => (
              <motion.article
                key={project.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.15, ease: EASE_OUT }}
                onClick={() => onSelectProject?.(project)}
                className="group relative rounded-3xl bg-neutral-900/70 border border-white/15 overflow-hidden p-6 sm:p-8 cursor-pointer hover:border-nature-lime/40 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* Visual Preview / Code & Mobile Editor Mockup (Matching Screenshot 4) */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#121324] to-[#0a0a14] mb-6 border border-white/10 group-hover:border-white/20 transition-all flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.imageAlt || project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top Header Mockup Pill */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-neutral-300">
                    <span className="text-emerald-400">●</span> {project.category}
                  </div>

                  {/* Circular Hover Arrow Action */}
                  <div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/25 group-hover:bg-nature-lime group-hover:border-nature-lime flex items-center justify-center transition-all duration-300 shadow-lg">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:text-neutral-950 group-hover:rotate-45 transition-all duration-300" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.stack.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-wider text-neutral-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Title & Summary */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-nature-lime transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                  {project.outcomeLead || project.summary}
                </p>
              </motion.article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
