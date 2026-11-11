---
phase: 7
plan: 3
wave: 3
depends_on: ["7-2"]
files_modified:
  - src/components/BentoDossiers.jsx
  - src/components/HudShell.jsx
  - src/App.jsx
autonomous: true

must_haves:
  truths:
    - "BentoDossiers removes the duplicated #projects card wall and renders dedicated CH.02 // SYSTEM TELEMETRY (#telemetry) housing Architecture Console (#architecture), Experience (#experience), Skills (#skills), Credentials (#credentials), plus CH.03 // SIGNAL (#contact) and <footer>"
    - "HudShell & App.jsx scroll-spy highlight CH.00 (Hero), CH.01 (Projects Stack), CH.02 (Telemetry Console & Record), and CH.03 (Contact) with zero overlap between Instruments and Telemetry"
    - "ProjectInspectModal pauses/resumes Lenis scroll cleanly and npm run build keeps initial JS <= 180 KB gzip"
  artifacts:
    - src/components/BentoDossiers.jsx
    - src/components/HudShell.jsx
    - src/App.jsx
---

# Plan 7.3: Separate Telemetry Bento, Mount Project Stack Deck & Modal, Verify Locally

<objective>
Cleanly separate `CH.01 // INSTRUMENTS` (`<ProjectStackDeck />` at `#projects`) from `CH.02 // TELEMETRY` (`<BentoDossiers />` at `#telemetry`: Architecture Console, Experience, Skills, Credentials), wire `<ProjectInspectModal />` inside `src/App.jsx`, and verify the local build & preview server (`no git merge / no git push`).

Purpose: Eliminate HUD/chapter confusion ("instrument and telemetry show same") and eliminate the messy side-by-side wall shown in screenshot #1.
Output: Clean separation across `ScrollStage` -> `ProjectStackDeck` + `ProjectInspectModal` -> `BentoDossiers`, accurate scroll-spy, and clean Vite production bundle.
</objective>

<context>
Load for context:
- src/components/BentoDossiers.jsx
- src/components/HudShell.jsx
- src/App.jsx
</context>

<tasks>

<task type="auto">
  <name>Refactor BentoDossiers into clean Telemetry Bento (Architecture, Experience, Skills, Credentials, Contact)</name>
  <files>src/components/BentoDossiers.jsx</files>
  <action>
    1. Change `#matrix` section ID to `#telemetry` and update heading from `03 // SYSTEM MATRIX & CORE MODULES` to `02 // SYSTEM TELEMETRY & CONSOLE` (`TELEMETRY: ARCHITECTURE · EXPERIENCE · CREDENTIALS`).
    2. Remove the old duplicated `PROJECTS.map(...)` card block (`#projects`) and unused `openPostMortem` local state from `BentoDossiers.jsx` (all project cards now live cleanly in `<ProjectStackDeck />`, with Post-mortem inside `<ProjectInspectModal />`).
    3. Re-balance the 12-col asymmetric Bento layout with spacious symmetry:
       - Left (`lg:col-span-7`): Interactive Architecture Console (`#architecture`, 3 Principles + 4-tab `Copy` / `RUN TEST` terminal + `VERIFICATION_TRACES`) + Core Skills Matrix (`#skills`).
       - Right (`lg:col-span-5`): Production Experience (`#experience`) + Verified Credentials (`#credentials`).
       - Bottom (`lg:col-span-12`): Direct Contact Deck (`#contact`) + semantic `<footer>`.
    4. Update footer quick-jump links (`OBSERVATORY`, `INSTRUMENTS` -> `projects`, `CONSOLE` -> `architecture`, `REPLAY_BOOT`).
    AVOID: Breaking `#experience`, `#architecture`, `#skills`, `#credentials`, or `#contact` anchor IDs or losing any verified experience/skill/credential record.
  </action>
  <verify>Select-String -Path src\components\BentoDossiers.jsx -Pattern 'id="telemetry"|id="architecture"|id="experience"|id="skills"|id="credentials"|id="contact"'</verify>
  <done>`BentoDossiers.jsx` cleanly separates Telemetry from Projects with balanced column heights and intact `#contact`/`<footer>`.</done>
</task>

<task type="auto">
  <name>Wire ProjectStackDeck, ProjectInspectModal & clean chapter scroll-spy in App.jsx and HudShell.jsx</name>
  <files>src/App.jsx, src/components/HudShell.jsx</files>
  <action>
    1. Import & mount `<ProjectStackDeck fastView={fastView} onInspect={handleInspectProject} />` directly above `<BentoDossiers />` inside `src/App.jsx`, plus `<ProjectInspectModal project={inspectedProject} onClose={handleCloseInspect} onPauseScroll={handleModalScrollLock} />`.
    2. Track `lastInspectTriggerRef` so closing `ProjectInspectModal` restores focus seamlessly; pause/resume `lenisRef.current` while `inspectedProject` is open.
    3. Update `TRACKED_SECTIONS` in `src/App.jsx` (`'hero'`, `'projects'`, `'telemetry'`, `'architecture'`, `'experience'`, `'skills'`, `'credentials'`, `'contact'`) so `'hero'` -> `'hero'`, `'projects'` -> `'projects'`, `'telemetry'` / `'experience'` / `'skills'` / `'credentials'` -> `'experience'` (`TELEMETRY`), `'architecture'` -> `'architecture'` (highlighting both Console in top nav and `CH.02` in left rail!), and `'contact'` -> `'contact'`.
    4. Clean up `HudShell.jsx` nav links (`00 // IGNITION`, `01 // INSTRUMENTS`, `02 // TELEMETRY`, `03 // CONSOLE`, `04 // SIGNAL`) so every link jumps to its own distinct chapter seamlessly.
    AVOID: Letting `#projects` map to `experience` or `acts` (`acts` stays gone).
  </action>
  <verify>npm run build</verify>
  <done>Clicking Inspect anywhere in `ProjectStackDeck` opens `ProjectInspectModal` with Lenis lock + focus return, chapter scroll-spy never conflates Instruments and Telemetry, and initial JS stays `<= 180 KB` gzip.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` exits 0 (`index` + `vendor-motion` <= 180 KB gzip)
- [ ] Local preview serves cleanly on `127.0.0.1:4173` for desktop & mobile testing
</verification>

<success_criteria>
- All tasks verified; upgrade ready for user local review (`no git merge / no git push`)
</success_criteria>

