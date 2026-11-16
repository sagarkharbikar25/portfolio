import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Check, Code2, Copy, Play } from 'lucide-react';
import { EXPERIENCE } from '../data/experience';
import { PROFILE } from '../data/profile';
import {
  ARCHITECTURE_PRINCIPLES,
  CODE_TABS,
  VERIFICATION_TRACES,
} from '../data/architecture';

const EASE_OUT = [0.22, 1, 0.36, 1];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Concept & Failure Modes',
    detail:
      'Map actors, domain state transitions, and race conditions before writing endpoints so illegal states cannot occur.',
  },
  {
    step: '02',
    title: 'Contracts & Boundaries',
    detail:
      'Define typed API contracts, bitmask RBAC checks, and schema constraints cleanly at service boundaries.',
  },
  {
    step: '03',
    title: 'Atomic Execution',
    detail:
      'Enforce conditional query preconditions, connection pooling, and immutable audit trails under concurrent load.',
  },
  {
    step: '04',
    title: 'Verification & Polish',
    detail:
      'Run deterministic test cases, load-check bottlenecks (like PgBouncer + Redis), and document edge behavior.',
  },
];

const TAB_KEYS = Object.keys(CODE_TABS);

export default function AboutProcessSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]);
  const [traceOut, setTraceOut] = useState(null);
  const [copied, setCopied] = useState(false);

  const currentTab = CODE_TABS[activeTab] || CODE_TABS[TAB_KEYS[0]];

  const handleCopy = async () => {
    const raw = currentTab.lines.map((l) => l.text).join('\n');
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto border-b border-white/[0.06]"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="max-w-3xl mb-14"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-soft mb-2">
          04 // About &amp; Engineering Process
        </p>
        <h2
          id="process-heading"
          className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-hud-text mb-4"
        >
          From Specification to Verified Production Systems
        </h2>
        <p className="text-base text-hud-muted leading-relaxed">
          {PROFILE.educationSummary}. {PROFILE.heroSub}
        </p>
      </motion.div>

      {/* Step-by-Step Workflow Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {WORKFLOW_STEPS.map((item, idx) => (
          <motion.div
            key={item.step}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : idx * 0.08,
              ease: EASE_OUT,
            }}
            className="p-5 border border-white/[0.1] bg-[#0D1018] rounded-xl flex flex-col justify-between gap-3"
          >
            <div>
              <div className="font-mono text-xs text-cyan-soft mb-2">STEP {item.step}</div>
              <h3 className="font-display text-lg font-bold text-hud-text mb-2">{item.title}</h3>
              <p className="text-sm text-hud-muted leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Production Experience & Interactive Proof Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Experience Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-hud-dim">
            <Briefcase size={14} className="text-cyan-soft" aria-hidden="true" />
            <span>Experience &amp; Engineering Ownership</span>
          </div>

          {EXPERIENCE.map((exp, idx) => (
            <motion.article
              key={exp.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: EASE_OUT,
              }}
              className="p-5 border border-white/[0.1] bg-[#0D1018] rounded-xl space-y-3"
            >
              <div>
                <div className="font-mono text-[11px] text-cyan-soft mb-1">{exp.period}</div>
                <h3 className="font-display text-lg font-bold text-hud-text">{exp.role}</h3>
                <div className="font-mono text-xs text-hud-muted">{exp.company}</div>
              </div>

              <ul className="space-y-1.5 text-xs sm:text-sm text-hud-muted">
                {exp.deliverables.map((line) => (
                  <li key={line} className="leading-relaxed">
                    <span className="text-cyan-soft mr-1.5">&rsaquo;</span>
                    {line}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.08] font-mono text-[10px] text-hud-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Interactive Code & Verification Proof (7 cols) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="lg:col-span-7 space-y-4"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-hud-dim">
            <Code2 size={14} className="text-cyan-soft" aria-hidden="true" />
            <span>Engineering Principles in Code</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ARCHITECTURE_PRINCIPLES.map((principle) => {
              const selected = activeTab === principle.tabKey;
              return (
                <button
                  key={principle.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(principle.tabKey);
                    setTraceOut(null);
                  }}
                  className={`text-left p-3.5 border rounded-lg transition-colors cursor-pointer ${
                    selected
                      ? 'border-cyan-soft/60 bg-cyan-soft/10'
                      : 'border-white/[0.09] bg-[#0D1018] hover:border-white/25'
                  }`}
                >
                  <div className="font-mono text-[10px] text-cyan-soft mb-1">{principle.num}</div>
                  <div className="font-display text-sm font-bold text-hud-text mb-1">
                    {principle.title}
                  </div>
                  <p className="text-xs text-hud-muted leading-snug">{principle.description}</p>
                </button>
              );
            })}
          </div>

          <div className="border border-white/[0.1] rounded-xl overflow-hidden bg-[#0A0C12]">
            <div className="px-4 py-2.5 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 bg-white/[0.02]">
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Architecture code tabs">
                {TAB_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === key}
                    onClick={() => {
                      setActiveTab(key);
                      setTraceOut(null);
                    }}
                    className={`px-2.5 py-1 font-mono text-[11px] border cursor-pointer transition-colors ${
                      activeTab === key
                        ? 'border-cyan-soft/70 bg-cyan-soft/15 text-cyan-soft font-semibold'
                        : 'border-transparent text-hud-muted hover:text-hud-text'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 font-mono text-[10px] uppercase border border-white/15 text-hud-muted hover:text-hud-text cursor-pointer inline-flex items-center gap-1"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setTraceOut(
                      VERIFICATION_TRACES[activeTab] || 'PASS  Invariants verified.'
                    )
                  }
                  className="px-3 py-1 font-mono text-[10px] uppercase border border-gold/60 bg-gold/10 text-gold hover:bg-gold hover:text-void cursor-pointer inline-flex items-center gap-1 transition-colors font-semibold"
                >
                  <Play size={11} aria-hidden="true" />
                  <span>Run Check</span>
                </button>
              </div>
            </div>

            <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed">
              {currentTab.lines.map((line) => {
                const tone =
                  line.type === 'comment'
                    ? 'text-hud-dim italic'
                    : line.type === 'keyword'
                      ? 'text-purple-neon'
                      : line.type === 'highlight'
                        ? 'text-cyan-soft font-semibold'
                        : 'text-hud-text';
                return (
                  <div key={`${activeTab}-${line.num}`} className="flex gap-4">
                    <span className="w-5 text-right select-none text-hud-dim/60">{line.num}</span>
                    <span className={tone}>{line.text || ' '}</span>
                  </div>
                );
              })}
            </pre>

            {traceOut && (
              <pre
                aria-live="polite"
                className="p-4 border-t border-hud-emerald/35 bg-[#060C09] font-mono text-xs text-hud-emerald whitespace-pre-wrap leading-relaxed"
              >
                {traceOut}
              </pre>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

