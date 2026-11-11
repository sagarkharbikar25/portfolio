import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  Cpu,
  Download,
  FolderGit2,
  Home,
  Mail,
  Menu,
  RotateCcw,
  Terminal,
  X,
  Zap,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { OBSERVATORY_CHAPTERS, PROFILE } from '../data/profile';

const TOP_NAV_LINKS = [
  { id: 'hero', label: '00 // IGNITION' },
  { id: 'projects', label: '01 // INSTRUMENTS' },
  { id: 'telemetry', label: '02 // TELEMETRY' },
  { id: 'architecture', label: '03 // CONSOLE' },
  { id: 'contact', label: '04 // SIGNAL' },
];

export default function HudShell({
  activeSection,
  fastView = false,
  onToggleFastView,
  onNavigateSection,
  onReplayIntro,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [railCopied, setRailCopied] = useState(false);
  const headerRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const onPointerDown = (e) => {
      if (
        drawerRef.current?.contains(e.target) ||
        headerRef.current?.contains(e.target)
      ) {
        return;
      }
      setMobileMenuOpen(false);
    };
    const onHashChange = () => setMobileMenuOpen(false);

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [mobileMenuOpen]);

  const jumpTo = (id) => {
    setMobileMenuOpen(false);
    onNavigateSection?.(id);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setRailCopied(true);
      setTimeout(() => setRailCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <div className="hud-shell-wrapper">
      {/* Keyboard Skip Controls (guarantees Resume within <= 2 Tab stops) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[90] focus:px-3 focus:py-2 focus:bg-void focus:text-cyan-neon focus:border focus:border-cyan-neon font-mono text-xs uppercase"
      >
        Skip to content
      </a>
      <a
        href={PROFILE.resumeUrl}
        download={PROFILE.resumeFileName}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-40 focus:z-[90] focus:px-3 focus:py-2 focus:bg-void focus:text-gold focus:border focus:border-gold font-mono text-xs uppercase"
      >
        Download Resume PDF
      </a>

      {/* ================================================================
          Fixed Top Observatory HUD Navigation Bar
         ================================================================ */}
      <header
        ref={headerRef}
        data-hud-header
        className="fixed top-0 left-0 right-0 z-50 h-16 px-4 sm:px-6 flex items-center justify-between bg-void/80 backdrop-blur-xl border-b border-hud-hairline"
      >
        {/* Brand Monogram */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            jumpTo('hero');
          }}
          className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-neon"
        >
          <span className="px-2 py-1 border border-gold/60 bg-indigoGlass/70 font-mono text-xs font-bold text-gold group-hover:bg-gold group-hover:text-void transition-colors">
            [ {PROFILE.shortMark} ]
          </span>
          <span className="hidden sm:inline font-mono text-xs tracking-wider text-hud-text font-semibold">
            {PROFILE.domain.toUpperCase()}
          </span>
        </a>

        {/* Trapezoidal Center Cyber Dock (Desktop >= md; hidden on mobile) */}
        <nav
          className="hidden md:flex items-center justify-center hud-trapezoid bg-indigoGlass/85 backdrop-blur-xl border-t border-cyan-neon/35 px-7 py-2 shadow-[0_6px_28px_rgba(0,240,255,0.12)]"
          aria-label="Primary Portfolio Navigation"
        >
          <div className="flex items-center gap-4 lg:gap-6 font-mono text-[11px] tracking-widest uppercase">
            {TOP_NAV_LINKS.map((link) => {
              const isActive =
                activeSection === link.id ||
                (link.id === 'telemetry' &&
                  (activeSection === 'experience' ||
                    activeSection === 'skills' ||
                    activeSection === 'credentials'));
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  data-active={isActive ? 'true' : 'false'}
                  onClick={(e) => {
                    e.preventDefault();
                    jumpTo(link.id);
                  }}
                  className={`nav-item-group inline-flex items-center gap-2 transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-1 focus-visible:outline-cyan-neon ${
                    isActive
                      ? 'text-cyan-neon font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.75)]'
                      : 'text-hud-muted hover:text-cyan-neon'
                  }`}
                >
                  <span className="nav-divider shrink-0" aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {onToggleFastView && (
            <button
              type="button"
              onClick={onToggleFastView}
              aria-pressed={fastView}
              title="Toggle Fast View (bypass cinematic scroll stage)"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[10px] tracking-wider uppercase border transition-colors cursor-pointer ${
                fastView
                  ? 'border-cyan-neon bg-cyan-neon/15 text-cyan-neon'
                  : 'border-hud-hairline bg-surface-card/80 text-hud-muted hover:text-cyan-neon hover:border-cyan-neon/60'
              }`}
            >
              <Zap size={12} aria-hidden="true" />
              <span className="hidden sm:inline">FAST_VIEW</span>
            </button>
          )}

          {onReplayIntro && !fastView && (
            <button
              type="button"
              onClick={onReplayIntro}
              title="Replay Boot Preloader Sequence"
              aria-label="Replay boot sequence"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[10px] tracking-wider uppercase border border-hud-hairline bg-surface-card/80 text-hud-muted hover:text-cyan-neon hover:border-cyan-neon/60 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} aria-hidden="true" />
              <span>BOOT</span>
            </button>
          )}

          <a
            href={PROFILE.resumeUrl}
            download={PROFILE.resumeFileName}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase border border-gold/70 bg-gold/15 text-gold hover:bg-gold hover:text-void transition-colors"
          >
            <Download size={13} aria-hidden="true" />
            <span className="hidden sm:inline">RESUME.PDF</span>
            <span className="sm:hidden">CV</span>
          </a>

          <div
            className="hidden lg:inline-flex items-center gap-2 px-2.5 py-1.5 border border-hud-hairline bg-indigoGlass/60 font-mono text-[10px] tracking-widest text-hud-text floating-pause-hover"
            aria-label="System online status"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon status-beacon-cyan" />
            <span>SYS_ONLINE</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 border border-hud-hairline bg-surface-card text-hud-text cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ================================================================
          Desktop Left Vertical Observatory Chapter Rail (CH.00-CH.03, XL screens)
         ================================================================ */}
      <aside
        className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-3.5 font-mono text-[10px]"
        aria-label="Observatory Chapter Quick Jump"
      >
        {OBSERVATORY_CHAPTERS.map((ch) => {
          const isCurrent =
            activeSection === ch.id ||
            (ch.id === 'telemetry' &&
              (activeSection === 'architecture' ||
                activeSection === 'experience' ||
                activeSection === 'skills' ||
                activeSection === 'credentials'));
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => jumpTo(ch.id)}
              title={`${ch.code} ${ch.label} — ${ch.summary}`}
              className={`group flex items-center gap-2 transition-colors cursor-pointer ${
                isCurrent ? 'text-cyan-neon font-bold' : 'text-hud-dim hover:text-hud-text'
              }`}
            >
              <span
                className={`block h-[2px] transition-all ${
                  isCurrent
                    ? 'w-5 bg-cyan-neon shadow-[0_0_8px_rgba(0,240,255,0.85)]'
                    : 'w-2.5 bg-hud-dim/40 group-hover:w-4 group-hover:bg-hud-muted'
                }`}
              />
              <span className="font-serif tracking-widest">{ch.code}</span>
            </button>
          );
        })}
      </aside>

      {/* ================================================================
          Desktop Right Vertical Social & Copy Rail (XL screens)
         ================================================================ */}
      <aside
        className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 font-mono text-[10px] text-hud-dim"
        aria-label="Social and Direct Contact Links"
      >
        <div className="w-[1px] h-10 bg-hud-dim/35" />
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          aria-label="GitHub profile"
          className="group hover:text-cyan-neon transition-colors [writing-mode:vertical-lr] tracking-widest py-1 flex items-center gap-1.5"
        >
          <GithubIcon size={13} className="social-rail-icon" />
          <span>GH // CODE</span>
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          aria-label="LinkedIn profile"
          className="group hover:text-cyan-neon transition-colors [writing-mode:vertical-lr] tracking-widest py-1 flex items-center gap-1.5"
        >
          <LinkedinIcon size={13} className="social-rail-icon" />
          <span>LN // NETWORK</span>
        </a>
        <button
          type="button"
          onClick={handleCopyEmail}
          title={railCopied ? 'Email copied' : `Copy ${PROFILE.email}`}
          aria-label="Copy email address"
          className="group hover:text-gold transition-colors [writing-mode:vertical-lr] tracking-widest py-1 flex items-center gap-1.5 cursor-pointer"
        >
          {railCopied ? (
            <Check size={13} className="social-rail-icon text-hud-emerald" aria-hidden="true" />
          ) : (
            <Mail size={13} className="social-rail-icon" aria-hidden="true" />
          )}
          <span>{railCopied ? 'COPIED' : 'COPY // MAIL'}</span>
        </button>
        <div className="w-[1px] h-10 bg-hud-dim/35" />
      </aside>

      {/* ================================================================
          Tablet/Mobile Dropdown Navigation Drawer (Escape + Outside + Hash)
         ================================================================ */}
      {mobileMenuOpen && (
        <div
          ref={drawerRef}
          className="fixed inset-x-0 top-16 z-40 bg-void/95 backdrop-blur-xl border-b border-cyan-neon/30 p-5 md:hidden flex flex-col gap-3"
          role="dialog"
          aria-label="Mobile Navigation Drawer"
        >
          {TOP_NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => jumpTo(link.id)}
              className={`text-left px-3 py-2.5 font-mono text-xs tracking-widest uppercase border ${
                activeSection === link.id
                  ? 'border-cyan-neon/60 bg-cyan-neon/10 text-cyan-neon'
                  : 'border-hud-hairline text-hud-muted hover:text-hud-text'
              } cursor-pointer`}
            >
              {link.label}
            </button>
          ))}
          {onToggleFastView && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleFastView();
              }}
              className="text-left px-3 py-2.5 font-mono text-xs tracking-widest uppercase border border-cyan-neon/40 text-cyan-neon cursor-pointer inline-flex items-center gap-2"
            >
              <Zap size={13} aria-hidden="true" />
              <span>{fastView ? 'ENABLE OBSERVATORY STAGE' : 'FAST_VIEW (SKIP STAGE)'}</span>
            </button>
          )}
          {onReplayIntro && !fastView && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="text-left px-3 py-2.5 font-mono text-xs tracking-widest uppercase border border-gold/40 text-gold cursor-pointer inline-flex items-center gap-2"
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>REPLAY BOOT SEQUENCE</span>
            </button>
          )}
        </div>
      )}

      {/* ================================================================
          Mobile 5-Tab Bottom Navigation Dock (< 768px)
         ================================================================ */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 min-h-[64px] pt-1.5 px-2 bg-void/92 backdrop-blur-xl border-t border-hud-hairline grid grid-cols-5 items-center"
        style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom))' }}
        aria-label="Mobile Quick Navigation"
      >
        {[
          { id: 'hero', label: 'Hero', icon: Home },
          { id: 'projects', label: 'Systems', icon: FolderGit2 },
          { id: 'telemetry', label: 'Telemetry', icon: Cpu },
          { id: 'architecture', label: 'Console', icon: Terminal },
          { id: 'contact', label: 'Signal', icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive =
            activeSection === tab.id ||
            (tab.id === 'telemetry' &&
              (activeSection === 'experience' ||
                activeSection === 'skills' ||
                activeSection === 'credentials'));
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => jumpTo(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 font-mono text-[10px] tracking-wider cursor-pointer ${
                isActive ? 'text-cyan-neon' : 'text-hud-dim'
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
