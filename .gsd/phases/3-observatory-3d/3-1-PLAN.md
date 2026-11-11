---
phase: 3
plan: 1
wave: 1
depends_on: ["2-2"]
files_modified:
  - src/scenes/ObservatoryCanvas.jsx
  - src/scenes/HeroCanvas.jsx
  - src/scenes/ScrollStage.jsx
autonomous: true

must_haves:
  truths:
    - "ObservatoryCanvas replaces HeroCanvas and loads via dynamic import() only after first paint (keeping initial JS <= 180 KB gzip before vendor-three)"
    - "Named tree-shaken three imports render dual wireframe icosahedra + inner core + orbital rings with DPR caps (2 desktop / 1.5 mobile) and particle caps (1700 desktop / 700 mobile / 0 reduced motion)"
    - "Master ScrollStage GSAP timeline drives Three.js camera dolly (camera.position.z -> 6 starting at p 0.20) and ring rotation via a ref proxy object with zero React re-renders"
    - "webglcontextlost listener and WebGL catch fallback degrade silently to Starfield2D; IO + visibilitychange pause rAF; complete .dispose() frees all GPU buffers/materials on unmount"
  artifacts:
    - src/scenes/ObservatoryCanvas.jsx
    - src/scenes/ScrollStage.jsx
---

# Plan 3.1: Lazy `ObservatoryCanvas` 3D Core & Camera Dolly

<objective>
Upgrade `HeroCanvas.jsx` into a lazy-loaded, scroll-reactive `ObservatoryCanvas.jsx` (`plan/plan.md` §2.3, §3.1, §6) that reveals behind `ScrollStage`'s fog curtain without delaying LCP or inflating the initial bundle.

Purpose: Combine Three.js visual depth with strict `<= 180 KB` initial gzip budget, leak-free GPU disposal, and graceful `Starfield2D` degradation.
Output: `src/scenes/ObservatoryCanvas.jsx` wired via `React.lazy` / dynamic `import()` in `ScrollStage.jsx`; legacy `src/scenes/HeroCanvas.jsx` removed.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 2.3, 3.1, 3.3, 6, 9)
- src/scenes/HeroCanvas.jsx
- src/scenes/ScrollStage.jsx
</context>

<tasks>

<task type="auto">
  <name>Refactor HeroCanvas into tree-shaken ObservatoryCanvas with camera dolly & webglcontextlost</name>
  <files>src/scenes/ObservatoryCanvas.jsx, src/scenes/HeroCanvas.jsx</files>
  <action>
    1. Rename/refactor `src/scenes/HeroCanvas.jsx` into `src/scenes/ObservatoryCanvas.jsx` using explicit named imports from `'three'` (`Scene`, `PerspectiveCamera`, `WebGLRenderer`, `IcosahedronGeometry`, `TorusGeometry`, `EdgesGeometry`, `LineSegments`, `LineBasicMaterial`, `BufferGeometry`, `Float32BufferAttribute`, `Points`, `PointsMaterial`, `AdditiveBlending`, `Color`) so Vite tree-shakes unused Three modules.
    2. Evolve geometry/rings into an orbital observatory core (preserving existing icosahedron + inner violet core + dual torus rings + starfield + `DPR <= 2/1.5` + `1700/700/0` particles), add subtle camera dolly & ring-rotation driven smoothly by a `scrollStateRef` prop (`{ dollyZ, spinProgress }`) mutated by `ScrollStage` without React re-renders.
    3. Add explicit `canvas.addEventListener('webglcontextlost', ...)` + `onFallback()` callback, static single-frame render under `prefers-reduced-motion` (no rAF loop), keep `IntersectionObserver` + `visibilitychange` pauses, and centralize GPU `.dispose()` inside `disposeScene()`. Delete `src/scenes/HeroCanvas.jsx`.
    AVOID: Using `import * as THREE` or storing camera coordinates in React state.
  </action>
  <verify>Select-String -Path src\scenes\ObservatoryCanvas.jsx -Pattern 'webglcontextlost|disposeScene|Float32BufferAttribute' && !(Test-Path src\scenes\HeroCanvas.jsx)</verify>
  <done>`ObservatoryCanvas.jsx` uses named `three` imports, exposes ref-driven dolly/spin + `webglcontextlost`, renders 1 static frame on reduced motion, and removes `HeroCanvas.jsx`.</done>
</task>

<task type="auto">
  <name>Lazy-load ObservatoryCanvas post-first-paint in ScrollStage and bind camera dolly beat</name>
  <files>src/scenes/ScrollStage.jsx</files>
  <action>
    1. Dynamically load `ObservatoryCanvas` (`React.lazy` or dynamic `import('../scenes/ObservatoryCanvas.jsx')` triggered after `requestAnimationFrame` / first paint when `!fastView`), wrapped in an error/fallback guard so WebGL failure stays cleanly on `Starfield2D` with fade-in opacity once WebGL mounts.
    2. Wire a GSAP tween in `ScrollStage`'s master timeline starting at `0.2` (`tl.to(threeProxyRef.current, { z: 6, ringSpin: 1.8 }, 0.2)`) so the camera dollies smoothly behind the parting fog curtain.
    AVOID: Static top-level import of `ObservatoryCanvas` (would break the `<= 180 KB` initial gzip JS budget).
  </action>
  <verify>npm run build</verify>
  <done>`vendor-three` stays split as a lazy async chunk in `dist/assets/`, initial JS gzip <= 180 KB, and camera dolly scrubs smoothly behind Layer 6 fog.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` outputs async `ObservatoryCanvas` + `vendor-three` chunks without bloating `index-*.js`
- [ ] `webglcontextlost` and WebGL-unavailable catch safely fall back to `Starfield2D`
</verification>

<success_criteria>
- Both tasks verified; lazy Three.js 3D observatory works cleanly over `Starfield2D` fallback
</success_criteria>
