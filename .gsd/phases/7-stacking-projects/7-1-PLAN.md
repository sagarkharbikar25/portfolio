---
phase: 7
plan: 1
wave: 1
depends_on: []
files_modified:
  - src/data/projects.js
  - src/data/profile.js
  - src/scenes/ScrollStage.jsx
  - src/components/InstrumentCard.jsx
  - src/styles/stage.css
autonomous: true

must_haves:
  truths:
    - "PROJECTS data contract cleanly supports 1..6 flagship projects (MAX_PROJECTS = 6) with per-card headerAccent tone ('cyan' | 'emerald' | 'gold' | 'ice' | 'violet') and short category label for stacked peeking headers"
    - "ScrollStage (CH.00 IGNITION) drops redundant small InstrumentCard duplicates so projects never appear twice back-to-back"
    - "InstrumentCard.jsx is deleted cleanly under Ponytail with zero dead imports"
    - "ScrollStage runway trims to crisp 3-beat hero (320vh desktop / 230vh tablet / 160vh <=480px): Aperture & Title fly-back -> Fog + Lazy WebGL Observatory Core dolly -> HERO_METRICS Telemetry + 'ENTER INSTRUMENT BAY' handoff to #projects"
  artifacts:
    - src/data/projects.js
    - src/data/profile.js
    - src/scenes/ScrollStage.jsx
    - src/styles/stage.css
---

# Plan 7.1: Chapter Decoupling, Hero Stage Deduplication & 6-Project Schema

<objective>
Eliminate the visual duplication between `#hero` Instrument cards and `#matrix` project cards by scoping `ScrollStage` cleanly to `CH.00 IGNITION` (Observatory Hero + 3D Core + Telemetry Metrics) and preparing `src/data/projects.js` to scale cleanly up to 6 projects in the new sticky stacking deck (`plan 7.2`).

Purpose: Fix the "instruments and telemetry look identical / cluttered" feedback cleanly using Ponytail (`deletion over addition`) before mounting the big sticky stacking project cards.
Output: Slimmed `ScrollStage.jsx` & `stage.css`, `MAX_PROJECTS = 6` schema with accent metadata in `projects.js`, deleted `InstrumentCard.jsx`.
</objective>

<context>
Load for context:
- src/data/projects.js
- src/data/profile.js
- src/scenes/ScrollStage.jsx
- src/styles/stage.css
</context>

<tasks>

<task type="auto">
  <name>Add max-6 project capacity & stacking header metadata to projects.js and update profile chapters</name>
  <files>src/data/projects.js, src/data/profile.js</files>
  <action>
    1. Export `MAX_PROJECTS = 6` and `getDeckProjects()` (returning `PROJECTS.slice(0, MAX_PROJECTS)` with zero-padded dynamic index strings `01 / 0N`) in `src/data/projects.js`. Add `category` (short tag for peeking sticky header strip, e.g., `'ERP STATE MACHINE'`, `'RBAC LEAD CRM'`, `'COMPETITION INFRA'`, `'LOCAL VOICE AI'`) and `headerAccent` (`'gold'`, `'cyan'`, `'emerald'`, `'ice'`, rotating cleanly up to 6 entries). Keep every authentic field intact (`summary`, `problem`, `specs`, `decisionText`, `postMortem`, `statusLabel`, `links`).
    2. Update `OBSERVATORY_CHAPTERS` in `src/data/profile.js` so `CH.01 INSTRUMENTS` anchors `#projects` and `CH.02 TELEMETRY` anchors `#telemetry` distinctly (`CH.00 -> #hero`, `CH.01 -> #projects`, `CH.02 -> #telemetry`, `CH.03 -> #contact`).
    AVOID: Duplicating project arrays or altering authentic career descriptions/metrics.
  </action>
  <verify>Select-String -Path src\data\projects.js,src\data\profile.js -Pattern 'MAX_PROJECTS|headerAccent|telemetry'</verify>
  <done>`projects.js` supports up to 6 deck projects cleanly and `OBSERVATORY_CHAPTERS` map cleanly without chapter overlap.</done>
</task>

<task type="auto">
  <name>Remove duplicated InstrumentCard deck from ScrollStage, tighten runway pacing, and delete InstrumentCard.jsx</name>
  <files>src/scenes/ScrollStage.jsx, src/styles/stage.css, src/components/InstrumentCard.jsx</files>
  <action>
    1. Remove `InstrumentCard` import/rendering and Beat 4 card-flight tweens from `src/scenes/ScrollStage.jsx`; update `stage.css` runway heights (`320vh` desktop, `230vh` tablet, `160vh` `<=480px` mobile) so Beat 1 (Aperture + Title fly-back `0.00-0.30`), Beat 2 (Fog sweep + WebGL Observatory dolly `0.26-0.60`), Beat 3 (`HERO_METRICS` count-up framed around the orbital core `0.58-0.88`), and Handoff (`ENTER INSTRUMENT BAY -> #projects` at `0.88-1.00`) flow seamlessly straight into the sticky stacking Project Cards section.
    2. Ensure `HERO_METRICS` strip respects `minTop = Math.max(115, navBottom + 24)` (`--stage-safe-top`) so nothing clips behind the navbar.
    3. Delete `src/components/InstrumentCard.jsx`.
    AVOID: Leaving any card JSX inside `ScrollStage.jsx` or stale imports of `InstrumentCard`.
  </action>
  <verify>!(Test-Path src\components\InstrumentCard.jsx) && npm run build</verify>
  <done>`InstrumentCard.jsx` is removed, `ScrollStage` cleanly presents Hero + Core + Telemetry only, and Vite builds cleanly.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` exits 0 with `InstrumentCard.jsx` deleted
- [ ] Zero duplicate project cards render inside `ScrollStage`
</verification>

<success_criteria>
- Both tasks verified; hero runway trimmed and `projects.js` ready for 1..6 sticky deck cards
</success_criteria>

