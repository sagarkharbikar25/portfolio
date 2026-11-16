import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ShieldCheck, Trophy, GraduationCap, CheckCircle2 } from 'lucide-react';
import SkillsRibbon from './SkillsRibbon';
import { PROFILE } from '../data/profile';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function BentoMatrixSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About Me and Experience Matrix"
      className="relative py-24 sm:py-32 bg-[#f8fafc] text-slate-900 overflow-hidden border-t border-slate-200/60"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.1),transparent_70%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: ABOUT ME (Honest & Personal) */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-xs font-mono text-slate-700 uppercase tracking-widest mb-6 font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>ABOUT ME</span>
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
                Core CS Foundations
              </span>
              <span className="font-display font-black text-emerald-600 block sm:inline">
                Production SaaS Experience
              </span>
            </h2>
            <p className="pt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-pretty">
              Computer Science undergraduate at JDCOEM (CGPA 8.70) with production SaaS internship experience at 4iBiz Techno-Solutions. Dedicated to engineering deterministic backend state machines, secure role-based APIs, and scalable full-stack applications.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid: 100% Real, Honest & Verified Resume Data */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Left Column (Span 7) */}
          <div className="md:col-span-7 flex flex-col gap-5 sm:gap-6">
            
            {/* Top Card: National Level Hackathon & Community Leadership */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="bg-white rounded-3xl p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4 border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:border-emerald-500/40 transition-colors"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  NATIONAL COMPETITION &amp; CAMPUS LEADERSHIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-condensed tracking-wide text-slate-900">
                  TOP 10 OF 84+ TEAMS
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  National Hackathon (WideSoftech · PCE) &amp; Vice President at Hack With India – JDCOEM.
                </p>
              </div>

              {/* Leadership Badges */}
              <div className="flex items-center -space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 ring-2 ring-white flex items-center justify-center font-bold text-xs text-white shadow-md" title="Hack With India">
                  HWI
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-500 ring-2 ring-white flex items-center justify-center font-bold text-xs text-white shadow-md" title="JDCOEM CSE">
                  CSE
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 ring-2 ring-white flex items-center justify-center font-bold text-xs text-white shadow-md" title="1st Prize">
                  #1
                </div>
              </div>
            </motion.div>

            {/* Sub-grid: 8.70 CGPA Academic Standing & 1st Prize Award */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Card 2: 8.70 CGPA Academic Excellence */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT }}
                className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                    ACADEMIC RECORD
                  </span>
                </div>

                <div>
                  <div className="font-condensed text-5xl sm:text-6xl text-slate-900 font-black tracking-tight mb-2">
                    8.70
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    B.Tech Computer Science &amp; Engineering
                  </h4>
                  <p className="text-xs text-slate-600">
                    JD College of Engineering &amp; Management, Nagpur (2024 – 2028).
                  </p>
                </div>
              </motion.div>

              {/* Card 3: 1st Prize Competition Winner */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT }}
                className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-800">
                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                    <span>COLLEGE COMPETITION</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-1 font-condensed text-5xl sm:text-6xl text-slate-900 font-black tracking-tight mb-2">
                    <span>1st</span>
                    <span className="text-3xl sm:text-4xl text-amber-500 font-black">Prize</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    Digital Document Service Portal (2026)
                  </h4>
                  <p className="text-xs text-slate-600">
                    Architected RBAC approval state machine with instant QR verification.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column (Span 5): Large Hero Bento Card - 4iBiz Production Internship Experience */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE_OUT }}
            className="md:col-span-5 rounded-3xl bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-900 p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-sky-400/40 text-white group"
          >
            {/* Atmospheric light glow */}
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"
            />

            {/* Top Header: Real Internship Label */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>4IBIZ TECHNO-SOLUTIONS</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-sky-200 uppercase font-semibold">
                  Jun – Aug 2026
                </span>
              </div>
            </div>

            {/* Center: Real Technical Accomplishments */}
            <div className="relative z-10 my-6 space-y-3">
              <h3 className="font-condensed text-3xl sm:text-4xl font-black text-white tracking-wide">
                FULL STACK DEVELOPER INTERN
              </h3>
              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                Engineered features for a production gym-management SaaS platform across backend REST services and frontend modules.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2 text-xs text-sky-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>Migrated FYTRACK mobile application from Flutter to React Native with full feature parity.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-sky-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>Executed 100+ manual tests; identified and resolved 15+ high-severity bugs.</span>
                </div>
              </div>
            </div>

            {/* Bottom Card Badges: Real Certifications */}
            <div className="relative z-10 pt-4 border-t border-white/20 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-bold text-white">
                Oracle Agentic AI Associate
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-bold text-white">
                NPTEL IIT Madras Cyber Security
              </span>
            </div>
          </motion.div>

        </div>

        {/* Floating Liquid Chrome Ribbon with Skill Badges */}
        <SkillsRibbon />

      </div>
    </section>
  );
}
