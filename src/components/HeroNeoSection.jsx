import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, FileText, Sparkles, Award } from 'lucide-react';
import { PROFILE } from '../data/profile';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function HeroNeoSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Introduction & Hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#e7ecf5] via-[#edf3fa] to-[#dbe9dd] text-slate-900"
    >
      {/* Ambient Lighting & Horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(167,243,208,0.35),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/60 to-transparent z-10"
      />

      {/* Stylized Natural Undulating Rolling Hills Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[52vh] min-h-[380px] overflow-hidden opacity-95 select-none"
      >
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full object-cover"
        >
          <path
            d="M0,320 C320,240 580,360 880,260 C1160,180 1340,240 1440,280 L1440,600 L0,600 Z"
            fill="url(#hill-back-light)"
          />
          <path
            d="M0,380 C260,310 520,430 840,340 C1140,260 1320,350 1440,330 L1440,600 L0,600 Z"
            fill="url(#hill-mid-light)"
          />
          <path
            d="M0,450 C360,380 640,490 1020,420 C1280,370 1380,420 1440,410 L1440,600 L0,600 Z"
            fill="url(#hill-front-light)"
          />
          <defs>
            <linearGradient id="hill-back-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="hill-mid-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
            <linearGradient id="hill-front-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="50%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        
        {/* Availability Pill & Sub-badge */}
        <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-between gap-4">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-300 text-xs font-semibold text-slate-800 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Available for Backend, SDE &amp; Full-Stack Roles</span>
          </motion.div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Backend Specialist · Full-Stack Capable</span>
          </div>
        </div>

        {/* Massive Condensed Split Headline: BACKEND DEVELOPER (Primary Focus) */}
        <div className="my-auto py-8 sm:py-12">
          {/* Top Line: BACKEND + Overlapping Portrait Avatar */}
          <div className="relative flex justify-end items-center">
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="font-condensed text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] xl:text-[16rem] leading-[0.82] tracking-tight uppercase text-slate-900 select-none"
            >
              BACKEND
            </motion.h1>

            {/* Overlapping circular headshot badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: EASE_OUT }}
              className="absolute -top-4 sm:-top-8 right-12 sm:right-28 md:right-48 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full ring-4 ring-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] overflow-hidden bg-gradient-to-tr from-emerald-600 via-nature-lime to-amber-400 flex items-center justify-center p-1"
            >
              <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-center p-1">
                <span className="font-display font-extrabold text-lg sm:text-2xl text-nature-lime">
                  SK
                </span>
                <span className="text-[9px] font-mono uppercase text-slate-300 tracking-tighter">
                  Nagpur, IN
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Line: DEVELOPER */}
          <div className="relative text-left -mt-2 sm:-mt-6 md:-mt-10 lg:-mt-14">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: EASE_OUT }}
              className="font-condensed text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] xl:text-[16rem] leading-[0.82] tracking-tight uppercase text-slate-900 select-none"
            >
              DEVELOPER
            </motion.h2>
          </div>
        </div>

        {/* Bottom Dual Column: Bio on Left, Real Verified Credential Card on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-4">
          
          {/* Left Column: Role, Bio & CTAs */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE_OUT }}
            className="md:col-span-7 space-y-5"
          >
            <p className="text-base sm:text-lg text-slate-800 max-w-xl font-normal leading-relaxed text-pretty">
              Hi, I'm <strong className="text-slate-950 font-bold">{PROFILE.name}</strong>. {PROFILE.heroSub}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-neutral-950 bg-nature-lime hover:bg-nature-lime-light transition-transform active:scale-95 shadow-[0_4px_16px_rgba(132,204,22,0.35)]"
              >
                <span>View Selected Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-slate-800 bg-white/90 hover:bg-white backdrop-blur-md border border-slate-300 shadow-sm transition-all hover:border-slate-400 active:scale-95"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Real Verified 4iBiz Experience & Award Card (100% Real from Resume) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.6, ease: EASE_OUT }}
            className="md:col-span-5"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] border border-slate-200/90 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl"
              />

              {/* Real Verified Standing Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1ST PRIZE · MINI PROJECT (2026)</span>
                </div>
                <span className="text-xs font-bold text-slate-900 font-mono">CGPA 8.70</span>
              </div>

              {/* Honest Experience Summary */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-medium">
                "Engineered full-stack features for a gym-management SaaS at 4iBiz, migrated the FYTRACK mobile app to React Native, and built an RBAC approval state machine awarded 1st Prize."
              </p>

              {/* Real Organization Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-nature-lime font-display font-extrabold flex items-center justify-center text-xs shadow-sm">
                  4iB
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    4iBiz Techno-Solutions Pvt. Ltd.
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Full Stack Developer Intern · Remote (Jun – Aug 2026)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
