---
phase: 5
plan: 1
wave: 1
depends_on: ["3-1", "4-1"]
files_modified:
  - src/App.jsx
  - src/scenes/ScrollStage.jsx
  - src/styles/stage.css
  - src/styles/cyber.css
  - src/components/HudShell.jsx
  - src/components/BentoDossiers.jsx
autonomous: true

must_haves:
  truths:
    - "prefers-reduced-motion: reduce skips preloader, disables Lenis, disables pinning, freezes ObservatoryCanvas on 1 static frame, places cards in normal document flow, keeps .hero-split-char visible, and disables floating loops"
    - "Zero horizontal overflow (document.documentElement.scrollWidth <= window.innerWidth) holds across 390x844 mobile and 1536x770 desktop viewports"
    - "Keyboard navigation reaches the gold RESUME.PDF CTA within <= 2 Tab stops with visible :focus-visible outlines, aria-hidden='true' on decorative canvases, and drawers closing on Escape, outside click, and hash change"
    - "Manual WebGL context loss / disabled WebGL leaves the hero usable with Starfield2D fallback and zero uncaught console errors"
  artifacts:
    - src/scenes/ScrollStage.jsx
    - src/styles/stage.css
    - src/components/HudShell.jsx
---

# Plan 5.1: Cross-Device Hardening, Reduced Motion, A11y & Fallbacks

<objective>
Harden every motion, viewport, accessibility, and WebGL failure boundary specified in `plan/plan.md` §6 and §10 before media/SEO finalization.

Purpose: Guarantee zero mobile jank (`<=480px`), effortless keyboard/screen-reader usability, working `FAST_VIEW`, and rock-solid fallbacks when GPU/motion constraints apply.
Output: Verified patches across `App.jsx`, `ScrollStage.jsx`, `stage.css`, `cyber.css`, `HudShell.jsx`, `BentoDossiers.jsx`.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 4, 6, 9, 10)
- src/App.jsx
- src/scenes/ScrollStage.jsx
- src/styles/stage.css
- src/components/HudShell.jsx
</context>

<tasks>

<task type="auto">
  <name>Enforce end-to-end prefers-reduced-motion, <=480px GPU relief, and zero horizontal overflow</name>
  <files>src/App.jsx, src/scenes/ScrollStage.jsx, src/styles/stage.css, src/styles/cyber.css</files>
  <action>
    1. Verify CSS + JS symmetry for `prefers-reduced-motion: reduce`: preloader skipped, Lenis not instantiated, `ScrollStage` unpinned with static cards in flow, `ObservatoryCanvas` single static frame (`pauseLoop` immediately after 1 render), all floating CSS animations disabled.
    2. Audit `<=480px` styles in `stage.css` & `cyber.css`: `backdrop-filter` stack & fog curtain bands disabled cleanly (plain opacity crossfade), runway `220vh`, `overflow-x: clip` (preserving `position: sticky`!), and verify no card/badge/grid exceeds `390px` width.
    AVOID: Using `overflow-x: hidden` on ancestors of `.sticky-viewport` (breaks `position: sticky`).
  </action>
  <verify>npm run build && Select-String -Path src\styles\stage.css,src\styles\cyber.css -Pattern 'overflow-x: clip|prefers-reduced-motion|480px'</verify>
  <done>Reduced motion disables every animated/pinned path cleanly and mobile `<=480px` drops expensive blurs/fog with `overflow-x: clip`.</done>
</task>

<task type="auto">
  <name>Verify keyboard Tab order, focus-visible rings, drawer close edge cases, FAST_VIEW & WebGL fallback</name>
  <files>src/components/HudShell.jsx, src/components/BentoDossiers.jsx, src/scenes/ScrollStage.jsx</files>
  <action>
    1. Run a local `npm run dev` / preview inspection checking:
       - Pressing `Tab` from document start reaches gold `RESUME.PDF` within `<= 2` stops with crisp `:focus-visible` indicator.
       - Opening mobile drawer closes cleanly on `Escape`, outside click, and hash navigation; no helper overlaps top bar or `56px+` mobile bottom dock.
       - All `<canvas>` elements carry `aria-hidden="true"`.
       - Forcing `WEBGL_CONTEXT_LOST` or simulating missing WebGL cleanly shows `Starfield2D` with zero uncaught errors.
       - Toggling `FAST_VIEW` (and loading `/?ref=resume`) bypasses runway cleanly with immediate scannable Hero summary + `BentoDossiers`.
    2. Fix any defect surfaced during audit directly in place.
    AVOID: Silencing console errors with empty catches without switching UI fallback state.
  </action>
  <verify>npm run build</verify>
  <done>All accessibility, keyboard, `FAST_VIEW`, drawer-close, overflow, and WebGL-fallback checks pass with zero console errors.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `overflow-x: clip` verified on containers around sticky stage
- [ ] Reduced-motion, `FAST_VIEW`, keyboard tab stops `<= 2` to Resume, and WebGL fallback verified cleanly
</verification>

<success_criteria>
- Both tasks verified; portfolio hardened across desktop, mobile, reduced-motion, and keyboard paths
</success_criteria>

