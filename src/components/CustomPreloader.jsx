import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FastForward, Terminal } from 'lucide-react';

const CIPHER_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_#%';

const BOOT_PHASES = [
  'INIT_SYSTEM // SAGARDEV.ME',
  'MOUNTING_RBAC_AND_STATE_CONTRACTS',
  'HYDRATING_WEBGL_SPHERE_& _LENIS',
  'SYNC_VERIFIED // LAUNCHING_HUD',
];

function scrambleText(target, progressRatio) {
  const lockedCount = Math.floor(target.length * progressRatio);
  let out = '';
  for (let i = 0; i < target.length; i += 1) {
    if (i < lockedCount || target[i] === ' ' || target[i] === '/') {
      out += target[i];
    } else {
      out += CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)];
    }
  }
  return out;
}

export default function CustomPreloader({ isActive, fastView = false, onRevealStart, onComplete }) {
  const curtainRef = useRef(null);
  const contentRef = useRef(null);
  const exitedRef = useRef(false);

  const [percent, setPercent] = useState(0);
  const [statusLine, setStatusLine] = useState(BOOT_PHASES[0]);

  useEffect(() => {
    if (!isActive) return undefined;
    exitedRef.current = false;
    setPercent(0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || fastView) {
      sessionStorage.setItem('obs_boot_seen', '1');
      onRevealStart?.();
      onComplete?.();
      return undefined;
    }

    let assetsHydrated = document.readyState === 'complete';
    let fontsHydrated = false;

    const markLoad = () => {
      assetsHydrated = true;
    };
    window.addEventListener('load', markLoad, { once: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsHydrated = true;
      });
    } else {
      fontsHydrated = true;
    }

    const triggerCurtainExit = () => {
      if (exitedRef.current) return;
      exitedRef.current = true;
      sessionStorage.setItem('obs_boot_seen', '1');

      const curtain = curtainRef.current;
      const inner = contentRef.current;
      if (!curtain) {
        onRevealStart?.();
        onComplete?.();
        return;
      }

      onRevealStart?.();

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      if (inner) {
        tl.to(inner, {
          y: -20,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        });
      }

      tl.to(
        curtain,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.45,
          ease: 'power4.inOut',
        },
        inner ? '-=0.08' : 0
      );
    };

    // Bounded <= 1.2s boot counter with readiness gate around 92% -> 100%
    const counter = { value: 0 };
    const startTime = performance.now();

    const tween = gsap.to(counter, {
      value: 100,
      duration: 0.85,
      ease: 'power2.out',
      onUpdate: () => {
        const elapsed = performance.now() - startTime;
        const canFinish = (assetsHydrated && fontsHydrated) || elapsed > 950;
        const displayVal = canFinish
          ? Math.min(100, Math.round(counter.value))
          : Math.min(92, Math.round(counter.value));

        setPercent(displayVal);

        const phaseIdx =
          displayVal < 28 ? 0 : displayVal < 60 ? 1 : displayVal < 92 ? 2 : 3;
        const phaseRatio = Math.min(1, ((displayVal % 34) + 14) / 34);
        setStatusLine(
          displayVal === 100
            ? BOOT_PHASES[3]
            : scrambleText(BOOT_PHASES[phaseIdx], phaseRatio)
        );
      },
      onComplete: () => {
        setPercent(100);
        setStatusLine(BOOT_PHASES[3]);
        setTimeout(triggerCurtainExit, 80);
      },
    });

    const maxBudgetTimer = setTimeout(() => {
      tween.kill();
      setPercent(100);
      setStatusLine(BOOT_PHASES[3]);
      triggerCurtainExit();
    }, 1200);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearTimeout(maxBudgetTimer);
        tween.kill();
        setPercent(100);
        triggerCurtainExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(maxBudgetTimer);
      window.removeEventListener('load', markLoad);
      window.removeEventListener('keydown', handleKeyDown);
      tween.kill();
    };
  }, [isActive, fastView, onRevealStart, onComplete]);

  if (!isActive) return null;

  const handleManualSkip = () => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    sessionStorage.setItem('obs_boot_seen', '1');
    const curtain = curtainRef.current;
    onRevealStart?.();
    if (!curtain) {
      onComplete?.();
      return;
    }
    gsap.to(curtain, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.42,
      ease: 'power3.inOut',
      onComplete: () => onComplete?.(),
    });
  };

  return (
    <div
      ref={curtainRef}
      className="preloader-curtain fixed inset-0 z-[100] bg-void cosmic-void-grid flex flex-col justify-between p-6 md:p-10 select-none"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio systems"
    >
      {/* Top Diagnostic Header */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-hud-dim">
        <div className="flex items-center gap-2 text-cyan-neon">
          <Terminal size={14} aria-hidden="true" />
          <span>NODE // SAGAR_KHARBIKAR</span>
        </div>
        <button
          type="button"
          onClick={handleManualSkip}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-hud-dim/40 bg-surface-card/80 text-hud-muted hover:text-cyan-neon hover:border-cyan-neon transition-colors cursor-pointer"
        >
          <span>SKIP_BOOT [ESC]</span>
          <FastForward size={12} aria-hidden="true" />
        </button>
      </div>

      {/* Center Kinetic Readout & Counter */}
      <div ref={contentRef} className="max-w-3xl w-full mx-auto my-auto">
        <div className="font-mono text-xs tracking-[0.2em] text-purple-neon uppercase mb-3">
          // ARCHITECTURAL SEQUENCE INITIALIZATION
        </div>

        <div className="flex items-baseline justify-between gap-4 border-b border-hud-dim/30 pb-4 mb-5">
          <div className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-hud-text tabular-nums">
            {String(percent).padStart(3, '0')}
            <span className="text-cyan-neon">%</span>
          </div>
          <div className="text-right font-mono text-[11px] text-hud-muted hidden sm:block">
            <div>TARGET: PORTFOLIO_OS</div>
            <div className="text-cyan-neon">BUILD: VERIFIED_LOCAL</div>
          </div>
        </div>

        {/* Progress Gauge */}
        <div className="w-full h-1.5 bg-surface-card overflow-hidden border border-hud-dim/25 mb-4">
          <div
            className="h-full bg-gradient-to-r from-cyan-neon via-purple-neon to-cyan-neon transition-[width] duration-75 ease-linear shadow-[0_0_14px_rgba(0,240,255,0.75)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="font-mono text-xs sm:text-sm text-cyan-neon tracking-wider min-h-[20px]">
          &gt; {statusLine}
        </div>
      </div>

      {/* Bottom Corner Brackets */}
      <div className="flex items-center justify-between font-mono text-[11px] text-hud-dim">
        <span>BACKEND // AI // FULL-STACK</span>
        <span>NAGPUR, IN</span>
      </div>
    </div>
  );
}

