---
phase: 3
plan: 1
completed_at: 2026-11-11T18:56:10+05:30
status: passed
---

# Plan 3.1 Summary: Lazy ObservatoryCanvas 3D Core & Dolly Sync

## Changes Executed
- [`src/scenes/ObservatoryCanvas.jsx`](file:///d:/GitHub/portfolio/src/scenes/ObservatoryCanvas.jsx): Refactored legacy [`HeroCanvas.jsx`](file:///d:/GitHub/portfolio/src/scenes/HeroCanvas.jsx) (deleted) into tree-shaken named `three` imports (`Scene`, `PerspectiveCamera`, `WebGLRenderer`, `IcosahedronGeometry`, `TorusGeometry`, `BufferGeometry`, `Float32BufferAttribute`, `Points`, etc.), added cyan/ice/gold orbital observatory rings, `webglcontextlost` listener calling `disposeScene()` + `onFallback()`, static 1-frame reduced-motion safety (`0` particles on reduced motion, `1700` desktop, `700` mobile), and ref-driven camera dolly/ring spin (`scrollStateRef`).
- [`src/scenes/ScrollStage.jsx`](file:///d:/GitHub/portfolio/src/scenes/ScrollStage.jsx): Deferred `ObservatoryCanvas` loading via `React.lazy(() => import('./ObservatoryCanvas'))` after `requestAnimationFrame` first paint with seamless fade over [`Starfield2D.js`](file:///d:/GitHub/portfolio/src/scenes/Starfield2D.js) fallback.

## Verification
- `npm run build` exited `0`: `ObservatoryCanvas` (`2.05 KB` gzip) + `vendor-three` (`129.74 KB` gzip) emitted asynchronously while initial JS remained `123.97 KB` gzip (`<= 180 KB` budget).

