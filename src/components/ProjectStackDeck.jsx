import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers, Maximize2, Terminal } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { MAX_PROJECTS, getDeckProjects } from '../data/projects';
import { PROFILE } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export const HEADER_THEMES = {
  gold: {
    bar: 'bg-[#1D180A] border-b border-gold/45 text-gold',
    cardBorder: 'border-gold/35 hover:border-gold/70',
    modalBorder: 'border-gold/45',
    badge: 'border-gold/55 bg-gold/15 text-gold',
    shadow: 'shadow-[0_20px_50px_rgba(0,0,0,0.72),0_0_26px_rgba(255,215,0,0.08)]',
  },
  emerald: {
    bar: 'bg-[#081C17] border-b border-hud-emerald/45 text-hud-emerald',
    cardBorder: 'border-hud-emerald/35 hover:border-hud-emerald/70',
    modalBorder: 'border-hud-emerald/45',
    badge: 'border-hud-emerald/50 bg-hud-emerald/15 text-hud-emerald',
    shadow: 'shadow-[0_20px_50px_rgba(0,0,0,0.72),0_0_26px_rgba(52,211,153,0.08)]',
  },
  cyan: {
    bar: 'bg-[#071C25] border-b border-cyan-neon/45 text-cyan-neon',
    cardBorder: 'border-cyan-neon/35 hover:border-cyan-neon/70',
    modalBorder: 'border-cyan-neon/45',
    badge: 'border-cyan-neon/50 bg-cyan-neon/15 text-cyan-neon',
    shadow: 'shadow-[0_20px_50px_rgba(0,0,0,0.72),0_0_26px_rgba(0,240,255,0.09)]',
  },
  ice: {
    bar: 'bg-[#0D1A2B] border-b border-ice/45 text-ice',
    cardBorder: 'border-ice/35 hover:border-ice/70',
    modalBorder: 'border-ice/45',
    badge: 'border-ice/50 bg-ice/15 text-ice',
    shadow: 'shadow-[0_20px_50px_rgba(0,0,0,0.72),0_0_26px_rgba(111,196,242,0.08)]',
  },
  violet: {
    bar: 'bg-[#190F29] border-b border-purple-neon/45 text-purple-neon',
    cardBorder: 'border-purple-neon/35 hover:border-purple-neon/70',
    modalBorder: 'border-purple-neon/45',
    badge: 'border-purple-neon/50 bg-purple-neon/15 text-purple-neon',
    shadow: 'shadow-[0_20px_50px_rgba(0,0,0,0.72),0_0_26px_rgba(157,78,221,0.10)]',
  },
};

export default function ProjectStackDeck({ fastView = false, onInspect }) {
  const deckProjects = getDeckProjects();
  const cardRefs = useRef([]);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const staticMode = fastView || reducedMotion;

  const peekStep = deckProjects.length > 4 ? 36 : 44;
  const slotCount = String(deckProjects.length).padStart(2, '0');
  const maxSlots = String(MAX_PROJECTS).padStart(2, '0');

  useLayoutEffect(() => {
    if (staticMode) return undefined;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length < 2) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const triggers = [];

      cards.forEach((card, idx) => {
        const nextCard = cards[idx + 1];
        if (!nextCard) return;

        const nextStickyTop = 84 + (idx + 1) * peekStep;
        const tween = gsap.fromTo(
          card,
          { scale: 1, opacity: 1 },
          {
            scale: 0.94,
            opacity: 0.68,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 86%',
              end: `top ${nextStickyTop + 8}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        if (tween.scrollTrigger) {
          triggers.push(tween.scrollTrigger);
        }
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    });

    return () => {
      mm.revert();
    };
  }, [staticMode, peekStep, deckProjects.length]);

  return (
    <section
      id="projects"
      aria-label="Production Systems Stacking Deck"
      className="relative w-full py-20 px-5 sm:px-8 max-w-[1440px] mx-auto border-t border-hud-dim/20"
    >
      {/* Chapter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-cyan-neon mb-2">
            <Terminal size={14} aria-hidden="true" />
            <span>CH.01 // INSTRUMENTS — DEPLOYED SYSTEMS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-hud-text">
            Production Systems &amp; Deliverables
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
          <span className="px-3 py-1 border border-cyan-neon/40 bg-cyan-neon/10 text-cyan-neon">
            [ {slotCount} / {maxSlots} SLOTS ]
          </span>
          <span className="text-hud-dim tracking-wider hidden sm:inline">
            SCROLL STACK // INSPECT FOR SPECS
          </span>
        </div>
      </div>

      {/* Cascading Sticky Stacking Cards Container (No ancestor overflow-hidden) */}
      <div className="relative flex flex-col gap-7 md:gap-12 pb-6 md:pb-14">
        {deckProjects.map((project, idx) => {
          const theme = HEADER_THEMES[project.headerAccent] || HEADER_THEMES.cyan;
          const stickyTop = `calc(84px + ${idx * peekStep}px)`;
          const primaryExternalLink = project.links?.[0];

          return (
            <article
              key={project.id}
              id={`project-${project.id}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={
                staticMode
                  ? undefined
                  : {
                      '--stack-top': stickyTop,
                      zIndex: idx + 1,
                    }
              }
              className={`stack-card-shell ${
                staticMode ? '' : 'stack-card-sticky'
              } bg-[#0C0E18] border ${theme.cardBorder} ${
                theme.shadow
              } rounded-xl overflow-hidden transition-colors`}
            >
              {/* Peeking 42px Top Header Strip */}
              <div
                className={`h-[42px] px-4 sm:px-6 flex items-center justify-between gap-3 ${theme.bar}`}
              >
                <div className="flex items-center gap-2.5 min-w-0 font-mono text-[11px] tracking-widest uppercase">
                  <span className="font-bold shrink-0">{project.deckIndex}</span>
                  <span className="opacity-45 shrink-0">·</span>
                  <span className="truncate font-semibold">{project.category}</span>
                </div>

                <div className="shrink-0 flex items-center">
                  {project.statusLabel ? (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 border font-mono text-[10px] tracking-wider uppercase ${theme.badge}`}
                    >
                      {project.statusLabel}
                    </span>
                  ) : (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 border font-mono text-[10px] tracking-wider uppercase truncate max-w-[180px] sm:max-w-none ${theme.badge}`}
                    >
                      {project.award}
                    </span>
                  )}
                </div>
              </div>

              {/* Spacious, Uncluttered Big Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 p-5 sm:p-7 md:min-h-[380px] lg:h-[clamp(380px,54vh,440px)] items-stretch">
                {/* Left Visual Frame (7 Cols) */}
                <div className="lg:col-span-7 relative overflow-hidden rounded-lg border border-hud-dim/25 bg-surface-card aspect-[16/10] md:aspect-[21/9] lg:aspect-auto lg:h-full">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={project.imageWidth || 1280}
                    height={project.imageHeight || 720}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0C0E18]/80 to-transparent"
                  />
                </div>

                {/* Right Concise Pitch & Inspect Action (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between min-w-0 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-hud-dim mb-2">
                      <Layers size={12} className="text-cyan-neon" aria-hidden="true" />
                      <span>SYSTEM DOSSIER READY</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-hud-text mb-3 leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-[15px] text-hud-muted leading-relaxed border-l-2 border-gold/80 pl-3 mb-4 line-clamp-3">
                      {project.outcomeLead || project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-surface border border-hud-dim/25 font-mono text-[11px] text-hud-text"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="px-2.5 py-1 bg-surface/60 border border-hud-dim/20 font-mono text-[11px] text-hud-dim">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Primary Inspect Pop-out Button + Quick External Link */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-hud-dim/20">
                    <button
                      type="button"
                      onClick={(e) => onInspect?.(project, e.currentTarget)}
                      className="px-4 py-2.5 border border-gold/85 bg-gold/15 text-gold hover:bg-gold hover:text-void font-mono text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Maximize2 size={14} aria-hidden="true" />
                      <span>INSPECT SYSTEM</span>
                    </button>

                    {primaryExternalLink && (
                      <a
                        href={primaryExternalLink.href}
                        target={primaryExternalLink.external ? '_blank' : undefined}
                        rel={primaryExternalLink.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-neon hover:text-hud-text transition-colors"
                      >
                        <span>{primaryExternalLink.label}</span>
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* GitHub Archive Footer Bar */}
      <div className="mt-4 pt-5 border-t border-hud-dim/20 flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-hud-dim">
          CLICK &ldquo;INSPECT SYSTEM&rdquo; ON ANY CARD TO VIEW ARCHITECTURE DECISIONS &amp; SPECS
        </span>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs text-cyan-neon hover:text-hud-text transition-colors"
        >
          <GithubIcon size={16} />
          <span>EXPLORE ALL 15+ REPOSITORIES ON GITHUB</span>
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
