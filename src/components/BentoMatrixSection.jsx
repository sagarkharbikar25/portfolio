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
      className="relative py-24 sm:py-32 bg-[#090a10] text-white overflow-hidden border-t border-white/10"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_70%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-neutral-300 uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-nature-lime" />
            <span>ABOUT US</span>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="space-y-2"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-200">
              <span className="font-condensed uppercase tracking-normal block sm:inline mr-3 text-white">
                Our focus is simple
              </span>
              <span className="font-display font-extrabold text-nature-lime block sm:inline">
                Design to convert
              </span>
            </h2>
            <p className="pt-4 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed text-pretty">
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
              className="glass-card rounded-3xl p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4 border border-white/10 hover:border-white/25 transition-colors"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Global Ecosystem
                </span>
                <h3 className="text-2xl sm:text-3xl font-condensed tracking-wide text-white">
                  40+ COLLABORATORS &amp; PARTNERS
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Open-source contributors, client teams &amp; hackathon networks.
                </p>
              </div>

              {/* Avatar Pile */}
              <div className="flex items-center -space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 ring-2 ring-neutral-900 flex items-center justify-center font-bold text-xs text-white shadow-lg">
                  JD
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 ring-2 ring-neutral-900 flex items-center justify-center font-bold text-xs text-white shadow-lg">
                  AK
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 ring-2 ring-neutral-900 flex items-center justify-center font-bold text-xs text-white shadow-lg">
                  RS
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 ring-2 ring-neutral-900 flex items-center justify-center font-bold text-xs text-white shadow-lg">
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
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-nature-lime/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-nature-lime">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                    ROI METRIC
                  </span>
                </div>

                <div>
                  <div className="font-condensed text-5xl sm:text-6xl text-white font-extrabold tracking-tight mb-2">
                    90%
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-1 leading-snug">
                    Earn back on your investment within 30 days
                  </h4>
                  <p className="text-xs text-neutral-400">
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
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-emerald-400/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>AVAILABLE FOR ANY TIME</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-1 font-condensed text-5xl sm:text-6xl text-white font-extrabold tracking-tight mb-2">
                    <span>$2.5</span>
                    <span className="text-3xl sm:text-4xl text-nature-lime">M+</span>
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-200 mb-1 leading-snug">
                    Through custom-tailored backend systems
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Client transaction volume &amp; scaled production throughput.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column (Span 5): Large Hero Bento Card with 3D Tactile Sculpture */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE_OUT }}
            className="md:col-span-5 rounded-3xl bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-900 p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-sky-400/30 group"
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
                {/* Organic Tactile Sculpture SVG */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] animate-float-slow"
                >
                  <defs>
                    <radialGradient id="sponge-grad" cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#86EFAC" />
                      <stop offset="35%" stopColor="#22C55E" />
                      <stop offset="70%" stopColor="#15803D" />
                      <stop offset="100%" stopColor="#052E16" />
                    </radialGradient>
                    <filter id="sponge-texture" x="0%" y="0%" width="100%" height="100%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  {/* Organic tactile sponge form */}
                  <path
                    d="M 100,20 C 145,18 180,50 182,95 C 185,140 150,180 105,182 C 60,185 18,145 20,100 C 22,55 55,22 100,20 Z"
                    fill="url(#sponge-grad)"
                    filter="url(#sponge-texture)"
                  />
                  {/* Inner depth stipples */}
                  <circle cx="75" cy="65" r="9" fill="#14532D" opacity="0.6" />
                  <circle cx="120" cy="80" r="12" fill="#14532D" opacity="0.6" />
                  <circle cx="95" cy="125" r="14" fill="#052E16" opacity="0.7" />
                  <circle cx="140" cy="130" r="8" fill="#14532D" opacity="0.5" />
                  <circle cx="60" cy="110" r="10" fill="#166534" opacity="0.55" />
                </svg>

                {/* Overlaid Frosted Glass Badge */}
                <div className="absolute -bottom-2 bg-neutral-900/85 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold tracking-tight text-white uppercase">
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
