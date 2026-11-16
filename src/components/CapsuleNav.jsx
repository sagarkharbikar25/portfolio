import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function CapsuleNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'capabilities', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section) || (section === 'capabilities' ? document.getElementById('services') : null);
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
    <>
      {/* Top-Left Modern Brand Wordmark (Matching NEXORA in Reference) */}
      <div className="fixed top-6 left-6 sm:left-10 z-50 pointer-events-auto">
        <a
          href="#hero"
          className="group flex items-center gap-2 focus-visible:outline-none"
        >
          <span className="font-display font-black text-2xl sm:text-3xl tracking-wider text-emerald-300 drop-shadow-[0_2px_12px_rgba(52,211,153,0.4)] group-hover:text-white transition-colors">
            SAGAR
          </span>
          <span className="w-2 h-2 rounded-full bg-nature-lime shadow-[0_0_8px_#84CC16]" />
        </a>
      </div>

      {/* Floating Capsule Nav (Matching Reference Top Center/Right) */}
      <header className="fixed top-5 right-6 sm:right-10 md:inset-x-0 z-50 flex justify-end md:justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Primary Navigation"
          className={`pointer-events-auto flex items-center gap-2 sm:gap-6 px-3 sm:px-5 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-neutral-900/85 backdrop-blur-xl border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.3)]'
              : 'bg-white/25 backdrop-blur-md border border-white/35 shadow-[0_8px_24px_rgba(0,0,0,0.15)]'
          }`}
        >
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-colors ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="capsule-active-pill"
                      className="absolute inset-0 bg-white/20 rounded-full -z-10 shadow-sm"
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
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-neutral-950 bg-nature-lime hover:bg-nature-lime-light rounded-full transition-transform active:scale-95 shadow-[0_2px_14px_rgba(132,204,22,0.4)]"
            >
              <span>Let's Collaborate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile hamburger trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-white hover:bg-white/20 transition-colors focus-visible:rounded-full"
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
            className="pointer-events-auto absolute top-20 right-6 w-64 bg-neutral-950/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 shadow-2xl flex flex-col gap-3 md:hidden z-50 text-white"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>
    </>
  );
}
