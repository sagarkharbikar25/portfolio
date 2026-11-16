import React, { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/profile';

const NAV_LINKS = [
  { href: '#showcase', label: 'Showcase' },
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

export default function EditorialNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:px-3 focus:py-2 focus:bg-void focus:text-cyan-soft focus:border focus:border-cyan-soft font-mono text-xs uppercase"
      >
        Skip to main content
      </a>
      <a
        href={PROFILE.resumeUrl}
        download={PROFILE.resumeFileName}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-48 focus:z-[90] focus:px-3 focus:py-2 focus:bg-void focus:text-gold focus:border focus:border-gold font-mono text-xs uppercase"
      >
        Download Resume PDF
      </a>

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#08080C]/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a
            href="#hero"
            className="inline-flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight text-hud-text hover:text-cyan-soft transition-colors"
          >
            <span className="px-2 py-0.5 border border-white/15 bg-white/[0.04] font-mono text-xs text-cyan-soft">
              {PROFILE.shortMark}
            </span>
            <span>{PROFILE.name}</span>
          </a>

          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-mono uppercase tracking-wider text-hud-muted hover:text-hud-text transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={PROFILE.resumeUrl}
              download={PROFILE.resumeFileName}
              className="px-3.5 py-2 border border-white/15 bg-white/[0.04] hover:border-cyan-soft/60 hover:text-cyan-soft text-hud-text font-mono text-[11px] uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <Download size={13} aria-hidden="true" />
              <span>Resume</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 border border-white/15 text-hud-muted hover:text-hud-text cursor-pointer"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden border-t border-white/[0.07] bg-[#0B0D14] px-5 py-4 flex flex-col gap-3"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-1.5 font-mono text-xs uppercase tracking-wider text-hud-muted hover:text-cyan-soft transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

