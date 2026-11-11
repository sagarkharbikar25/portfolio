/**
 * Lightweight 2D procedural starfield painted immediately on first frame
 * (before lazy Three.js loads) and retained as silent fallback if WebGL fails.
 */
export function createStarfield2D(canvas, { isMobile = false, reducedMotion = false } = {}) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    return { setProgress: () => {}, destroy: () => {} };
  }

  const count = reducedMotion ? 70 : isMobile ? 85 : 150;
  const stars = Array.from({ length: count }, (_, i) => ({
    x: (Math.sin(i * 12.9898) * 43758.5453) % 1,
    y: (Math.sin(i * 78.233) * 19341.123) % 1,
    r: 0.7 + (i % 5) * 0.38,
    z: 0.35 + (i % 7) * 0.12,
    phase: i * 0.7,
    hue: i % 11 === 0 ? '255, 215, 0' : i % 3 === 0 ? '0, 240, 255' : '111, 196, 242',
  })).map((s) => ({
    ...s,
    x: s.x < 0 ? s.x + 1 : s.x,
    y: s.y < 0 ? s.y + 1 : s.y,
  }));

  let width = 0;
  let height = 0;
  let dpr = 1;
  let progress = 0;
  let rafId = 0;
  let inView = true;
  let destroyed = false;

  const resize = () => {
    const parent = canvas.parentElement || document.documentElement;
    width = parent.clientWidth || window.innerWidth;
    height = parent.clientHeight || window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawFrame = (timeMs) => {
    ctx.clearRect(0, 0, width, height);
    const cx = width * 0.5;
    const cy = height * 0.5;
    const radialScale = 1 + progress * 0.25;
    const t = timeMs * 0.0012;

    for (let i = 0; i < stars.length; i += 1) {
      const s = stars[i];
      const dx = (s.x - 0.5) * width * (1 + (radialScale - 1) * s.z);
      const dy = (s.y - 0.5) * height * (1 + (radialScale - 1) * s.z);
      const px = cx + dx;
      const py = cy + dy;

      if (px < -10 || px > width + 10 || py < -10 || py > height + 10) continue;

      const twinkle = reducedMotion ? 0.55 : 0.35 + 0.45 * Math.sin(t * s.z + s.phase);
      ctx.fillStyle = `rgba(${s.hue}, ${twinkle.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const loop = (now) => {
    rafId = 0;
    if (destroyed || reducedMotion || !inView || document.hidden) return;
    drawFrame(now);
    rafId = requestAnimationFrame(loop);
  };

  const ensureLoop = () => {
    if (!reducedMotion && !rafId && inView && !document.hidden && !destroyed) {
      rafId = requestAnimationFrame(loop);
    }
  };

  resize();
  drawFrame(0);

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      if (inView) {
        drawFrame(performance.now());
        ensureLoop();
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    },
    { threshold: 0.01 }
  );
  io.observe(canvas);

  const onVisibility = () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!document.hidden) {
      ensureLoop();
    }
  };

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  ensureLoop();

  return {
    setProgress(p) {
      progress = Math.max(0, Math.min(1, p));
      if (reducedMotion) drawFrame(0);
    },
    destroy() {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}

