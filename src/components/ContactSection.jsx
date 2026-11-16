import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Mail, Clock, MapPin, Send } from 'lucide-react';
import { PROFILE } from '../data/profile';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="relative py-28 sm:py-36 bg-[#07070a] text-white overflow-hidden border-t border-white/10"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Address & Direct Details (Matching Screenshot 7) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-neutral-300 uppercase tracking-widest mb-4">
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
                Contact me
              </h2>
              <p className="text-base text-neutral-400 leading-relaxed text-pretty">
                Have a project in mind, an engineering role, or an architectural challenge? Drop a message and let's build something durable.
              </p>
            </div>

            {/* Studio Info List */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-nature-lime shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                    Location
                  </span>
                  <p className="text-sm sm:text-base text-neutral-200">
                    Nagpur, Maharashtra, India · Remote Worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-nature-lime shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                    Working Hours
                  </span>
                  <p className="text-sm sm:text-base text-neutral-200">
                    Monday – Friday · 10:00 AM – 7:00 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-nature-lime shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                    Direct Email
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm sm:text-base text-white hover:text-nature-lime font-semibold transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-nature-lime" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Underline Form Inputs (Matching Screenshot 7) */}
          <div className="lg:col-span-7 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-nature-lime/20 text-nature-lime mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received</h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto">
                  Thank you for reaching out! I typically reply within 24 hours. You can also email me directly at{' '}
                  <a href={`mailto:${PROFILE.email}`} className="text-nature-lime underline">
                    {PROFILE.email}
                  </a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Row (First Name + Last Name) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
                    >
                      FIRST NAME *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="e.g. Jane"
                      className="w-full bg-transparent border-b border-white/20 py-2.5 text-base text-white placeholder-neutral-600 focus:outline-none focus:border-nature-lime transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
                    >
                      LAST NAME *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="e.g. Doe"
                      className="w-full bg-transparent border-b border-white/20 py-2.5 text-base text-white placeholder-neutral-600 focus:outline-none focus:border-nature-lime transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selector */}
                <div className="space-y-2">
                  <label
                    htmlFor="service"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
                  >
                    SERVICE REQUIRED *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue="fullstack"
                    className="w-full bg-neutral-900 border-b border-white/20 py-2.5 text-base text-white focus:outline-none focus:border-nature-lime transition-colors cursor-pointer"
                  >
                    <option value="fullstack" className="bg-neutral-900 text-white">Full-Stack Web &amp; Mobile Engineering</option>
                    <option value="backend" className="bg-neutral-900 text-white">Deterministic Backend &amp; API State Machine</option>
                    <option value="ai" className="bg-neutral-900 text-white">AI Agent Workflow &amp; Voice Pipelines</option>
                    <option value="sde" className="bg-neutral-900 text-white">Software Development Internship / Full-time Role</option>
                  </select>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
                  >
                    EMAIL (REQUIRED) *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-transparent border-b border-white/20 py-2.5 text-base text-white placeholder-neutral-600 focus:outline-none focus:border-nature-lime transition-colors"
                  />
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-400"
                  >
                    PROJECT DESCRIPTION *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Tell me about your project scope, timeline, and core goals..."
                    className="w-full bg-transparent border-b border-white/20 py-2.5 text-base text-white placeholder-neutral-600 focus:outline-none focus:border-nature-lime transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-nature-lime text-neutral-950 font-bold text-sm hover:bg-nature-lime-light transition-all shadow-[0_4px_20px_rgba(132,204,22,0.35)] active:scale-95"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
