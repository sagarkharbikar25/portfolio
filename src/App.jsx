import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomPreloader from './components/CustomPreloader';
import HudShell from './components/HudShell';
import ScrollStage from './scenes/ScrollStage';
import ProjectStackDeck from './components/ProjectStackDeck';
import ProjectInspectModal from './components/ProjectInspectModal';
import BentoDossiers from './components/BentoDossiers';

gsap.registerPlugin(ScrollTrigger);

const TRACKED_SECTIONS = [
  'hero',
  'projects',
  'telemetry',
  'architecture',
  'experience',
  'skills',
  'credentials',
  'contact',
];

function getInitialFastView() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get('ref') === 'resume') return true;
  return sessionStorage.getItem('obs_fast_view') === '1';
}

function getShouldSkipBoot(fastViewInitial) {
  if (typeof window === 'undefined') return true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return reduced || fastViewInitial || sessionStorage.getItem('obs_boot_seen') === '1';
}

export default function App() {
  const lenisRef = useRef(null);
  const lastInspectTriggerRef = useRef(null);
  const [fastView, setFastView] = useState(() => getInitialFastView());
  const [preloaderActive, setPreloaderActive] = useState(
    () => !getShouldSkipBoot(getInitialFastView())
  );
  const [introReady, setIntroReady] = useState(
    () => getShouldSkipBoot(getInitialFastView())
  );
  const [activeSection, setActiveSection] = useState('hero');
  const [inspectedProject, setInspectedProject] = useState(null);

  // Lock dark color scheme and initialize Lenis + GSAP ScrollTrigger sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setPreloaderActive(false);
      setIntroReady(true);
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const refreshTriggers = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshTriggers);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshTriggers);
    }

    return () => {
      window.removeEventListener('load', refreshTriggers);
      gsap.ticker.remove(tickerCb);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Freeze virtual scroll while preloader curtain covers screen
  useEffect(() => {
    if (!lenisRef.current) return;
    if (preloaderActive) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
      ScrollTrigger.refresh();
    }
  }, [preloaderActive]);

  // IntersectionObserver scroll-spy mapped distinctly across Hero -> Projects Deck -> Telemetry -> Contact
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (
              id === 'telemetry' ||
              id === 'experience' ||
              id === 'skills' ||
              id === 'credentials'
            ) {
              setActiveSection('telemetry');
            } else {
              setActiveSection(id);
            }
          }
        }
      },
      { rootMargin: '-28% 0px -55% 0px', threshold: 0.01 }
    );

    for (const id of TRACKED_SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [fastView]);

  const handleToggleFastView = useCallback(() => {
    setFastView((prev) => {
      const next = !prev;
      sessionStorage.setItem('obs_fast_view', next ? '1' : '0');
      if (next) {
        setPreloaderActive(false);
        setIntroReady(true);
      }
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return next;
    });
  }, []);

  const handleNavigateSection = useCallback((id) => {
    const normalized =
      id === 'experience' || id === 'skills' || id === 'credentials' ? 'telemetry' : id;
    setActiveSection(normalized);

    const targetEl = document.getElementById(id);
    if (!targetEl) {
      if (id === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const offset = id === 'hero' ? 0 : -72;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, { offset });
    } else {
      targetEl.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  const handleInspectProject = useCallback((project, triggerEl) => {
    lastInspectTriggerRef.current = triggerEl || document.activeElement;
    setInspectedProject(project);
  }, []);

  const handleCloseInspect = useCallback(() => {
    setInspectedProject(null);
    requestAnimationFrame(() => {
      lastInspectTriggerRef.current?.focus?.();
    });
  }, []);

  const handleModalScrollLock = useCallback(
    (locked) => {
      if (!lenisRef.current || preloaderActive) return;
      if (locked) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    },
    [preloaderActive]
  );

  const handleRevealStart = useCallback(() => {
    setIntroReady(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderActive(false);
    setIntroReady(true);
  }, []);

  const handleReplayIntro = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    setIntroReady(false);
    setPreloaderActive(true);
  }, []);

  return (
    <div className="min-h-screen bg-void cosmic-void-grid text-hud-text relative overflow-x-clip">
      {/* Subtle Ambient Scanlines Texture */}
      <div className="pointer-events-none fixed inset-0 cyber-scanlines z-30" aria-hidden="true" />

      {/* Phase A: Kinetic Cipher Preloader & GSAP Clip-Path Curtain */}
      <CustomPreloader
        isActive={preloaderActive}
        fastView={fastView}
        onRevealStart={handleRevealStart}
        onComplete={handlePreloaderComplete}
      />

      {/* Persistent Cybernetic HUD & Rails */}
      <HudShell
        activeSection={activeSection}
        fastView={fastView}
        onToggleFastView={handleToggleFastView}
        onNavigateSection={handleNavigateSection}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Content Flow */}
      <main id="main-content" className="relative z-10 xl:px-20">
        <ScrollStage
          introReady={introReady}
          fastView={fastView}
          onNavigateSection={handleNavigateSection}
        />

        {/* CH.01 // Big Sticky Stacking Project Cards (1-6 Slots + Inspect Trigger) */}
        <ProjectStackDeck fastView={fastView} onInspect={handleInspectProject} />

        {/* CH.02-CH.03 // System Telemetry Console, Record, Credentials, Signal & Footer */}
        <BentoDossiers
          onNavigateSection={handleNavigateSection}
          onReplayIntro={handleReplayIntro}
        />
      </main>

      {/* Accessible System Details Pop-Out Modal */}
      <ProjectInspectModal
        project={inspectedProject}
        onClose={handleCloseInspect}
        onPauseScroll={handleModalScrollLock}
      />
    </div>
  );
}
