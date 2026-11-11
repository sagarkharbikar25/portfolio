---
phase: 1
plan: 2
wave: 2
depends_on: ["1-1"]
files_modified:
  - src/components/CustomPreloader.jsx
  - src/components/HudShell.jsx
  - src/App.jsx
  - src/styles/cyber.css
autonomous: true

must_haves:
  truths:
    - "CustomPreloader caps initial boot at <= 1.2s, skips automatically on repeat tab visits (sessionStorage) and under prefers-reduced-motion or FAST_VIEW, and retains SKIP_BOOT [ESC]"
    - "HudShell renders .nav-divider (2x26px) springing scaleY(0->1) with cubic-bezier(0.34,1.56,0.64,1), CH.00-CH.03 chapter rail, gold RESUME.PDF CTA within 2 tab stops, FAST_VIEW toggle, and rotate(12deg) scale(1.15) social hover"
    - "All HUD drawers/menus close on Escape, outside pointer click, and hash change, and mobile <=480px bottom dock applies calc(8px + env(safe-area-inset-bottom))"
    - "FAST_VIEW mode (toggleable anytime and defaulted when ?ref=resume per user decision) bypasses cinematic preloader/runway directly to immediate Hero summary + BentoDossiers"
  artifacts:
    - src/components/CustomPreloader.jsx
    - src/components/HudShell.jsx
    - src/App.jsx
    - src/styles/cyber.css
---

# Plan 1.2: Upgraded Preloader, HUD Spring Chrome & FAST_VIEW Escape Hatch

<objective>
Upgrade `CustomPreloader.jsx`, `HudShell.jsx`, and `App.jsx` to deliver the exact HUD chrome, navigation interaction physics, drawer auto-close rules, <=1.2s session-aware preloader, and persistent `FAST_VIEW` mode from `plan/plan.md` §4 & §6.

Purpose: Ensure recruiters can reach resume and project proof instantaneously via `?ref=resume` / `FAST_VIEW`, while desktop and mobile navigation satisfy all accessibility and spring-motion contracts.
Output: Complete HUD + Preloader + `FAST_VIEW` shell verified before building the `ScrollStage` choreography.
</objective>

<context>
Load for context:
- plan/plan.md (Sections 4, 6, 10, 12)
- src/components/CustomPreloader.jsx
- src/components/HudShell.jsx
- src/App.jsx
- src/styles/cyber.css
</context>

<tasks>

<task type="auto">
  <name>Cap CustomPreloader at 1.2s and auto-skip on repeat session, FAST_VIEW, or reduced motion</name>
  <files>src/components/CustomPreloader.jsx</files>
  <action>
    1. Check `sessionStorage.getItem('obs_boot_seen')`, `fastView` prop, and `window.matchMedia('(prefers-reduced-motion: reduce)').matches` on mount — if any are true, bypass the overlay immediately and call `onComplete()`.
    2. Reduce hard boot ceiling from `1600ms` to `1200ms` (`max 1.2s` per `plan/plan.md` §6), set `sessionStorage.setItem('obs_boot_seen', '1')` upon completion or skip, and keep `Escape` / `SKIP_BOOT [ESC]` focusable button working.
    AVOID: Blocking scrolling or `onComplete` after unmount/replay races.
  </action>
  <verify>Select-String -Path src\components\CustomPreloader.jsx -Pattern '1200|obs_boot_seen|prefers-reduced-motion|fastView'</verify>
  <done>Preloader completes within `<= 1.2s`, skips on repeat visit/reduced motion/`FAST_VIEW`, and supports `BOOT` manual replay.</done>
</task>

<task type="auto">
  <name>Upgrade HudShell with spring nav-divider, CH.00-CH.03 rail, FAST_VIEW toggle, and drawer auto-close</name>
  <files>src/components/HudShell.jsx, src/styles/cyber.css</files>
  <action>
    1. Implement `.nav-divider` (`width: 2px; height: 26px; transform: scaleY(0); transform-origin: center; transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);`) in `cyber.css` and wire active/hover state inside `HudShell.jsx` links (no separate `NavDivider.jsx` file per Ponytail).
    2. Update left XL chapter rail to `CH.00–CH.03` using `OBSERVATORY_CHAPTERS` from `src/data/profile.js`. Apply `rotate(12deg) scale(1.15)` hover transition to social icons, add `animation-play-state: paused` on `:hover`/`:focus-visible` for floating loops / `SYS_ONLINE` badge (`scale 0.88<->1.15`, off under reduced motion), and ensure gold `RESUME.PDF` CTA is reachable within `<= 2` Tab stops after skip link.
    3. Add persistent `FAST_VIEW` toggle pill in the top bar (and mobile dropdown) so visitors can disable/enable the cinematic runway at any time.
    4. Wire `document` outside-click (`mousedown`/`pointerdown`) + `Escape` + `hashchange` listeners to close mobile dropdown drawers, and set `padding-bottom: calc(8px + env(safe-area-inset-bottom))` on mobile bottom dock with `<=480px` center bar hidden cleanly (compact top bar + hamburger + gold Resume CTA).
    AVOID: Floating helper badges colliding with mobile bottom dock or center bar clipping between `768–1024px`.
  </action>
  <verify>npm run build && Select-String -Path src\components\HudShell.jsx,src\styles\cyber.css -Pattern 'nav-divider|hashchange|safe-area-inset-bottom|FAST_VIEW|fastView'</verify>
  <done>All HUD controls, spring dividers, safe-area padding, tab order, and drawer auto-close triggers are in place and built cleanly.</done>
</task>

<task type="auto">
  <name>Wire FAST_VIEW persistence and ?ref=resume query activation in App.jsx</name>
  <files>src/App.jsx</files>
  <action>
    1. Initialize `fastView` state from `sessionStorage` OR URL `?ref=resume` parameter (if confirmed in §12 Decision #2), plus `window.matchMedia('(prefers-reduced-motion: reduce)').matches` safeguard for Lenis.
    2. Pass `fastView` & `onToggleFastView` to `HudShell`, `CustomPreloader`, and down to the runway/stage slot so toggling `FAST_VIEW` immediately collapses/restores the cinematic scroll track and calls `ScrollTrigger.refresh()`.
    3. Keep existing `Lenis` + `gsap.ticker` + `lagSmoothing(0)` single-ticker clock and `IntersectionObserver` scroll-spy mapped to `CH.00–CH.03`.
    AVOID: Duplicating scroll listeners outside `ScrollTrigger`/Lenis.
  </action>
  <verify>npm run build</verify>
  <done>`App.jsx` cleanly toggles `FAST_VIEW`, respects `?ref=resume` and reduced motion, and compiles cleanly.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` exits 0
- [ ] Initial `sessionStorage` flag & `FAST_VIEW` toggle work without console errors
</verification>

<success_criteria>
- All 3 tasks verified
- HUD shell satisfies Plan `plan/plan.md` Sections 4 & 6 controls
</success_criteria>

