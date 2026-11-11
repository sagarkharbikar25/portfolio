import React, { useState } from 'react';
import {
  Award,
  Briefcase,
  Check,
  Copy,
  Download,
  FileCode2,
  GraduationCap,
  Landmark,
  Layers,
  Mail,
  Play,
  RotateCcw,
  Satellite,
  Shield,
  Trophy,
  Users,
} from 'lucide-react';
import BentoSpotlightCard from './BentoSpotlightCard';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { EXPERIENCE } from '../data/experience';
import {
  ARCHITECTURE_PRINCIPLES,
  CODE_TABS,
  VERIFICATION_TRACES,
} from '../data/architecture';
import { SKILL_TIERS } from '../data/skills';
import { CREDENTIALS } from '../data/credentials';
import { PROFILE } from '../data/profile';

const CREDENTIAL_ICONS = {
  trophy: Trophy,
  award: Award,
  graduation: GraduationCap,
  shield: Shield,
  users: Users,
  landmark: Landmark,
};

export default function BentoDossiers({ onNavigateSection, onReplayIntro }) {
  const [activeTab, setActiveTab] = useState('AtomicTransition.ts');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testOutput, setTestOutput] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const currentTab = CODE_TABS[activeTab] || CODE_TABS['AtomicTransition.ts'];

  const handleSelectTab = (tabKey) => {
    setActiveTab(tabKey);
    setTestOutput(null);
    setCopiedCode(false);
  };

  const handleCopySnippet = async () => {
    const rawCode = currentTab.lines.map((l) => l.text).join('\n');
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      setCopiedCode(false);
    }
  };

  const handleRunVerification = () => {
    setIsRunningTest(true);
    setTestOutput(`> executing sandbox assertions for ${activeTab}...`);
    setTimeout(() => {
      setTestOutput(VERIFICATION_TRACES[activeTab] || 'PASS  All assertions verified.');
      setIsRunningTest(false);
    }, 360);
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
    <>
      <section
        id="telemetry"
        aria-label="System Telemetry, Architecture Console and Record"
        className="relative w-full py-20 px-5 sm:px-8 max-w-[1440px] mx-auto border-t border-hud-dim/20"
      >
        {/* Telemetry Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-purple-neon mb-2">
              <Layers size={14} aria-hidden="true" />
              <span>CH.02 // TELEMETRY: ARCHITECTURE &middot; EXPERIENCE &middot; CREDENTIALS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-hud-text">
              02 // System Telemetry &amp; Console
            </h2>
          </div>

          <div className="font-mono text-[11px] text-hud-dim tracking-wider">
            VERIFIED_BUILD // TRACE + RECORD
          </div>
        </div>

        {/* Balanced 12-Col Bento Layout: Console + Skills (7 cols) | Experience + Credentials (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ==============================================================
              LEFT COLUMN (lg:col-span-7): Architecture Console + Skills Matrix
             ============================================================== */}
          <div className="lg:col-span-7 min-w-0 flex flex-col gap-6">
            {/* BENTO CARD 1: ARCHITECTURE METHODOLOGY & INTERACTIVE CODE CONSOLE (#architecture) */}
            <BentoSpotlightCard
              id="architecture"
              accent="purple"
              className="p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-hud-dim/25 mb-5">
                <div className="flex items-center gap-2.5">
                  <FileCode2 size={18} className="text-purple-neon" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-hud-text">
                    How I Build Backends &amp; Code Proof
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-purple-neon">
                  REQUEST_LIFECYCLE // INTERACTIVE CONSOLE
                </span>
              </div>

              {/* 3 Clickable Architecture Principles synced with Code Console Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
                {ARCHITECTURE_PRINCIPLES.map((principle) => {
                  const selected = activeTab === principle.tabKey;
                  return (
                    <button
                      key={principle.id}
                      type="button"
                      onClick={() => handleSelectTab(principle.tabKey)}
                      className={`text-left p-4 border transition-all cursor-pointer ${
                        selected
                          ? 'border-cyan-neon bg-cyan-neon/10 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
                          : 'border-hud-dim/25 bg-void/55 hover:border-purple-neon/60'
                      }`}
                    >
                      <div className="font-mono text-[10px] tracking-wider text-cyan-neon mb-1.5">
                        {principle.num}
                      </div>
                      <div className="font-display text-sm font-bold text-hud-text mb-1.5">
                        {principle.title}
                      </div>
                      <p className="text-xs text-hud-muted leading-relaxed">
                        {principle.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Live Terminal Code Console */}
              <div className="border border-cyan-neon/30 bg-void/90">
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-hud-dim/25 bg-indigoGlass/60">
                  <div
                    className="flex flex-wrap items-center gap-1.5"
                    role="tablist"
                    aria-label="Architecture Code Tabs"
                  >
                    {Object.keys(CODE_TABS).map((tabKey) => (
                      <button
                        key={tabKey}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tabKey}
                        onClick={() => handleSelectTab(tabKey)}
                        className={`px-2.5 py-1 font-mono text-[11px] border transition-colors cursor-pointer ${
                          activeTab === tabKey
                            ? 'bg-cyan-neon/15 border-cyan-neon text-cyan-neon font-semibold'
                            : 'border-transparent text-hud-muted hover:text-hud-text'
                        }`}
                      >
                        {tabKey}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopySnippet}
                      className="px-2.5 py-1 font-mono text-[10px] uppercase border border-hud-dim/35 text-hud-muted hover:text-cyan-neon hover:border-cyan-neon/50 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedCode ? 'COPIED' : 'COPY'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRunVerification}
                      disabled={isRunningTest}
                      className="px-3 py-1 font-mono text-[10px] uppercase border border-cyan-neon bg-cyan-neon/15 text-cyan-neon hover:bg-cyan-neon hover:text-void transition-colors inline-flex items-center gap-1 cursor-pointer disabled:opacity-60"
                    >
                      <Play size={11} aria-hidden="true" />
                      <span>{isRunningTest ? 'VERIFYING...' : 'RUN TEST'}</span>
                    </button>
                  </div>
                </div>

                <div className="px-4 py-2 border-b border-hud-dim/15 font-mono text-[11px] text-hud-dim flex items-center gap-2">
                  <span className="text-purple-neon">{currentTab.title}</span>
                  <span>•</span>
                  <span>{currentTab.badge}</span>
                </div>

                <pre
                  role="tabpanel"
                  aria-label={currentTab.title}
                  className="p-4 overflow-x-auto font-mono text-xs leading-relaxed"
                >
                  {currentTab.lines.map((line) => {
                    const toneClass =
                      line.type === 'comment'
                        ? 'text-hud-dim italic'
                        : line.type === 'keyword'
                          ? 'text-purple-neon'
                          : line.type === 'highlight'
                            ? 'text-cyan-neon font-semibold'
                            : 'text-hud-text';

                    return (
                      <div key={`${activeTab}-${line.num}`} className="flex gap-4">
                        <span className="w-6 text-right select-none text-hud-dim/60">
                          {line.num}
                        </span>
                        <span className={toneClass}>{line.text || ' '}</span>
                      </div>
                    );
                  })}
                </pre>

                {testOutput && (
                  <pre
                    aria-live="polite"
                    className="p-4 border-t border-cyan-neon/30 bg-[#05060b] font-mono text-xs text-cyan-neon whitespace-pre-wrap leading-relaxed"
                  >
                    {testOutput}
                  </pre>
                )}
              </div>
            </BentoSpotlightCard>

            {/* BENTO CARD 2: TIERED SKILLS MATRIX (#skills) */}
            <BentoSpotlightCard
              id="skills"
              accent="cyan"
              className="p-6 sm:p-7"
            >
              <div className="flex items-center justify-between pb-4 border-b border-hud-dim/25 mb-5">
                <div className="flex items-center gap-2.5">
                  <Layers size={18} className="text-cyan-neon" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-hud-text">
                    Tiered Skills Matrix
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-cyan-neon">04 TIERS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILL_TIERS.map((tier, idx) => (
                  <div
                    key={tier.id}
                    className="p-3.5 bg-void/65 border border-hud-dim/25"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-[11px] font-semibold text-cyan-neon">
                        // 0{idx + 1}: {tier.title.toUpperCase()}
                      </span>
                      <span className="font-mono text-[10px] text-hud-dim">
                        {tier.badge}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {tier.rows.map((row) => (
                        <div key={row.label} className="text-xs">
                          <span className="font-mono text-[10px] text-purple-neon uppercase mr-2">
                            {row.label}:
                          </span>
                          <span className="text-hud-text">{row.items}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </BentoSpotlightCard>
          </div>

          {/* ==============================================================
              RIGHT COLUMN (lg:col-span-5): Experience + Credentials
             ============================================================== */}
          <div className="lg:col-span-5 min-w-0 flex flex-col gap-6">
            {/* BENTO CARD 3: PRODUCTION EXPERIENCE (#experience) */}
            <BentoSpotlightCard
              id="experience"
              accent="purple"
              className="p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-hud-dim/25 mb-5">
                <div className="flex items-center gap-2.5">
                  <Briefcase size={18} className="text-purple-neon" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-hud-text">
                    Experience &amp; Roles
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-purple-neon">RECORD</span>
              </div>

              <div className="space-y-5">
                {EXPERIENCE.map((item) => (
                  <article
                    key={item.id}
                    className="p-4 bg-void/65 border border-hud-dim/25"
                  >
                    <div className="font-mono text-[10px] text-cyan-neon mb-1">
                      {item.period}
                    </div>
                    <h4 className="font-display text-base font-bold text-hud-text">
                      {item.role}
                    </h4>
                    <div className="font-mono text-xs text-purple-neon mb-3">
                      {item.company}
                    </div>

                    <ul className="space-y-1.5 text-xs text-hud-muted mb-3.5">
                      {item.deliverables.map((bullet) => (
                        <li key={bullet} className="leading-relaxed">
                          <span className="text-cyan-neon mr-1.5">&#8250;</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-surface-card border border-hud-dim/25 font-mono text-[10px] text-hud-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </BentoSpotlightCard>

            {/* BENTO CARD 4: CREDENTIALS & CITATIONS (#credentials) */}
            <BentoSpotlightCard
              id="credentials"
              accent="purple"
              className="p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-hud-dim/25 mb-5">
                <div className="flex items-center gap-2.5">
                  <Award size={18} className="text-purple-neon" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-hud-text">
                    Credentials &amp; Honors
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-purple-neon">VERIFIED</span>
              </div>

              <div className="space-y-3">
                {CREDENTIALS.map((cred) => {
                  const Icon = CREDENTIAL_ICONS[cred.iconKey] || Award;
                  return (
                    <article
                      key={cred.id}
                      className="p-3.5 bg-void/65 border border-hud-dim/25 flex items-start gap-3"
                    >
                      <div className="p-2 bg-indigoGlass/80 border border-cyan-neon/30 text-cyan-neon shrink-0 mt-0.5">
                        <Icon size={15} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-cyan-neon tracking-wider">
                          {cred.badge}
                        </div>
                        <h4 className="font-display text-sm font-bold text-hud-text">
                          {cred.title}
                        </h4>
                        <p className="text-xs text-hud-muted leading-snug mt-0.5">
                          {cred.detail}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </BentoSpotlightCard>
          </div>

          {/* ==============================================================
              FULL-WIDTH CONTACT & DIRECT TRANSMISSION DECK (lg:col-span-12)
             ============================================================== */}
          <BentoSpotlightCard
            id="contact"
            accent="cyan"
            className="lg:col-span-12 p-6 sm:p-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest text-cyan-neon mb-2">
                  <Satellite size={14} aria-hidden="true" />
                  <span>DIRECT PROTOCOL TRANSMISSION</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-hud-text mb-2">
                  Let&apos;s Build Reliable Systems Together
                </h3>
                <p className="text-sm text-hud-muted leading-relaxed">
                  {PROFILE.availability} {PROFILE.educationSummary}. Direct phone contact is shared upon initial email or interview scheduling to avoid public scraping.
                </p>
              </div>

              {/* Email Copy + Action Channels */}
              <div className="w-full lg:w-auto flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="relative flex-1 min-w-0 sm:min-w-[260px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-cyan-neon">
                      &gt;
                    </span>
                    <input
                      type="text"
                      readOnly
                      aria-label="Direct contact email"
                      value={PROFILE.email}
                      className="w-full pl-7 pr-16 py-2.5 bg-void/90 border border-hud-dim/45 font-mono text-xs text-hud-text focus:outline-none focus:border-cyan-neon"
                    />
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 font-mono text-[10px] border border-hud-dim/35 text-hud-muted hover:text-cyan-neon cursor-pointer"
                    >
                      {copiedEmail ? 'COPIED' : 'COPY'}
                    </button>
                  </div>

                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="px-5 py-2.5 bg-cyan-neon text-void font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-purple-neon hover:text-white transition-colors"
                  >
                    <Mail size={14} aria-hidden="true" />
                    <span>SEND_EMAIL</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 border border-hud-dim/35 bg-void/65 text-hud-text hover:border-cyan-neon hover:text-cyan-neon transition-colors inline-flex items-center gap-2"
                  >
                    <GithubIcon size={14} />
                    <span>GITHUB // sagarkharbikar25</span>
                  </a>

                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 border border-hud-dim/35 bg-void/65 text-hud-text hover:border-purple-neon hover:text-purple-neon transition-colors inline-flex items-center gap-2"
                  >
                    <LinkedinIcon size={14} />
                    <span>LINKEDIN // sagar-kharbikar</span>
                  </a>

                  <a
                    href={PROFILE.resumeUrl}
                    download={PROFILE.resumeFileName}
                    className="px-3.5 py-2 border border-cyan-neon/40 bg-cyan-neon/10 text-cyan-neon hover:bg-cyan-neon hover:text-void transition-colors inline-flex items-center gap-2"
                  >
                    <Download size={14} aria-hidden="true" />
                    <span>RESUME_PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </BentoSpotlightCard>
        </div>
      </section>

      {/* ================================================================
          AUTHENTIC CYBER TELEMETRY FOOTER
         ================================================================ */}
      <footer className="w-full py-8 pb-24 md:pb-8 px-5 sm:px-8 border-t border-hud-dim/20 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 bg-void">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="font-mono text-xs tracking-widest text-cyan-neon border border-cyan-neon/35 px-2.5 py-0.5 bg-indigoGlass/60">
            {PROFILE.shortMark} // {PROFILE.domain.toUpperCase()}
          </div>
          <p className="font-mono text-[11px] text-hud-dim text-center sm:text-left">
            &copy; 2026 {PROFILE.name.toUpperCase()} // NAGPUR, IN // ALL DATA VERIFIED
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 font-mono text-[11px] text-hud-muted">
          <button
            type="button"
            onClick={() => onNavigateSection?.('hero')}
            className="hover:text-cyan-neon transition-colors cursor-pointer"
          >
            OBSERVATORY
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection?.('projects')}
            className="hover:text-cyan-neon transition-colors cursor-pointer"
          >
            INSTRUMENTS
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection?.('architecture')}
            className="hover:text-cyan-neon transition-colors cursor-pointer"
          >
            CONSOLE
          </button>
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="hover:text-purple-neon transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={12} aria-hidden="true" />
              <span>REPLAY_BOOT</span>
            </button>
          )}
          <div className="flex items-center gap-1.5 text-cyan-neon">
            <span className="w-2 h-2 rounded-full bg-cyan-neon status-beacon-cyan" />
            <span>SYSTEMS NOMINAL</span>
          </div>
        </div>
      </footer>
    </>
  );
}

