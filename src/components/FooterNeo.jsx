import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';

const QUICK_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: PROFILE.github },
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'Resume', href: PROFILE.resumeUrl },
  { label: 'Email', href: `mailto:${PROFILE.email}` },
];

export default function FooterNeo() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-[#07070a] text-neutral-900">
      {/* Standalone Rounded Card Enclosure (Exact Match to Screenshot 8) */}
      <div className="relative max-w-7xl mx-auto rounded-[2.5rem] bg-[#A7F3D0] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col justify-between min-h-[520px]">
        
        {/* Top & Middle Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Authentic Career Statement */}
          <div className="md:col-span-5 space-y-4">
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#064E3B] bg-white/40 px-3 py-1 rounded-full">
              LET'S CONNECT
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] leading-tight text-pretty">
              Building deterministic backend systems and scalable full-stack applications.
            </h3>
            <p className="text-sm font-medium text-[#064E3B]/80 max-w-md">
              Seeking Software Development Engineer (SDE), Backend, and Full-Stack Engineering roles. Available remote or on-site across India.
            </p>
          </div>

          {/* Middle Column: Direct Coordinates from Resume */}
          <div className="md:col-span-3 space-y-3 text-sm font-semibold text-[#064E3B]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#064E3B]/70 block font-bold">
              LOCATION &amp; CONTACT
            </span>
            <p className="leading-snug">
              Nagpur, Maharashtra, India
            </p>
            <p>
              <a
                href={`mailto:${PROFILE.email}`}
                className="underline hover:text-black transition-colors font-mono text-xs sm:text-sm"
              >
                {PROFILE.email}
              </a>
            </p>
            <p className="font-mono text-xs">
              +91 8208389305
            </p>
            <p className="text-xs text-[#064E3B]/80 pt-1">
              {PROFILE.educationSummary}
            </p>
          </div>

          {/* Right Columns: Quick Navigation & Social */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-sm font-bold text-[#064E3B]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#064E3B]/70 block mb-3">
                NAVIGATION
              </span>
              <ul className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-black transition-colors inline-flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#064E3B]/70 block mb-3">
                CHANNELS
              </span>
              <ul className="space-y-2">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="hover:text-black transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Giant Brand Watermark Bleed (Matching Screenshot 8) */}
        <div className="relative z-0 mt-16 sm:mt-24 -mb-10 sm:-mb-16 select-none overflow-hidden">
          <h2 className="font-condensed text-[18vw] leading-[0.72] text-[#064E3B]/15 uppercase tracking-tighter whitespace-nowrap text-center font-black">
            SAGARDEV
          </h2>
        </div>

      </div>

      {/* Copyright Subline */}
      <div className="max-w-7xl mx-auto mt-6 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <p>© {new Date().getFullYear()} Sagar Kharbikar. All rights reserved.</p>
        <p>Engineered with React, Tailwind CSS &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
