import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function AmbientCanvas() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;
    const pointer = { x: -9999, y: -9999 };

    const dots = Array.from({ length: 42 }, (_, i) => ({
      xNorm: ((i * 73) % 100) / 100,
      yNorm: ((i * 41) % 100) / 100,
      x: 0,
      y: 0,
      vx: ((i % 2 === 0 ? 1 : -1) * (0.12 + (i % 5) * 0.03)),
      vy: ((i % 3 === 0 ? 1 : -1) * (0.1 + (i % 4) * 0.025)),
      r: 1 + (i % 2) * 0.6,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (const d of dots) {
        if (d.x === 0 && d.y === 0) {
          d.x = d.xNorm * width;
          d.y = d.yNorm * height;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i += 1) {
        const d = dots[i];
        if (!shouldReduceMotion) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > width) d.vx *= -1;
          if (d.y < 0 || d.y > height) d.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
        ctx.fill();

        if (pointer.x > 0) {
          const dist = Math.hypot(d.x - pointer.x, d.y - pointer.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 140) * 0.14})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const tick = () => {
      if (isVisible && !shouldReduceMotion) {
        draw();
        rafId = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = Boolean(entries[0]?.isIntersecting);
        if (isVisible && !shouldReduceMotion) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );

    resize();
    draw();
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    canvas.parentElement?.addEventListener('pointermove', onPointerMove);
    canvas.parentElement?.addEventListener('pointerleave', onPointerLeave);

    if (!shouldReduceMotion) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('pointermove', onPointerMove);
      canvas.parentElement?.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full opacity-80"
    />
  );
}

