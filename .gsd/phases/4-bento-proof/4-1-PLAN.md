---
phase: 4
plan: 1
wave: 1
depends_on: ["1-1", "2-2"]
files_modified:
  - src/components/BentoDossiers.jsx
  - src/data/architecture.js
autonomous: true

must_haves:
  truths:
    - "Every project card in BentoDossiers #projects leads visually with outcomeLead above tech stack pills"
    - "Cyber Hunt card includes a working 'Post-mortem' button/drawer expanding root cause + PgBouncer/Redis/rate-limit fix details"
    - "SAAR AI card explicitly renders 'STATUS: IN DEVELOPMENT' rather than implying live production"
    - "Architecture Console's 4 tabs (AtomicTransition.ts, RBAC_Guard.ts, LocalAudioPipe.py, SystemHealth.sh) + RUN TEST produce realistic verification assertion traces with zero placeholder text"
    - "Experience, 4-tier Skills, 6 Credentials, copyable email + mailto: Contact Deck, and semantic <footer> landmark are accurate and complete"
  artifacts:
    - src/components/BentoDossiers.jsx
    - src/data/architecture.js
---

# Plan 4.1: Proof-First Bento Dossiers, Cyber Hunt Post-Mortem & Trace Console

<objective>
Refine `BentoDossiers.jsx` and `src/data/architecture.js` (`plan/plan.md` §5) so project cards lead with verified real-world impact, SAAR is transparently scoped as in-development, Cyber Hunt exposes an engineering post-mortem, and the 4-tab console executes believable verification traces.

Purpose: Maximize recruiter conviction in <=30 seconds once scrolling reaches `#projects` and `#architecture`.
Output: Upgraded proof-first `BentoDossiers.jsx` + verified `architecture.js` traces.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 5, 10)
- src/components/BentoDossiers.jsx
- src/components/BentoSpotlightCard.jsx
- src/data/projects.js
- src/data/architecture.js
</context>

<tasks>

<task type="auto">
  <name>Refactor BentoDossiers #projects for outcome-first copy, SAAR dev badge & Cyber Hunt Post-mortem</name>
  <files>src/components/BentoDossiers.jsx</files>
  <action>
    1. Ensure each `#projects` card renders `project.outcomeLead` prominently before technology badges, with semantic anchor `#project-${project.id}` so `InstrumentCard` clicks land accurately below the sticky HUD (`scroll-padding-top: 84px`).
    2. Render `STATUS: IN DEVELOPMENT` pill prominently on the `saar-ai` card (`project.statusLabel`).
    3. Add an accessible toggleable `"Post-mortem"` disclosure panel inside the Cyber Hunt card rendering `project.postMortem` (incident trigger -> serverless PostgreSQL exhaustion -> PgBouncer pooling + Redis leaderboard + rate limiting -> outcome).
    4. Keep explicit `width`/`height` & `loading="lazy"` attributes prepared on below-stage screenshots and confirm copyable email + `mailto:` + semantic `<footer>` remain intact.
    AVOID: Re-introducing generic copy or adding React state inside `BentoSpotlightCard` pointer events (keep CSS vars `--bx`/`--by`).
  </action>
  <verify>Select-String -Path src\components\BentoDossiers.jsx -Pattern 'outcomeLead|Post-mortem|IN DEVELOPMENT|loading="lazy"'</verify>
  <done>#projects cards lead with outcomes, SAAR shows `STATUS: IN DEVELOPMENT`, and Cyber Hunt Post-mortem toggles cleanly with accessible ARIA state.</done>
</task>

<task type="auto">
  <name>Audit & refine Architecture Console verification traces and tab usability</name>
  <files>src/data/architecture.js, src/components/BentoDossiers.jsx</files>
  <action>
    Review `VERIFICATION_TRACES` in `src/data/architecture.js` across `AtomicTransition.ts`, `RBAC_Guard.ts`, `LocalAudioPipe.py`, and `SystemHealth.sh` so every `RUN TEST` invocation outputs structured, realistic backend assertion lines (`PASS/ASSERT` steps with concrete invariants matching the code shown) and announces output cleanly (`aria-live="polite"`). Keep `CODE_TABS` logic lean with no blocking imports above the fold.
    AVOID: Adding fake latency/TPS numbers not backed by code invariants.
  </action>
  <verify>npm run build && Select-String -Path src\components\BentoDossiers.jsx -Pattern 'aria-live|VERIFICATION_TRACES'</verify>
  <done>All 4 Architecture tabs pass copy + `RUN TEST` trace checks with accessible live status feedback and zero build warnings.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` exits 0
- [ ] Every verified dataset (`HERO_METRICS`, 4 `PROJECTS`, `EXPERIENCE`, 4 `SKILL_TIERS`, 6 `CREDENTIALS`, `CONTACT`) is rendered accurately
</verification>

<success_criteria>
- Both tasks verified; proof-first Dossiers complete before Phase 5 hardening
</success_criteria>

