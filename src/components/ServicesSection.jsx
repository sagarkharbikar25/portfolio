import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const CAPABILITIES = [
  {
    num: '01',
    title: 'Backend Systems & API Architecture',
    tagline: 'Deterministic state machines, role-based access control, and low-latency REST APIs.',
    features: ['Approval State Machines', 'RBAC & Audit Trails', 'Schema Validation'],
    targetProjectId: 'document-portal',
    actionLabel: 'View Document Portal Proof',
    href: '#projects',
  },
  {
    num: '02',
    title: 'Database Scaling & Concurrency',
    tagline: 'Transactional consistency, PgBouncer pooling, and in-memory Redis caching under load.',
    features: ['PostgreSQL & Indexes', 'Redis Queues & Locks', 'Sub-50ms Latency'],
    targetProjectId: 'cyber-hunt',
    actionLabel: 'View Cyber Hunt Infra Case',
    href: '#projects',
  },
  {
    num: '03',
    title: 'AI Pipelines & Local LLMs',
    tagline: 'Deterministic agent orchestration, local speech-to-speech, and low-latency streaming.',
    features: ['FastAPI / Python Agents', 'Whisper & Speech Pipelines', 'Zero-Leak Memory'],
    targetProjectId: null,
    actionLabel: 'Discuss AI Architecture',
    href: '#contact',
  },
  {
    num: '04',
    title: 'Full-Stack Web & Mobile Apps',
    tagline: 'Production-ready web & mobile frontends that integrate seamlessly with backend APIs.',
    features: ['Modern React & Vite', 'TypeScript & REST APIs', 'Dockerized Deployments'],
    targetProjectId: 'gig-flow',
    actionLabel: 'View Gig Flow CRM Case',
    href: '#projects',
  },
];

export default function ServicesSection({ onSelectProject }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const handleNavigate = (e, cap) => {
    // If it's a project reference, smooth-scroll and trigger preview modal
    if (cap.targetProjectId && onSelectProject) {
      const proj = PROJECTS.find((p) => p.id === cap.targetProjectId);
      if (proj) {
        e.preventDefault();
        const targetEl = document.getElementById('projects');
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        // Open the modal after brief smooth-scroll kickoff
        setTimeout(() => {
          onSelectProject(proj);
        }, 350);
        return;
      }
    }

    // Otherwise standard smooth anchor scroll
    if (cap.href) {
      e.preventDefault();
      const targetEl = document.querySelector(cap.href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="capabilities"
      aria-label="Engineering Capabilities and Experience"
      className="relative py-28 sm:py-36 bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#0284c7] text-white overflow-hidden"
    >
      {/* Anchor alias for backwards compatibility */}
      <span id="services" className="sr-only" aria-hidden="true" />

      {/* Decorative Diagonal Green Wildflower Hill Backdrop (Matching Reference) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] overflow-hidden opacity-90 select-none z-0"
      >
        <svg
          viewBox="0 0 1440 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full object-cover"
        >
          {/* Diagonal wildflower hill curve */}
          <path
            d="M 0,220 C 340,160 720,310 1120,180 C 1280,130 1380,150 1440,160 L 1440,500 L 0,500 Z"
            fill="url(#hill-flower-grad-light)"
          />
          <defs>
            <linearGradient id="hill-flower-grad-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="45%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>
          {/* Scattered wildflower specks (Yellow, Coral, White, Lavender) */}
          <circle cx="120" cy="270" r="3.5" fill="#FDE047" />
          <circle cx="160" cy="310" r="3" fill="#FDA4AF" />
          <circle cx="280" cy="290" r="4" fill="#FFFFFF" />
          <circle cx="340" cy="340" r="3" fill="#FDE047" />
          <circle cx="490" cy="310" r="3.5" fill="#E9D5FF" />
          <circle cx="580" cy="360" r="4" fill="#FFFFFF" />
          <circle cx="720" cy="300" r="3" fill="#FDE047" />
          <circle cx="850" cy="260" r="4" fill="#FDA4AF" />
          <circle cx="960" cy="240" r="3" fill="#FFFFFF" />
          <circle cx="1080" cy="220" r="3.5" fill="#FDE047" />
          <circle cx="1220" cy="210" r="3" fill="#E9D5FF" />
          <circle cx="1340" cy="200" r="4" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Personal, Engineering-Focused, No Corporate Agency Clichés */}
        <div className="mb-14 sm:mb-20 max-w-2xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-mono text-white uppercase tracking-widest mb-4 font-bold"
          >
            <span>CAPABILITIES &amp; EXPERIENCE</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4"
          >
            Engineering Capabilities, <span className="font-condensed font-normal uppercase">Proven In Work</span>
          </motion.h2>

          <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed text-pretty font-medium">
            Architected with production discipline. From deterministic backend state machines and database scaling to AI pipelines and full-stack systems — click any focus area to inspect the implementation.
          </p>
        </div>

        {/* Interactive Capability Rows With Direct Click Navigation to Work */}
        <div className="border-t border-white/30 divide-y divide-white/25">
          {CAPABILITIES.map((cap, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.a
                key={cap.num}
                href={cap.href}
                onClick={(e) => handleNavigate(e, cap)}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                aria-label={`${cap.title}: ${cap.actionLabel}`}
                className="group relative py-7 sm:py-9 px-4 sm:px-6 rounded-3xl transition-all duration-300 hover:bg-white/15 hover:backdrop-blur-md cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nature-lime"
              >
                {/* Number & Title */}
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-base sm:text-lg font-bold text-sky-200 group-hover:text-nature-lime transition-colors">
                    {cap.num}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-nature-lime transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-sky-100/90 mt-1 max-w-xl group-hover:text-white transition-colors">
                      {cap.tagline}
                    </p>
                  </div>
                </div>

                {/* Features & Action Button */}
                <div className="flex items-center justify-between md:justify-end gap-5 sm:gap-7">
                  <div className="hidden lg:flex items-center gap-4 text-xs font-mono font-bold text-sky-100">
                    {cap.features.map((feat) => (
                      <span key={feat} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-nature-lime" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>

                  {/* Contextual Action Label (Shows on tablet/desktop) */}
                  <span className="hidden sm:inline-flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-sky-200 group-hover:text-nature-lime transition-colors">
                    {cap.actionLabel}
                  </span>

                  {/* Circular Arrow Button (Rotates 45deg on hover, active state) */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/25 group-hover:bg-nature-lime backdrop-blur-md border border-white/40 group-hover:border-nature-lime flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-[0_4px_20px_rgba(132,204,22,0.4)] flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-neutral-950 transition-all duration-300 group-hover:rotate-45" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
