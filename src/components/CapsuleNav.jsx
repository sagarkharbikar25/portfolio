import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Service', href: '#services' },
  { label: 'Project', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function CapsuleNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'services', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary Navigation"
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3 sm:px-5 py-2 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-900/80 backdrop-blur-xl border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.4)]'
            : 'bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.2)]'
        }`}
      >
        {/* Brand / Home Anchor */}
        <a
          href="#hero"
          className="flex items-center gap-2 pl-2 pr-1 text-sm font-bold tracking-tight text-white hover:text-nature-lime transition-colors focus-visible:rounded-full"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-nature-lime shadow-[0_0_8px_#84CC16]" />
          <span className="font-display font-bold tracking-wide">SAGAR</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-full transition-colors ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="capsule-active-pill"
                    className="absolute inset-0 bg-white/15 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Primary Action Button ("Let's Collaborate") */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-bold text-neutral-950 bg-nature-lime hover:bg-nature-lime-light rounded-full transition-transform active:scale-95 shadow-[0_2px_12px_rgba(132,204,22,0.35)]"
          >
            <span>Let's Collaborate</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-white hover:bg-white/10 transition-colors focus-visible:rounded-full"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="pointer-events-auto absolute top-20 w-[calc(100%-2rem)] max-w-sm bg-neutral-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col gap-3 md:hidden z-50"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
