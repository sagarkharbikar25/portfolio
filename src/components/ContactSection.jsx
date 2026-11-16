import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, Download, Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE } from '../data/profile';

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function ContactSection() {
  const formRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedDraft, setSubmittedDraft] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync aria-invalid dynamically with :user-invalid + provide JS WeakMap fallback if unsupported
  useEffect(() => {
    const form = formRef.current;
    if (!form) return undefined;

    const nativeUserInvalidSupported =
      typeof CSS !== 'undefined' && CSS.supports?.('selector(:user-invalid)');
    const interactedMap = new WeakMap();

    const syncAria = (el) => {
      if (!el?.matches?.('input, textarea')) return;

      if (nativeUserInvalidSupported) {
        if (el.matches(':user-invalid')) {
          el.setAttribute('aria-invalid', 'true');
        } else {
          el.removeAttribute('aria-invalid');
        }
        return;
      }

      const state = interactedMap.get(el);
      if (!state?.blurred || !state?.edited) return;
      const valid = el.checkValidity();
      el.classList.toggle('user-invalid-fallback', !valid);
      el.classList.toggle('user-valid-fallback', valid);
      if (!valid) {
        el.setAttribute('aria-invalid', 'true');
      } else {
        el.removeAttribute('aria-invalid');
      }
    };

    const handleBlur = (e) => {
      const target = e.target;
      if (!target?.matches?.('input, textarea')) return;
      if (!nativeUserInvalidSupported) {
        const state = interactedMap.get(target) || { edited: false, blurred: false };
        state.blurred = true;
        interactedMap.set(target, state);
      }
      syncAria(target);
    };

    const handleInput = (e) => {
      const target = e.target;
      if (!target?.matches?.('input, textarea')) return;
      if (!nativeUserInvalidSupported) {
        const state = interactedMap.get(target) || { edited: false, blurred: false };
        state.edited = true;
        interactedMap.set(target, state);
      }
      if (target.getAttribute('aria-invalid') === 'true' || !nativeUserInvalidSupported) {
        syncAria(target);
      }
    };

    form.addEventListener('blur', handleBlur, true);
    form.addEventListener('input', handleInput, true);
    return () => {
      form.removeEventListener('blur', handleBlur, true);
      form.removeEventListener('input', handleInput, true);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Trigger native constraint validation reporting if any required field is invalid
    if (!form.reportValidity()) {
      const controls = form.querySelectorAll('input, textarea');
      controls.forEach((ctrl) => {
        if (!ctrl.checkValidity()) {
          ctrl.setAttribute('aria-invalid', 'true');
          ctrl.classList.add('user-invalid-fallback');
        }
      });
      return;
    }

    const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${name.trim()}`
    )}&body=${encodeURIComponent(
      `From: ${name.trim()} (${email.trim()})\n\n${message.trim()}`
    )}`;

    setSubmittedDraft({ name: name.trim(), email: email.trim(), mailtoHref });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-24 sm:pt-32 pb-12 px-5 sm:px-8 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
        {/* Left Editorial Invite */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="lg:col-span-5 space-y-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-soft mb-2">
              05 // Direct Contact
            </p>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-hud-text mb-4"
            >
              Let&apos;s Build Reliable Systems Together
            </h2>
            <p className="text-sm sm:text-base text-hud-muted leading-relaxed">
              {PROFILE.availability} Reach out via the form or connect directly using the links below.
            </p>
          </div>

          <div className="p-4 border border-white/[0.09] bg-[#0D1018] rounded-xl flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-widest text-hud-dim">
                Direct Email
              </div>
              <a
                href={`mailto:${PROFILE.email}`}
                className="font-mono text-sm text-hud-text hover:text-cyan-soft transition-colors truncate block"
              >
                {PROFILE.email}
              </a>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="shrink-0 px-3 py-1.5 border border-white/15 bg-white/[0.04] hover:border-cyan-soft hover:text-cyan-soft font-mono text-[11px] uppercase inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3 font-mono text-xs">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 border border-white/15 bg-white/[0.03] hover:border-cyan-soft hover:text-cyan-soft transition-colors inline-flex items-center gap-2"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 border border-white/15 bg-white/[0.03] hover:border-cyan-soft hover:text-cyan-soft transition-colors inline-flex items-center gap-2"
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
            </a>

            <a
              href={PROFILE.resumeUrl}
              download={PROFILE.resumeFileName}
              className="px-4 py-2.5 border border-gold/45 bg-gold/10 text-gold hover:bg-gold hover:text-void transition-colors inline-flex items-center gap-2 font-semibold"
            >
              <Download size={14} aria-hidden="true" />
              <span>Resume PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Right Functional Contact Form */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: EASE_OUT }}
          className="lg:col-span-7 p-6 sm:p-8 border border-white/[0.1] bg-[#0D1018] rounded-xl"
        >
          <AnimatePresence mode="wait">
            {submittedDraft ? (
              <motion.div
                key="submitted"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4 py-4"
              >
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-hud-emerald">
                  <Check size={15} aria-hidden="true" />
                  <span>Message Draft Ready</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-hud-text">
                  Thanks, {submittedDraft.name}.
                </h3>
                <p className="text-sm text-hud-muted leading-relaxed">
                  Since this portfolio is statically hosted without an external mail server, launch your email client directly with your pre-filled draft or copy `{PROFILE.email}` manually.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={submittedDraft.mailtoHref}
                    className="px-5 py-2.5 bg-cyan-soft text-void font-mono text-xs font-bold uppercase tracking-wider hover:bg-hud-text transition-colors inline-flex items-center gap-2"
                  >
                    <Mail size={14} aria-hidden="true" />
                    <span>Open Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedDraft(null);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-4 py-2.5 border border-white/15 text-hud-muted hover:text-hud-text font-mono text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Write Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs uppercase tracking-wider text-hud-text mb-1"
                  >
                    Name
                  </label>
                  <span id="contact-name-hint" className="block text-xs text-hud-dim mb-2">
                    Your name or team name (minimum 2 characters)
                  </span>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    aria-describedby="contact-name-hint"
                    aria-errormessage="contact-name-error"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="contact-field-control w-full px-4 py-2.5 bg-[#08090E] border border-white/15 rounded-lg text-sm text-hud-text placeholder:text-hud-dim/60 focus:border-cyan-soft focus:outline-none transition-colors"
                  />
                  <div
                    id="contact-name-error"
                    className="contact-error-msg font-mono text-[11px] text-rose-400 mt-1.5"
                  >
                    Please enter at least 2 characters for your name.
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs uppercase tracking-wider text-hud-text mb-1"
                  >
                    Email
                  </label>
                  <span id="contact-email-hint" className="block text-xs text-hud-dim mb-2">
                    Format: you@company.com
                  </span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-describedby="contact-email-hint"
                    aria-errormessage="contact-email-error"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="contact-field-control w-full px-4 py-2.5 bg-[#08090E] border border-white/15 rounded-lg text-sm text-hud-text placeholder:text-hud-dim/60 focus:border-cyan-soft focus:outline-none transition-colors"
                  />
                  <div
                    id="contact-email-error"
                    className="contact-error-msg font-mono text-[11px] text-rose-400 mt-1.5"
                  >
                    Please provide a valid email address.
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs uppercase tracking-wider text-hud-text mb-1"
                  >
                    Message
                  </label>
                  <span id="contact-message-hint" className="block text-xs text-hud-dim mb-2">
                    Share role context, project goals, or feedback (at least 10 characters)
                  </span>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    minLength={10}
                    aria-describedby="contact-message-hint"
                    aria-errormessage="contact-message-error"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us discuss backend engineering internships or a system architecture collaboration..."
                    className="contact-field-control w-full px-4 py-2.5 bg-[#08090E] border border-white/15 rounded-lg text-sm text-hud-text placeholder:text-hud-dim/60 focus:border-cyan-soft focus:outline-none transition-colors resize-y"
                  />
                  <div
                    id="contact-message-error"
                    className="contact-error-msg font-mono text-[11px] text-rose-400 mt-1.5"
                  >
                    Please write a short message (at least 10 characters).
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-hud-text text-void font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-soft transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} aria-hidden="true" />
                  <span>Prepare Email Draft</span>
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Minimal Editorial Footer */}
      <footer className="pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-hud-dim">
        <div>
          &copy; 2026 {PROFILE.name} &middot; {PROFILE.domain}
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href="#hero" className="hover:text-hud-text transition-colors">
            Top
          </a>
          <a href="#showcase" className="hover:text-hud-text transition-colors">
            Showcase
          </a>
          <a href="#work" className="hover:text-hud-text transition-colors">
            Work
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-cyan-soft transition-colors"
          >
            {PROFILE.email}
          </a>
        </div>
      </footer>
    </section>
  );
}

