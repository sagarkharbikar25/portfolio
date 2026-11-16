import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Copy, Check, MapPin, Clock, ArrowUpRight, FileText, Send, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE } from '../data/profile';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Direct Contact Hub"
      className="relative py-28 sm:py-36 bg-[#f8fafc] text-slate-900 overflow-hidden border-t border-slate-200/80"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Context & Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-xs font-mono text-slate-700 uppercase tracking-widest mb-4 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
                Contact me
              </h2>
              <p className="text-base text-slate-600 leading-relaxed text-pretty">
                Have a project in mind, an engineering role, or an architectural challenge? Connect directly—no form friction, no automated delays.
              </p>
            </div>

            {/* Coordinates & Status */}
            <div className="space-y-6 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <MapPin className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-0.5">
                    Location
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 font-medium">
                    Nagpur, Maharashtra, India · Available Worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Clock className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-0.5">
                    Working Hours &amp; Response
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 font-medium">
                    Monday – Friday · 10:00 AM – 7:00 PM IST (Replies within 24h)
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-emerald-900 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold tracking-tight">
                  Status: Available for SDE, Backend &amp; Full-Stack Opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Zero-Friction Contact Card (No Form / No Resend API Required) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] space-y-8">
            
            {/* Primary Email Direct Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  DIRECT EMAIL INBOX
                </span>
                <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verified Channel</span>
                </span>
              </div>

              <div className="break-all font-mono text-lg sm:text-2xl font-bold text-slate-900 select-all">
                {PROFILE.email}
              </div>

              {/* Action Buttons: 1-Click Mail + Copy */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${PROFILE.email}?subject=Project%20Inquiry%20via%20Portfolio&body=Hi%20Sagar,%0D%0A%0D%0AI'd%20like%20to%20discuss...`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nature-lime text-neutral-950 font-bold text-sm hover:bg-nature-lime-light transition-all shadow-[0_4px_16px_rgba(132,204,22,0.35)] active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-100 hover:border-slate-400 transition-all active:scale-95 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Channels Quick-Action Grid */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
                ADDITIONAL DIRECT CHANNELS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* LinkedIn */}
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-center justify-between text-slate-700 group-hover:text-emerald-600 mb-2">
                    <LinkedinIcon size={20} />
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">LinkedIn</span>
                    <span className="text-xs text-slate-500 font-medium">Connect &amp; Message</span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-center justify-between text-slate-700 group-hover:text-emerald-600 mb-2">
                    <GithubIcon size={20} />
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">GitHub</span>
                    <span className="text-xs text-slate-500 font-medium">Review Code &amp; PRs</span>
                  </div>
                </a>

                {/* Resume PDF */}
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-center justify-between text-slate-700 group-hover:text-emerald-600 mb-2">
                    <FileText className="w-5 h-5" />
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Resume (PDF)</span>
                    <span className="text-xs text-slate-500 font-medium">Credentials &amp; History</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Zero-friction note */}
            <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
              * Direct mail is monitored actively. No third-party email routing APIs or intermediate marketing forms.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
