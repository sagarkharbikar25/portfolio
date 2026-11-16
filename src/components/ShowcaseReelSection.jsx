import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from 'lucide-react';
import { getDeckProjects } from '../data/projects';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function ShowcaseReelSection({ onSelectProject }) {
  const slides = getDeckProjects();
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => !shouldReduceMotion);

  // Respect prefers-reduced-motion changes cleanly
  useEffect(() => {
    if (shouldReduceMotion) setIsPlaying(false);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isPlaying || shouldReduceMotion || slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isPlaying, shouldReduceMotion, slides.length]);

  const current = slides[activeIndex] || slides[0];
  if (!current) return null;

  const stepBy = (delta) => {
    setActiveIndex((prev) => (prev + delta + slides.length) % slides.length);
  };

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto border-b border-white/[0.06]"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-soft mb-2">
            01 // Featured Architecture Reel
          </p>
          <h2
            id="showcase-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-hud-text"
          >
            Shipped Systems in Focus
          </h2>
        </div>

        <p className="max-w-md text-sm text-hud-muted leading-relaxed">
          Interactive storyboard cycling through all {slides.length} shipped engineering architectures — pause anytime or open any chapter for technical inspection.
        </p>
      </motion.div>

      {/* Fixed Aspect Container Guarantees Zero Cumulative Layout Shift */}
      <div className="border border-white/[0.1] bg-[#0D1018] rounded-xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={current.imageAlt}
                width={current.imageWidth || 1280}
                height={current.imageHeight || 720}
                className="w-full h-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-[#08080C]/45 to-transparent"
              />
            </motion.div>
          </AnimatePresence>

          {/* Editorial Caption Overlay pinned cleanly at bottom without triggering shift */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.id}-meta`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="max-w-2xl"
              >
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-cyan-soft mb-1.5">
                  <span>{current.deckIndex}</span>
                  <span className="text-white/30">&middot;</span>
                  <span>{current.category}</span>
                  <span className="text-white/30">&middot;</span>
                  <span className="text-gold">{current.statusLabel || current.award}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-hud-text mb-1.5">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-hud-muted line-clamp-2 leading-relaxed">
                  {current.outcomeLead}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => onSelectProject?.(current)}
              className="shrink-0 px-4 py-2.5 bg-white/[0.08] hover:bg-cyan-soft hover:text-void border border-white/20 hover:border-cyan-soft font-mono text-xs font-semibold uppercase tracking-wider text-hud-text transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Maximize2 size={14} aria-hidden="true" />
              <span>Inspect Breakdown</span>
            </button>
          </div>
        </div>

        {/* Custom Zero-Shift Player Controls & Chapter Scrubber */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-white/[0.08] bg-[#0A0C12] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause showcase auto-advance' : 'Play showcase auto-advance'}
              className="px-3 py-1.5 border border-white/15 bg-white/[0.04] hover:border-cyan-soft hover:text-cyan-soft font-mono text-[11px] uppercase tracking-wider text-hud-text inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause size={12} aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={12} aria-hidden="true" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                stepBy(-1);
              }}
              aria-label="Previous showcase system"
              className="p-1.5 border border-white/15 text-hud-muted hover:text-hud-text hover:border-white/35 cursor-pointer transition-colors"
            >
              <ChevronLeft size={15} />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                stepBy(1);
              }}
              aria-label="Next showcase system"
              className="p-1.5 border border-white/15 text-hud-muted hover:text-hud-text hover:border-white/35 cursor-pointer transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Interactive Storyboard Chapter Scrubber */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Showcase chapters">
            {slides.map((slide, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveIndex(idx);
                  }}
                  className={`px-2.5 py-1 font-mono text-[11px] border transition-colors cursor-pointer ${
                    selected
                      ? 'border-cyan-soft/65 bg-cyan-soft/15 text-cyan-soft font-semibold'
                      : 'border-white/10 text-hud-dim hover:text-hud-muted'
                  }`}
                >
                  {slide.deckIndex.split(' ')[0]} &middot; {slide.title.split('—')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

