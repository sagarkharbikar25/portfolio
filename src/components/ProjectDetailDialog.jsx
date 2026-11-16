import React, { useEffect, useRef } from 'react';
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  Layers,
  ShieldCheck,
  X,
} from 'lucide-react';
import { getDeckProjects } from '../data/projects';

let cachedDisplayTransitionSupport;

function canTransitionDisplay() {
  if (cachedDisplayTransitionSupport !== undefined) return cachedDisplayTransitionSupport;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  cachedDisplayTransitionSupport = getComputedStyle(probe).display === 'block';
  probe.remove();
  return cachedDisplayTransitionSupport;
}

function supportsTopLayerExit() {
  return window.CSS?.supports?.('overlay', 'auto') && canTransitionDisplay();
}

export default function ProjectDetailDialog({ project, onSelectProject, onClose }) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);

  const projects = getDeckProjects();

  const closeDialogWithTransition = async () => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) {
      onClose?.();
      return;
    }

    if (!supportsTopLayerExit()) {
      dialog.setAttribute('data-closing', '');
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((resolve) => setTimeout(resolve, 450)),
        ]);
      }
      if (!dialog.hasAttribute('data-closing')) return;
      dialog.removeAttribute('data-closing');
    }

    dialog.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (project && !dialog.open) {
      dialog.removeAttribute('data-closing');
      dialog.showModal();
    } else if (!project && dialog.open) {
      dialog.close();
    }

    const handleCancel = (event) => {
      event.preventDefault();
      closeDialogWithTransition();
    };

    const handleNativeClose = () => {
      onClose?.();
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('close', handleNativeClose);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('close', handleNativeClose);
    };
  }, [project, onClose]);

  // Mandatory fallback for browsers lacking <dialog closedby="any"> (e.g., Safari)
  const handleBackdropFallbackClick = (event) => {
    if ('closedBy' in HTMLDialogElement.prototype) return;
    const dialog = dialogRef.current;
    if (!dialog || event.target !== dialog) return;

    const rect = (panelRef.current || dialog).getBoundingClientRect();
    const isDialogContent =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;

    if (isDialogContent) return;
    closeDialogWithTransition();
  };

  const stepProject = (delta) => {
    if (!project || projects.length <= 1) return;
    const idx = projects.findIndex((p) => p.id === project.id);
    const nextIdx = (idx + delta + projects.length) % projects.length;
    onSelectProject?.(projects[nextIdx]);
  };

  const titleId = project ? `project-dialog-title-${project.id}` : 'project-dialog-title';

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby={titleId}
      onClick={handleBackdropFallbackClick}
      className="editorial-dialog"
    >
      {project && (
        <div
          ref={panelRef}
          className="w-full max-h-[90vh] overflow-y-auto overscroll-contain bg-white border border-slate-200 rounded-2xl shadow-[0_32px_90px_rgba(15,23,42,0.25)] text-slate-900"
        >
          {/* Sticky Modal Header */}
          <div className="sticky top-0 z-10 px-5 sm:px-7 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider min-w-0">
              <span className="text-emerald-600 font-bold">{project.deckIndex || project.index}</span>
              <span className="text-slate-300">&middot;</span>
              <span className="text-slate-600 font-semibold truncate">{project.category}</span>
              <span className="px-2 py-0.5 border border-amber-300 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-full">
                {project.statusLabel || project.award}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {projects.length > 1 && (
                <div className="hidden sm:flex items-center gap-1 mr-1">
                  <button
                    type="button"
                    onClick={() => stepProject(-1)}
                    aria-label="Previous project"
                    className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepProject(1)}
                    aria-label="Next project"
                    className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={closeDialogWithTransition}
                aria-label="Close project details dialog"
                className="inline-flex items-center gap-1.5 px-3 py-1 border border-slate-200 rounded-full bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200 font-mono text-[11px] uppercase tracking-wider cursor-pointer transition-colors"
              >
                <span>ESC</span>
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-6">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <img
                src={project.image}
                alt={project.imageAlt}
                width={project.imageWidth || 1280}
                height={project.imageHeight || 720}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div>
              <h2
                id={titleId}
                className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3"
              >
                {project.title}
              </h2>

              {project.outcomeLead && (
                <p className="text-sm sm:text-base text-slate-800 border-l-2 border-emerald-500 pl-3.5 mb-4 leading-relaxed font-medium">
                  {project.outcomeLead}
                </p>
              )}

              {/* Process Breakdown: Problem -> Architecture Approach */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
                    <Layers size={12} className="text-emerald-600" aria-hidden="true" />
                    <span>01 // Problem Framing</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
                    <ShieldCheck size={12} className="text-emerald-600" aria-hidden="true" />
                    <span>02 // {project.decisionTitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {project.decisionText}
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-soft mb-3">
                <Cpu size={14} aria-hidden="true" />
                <span>03 // System Specifications &amp; Role</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.specs.map((spec) => (
                  <li
                    key={spec.label}
                    className="p-3.5 bg-white/[0.02] border border-white/[0.08] rounded-lg text-xs sm:text-sm text-hud-muted leading-relaxed"
                  >
                    <div className="font-mono text-[11px] font-semibold text-hud-text mb-1">
                      <span className="text-cyan-soft mr-1.5">&#8250;</span>
                      {spec.label}
                    </div>
                    {spec.detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditional Incident Post-Mortem */}
            {project.postMortem && (
              <div className="p-4 border border-gold/40 bg-gold/[0.05] rounded-lg space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold font-bold">
                  <AlertTriangle size={14} aria-hidden="true" />
                  <span>Production Incident Post-Mortem</span>
                </div>
                <p className="text-hud-muted">
                  <strong className="text-gold">Incident:</strong> {project.postMortem.symptom}
                </p>
                <p className="text-hud-muted">
                  <strong className="text-cyan-soft">Resolution:</strong> {project.postMortem.fix}
                </p>
              </div>
            )}

            {/* Stack Tags */}
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-hud-dim mb-2">
                Tools &amp; Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.09] font-mono text-xs text-hud-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 border transition-colors ${
                      link.primary
                        ? 'border-cyan-soft bg-cyan-soft/15 text-cyan-soft hover:bg-cyan-soft hover:text-void font-semibold'
                        : 'border-white/15 text-hud-muted hover:text-hud-text hover:border-white/35'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={closeDialogWithTransition}
                className="px-4 py-2 border border-white/15 text-hud-muted hover:text-hud-text hover:border-white/35 font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

