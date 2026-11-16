import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, ShieldCheck, TrendingUp, Users, Zap, CheckCircle2 } from 'lucide-react';
import SkillsRibbon from './SkillsRibbon';
import { PROFILE } from '../data/profile';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function BentoMatrixSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Us and Capabilities Matrix"
      className="relative py-24 sm:py-32 bg-[#f8fafc] text-slate-900 overflow-hidden border-t border-slate-200/60"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.1),transparent_70%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-xs font-mono text-slate-700 uppercase tracking-widest mb-6 font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>ABOUT US</span>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="space-y-2"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-slate-800">
              <span className="font-condensed uppercase tracking-normal block sm:inline mr-3 text-slate-900">
                Our focus is simple
              </span>
              <span className="font-display font-black text-emerald-600 block sm:inline">
                Design to convert
              </span>
            </h2>
            <p className="pt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-pretty">
              We bridge deterministic backend systems with high-craft interfaces to engineer platforms that stand under load and convert visitors into long-term partners.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid (Asymmetric Layout matching Screenshot 2026-11-16 134512.png) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Left Column (Span 7) */}
          <div className="md:col-span-7 flex flex-col gap-5 sm:gap-6">
            
            {/* Top Card: 40+ PARTNERS with Circular Avatar Stack */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="bg-white rounded-3xl p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4 border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:border-emerald-500/40 transition-colors"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Global Ecosystem
                </span>
                <h3 className="text-2xl sm:text-3xl font-condensed tracking-wide text-slate-900">
                  40+ COLLABORATORS &amp; PARTNERS
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Open-source contributors, client teams &amp; hackathon networks.
                </p>
              </div>

              {/* Avatar Pile */}
              <div className="flex items-center -space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 ring-2 ring-white flex items-center justify-center font-bold text-xs text-white shadow-md">
                  JD
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 ring-2 ring-white flex items-center justify-center font-bold text-xs text-white shadow-md">
                  AK
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 ring-2 ring-white flex items-center justify-center font-bold text-xs text-white shadow-md">
                  RS
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 ring-2 ring-white flex items-center justify-center font-bold text-xs text-white shadow-md">
                  +37
                </div>
              </div>
            </motion.div>

            {/* Sub-grid: 90% ROI card & $2.5M Revenue Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Card 2: 90% ROI Stat */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT }}
                className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                    ROI METRIC
                  </span>
                </div>

                <div>
                  <div className="font-condensed text-5xl sm:text-6xl text-slate-900 font-black tracking-tight mb-2">
                    90%
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    Earn back on your investment within 30 days
                  </h4>
                  <p className="text-xs text-slate-600">
                    Return on investment through automated workflows &amp; low latency.
                  </p>
                </div>
              </motion.div>

              {/* Card 3: $2.5M Revenue Card with Live Green Beacon */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT }}
                className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>AVAILABLE FOR ANY TIME</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-1 font-condensed text-5xl sm:text-6xl text-slate-900 font-black tracking-tight mb-2">
                    <span>$2.5</span>
                    <span className="text-3xl sm:text-4xl text-emerald-600 font-black">M+</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    Through custom-tailored backend systems
                  </h4>
                  <p className="text-xs text-slate-600">
                    Client transaction volume &amp; scaled production throughput.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column (Span 5): Large Hero Bento Card with 3D Tactile Sculpture (Vivid Azure Blue) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE_OUT }}
            className="md:col-span-5 rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-700 p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-sky-400/40 text-white group"
          >
            {/* Atmospheric light glow */}
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"
            />

            {/* Top Header & Star Rating */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>VERIFIED PRODUCER</span>
              </div>
              <div className="text-right">
                <span className="font-condensed text-3xl sm:text-4xl text-white font-black tracking-tight">
                  5.0 / 5
                </span>
              </div>
            </div>

            {/* Center: Tactile 3D Sponge / Coral Organic Sculpture (Exact match to screenshot 2) */}
            <div className="relative z-10 my-8 flex items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] animate-float-slow"
                >
                  <defs>
                    <radialGradient id="sponge-grad-light" cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#86EFAC" />
                      <stop offset="35%" stopColor="#22C55E" />
                      <stop offset="70%" stopColor="#15803D" />
                      <stop offset="100%" stopColor="#052E16" />
                    </radialGradient>
                    <filter id="sponge-texture-light" x="0%" y="0%" width="100%" height="100%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  {/* Organic tactile sponge form */}
                  <path
                    d="M 100,20 C 145,18 180,50 182,95 C 185,140 150,180 105,182 C 60,185 18,145 20,100 C 22,55 55,22 100,20 Z"
                    fill="url(#sponge-grad-light)"
                    filter="url(#sponge-texture-light)"
                  />
                  {/* Inner depth stipples */}
                  <circle cx="75" cy="65" r="9" fill="#14532D" opacity="0.6" />
                  <circle cx="120" cy="80" r="12" fill="#14532D" opacity="0.6" />
                  <circle cx="95" cy="125" r="14" fill="#052E16" opacity="0.7" />
                  <circle cx="140" cy="130" r="8" fill="#14532D" opacity="0.5" />
                  <circle cx="60" cy="110" r="10" fill="#166534" opacity="0.55" />
                </svg>

                {/* Overlaid White Frosted Glass Badge */}
                <div className="absolute -bottom-2 bg-white/95 backdrop-blur-xl border border-white/80 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-slate-900">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold tracking-tight uppercase">
                    WORLDWIDE TRUST
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Card Copy */}
            <div className="relative z-10 pt-2 border-t border-white/20">
              <h4 className="text-lg font-bold text-white mb-1">
                Engineering Integrity
              </h4>
              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                Zero regressions, strict schema validation, and deterministic state guarantees across every deliverable.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Floating Liquid Chrome Ribbon with Skill Badges */}
        <SkillsRibbon />

      </div>
    </section>
  );
}
