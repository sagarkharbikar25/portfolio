import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';

export default function InteractiveCanvasCTA() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    const SPACING = 30;
    const RADIUS = 140;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * SPACING + SPACING / 2;
          const y = r * SPACING + SPACING / 2;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let pointRadius = 1.4;
          let alpha = 0.16;
          let fill = '#9CA3AF';

          if (dist < RADIUS) {
            const factor = 1 - dist / RADIUS;
            pointRadius = 1.4 + factor * 3.5;
            alpha = 0.2 + factor * 0.8;
            fill = factor > 0.5 ? '#BEF264' : '#38BDF8';
          }

          ctx.beginPath();
          ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
          ctx.fillStyle = fill;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    if (!shouldReduceMotion) {
      render();
    } else {
      // Static dot grid for reduced motion
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#6B7280';
      ctx.globalAlpha = 0.2;
      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          ctx.beginPath();
          ctx.arc(c * SPACING + SPACING / 2, r * SPACING + SPACING / 2, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      aria-label="Interactive Canvas Call to Action"
      className="relative py-28 sm:py-36 bg-[#040406] text-white overflow-hidden border-t border-b border-white/10"
    >
      {/* 2D Native Canvas Proximity Dot Matrix (Ponytail Zero-Bloat) */}
      <div className="absolute inset-0 z-0 cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        
        {/* Micro-Ticker / Helper hint (Matching Screenshot 6) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-neutral-300 uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-nature-lime animate-pulse" />
          <span>MOVE YOUR MOUSE — INTERACTIVE MATRIX</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-neutral-200 tracking-tight leading-tight mb-8">
          Have an engineering opportunity? Connect with{' '}
          <span className="font-condensed font-normal uppercase text-white block sm:inline">
            {PROFILE.name}
          </span>
        </h2>

        {/* Pill CTA Button (Matching Screenshot 6) */}
        <div className="pointer-events-auto inline-block">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-bold text-sm sm:text-base hover:bg-nature-lime transition-all duration-300 shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(132,204,22,0.4)] active:scale-95"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#F59E0B]" />
            <span className="tracking-wide uppercase font-display font-extrabold">
              GET IN TOUCH
            </span>
            <ArrowUpRight className="w-5 h-5 text-neutral-950" />
          </a>
        </div>

      </div>
    </section>
  );
}
