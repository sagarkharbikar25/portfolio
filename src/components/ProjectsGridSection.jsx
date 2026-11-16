import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getDeckProjects } from '../data/projects';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function ProjectsGridSection({ onSelectProject }) {
  const projects = getDeckProjects();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="work"
      aria-labelledby="projects-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto border-b border-white/[0.06]"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-soft mb-2">
            02 // Selected Projects
          </p>
          <h2
            id="projects-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-hud-text"
          >
            Production Engineering Work
          </h2>
        </div>

        <p className="max-w-md text-sm text-hud-muted leading-relaxed">
          Click any system below to inspect architecture decisions, role ownership, technical specifications, and incident post-mortems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              delay: shouldReduceMotion ? 0 : idx * 0.08,
              ease: EASE_OUT,
            }}
          >
            <button
              type="button"
              onClick={() => onSelectProject?.(project)}
              className="group w-full h-full text-left flex flex-col border border-white/[0.1] hover:border-cyan-soft/45 bg-[#0D1018] rounded-xl overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_24px_rgba(56,189,248,0.08)] cursor-pointer"
            >
              <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/[0.08] bg-surface-card">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageWidth || 1280}
                  height={project.imageHeight || 720}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider mb-2">
                    <span className="text-cyan-soft">{project.category}</span>
                    <span className="text-gold">{project.statusLabel || project.award}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-hud-text group-hover:text-cyan-soft transition-colors mb-2 flex items-start justify-between gap-2">
                    <span>{project.title}</span>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 mt-0.5 text-hud-dim group-hover:text-cyan-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </h3>

                  <p className="text-sm text-hud-muted leading-relaxed">{project.summary}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.07]">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-white/[0.03] border border-white/[0.08] font-mono text-[11px] text-hud-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-2 py-0.5 font-mono text-[11px] text-hud-dim">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

