import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Cpu, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { HEADER_THEMES } from './ProjectStackDeck';

export default function ProjectInspectModal({ project, onClose, onPauseScroll }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    onPauseScroll?.(true);

    const focusRaf = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const onHashChange = () => onClose?.();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      cancelAnimationFrame(focusRaf);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('hashchange', onHashChange);
      document.body.style.overflow = prevOverflow;
      onPauseScroll?.(false);
    };
  }, [project, onClose, onPauseScroll]);

  if (!project) return null;

  const theme = HEADER_THEMES[project.headerAccent] || HEADER_THEMES.cyan;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`inspect-title-${project.id}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      className="fixed inset-0 z-[80] bg-void/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
    >
      <div
        ref={panelRef}
        data-lenis-prevent
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain bg-[#0C0E18] border ${theme.modalBorder} rounded-xl shadow-[0_28px_90px_rgba(0,0,0,0.85)]`}
      >
        {/* Sticky Modal Header Bar */}
        <div
          className={`sticky top-0 z-10 px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3 ${theme.bar}`}
        >
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] tracking-widest uppercase min-w-0">
            <span className="font-bold">{project.deckIndex || project.index}</span>
            <span className="opacity-45">·</span>
            <span className="truncate">{project.category || 'SYSTEM'}</span>
            <span
              className={`px-2 py-0.5 border font-mono text-[10px] ${theme.badge}`}
            >
              {project.statusLabel || project.award}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close system inspection modal"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-hud-hairlineHot hover:border-current hover:bg-void/60 font-mono text-[11px] uppercase tracking-wider cursor-pointer shrink-0 transition-colors"
          >
            <span>ESC</span>
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        {/* Full Dossier Content */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Screenshot Frame */}
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-hud-dim/25 bg-surface-card">
            <img
              src={project.image}
              alt={project.imageAlt}
              width={project.imageWidth || 1280}
              height={project.imageHeight || 720}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Title & Verified Outcome */}
          <div>
            <h3
              id={`inspect-title-${project.id}`}
              className="font-display text-2xl sm:text-3xl font-bold text-hud-text mb-3"
            >
              {project.title}
            </h3>

            {project.outcomeLead && (
              <p className="text-sm sm:text-base font-medium text-ice leading-relaxed border-l-2 border-gold pl-3.5 mb-4">
                {project.outcomeLead}
              </p>
            )}

            <div className="p-4 bg-void/70 border border-hud-dim/25 text-sm text-hud-muted leading-relaxed">
              <p className="mb-2">{project.summary}</p>
              <p>
                <strong className="text-hud-text font-mono text-xs uppercase tracking-wider mr-1.5">
                  Problem:
                </strong>
                {project.problem}
              </p>
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-neon mb-3">
              <Cpu size={14} aria-hidden="true" />
              <span>Technical Specifications</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.specs.map((spec) => (
                <li
                  key={spec.label}
                  className="p-3.5 bg-surface/85 border border-hud-dim/20 text-xs sm:text-sm text-hud-muted leading-relaxed"
                >
                  <div className="font-mono text-[11px] font-semibold text-hud-text mb-1">
                    <span className="text-cyan-neon mr-1.5">&#8250;</span>
                    {spec.label}
                  </div>
                  {spec.detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Architecture Decision */}
          <div className="p-4 bg-indigoGlass/45 border-l-2 border-cyan-neon">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-neon font-semibold mb-1.5">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>{project.decisionTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-hud-muted leading-relaxed">
              {project.decisionText}
            </p>
          </div>

          {/* Conditional Incident Post-Mortem */}
          {project.postMortem && (
            <div className="p-4 border border-gold/45 bg-gold/[0.06] space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold font-bold">
                <AlertTriangle size={14} aria-hidden="true" />
                <span>Production Incident Post-Mortem</span>
              </div>
              <p className="text-hud-muted">
                <strong className="text-gold">Incident:</strong> {project.postMortem.symptom}
              </p>
              <p className="text-hud-muted">
                <strong className="text-cyan-neon">Fix:</strong> {project.postMortem.fix}
              </p>
              <p className="font-mono text-[11px] text-ice">{project.postMortem.stack}</p>
            </div>
          )}

          {/* Full Tech Stack */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-hud-dim mb-2.5">
              Verified Stack &amp; Tooling
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-surface-card border border-hud-dim/30 font-mono text-xs text-hud-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-hud-dim/25 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 border transition-colors ${
                    link.primary
                      ? 'border-cyan-neon bg-cyan-neon/15 text-cyan-neon hover:bg-cyan-neon hover:text-void font-semibold'
                      : 'border-hud-dim/40 text-hud-muted hover:text-hud-text hover:border-hud-text'
                  }`}
                >
                  <span>{link.label}</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-hud-dim/40 text-hud-muted hover:text-hud-text hover:border-hud-text font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
