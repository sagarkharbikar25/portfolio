import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, GraduationCap, Landmark, Layers, Shield, Trophy, Users } from 'lucide-react';
import { SKILL_TIERS } from '../data/skills';
import { CREDENTIALS } from '../data/credentials';

const EASE_OUT = [0.22, 1, 0.36, 1];

const CREDENTIAL_ICONS = {
  trophy: Trophy,
  award: Award,
  graduation: GraduationCap,
  shield: Shield,
  users: Users,
  landmark: Landmark,
};

export default function SkillsStackSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto border-b border-white/[0.06]"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-soft mb-2">
            03 // Skills &amp; Software Stack
          </p>
          <h2
            id="stack-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-hud-text"
          >
            Technical Capabilities &amp; Foundations
          </h2>
        </div>

        <p className="max-w-md text-sm text-hud-muted leading-relaxed">
          Grouped by real production exposure across full-stack web APIs, cross-platform mobile migration, relational datastores, and core CS fundamentals.
        </p>
      </motion.div>

      {/* 4 Categorized Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {SKILL_TIERS.map((tier, idx) => (
          <motion.div
            key={tier.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : idx * 0.07,
              ease: EASE_OUT,
            }}
            className="p-6 border border-white/[0.1] bg-[#0D1018] rounded-xl space-y-4"
          >
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
              <h3 className="font-display text-lg font-bold text-hud-text flex items-center gap-2">
                <Layers size={16} className="text-cyan-soft" aria-hidden="true" />
                <span>{tier.title}</span>
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-white/10 text-hud-muted">
                {tier.badge}
              </span>
            </div>

            <dl className="space-y-3">
              {tier.rows.map((row) => (
                <div key={row.label} className="space-y-0.5">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-cyan-soft/90">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-hud-muted leading-relaxed">{row.items}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ))}
      </div>

      {/* Verified Credentials Strip */}
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-hud-dim mb-5">
          Certifications, Academic Recognition &amp; Honors
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CREDENTIALS.map((cred, idx) => {
            const Icon = CREDENTIAL_ICONS[cred.iconKey] || Award;
            return (
              <motion.article
                key={cred.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.05,
                  ease: EASE_OUT,
                }}
                className="p-4 border border-white/[0.08] bg-white/[0.02] rounded-xl flex items-start gap-3"
              >
                <div className="p-2 border border-white/10 bg-white/[0.03] text-cyan-soft shrink-0 mt-0.5">
                  <Icon size={15} aria-hidden="true" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gold mb-0.5">
                    {cred.badge}
                  </div>
                  <h4 className="font-display text-sm font-bold text-hud-text mb-1">
                    {cred.title}
                  </h4>
                  <p className="text-xs text-hud-muted leading-relaxed">{cred.detail}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

