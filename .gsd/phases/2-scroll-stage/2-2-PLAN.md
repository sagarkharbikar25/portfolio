---
phase: 2
plan: 2
wave: 2
depends_on: ["2-1"]
files_modified:
  - src/components/InstrumentCard.jsx
  - src/scenes/ScrollStage.jsx
  - src/App.jsx
  - src/components/HeroSection.jsx
  - src/scenes/PinnedShowcase.jsx
autonomous: true

must_haves:
  truths:
    - "All 4 PROJECTS render as docked InstrumentCard modules flying along curved keyframe trajectories during p 0.55 -> 0.90"
    - "Runtime NAV_BOTTOM is measured from HudShell header at scroll/refresh and resting card Y is clamped via restY = Math.max(slotY, NAV_BOTTOM + 24) >= 115px so no card ever slides behind the fixed navbar"
    - "Mobile <=480px collapses choreography into 3 beats (220vh runway, 2-over-1 card docking), and FAST_VIEW / prefers-reduced-motion collapse the runway cleanly"
    - "App.jsx mounts ScrollStage and supersedes HeroSection.jsx and PinnedShowcase.jsx (both deleted), leaving zero competing pinned ScrollTriggers"
  artifacts:
    - src/components/InstrumentCard.jsx
    - src/scenes/ScrollStage.jsx
    - src/App.jsx
---

# Plan 2.2: Clamped InstrumentCard Curved Flight & App Stage Integration

<objective>
Complete Phase 2 by adding the 4 curved-flight `InstrumentCard` modules (`p 0.55–0.90`) with runtime navbar-clearance clamping (`>= 115px`), mounting `<ScrollStage />` in `App.jsx`, and deleting the competing `HeroSection` + `PinnedShowcase` components (`plan/plan.md` §0, §3.4).

Purpose: Deliver the full Techfest-grade 2D scroll choreography end-to-end without any card-under-navbar overlap or double-pin conflict before attaching lazy WebGL in Phase 3.
Output: `InstrumentCard.jsx`, finished `ScrollStage.jsx` (`gsap.matchMedia`), updated `App.jsx`, removed legacy `HeroSection.jsx` & `PinnedShowcase.jsx`.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 0, 3.2, 3.4, 6)
- src/scenes/ScrollStage.jsx
- src/App.jsx
- src/data/projects.js
</context>

<tasks>

<task type="auto">
  <name>Build InstrumentCard component with proof-first lead and SAAR development badge</name>
  <files>src/components/InstrumentCard.jsx</files>
  <action>
    Create `src/components/InstrumentCard.jsx` displaying project index (`01`..`04`), title, concise `outcomeLead`, crisp stack tags (`<=3` on compact card), explicit `statusLabel` (`STATUS: IN DEVELOPMENT` amber pill for `saar-ai`), and keyboard-focusable jump action scrolling smoothly to `#project-{id}` in `BentoDossiers`. Reuse glass & chamfer utility classes from `cyber.css`.
    AVOID: Duplicating full Bento descriptions/images here — cards are compact telemetry dock modules.
  </action>
  <verify>Select-String -Path src\components\InstrumentCard.jsx -Pattern 'outcomeLead|statusLabel|project-'</verify>
  <done>`InstrumentCard.jsx` cleanly renders all 4 project signatures with accessible focus/jump behavior.</done>
</task>

<task type="auto">
  <name>Add curved card flights with runtime NAV_BOTTOM >= 115px clamp and mobile 3-beat matchMedia</name>
  <files>src/scenes/ScrollStage.jsx</files>
  <action>
    1. Measure `[data-hud-header]` bounding bottom (`NAV_BOTTOM`, falling back to `91`) inside a reusable `computeDockPositions()` helper called on init & `ScrollTrigger.addEventListener('refreshInit', ...)`, guaranteeing `minTop = Math.max(115, NAV_BOTTOM + 24)` and `restY = Math.max(slotY, minTop)` for every docked card (`plan/plan.md` §3.4).
    2. Tween cards `01–04` during `p 0.55 -> 0.90` with staggered 3-point curved keyframe arcs (`rotate: -8 -> -2 -> 0`, `scale: 0.7 -> 1`, `opacity: 0 -> 1`).
    3. Use `gsap.matchMedia()` for `(max-width: 480px)` (`220vh` 3-beat runway, 2-over-1 slot math, opacity crossfade instead of fog curtain) and `(prefers-reduced-motion: reduce)` / `fastView` (static compact flow above `#experience`, no pin).
    AVOID: Hardcoding static viewport pixel coordinates that ignore header height or `invalidateOnRefresh`.
  </action>
  <verify>Select-String -Path src\scenes\ScrollStage.jsx -Pattern 'NAV_BOTTOM|115|invalidateOnRefresh|matchMedia'</verify>
  <done>Curved paths dock smoothly above `#experience` with guaranteed `>= 115px` top clearance on desktop and clean 3-beat mobile adaptation.</done>
</task>

<task type="auto">
  <name>Mount ScrollStage in App.jsx, sync font/image refresh, and delete superseded HeroSection & PinnedShowcase</name>
  <files>src/App.jsx, src/components/HeroSection.jsx, src/scenes/PinnedShowcase.jsx</files>
  <action>
    1. Replace `<HeroSection />` and `<PinnedShowcase />` in `src/App.jsx` with `<ScrollStage introReady={introReady} fastView={fastView} onNavigateSection={handleNavigateSection} />`.
    2. Call `document.fonts.ready.then(() => ScrollTrigger.refresh())` inside `App.jsx` so Lenis + ScrollTrigger measurements stay synchronized after `.woff2` load (`plan/plan.md` §9 mitigation).
    3. Delete `src/components/HeroSection.jsx` and `src/scenes/PinnedShowcase.jsx` and run `npm run build` to verify no stale imports remain anywhere in `src/`.
    AVOID: Leaving unused `HeroSection` or `PinnedShowcase` files in the tree (will bloat or pull static `three` chunk prematurely).
  </action>
  <verify>npm run build && !(Test-Path src\components\HeroSection.jsx) && !(Test-Path src\scenes\PinnedShowcase.jsx)</verify>
  <done>Single `ScrollStage` is active in `App.jsx`, legacy competing files are deleted, and initial JS chunk no longer bundles Three.js statically (`< 180 KB` gzip verified).</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` succeeds with initial JS chunk `< 180 KB` gzip (`vendor-three` deferred until Phase 3)
- [ ] Zero references remain to `HeroSection` or `PinnedShowcase`
</verification>

<success_criteria>
- All 3 tasks verified
- Phase 2 2D ScrollStage ready for lazy WebGL attachment in Phase 3
</success_criteria>
