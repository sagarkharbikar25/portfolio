import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import usePointerLerp from '../hooks/usePointerLerp';
import { createStarfield2D } from './Starfield2D';
import { HERO_METRICS, PROFILE } from '../data/profile';
import '../styles/stage.css';

const ObservatoryCanvas = lazy(() => import('./ObservatoryCanvas'));

gsap.registerPlugin(ScrollTrigger);

const FOG_OFFSETS = [
  { xStart: '-55vw', top: '8%', opacity: 0.75 },
  { xStart: '-35vw', top: '28%', opacity: 0.65 },
  { xStart: '-70vw', top: '48%', opacity: 0.8 },
  { xStart: '-45vw', top: '68%', opacity: 0.6 },
];

const METRIC_TONES = {
  emerald: 'text-hud-emerald border-hud-emerald/45',
  gold: 'text-gold border-gold/50',
  cyan: 'text-cyan-neon border-cyan-neon/45',
};

function measureNavClamp() {
  const headerEl = document.querySelector('[data-hud-header]');
  const navBottom = headerEl ? Math.ceil(headerEl.getBoundingClientRect().bottom) : 91;
  return Math.max(115, navBottom + 24);
}

/**
 * Single master pinned 3-beat Observatory hero stage (desktop 320vh / tablet 230vh / mobile 160vh).
 * Renders purely procedural CSS + 2D Canvas layers at first paint; reserves coreSlotRef for lazy WebGL.
 */
export default function ScrollStage({
  introReady,
  fastView = false,
  onNavigateSection,
  onStageProgress,
}) {
  const trackRef = useRef(null);
  const safeBandRef = useRef(null);
  const starCanvasRef = useRef(null);
  const starEngineRef = useRef(null);
  const nebulaRef = useRef(null);
  const coreSlotRef = useRef(null);
  const apertureRef = useRef(null);
  const titleRef = useRef(null);
  const fogRefs = useRef([]);
  const telemetryRef = useRef(null);
  const metricValRefs = useRef([]);
  const scrollPromptRef = useRef(null);
  const enterBayRef = useRef(null);
  const threeProxyRef = useRef({ z: 24, ringSpin: 0 });
  const [mountWebGL, setMountWebGL] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [webglFallback, setWebglFallback] = useState(false);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const staticMode = fastView || reducedMotion;

  const handleCanvasReady = useCallback(() => setWebglReady(true), []);
  const handleCanvasFallback = useCallback(() => {
    setWebglReady(false);
    setWebglFallback(true);
  }, []);

  usePointerLerp(trackRef, !staticMode);

  // Defer WebGL ObservatoryCanvas import until after first paint so initial LCP stays light
  useEffect(() => {
    if (fastView || webglFallback) return undefined;
    const raf = requestAnimationFrame(() => setMountWebGL(true));
    return () => cancelAnimationFrame(raf);
  }, [fastView, webglFallback]);

  // Instant first-paint 2D Starfield + WebGL fallback foundation
  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return undefined;
    const isMobile = window.innerWidth <= 768;
    const engine = createStarfield2D(canvas, { isMobile, reducedMotion: staticMode });
    starEngineRef.current = engine;
    return () => {
      engine.destroy();
      starEngineRef.current = null;
    };
  }, [staticMode]);

  // Master GSAP ScrollTrigger timeline + runtime navbar clearance clamp
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || staticMode) return undefined;

    const updateSafeTop = () => {
      const minTop = measureNavClamp();
      track.style.setProperty('--stage-safe-top', `${minTop}px`);
      return minTop;
    };
    updateSafeTop();

    const mm = gsap.matchMedia();

    const buildTimeline = ({ isMobile }) => {
      updateSafeTop();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            starEngineRef.current?.setProgress(self.progress);
            onStageProgress?.(self.progress);
          },
        },
        defaults: { ease: 'none' },
      });

      // Layer 1 nebula drift
      if (nebulaRef.current) {
        tl.to(nebulaRef.current, { scale: 1.25, duration: 1 }, 0);
      }

      // Layer 15 initial scroll indicator fade (p > 0.02)
      if (scrollPromptRef.current) {
        tl.to(scrollPromptRef.current, { opacity: 0, y: 14, duration: 0.04 }, 0.02);
      }

      if (isMobile) {
        // <= 480px: 3 crisp hero beats (title -> core -> telemetry + handoff)
        if (apertureRef.current) {
          tl.to(apertureRef.current, { opacity: 0, duration: 0.26 }, 0);
        }
        if (titleRef.current) {
          tl.to(
            titleRef.current,
            { y: '-85vh', scale: 0.55, rotateX: 40, opacity: 0, duration: 0.34 },
            0
          );
        }
        if (coreSlotRef.current) {
          tl.fromTo(
            coreSlotRef.current,
            { scale: 0.84, opacity: 0.35 },
            { scale: 1, opacity: 0.9, duration: 0.34 },
            0.24
          );
          tl.to(threeProxyRef.current, { z: 8, ringSpin: 1.5, duration: 0.42 }, 0.24);
        }
        if (telemetryRef.current) {
          tl.fromTo(
            telemetryRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' },
            0.46
          );
        }
        const mobileCgpaEl = metricValRefs.current[3];
        if (mobileCgpaEl) {
          const counter = { v: 0 };
          tl.to(
            counter,
            {
              v: 8.7,
              duration: 0.22,
              onUpdate: () => {
                mobileCgpaEl.textContent = counter.v.toFixed(2);
              },
            },
            0.48
          );
        }
      } else {
        // Desktop / Tablet: 3-beat Hero -> Core -> Metrics choreography
        // Beat 1 (0.00-0.30): Aperture radial unlock + Hero title fly-back
        if (apertureRef.current) {
          tl.to(apertureRef.current, { '--r1': '60%', opacity: 0, duration: 0.26 }, 0);
        }
        if (titleRef.current) {
          tl.to(
            titleRef.current,
            { y: '-115vh', scale: 0.42, rotateX: 65, opacity: 0, duration: 0.3 },
            0
          );
        }

        // Beat 2 (0.26-0.60): Fog curtain sweep + Observatory dolly-in
        const fogs = fogRefs.current.filter(Boolean);
        if (fogs.length > 0) {
          tl.to(fogs, { x: '150vw', opacity: 0, stagger: 0.04, duration: 0.28 }, 0.26);
        }
        if (coreSlotRef.current) {
          tl.fromTo(
            coreSlotRef.current,
            { scale: 0.82, opacity: 0.45 },
            { scale: 1, opacity: 1, duration: 0.34 },
            0.26
          );
          tl.to(threeProxyRef.current, { z: 6, ringSpin: 2.0, duration: 0.36 }, 0.26);
        }

        // Beat 3 (0.56-0.88): HERO_METRICS readout framed cleanly around the orbital core
        if (telemetryRef.current) {
          tl.fromTo(
            telemetryRef.current,
            { opacity: 0, y: 24, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.24, ease: 'power2.out' },
            0.56
          );
        }
        const cgpaEl = metricValRefs.current[3];
        if (cgpaEl) {
          const counter = { v: 0 };
          tl.to(
            counter,
            {
              v: 8.7,
              duration: 0.22,
              onUpdate: () => {
                cgpaEl.textContent = counter.v.toFixed(2);
              },
            },
            0.58
          );
        }
      }

      // Handoff (0.86-1.00): Show ENTER INSTRUMENT BAY -> #projects
      if (enterBayRef.current) {
        tl.fromTo(
          enterBayRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.14 },
          0.86
        );
      }

      return () => {
        tl.kill();
      };
    };

    mm.add('(max-width: 480px)', () => buildTimeline({ isMobile: true }));
    mm.add('(min-width: 481px)', () => buildTimeline({ isMobile: false }));

    ScrollTrigger.addEventListener('refreshInit', updateSafeTop);

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', updateSafeTop);
      mm.revert();
    };
  }, [staticMode, introReady, onStageProgress]);

  if (staticMode) {
    return (
      <section
        id="hero"
        className="stage-runway-static relative pt-24 pb-12 px-4 sm:px-6 max-w-6xl mx-auto"
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-hud-hairline bg-surface-card/80 font-mono text-[11px] uppercase tracking-widest text-cyan-neon">
            <span>{PROFILE.role}</span>
            <span className="text-hud-dim">·</span>
            <span className="text-gold">{fastView ? 'FAST_VIEW' : 'REDUCED_MOTION'}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-hud-text mb-3">
            {PROFILE.name}
          </h1>
          <p className="font-mono text-sm sm:text-base text-ice mb-4">{PROFILE.tagline}</p>
          <p className="max-w-2xl mx-auto text-sm text-hud-muted mb-6">{PROFILE.heroSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={PROFILE.resumeUrl}
              download={PROFILE.resumeFileName}
              className="px-5 py-2.5 border border-gold bg-gold text-void font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-hot transition-colors inline-flex items-center gap-2"
            >
              <Download size={14} aria-hidden="true" />
              <span>Resume PDF</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigateSection?.('projects')}
              className="px-5 py-2.5 border border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon font-mono text-xs uppercase tracking-widest hover:bg-cyan-neon hover:text-void transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Inspect Systems</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {HERO_METRICS.map((m) => (
            <div
              key={m.id}
              className="cyber-chamfer bg-surface-card/85 border border-hud-hairline p-3.5"
            >
              <div className="font-mono text-[10px] tracking-widest text-hud-dim mb-1">
                {m.tag}
              </div>
              <div className="font-display text-xl font-bold text-hud-text">{m.value}</div>
              <div className="font-mono text-[11px] text-hud-muted">{m.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={trackRef}
      className="stage-runway relative"
      aria-label="Observatory Hero and Instrument Bay"
    >
      <div className="sticky-viewport flex flex-col justify-center">
        {/* Layer 0: Deep Cosmic Grid with subtle cursor parallax */}
        <div
          className="pointer-events-none absolute inset-0 z-0 cosmic-void-grid parallax-layer-deep opacity-70"
          aria-hidden="true"
        />

        {/* Layer 1: Instant 2D Starfield Canvas + Nebula Radial Glow */}
        <canvas
          ref={starCanvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] w-full h-full"
        />
        <div
          ref={nebulaRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden parallax-layer-mid"
        >
          <div className="absolute -top-24 left-1/4 w-[38rem] h-[38rem] rounded-full bg-cyan-neon/[0.06] blur-3xl" />
          <div className="absolute bottom-0 right-1/5 w-[30rem] h-[30rem] rounded-full bg-purple-neon/[0.045] blur-3xl" />
        </div>

        {/* Layer 2: Observatory Core Slot (2D crosshair foundation + post-first-paint lazy WebGL) */}
        <div
          ref={coreSlotRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
        >
          <div className="relative w-64 h-64 sm:w-[25rem] sm:h-[25rem] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan-neon/20" />
            <div className="absolute inset-6 rounded-full border border-dashed border-ice/25" />
            <div className="absolute inset-16 rounded-full border border-gold/20" />
          </div>
          {mountWebGL && !webglFallback && (
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${webglReady ? 'opacity-80' : 'opacity-0'
                }`}
            >
              <Suspense fallback={null}>
                <ObservatoryCanvas
                  scrollStateRef={threeProxyRef}
                  onReady={handleCanvasReady}
                  onFallback={handleCanvasFallback}
                />
              </Suspense>
            </div>
          )}
        </div>

        {/* Layer 4: Radial Aperture Blur Reveal */}
        <div
          ref={apertureRef}
          aria-hidden="true"
          className="aperture-mask pointer-events-none absolute inset-0 z-[4]"
        />

        {/* Layer 5: Real-DOM SEO Title Lockup */}
        <div
          ref={titleRef}
          className="relative z-[5] my-auto px-4 sm:px-8 text-center max-w-4xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-5 border border-hud-hairline bg-indigoGlass/70 font-mono text-[11px] uppercase tracking-widest text-cyan-neon">
            <span className="w-1.5 h-1.5 rounded-full bg-hud-emerald" />
            <span>{PROFILE.role}</span>
            <span className="text-hud-dim">·</span>
            <span className="text-ice">{PROFILE.domain}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-7xl lg:text-[5.25rem] font-bold uppercase tracking-tight leading-[0.96] text-hud-text mb-4">
            {PROFILE.name}
          </h1>

          <p className="font-mono text-xs sm:text-base tracking-wide text-gold mb-4">
            {PROFILE.tagline}
          </p>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-hud-muted leading-relaxed mb-7">
            {PROFILE.heroSub}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={PROFILE.resumeUrl}
              download={PROFILE.resumeFileName}
              className="px-6 py-3 border border-gold bg-gold text-void font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-hot transition-colors inline-flex items-center gap-2"
            >
              <Download size={14} aria-hidden="true" />
              <span>Resume PDF</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigateSection?.('projects')}
              className="px-5 py-3 border border-cyan-neon/50 bg-indigoGlass/80 text-cyan-neon font-mono text-xs uppercase tracking-widest hover:bg-cyan-neon hover:text-void transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Inspect Systems</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Layer 6: Lightweight Fog Curtain Sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[6] overflow-hidden"
        >
          {FOG_OFFSETS.map((band, idx) => (
            <div
              key={band.top}
              ref={(el) => {
                fogRefs.current[idx] = el;
              }}
              className="fog-band absolute w-[140vw] h-[42vh]"
              style={{ left: band.xStart, top: band.top, opacity: band.opacity }}
            />
          ))}
        </div>

        {/* Layer 8 & 10: Clamped Safe Dock Zone (>= NAV_BOTTOM + 24 >= 115px) */}
        <div
          ref={safeBandRef}
          className="pointer-events-none absolute inset-x-0 bottom-14 md:bottom-10 z-[10] flex flex-col justify-between px-3 sm:px-6 max-w-6xl mx-auto"
          style={{ top: 'var(--stage-safe-top, 115px)' }}
        >
          {/* Layer 8 Telemetry Header Readout */}
          <div
            ref={telemetryRef}
            className="opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
          >
            {HERO_METRICS.map((m, idx) => (
              <div
                key={m.id}
                className={`bg-void/80 border backdrop-blur-sm px-3 py-2 ${METRIC_TONES[m.tone] || METRIC_TONES.cyan
                  }`}
              >
                <div className="font-mono text-[9px] uppercase tracking-widest text-hud-dim truncate">
                  {m.tag}
                </div>
                <div
                  ref={(el) => {
                    metricValRefs.current[idx] = el;
                  }}
                  className="font-display text-lg sm:text-xl font-bold leading-tight text-hud-text"
                >
                  {m.value}
                </div>
                <div className="font-mono text-[10px] text-hud-muted truncate">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 15: Initial Scroll Prompt + Final Enter Instrument Bay Handoff */}
        <div
          ref={scrollPromptRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center gap-1.5 font-mono text-[10px] tracking-[0.28em] text-cyan-neon"
        >
          <span>SCROLL</span>
          <ArrowDown size={13} className="animate-bounce" />
        </div>

        <div
          ref={enterBayRef}
          className="opacity-0 pointer-events-auto absolute bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 z-[15]"
        >
          <button
            type="button"
            onClick={() => onNavigateSection?.('projects')}
            className="px-4 py-1.5 border border-gold/70 bg-void/90 text-gold font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-void transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>ENTER INSTRUMENT BAY</span>
            <ArrowDown size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
