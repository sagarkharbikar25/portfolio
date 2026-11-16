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
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-slate-900 text-white"
    >
      {/* Full-Bleed High-Res Cinematic 3D Nature Landscape Background (Matching Reference) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="/assets/hero-landscape.webp"
          alt=""
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Soft atmospheric daylight vignette for supreme typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15),rgba(0,0,0,0.45))]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        
        {/* Top Badges (Shifted to allow top-left SAGAR brand breathing room) */}
        <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-between gap-4">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for Backend, SDE &amp; Full-Stack Roles</span>
          </motion.div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-white/90 font-mono font-medium drop-shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-nature-lime" />
            <span>Backend Specialist · Full-Stack Capable</span>
          </div>
        </div>

        {/* Majestic Centered Headline: BACKEND DEVELOPER (Centered, Clean & Classic) */}
        <div className="my-auto py-10 sm:py-16 text-center">
          
          {/* Centered Circular Portrait Avatar */}
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE_OUT }}
            className="mx-auto mb-3 sm:mb-5 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full ring-4 ring-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden bg-gradient-to-tr from-emerald-600 via-nature-lime to-amber-400 p-1 flex items-center justify-center cursor-default"
          >
            <div className="w-full h-full rounded-full bg-neutral-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-1">
              <span className="font-display font-black text-xl sm:text-2xl text-nature-lime tracking-tight">
                SK
              </span>
              <span className="text-[10px] font-mono uppercase text-neutral-300 tracking-tighter">
                Nagpur, IN
              </span>
            </div>
          </motion.div>

          {/* Top Line: BACKEND (Centered) */}
          <div className="overflow-hidden">
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="font-condensed text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] xl:text-[16rem] leading-[0.82] tracking-tight uppercase text-white drop-shadow-[0_8px_36px_rgba(0,0,0,0.6)] select-none font-black"
            >
              BACKEND
            </motion.h1>
          </div>

          {/* Bottom Line: DEVELOPER (Centered) */}
          <div className="overflow-hidden -mt-2 sm:-mt-6 md:-mt-10 lg:-mt-14">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: EASE_OUT }}
              className="font-condensed text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] xl:text-[16rem] leading-[0.82] tracking-tight uppercase text-white drop-shadow-[0_8px_36px_rgba(0,0,0,0.6)] select-none font-black"
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
            <p className="text-base sm:text-lg text-white max-w-xl font-normal leading-relaxed text-pretty drop-shadow-md">
              Hi, I'm <strong className="text-nature-lime font-bold">{PROFILE.name}</strong>. {PROFILE.heroSub}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-neutral-950 bg-nature-lime hover:bg-nature-lime-light transition-transform active:scale-95 shadow-[0_4px_16px_rgba(132,204,22,0.4)]"
              >
                <span>View Selected Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 shadow-md transition-all hover:border-white/50 active:scale-95"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Real Verified 4iBiz Experience & Award Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.6, ease: EASE_OUT }}
            className="md:col-span-5"
          >
            <div className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_20px_45px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden group hover:border-nature-lime/40 transition-colors">
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 w-28 h-28 bg-nature-lime/20 rounded-full blur-2xl"
              />

              {/* Real Verified Standing Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
                  <Award className="w-3.5 h-3.5 text-nature-lime" />
                  <span>1ST PRIZE · MINI PROJECT (2026)</span>
                </div>
                <span className="text-xs font-bold text-white font-mono">CGPA 8.70</span>
              </div>

              {/* Honest Experience Summary */}
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-4 font-medium">
                "Engineered full-stack features for gym-management SaaS at 4iBiz, migrated mobile app to React Native, and architected an RBAC state machine for document processing awarded 1st Prize."
              </p>

              {/* Real Organization Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-nature-lime text-neutral-950 font-display font-extrabold flex items-center justify-center text-xs shadow-md">
                  4iB
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    4iBiz Techno-Solutions Pvt. Ltd.
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-medium">
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
