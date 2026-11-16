import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    title: 'UI/UX & Design Engineering',
    tagline: 'High-craft responsive interfaces that convert visitors into active users.',
    features: ['Design Systems', 'Micro-Interactions', 'Performance & CWV Optimization'],
  },
  {
    num: '02',
    title: 'AI Product & LLM Pipelines',
    tagline: 'Deterministic agent orchestration, local LLMs, and high-speed voice workflows.',
    features: ['FastAPI / Python Agents', 'Prompt Hardening', 'Zero-Latency Streaming'],
  },
  {
    num: '03',
    title: 'SaaS Systems & Scaled Databases',
    tagline: 'Multi-tenant architecture, role-based access control, and transaction safety.',
    features: ['PostgreSQL & PgBouncer', 'Redis Caching & Queues', 'Audit State Machines'],
  },
  {
    num: '04',
    title: 'Full-Stack Development',
    tagline: 'End-to-end web & mobile applications engineered for high concurrency.',
    features: ['React & Next.js', 'React Native & Mobile', 'Docker & CI/CD Delivery'],
  },
];

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-label="Services and Solutions"
      className="relative py-28 sm:py-36 bg-gradient-to-b from-[#035b8c] via-[#0284c7] to-[#043d5d] text-white overflow-hidden"
    >
      {/* Decorative Diagonal Green Wildflower Hill Backdrop (Matching Screenshot 3) */}
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
            fill="url(#hill-flower-grad)"
          />
          <defs>
            <linearGradient id="hill-flower-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="45%" stopColor="#166534" />
              <stop offset="100%" stopColor="#052E16" />
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
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-2xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-mono text-sky-100 uppercase tracking-widest mb-4"
          >
            <span>SERVICES &amp; CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            Your Needs, <span className="font-condensed font-normal uppercase">Our Expertise</span>
          </motion.h2>

          <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed text-pretty">
            Architected for reliability. From interface fidelity to multi-tier state machines, every layer is built with high standards.
          </p>
        </div>

        {/* Interactive Accordion Rows (Matching Screenshot 3) */}
        <div className="border-t border-white/25 divide-y divide-white/20">
          {SERVICES.map((srv, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={srv.num}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative py-7 sm:py-9 px-4 sm:px-6 rounded-3xl transition-all duration-300 hover:bg-neutral-950/40 hover:backdrop-blur-md cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Number & Title */}
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-base sm:text-lg font-bold text-sky-200 group-hover:text-nature-lime transition-colors">
                    {srv.num}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-nature-lime transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-sky-100/80 mt-1 max-w-xl group-hover:text-neutral-200 transition-colors">
                      {srv.tagline}
                    </p>
                  </div>
                </div>

                {/* Features & Action Button */}
                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8">
                  <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-sky-200/90">
                    {srv.features.map((feat) => (
                      <span key={feat} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-nature-lime" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>

                  {/* Circular Arrow Button (Rotates 45deg on hover) */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 group-hover:bg-nature-lime backdrop-blur-md border border-white/30 group-hover:border-nature-lime flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-[0_4px_20px_rgba(132,204,22,0.4)]">
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-neutral-950 transition-all duration-300 group-hover:rotate-45" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
