---
phase: 2
plan: 1
wave: 1
depends_on: ["1-2"]
files_modified:
  - src/hooks/usePointerLerp.js
  - src/scenes/Starfield2D.js
  - src/scenes/ScrollStage.jsx
  - src/styles/stage.css
autonomous: true

must_haves:
  truths:
    - "usePointerLerp updates normalized --mx and --my CSS variables on a stage DOM ref via one rAF loop with zero React state re-renders, disabled on reduced motion and coarse pointers"
    - "Starfield2D paints lightweight 2D canvas stars immediately on first paint before Three.js loads, scales smoothly on scroll progress, and acts as the WebGL-disabled fallback"
    - "ScrollStage establishes the single pinned runway (500vh desktop, 350vh tablet, 220vh <=480px mobile) with a single master GSAP timeline + ScrollTrigger (scrub: 0.6) controlling Layers 0, 1, 4, 5, 6, 8, and 15"
    - "All scroll-driven animations mutate only transform, opacity, clip-path, and mask-image"
  artifacts:
    - src/hooks/usePointerLerp.js
    - src/scenes/Starfield2D.js
    - src/scenes/ScrollStage.jsx
    - src/styles/stage.css
---

# Plan 2.1: 2D ScrollStage Spine, Starfield2D, Aperture Reveal & Fog Curtain

<objective>
Implement the core pinned "Observatory" scrollytelling spine (`plan/plan.md` §3) in pure 2D/CSS/Canvas layers BEFORE attaching WebGL, proving smooth 60 FPS scrub behavior and instant first-paint starfield visibility.

Purpose: Decouple choreography from Three.js weight (`cut order #5` resilience) and establish the single master GSAP ScrollTrigger that eliminates competing pinned sections.
Output: `usePointerLerp.js`, `Starfield2D.js`, `ScrollStage.jsx` (Layers 0, 1, 4, 5, 6, 8, 15), and `stage.css`.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 2.3, 3, 6)
- .gsd/EXECUTION_PLAN.md
- src/data/profile.js
- src/styles/cyber.css
</context>

<tasks>

<task type="auto">
  <name>Create zero-rerender pointer lerp hook and instant first-paint Starfield2D engine</name>
  <files>src/hooks/usePointerLerp.js, src/scenes/Starfield2D.js</files>
  <action>
    1. Build `src/hooks/usePointerLerp.js`: attaches a passive `pointermove` listener when `(pointer: fine)` and `!reducedMotion`, smoothly lerps `(mx, my)` in `requestAnimationFrame` onto `targetRef.current.style.setProperty('--mx' / '--my')` (never triggers React renders), and cleans up listeners/rAF on unmount.
    2. Build `src/scenes/Starfield2D.js`: vanilla `<canvas>` 2D starfield controller (`createStarfield2D(canvas, { isMobile, reducedMotion })`) exporting `.setProgress(p)` and `.destroy()`, rendering subtle cold-star twinkle + radial depth scaling (`1 -> 1.25`) immediately at first paint, with static 1-frame draw under `reducedMotion` and `IntersectionObserver` / `visibilitychange` loop pause.
    AVOID: Calling React `setState` inside rAF or pointermove.
  </action>
  <verify>Select-String -Path src\hooks\usePointerLerp.js,src\scenes\Starfield2D.js -Pattern 'setProperty|cancelAnimationFrame|visibilitychange|destroy'</verify>
  <done>`usePointerLerp.js` writes `--mx`/`--my` cleanly via ref and `Starfield2D.js` renders/disposes cleanly.</done>
</task>

<task type="auto">
  <name>Create ScrollStage Layers 0-15 and single master GSAP ScrollTrigger choreography</name>
  <files>src/scenes/ScrollStage.jsx, src/styles/stage.css</files>
  <action>
    1. Create `src/styles/stage.css`: `.stage-runway` (`500vh` desktop, `350vh` tablet `<=1023px`, `220vh` mobile `<=480px`), `.sticky-viewport { position: sticky; top: 0; height: 100vh; overflow: hidden }`, `.aperture-mask` (`backdrop-filter: blur(12px) brightness(0.6)` + `mask-image: radial-gradient(circle at center, transparent var(--r1, 0%), #000 calc(var(--r1, 0%) + 18%))`), 4–5 GPU `.fog-band` radial gradient layers (`will-change: transform`, automatically hidden on `<=480px` with cheap opacity crossfade per §6/§9), and `@media (prefers-reduced-motion: reduce)` normal-flow overrides. Import `./styles/stage.css` in `src/main.jsx` (or `ScrollStage.jsx`).
    2. Build `src/scenes/ScrollStage.jsx` mounting:
       - Layer 0: `.cosmic-void-grid` shifting subtly via `--mx`/`--my`.
       - Layer 1: `<canvas aria-hidden="true">` running `Starfield2D` + 2 soft radial nebula gradients scaling `1 -> 1.25`.
       - Layer 2 slot: reserved container ref (`coreSlotRef`) ready for Phase 3 lazy `ObservatoryCanvas` (renders sleek 2D orbital crosshair ring underneath meanwhile so Phase 2 looks complete even before WebGL).
       - Layer 4: Aperture blur layer opening `--r1` `0% -> 60%` & fading over `p 0.00 -> 0.20`.
       - Layer 5: Real-DOM SEO title lockup (`<h1>SAGAR KHARBIKAR</h1>`, role, tagline, primary `RESUME.PDF` + `#projects` buttons) tilting/flying into depth (`y: "-120vh", scale: 0.4, rotateX: 70, opacity: 0`) over `p 0.00 -> 0.25`.
       - Layer 6: Fog curtain bands sweeping `x: "150vw"` with `stagger: 0.04` over `p 0.20 -> 0.42`.
       - Layer 8: Corner brackets + `HERO_METRICS` metric count-up readouts (`4iBiz`, `1st`, `Top 10`, `8.70`) appearing over `p 0.40 -> 0.55`.
       - Layer 15: `"SCROLL"` indicator fading above `p > 0.03` and morphing to `"ENTER INSTRUMENT BAY"` button/cue at `p 0.90 -> 1.00`.
    3. Use ONE master `gsap.timeline({ scrollTrigger: { trigger, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true }, defaults: { ease: "none" } })` scoped inside `gsap.context` + `gsap.matchMedia`.
    AVOID: Animating `top`/`left`/`width`/`height`/`filter: blur()` in scroll callbacks; animate strictly `transform`, `opacity`, `clip-path`, or `--r1` CSS custom property on `mask-image`.
  </action>
  <verify>npm run build</verify>
  <done>`ScrollStage.jsx` and `stage.css` compile cleanly with all Layers `0, 1, 4, 5, 6, 8, 15` choreographed in one master GSAP timeline.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` exits 0 with zero WebGL/Three changes yet
- [ ] Only `transform`, `opacity`, `clip-path`, and `--r1` (`mask-image`) are tweened in `ScrollStage`
</verification>

<success_criteria>
- Both tasks verified; 2D stage spine ready for clamped `InstrumentCard` flight in Plan 2.2
</success_criteria>

