import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Terminal, Sparkles, Layers, Database, Code, Globe, Zap } from 'lucide-react';

const SKILL_PILLS = [
  {
    name: 'Python & AI Workflows',
    category: 'Backend & ML',
    color: 'bg-amber-500/15 text-amber-900 border-amber-400/50 shadow-sm',
    dot: 'bg-amber-500',
    icon: Terminal,
  },
  {
    name: 'Responsive UI Design',
    category: 'Design Engineering',
    color: 'bg-lime-500/15 text-lime-950 border-lime-400/50 shadow-sm',
    dot: 'bg-lime-500',
    icon: Globe,
  },
  {
    name: 'Node.js & Express APIs',
    category: 'Backend Core',
    color: 'bg-emerald-500/15 text-emerald-950 border-emerald-400/50 shadow-sm',
    dot: 'bg-emerald-500',
    icon: Cpu,
  },
  {
    name: 'PostgreSQL & Redis Scaling',
    category: 'Data Architecture',
    color: 'bg-sky-500/15 text-sky-950 border-sky-400/50 shadow-sm',
    dot: 'bg-sky-500',
    icon: Database,
  },
  {
    name: 'Deterministic State Machines',
    category: 'Systems Architecture',
    color: 'bg-purple-500/15 text-purple-950 border-purple-400/50 shadow-sm',
    dot: 'bg-purple-500',
    icon: Layers,
  },
  {
    name: 'Modern React & Vite',
    category: 'Frontend Performance',
    color: 'bg-cyan-500/15 text-cyan-950 border-cyan-400/50 shadow-sm',
    dot: 'bg-cyan-500',
    icon: Zap,
  },
  {
    name: 'Docker & Microservices',
    category: 'DevOps & Cloud',
    color: 'bg-slate-900 text-white border-slate-700 shadow-sm',
    dot: 'bg-white',
    icon: Code,
  },
];

export default function SkillsRibbon() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full py-10 overflow-hidden select-none">
      {/* 3D Liquid Chrome Fluid Wave Ribbon Backdrop (Light Theme High-Specular Chrome) */}
      <div
        aria-hidden="true"
        className="relative mx-auto max-w-7xl min-h-[140px] rounded-[2.5rem] chrome-ribbon overflow-hidden flex items-center p-6 sm:p-8"
      >
        {/* Specular Liquid Light Reflection Lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 animate-pulse-slow pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

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
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -3 }}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border backdrop-blur-xl ${pill.color} transition-all cursor-default font-bold`}
              >
                <span className={`w-2 h-2 rounded-full ${pill.dot} animate-pulse`} />
                <Icon className="w-3.5 h-3.5" />
                <span className="text-xs sm:text-sm tracking-tight">
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
