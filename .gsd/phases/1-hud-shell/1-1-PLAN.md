---
phase: 1
plan: 1
wave: 1
depends_on: ["0-1"]
files_modified:
  - src/data/profile.js
  - src/data/projects.js
autonomous: true

must_haves:
  truths:
    - "Observatory narrative chapters are defined strictly as CH.00 IGNITION, CH.01 INSTRUMENTS, CH.02 TELEMETRY, and CH.03 SIGNAL"
    - "Selected user tagline from plan/plan.md Section 12 is wired into PROFILE without any Techfest copy"
    - "All 4 projects define an outcomeLead string leading with measurable impact/survival proof before stack details"
    - "SAAR AI Personal Assistant carries an explicit STATUS: IN DEVELOPMENT indicator so ongoing work is never misrepresented as shipped production"
  artifacts:
    - src/data/profile.js
    - src/data/projects.js
---

# Plan 1.1: Observatory Chapter Data & Proof-First Project Contracts

<objective>
Align `src/data/profile.js` and `src/data/projects.js` with "The Observatory" mission-control narrative (`plan/plan.md` §1 & §5) while keeping 100% authentic Sagar Kharbikar career facts.

Purpose: Give both `HudShell` (`CH.00–CH.03`) and Phase 2/4 project cards clean, verified data contracts before updating components.
Output: Updated `PROFILE`, `CHAPTERS` (`CH.00–CH.03`), and proof-first `PROJECTS` entries.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 1, 5, 12)
- src/data/profile.js
- src/data/projects.js
</context>

<tasks>

<task type="auto">
  <name>Update profile data with user-selected tagline and Observatory CH.00-CH.03 chapters</name>
  <files>src/data/profile.js</files>
  <action>
    1. Set `PROFILE.tagline` to the option chosen by the user in `plan/plan.md` §12 (defaulting cleanly if confirmed). Keep `PROFILE.resumeUrl` = `'/assets/resume/Sagar_Kharbikar_Resume.pdf'`.
    2. Export `OBSERVATORY_CHAPTERS` matching `plan/plan.md` §1 (`CH.00 IGNITION` -> `#stage`, `CH.01 INSTRUMENTS` -> `#projects`, `CH.02 TELEMETRY` -> `#experience`, `CH.03 SIGNAL` -> `#contact`).
    3. Mark `STORY_ACTS` / `OBSERVATORY_PILLARS` for removal once Phase 2 deletes `PinnedShowcase.jsx` (or remove unused fields immediately if nothing outside `PinnedShowcase` imports them; check via search first).
    AVOID: Keeping 5 chapters (`CH.04`) or unverified vanity numbers.
  </action>
  <verify>Select-String -Path src\data\profile.js -Pattern 'CH\.00|CH\.01|CH\.02|CH\.03|tagline'</verify>
  <done>`profile.js` exports `CH.00–CH.03` chapters and approved tagline while compiling cleanly.</done>
</task>

<task type="auto">
  <name>Enrich project data with proof-first outcome leads, SAAR status, and Cyber Hunt post-mortem</name>
  <files>src/data/projects.js</files>
  <action>
    1. Add a concise `outcomeLead` field to each of the 4 verified projects in `PROJECTS` so cards lead with concrete proof before tech stack (e.g., Cyber Hunt leading with surviving live competition surge via PgBouncer connection pooling + Redis leaderboard + rate limiting).
    2. Add a structured `postMortem` block on `cyber-hunt` summarizing symptom, root cause (serverless Postgres connection exhaustion), fix, and verification so Phase 4 can render an expandable `"Post-mortem"` view without inventing fake metrics.
    3. Add explicit `statusLabel: 'STATUS: IN DEVELOPMENT'` on `saar-ai` (`SAAR — AI Personal Assistant`) per `plan/plan.md` §5 line 224.
    AVOID: Altering authentic metrics, inventing unverified TPS/latency claims, or leaving SAAR ambiguous.
  </action>
  <verify>Select-String -Path src\data\projects.js -Pattern 'outcomeLead|IN DEVELOPMENT|postMortem' && npm run build</verify>
  <done>All 4 `PROJECTS` expose `outcomeLead`, `saar-ai` has `STATUS: IN DEVELOPMENT`, `cyber-hunt` has `postMortem`, and build succeeds.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` exits 0
- [ ] Zero Techfest copy or placeholder data in `src/data/`
</verification>

<success_criteria>
- Both data contracts verified and ready for Plan 1.2 & Phase 4
</success_criteria>

