import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import AmbientCanvas from './AmbientCanvas';
import { HERO_METRICS, PROFILE } from '../data/profile';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const maskInitial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '105%' };
  const maskAnimate = { opacity: 1, y: 0 };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden border-b border-white/[0.06]"
    >
      <AmbientCanvas />

      {/* Subtle radial depth gradient preserving crisp typography contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.08),transparent_55%)]"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="inline-flex items-center gap-2.5 px-3 py-1 mb-7 border border-white/10 bg-white/[0.03] font-mono text-xs text-cyan-soft tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-hud-emerald" aria-hidden="true" />
          <span>{PROFILE.availability}</span>
        </motion.div>

        {/* Masked Line Reveals for Primary Identity & Headline */}
        <div className="space-y-2 mb-7">
          <div className="overflow-hidden">
            <motion.p
              initial={maskInitial}
              animate={maskAnimate}
              transition={{ duration: 0.65, ease: EASE_OUT }}
              className="font-mono text-sm sm:text-base uppercase tracking-[0.18em] text-hud-muted"
            >
              {PROFILE.role}
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={maskInitial}
              animate={maskAnimate}
              transition={{ duration: 0.75, delay: shouldReduceMotion ? 0 : 0.08, ease: EASE_OUT }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-hud-text"
            >
              {PROFILE.name}
            </motion.h1>
          </div>

          <div className="overflow-hidden pt-1">
            <motion.p
              initial={maskInitial}
              animate={maskAnimate}
              transition={{ duration: 0.75, delay: shouldReduceMotion ? 0 : 0.16, ease: EASE_OUT }}
              className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-medium tracking-tight text-cyan-soft/90"
            >
              {PROFILE.tagline}
            </motion.p>
          </div>
        </div>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.24, ease: EASE_OUT }}
          className="max-w-2xl text-base sm:text-lg text-hud-muted leading-relaxed mb-10"
        >
          {PROFILE.heroSub}
        </motion.p>

        {/* Primary & Secondary Action CTAs */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.32, ease: EASE_OUT }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <a
            href="#work"
            className="px-6 py-3 bg-hud-text text-void font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-soft transition-colors inline-flex items-center gap-2"
          >
            <span>View Work</span>
            <ArrowDownRight size={15} aria-hidden="true" />
          </a>

          <a
            href="#contact"
            className="px-6 py-3 border border-white/20 bg-white/[0.03] text-hud-text hover:border-cyan-soft hover:text-cyan-soft font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <span>Contact</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </motion.div>

        {/* Calm Editorial Proof Row */}
        <motion.dl
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.4, ease: EASE_OUT }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/[0.08]"
        >
          {HERO_METRICS.map((item) => (
            <div key={item.id} className="space-y-1">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-hud-dim">
                {item.tag}
              </dt>
              <dd className="flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-bold text-hud-text">
                  {item.value}
                </span>
                <span className="font-mono text-xs text-hud-muted truncate">{item.unit}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

