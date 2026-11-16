import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Terminal, Sparkles, Layers, Database, Code, Globe, Zap } from 'lucide-react';

const SKILL_PILLS = [
  {
    name: 'Python & AI Workflows',
    category: 'Backend & ML',
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_4px_16px_rgba(245,158,11,0.25)]',
    dot: 'bg-amber-400',
    icon: Terminal,
  },
  {
    name: 'Responsive UI Design',
    category: 'Design Engineering',
    color: 'bg-lime-500/20 text-lime-300 border-lime-500/40 shadow-[0_4px_16px_rgba(132,204,22,0.25)]',
    dot: 'bg-lime-400',
    icon: Globe,
  },
  {
    name: 'Node.js & Express APIs',
    category: 'Backend Core',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_4px_16px_rgba(16,185,129,0.25)]',
    dot: 'bg-emerald-400',
    icon: Cpu,
  },
  {
    name: 'PostgreSQL & Redis Scaling',
    category: 'Data Architecture',
    color: 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-[0_4px_16px_rgba(56,189,248,0.25)]',
    dot: 'bg-sky-400',
    icon: Database,
  },
  {
    name: 'Deterministic State Machines',
    category: 'Systems Architecture',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_4px_16px_rgba(168,85,247,0.25)]',
    dot: 'bg-purple-400',
    icon: Layers,
  },
  {
    name: 'Modern React & Vite',
    category: 'Frontend Performance',
    color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_4px_16px_rgba(6,182,212,0.25)]',
    dot: 'bg-cyan-400',
    icon: Zap,
  },
  {
    name: 'Docker & Microservices',
    category: 'DevOps & Cloud',
    color: 'bg-white/15 text-white border-white/30 shadow-[0_4px_16px_rgba(255,255,255,0.2)]',
    dot: 'bg-white',
    icon: Code,
  },
];

export default function SkillsRibbon() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full py-10 overflow-hidden select-none">
      {/* 3D Liquid Chrome Fluid Wave Ribbon Backdrop */}
      <div
        aria-hidden="true"
        className="relative mx-auto max-w-7xl h-44 sm:h-52 rounded-[2.5rem] chrome-ribbon overflow-hidden flex items-center p-6 sm:p-8"
      >
        {/* Specular Liquid Light Reflection Lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-pulse-slow" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />

        {/* Scattered Dynamic Floating Skill Badges */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {SKILL_PILLS.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <motion.div
                key={pill.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.5 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -4 }}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border backdrop-blur-xl ${pill.color} transition-shadow cursor-default`}
              >
                <span className={`w-2 h-2 rounded-full ${pill.dot} animate-pulse`} />
                <Icon className="w-3.5 h-3.5" />
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  {pill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
