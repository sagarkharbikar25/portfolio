import { useEffect } from 'react';

/**
 * Updates normalized `--mx` and `--my` (-1..1) CSS variables on `targetRef`
 * in one rAF loop with zero React re-renders. Sleeps automatically when settled.
 */
export default function usePointerLerp(targetRef, enabled = true) {
  useEffect(() => {
    const el = targetRef?.current;
    if (!el || !enabled || typeof window === 'undefined') return undefined;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return undefined;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let rafId = 0;

    const tick = () => {
      rafId = 0;
      if (document.hidden) return;

      const dx = targetX - curX;
      const dy = targetY - curY;
      curX += dx * 0.08;
      curY += dy * 0.08;

      el.style.setProperty('--mx', curX.toFixed(4));
      el.style.setProperty('--my', curY.toFixed(4));

      if (Math.abs(dx) > 0.0008 || Math.abs(dy) > 0.0008) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!rafId && !document.hidden) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (e) => {
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      targetX = (e.clientX / vw) * 2 - 1;
      targetY = (e.clientY / vh) * 2 - 1;
      schedule();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetRef, enabled]);
}

