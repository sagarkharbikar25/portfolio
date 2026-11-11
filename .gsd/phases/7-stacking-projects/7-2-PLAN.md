---
phase: 7
plan: 2
wave: 2
depends_on: ["7-1"]
files_modified:
  - src/components/ProjectStackDeck.jsx
  - src/components/ProjectInspectModal.jsx
  - src/styles/stage.css
autonomous: true

must_haves:
  truths:
    - "ProjectStackDeck (#projects) renders up to 6 large, uncluttered Observatory cards in a sticky cascading stack inspired by the uploaded reference"
    - "Each card displays a distinct top peeking Header Bar (~42px, staying visible stacked below navbar with >=84px clearance and <=36-44px cascade step so even 6 cards fit cleanly within 770px desktop viewport height)"
    - "Scrolling animates underlying cards cleanly via GSAP ScrollTrigger scrub (gentle scale-down 1->0.94 + opacity soften 1->0.68 using strictly transform & opacity)"
    - "Clicking 'Inspect System' opens ProjectInspectModal (accessible dialog with focus restoration, backdrop/Escape/hash close, Lenis scroll isolation) containing full summary, problem, specs, Architecture Decision, Cyber Hunt Post-mortem, full stack, and external links"
  artifacts:
    - src/components/ProjectStackDeck.jsx
    - src/components/ProjectInspectModal.jsx
    - src/styles/stage.css
---

# Plan 7.2: Big Sticky Stacking Project Cards Deck & Inspect Pop-Out Modal

<objective>
Build `ProjectStackDeck.jsx` (`max 6` big animated scroll-stack cards) and `ProjectInspectModal.jsx` (clean details pop-out triggered on `Inspect`) in authentic Observatory aesthetic (`#08080C` / `#0F101A`, cyan/gold/emerald/ice header bars, crisp `.webp` visuals, zero text walls on the card face).

Purpose: Deliver the exact cascading sticky scroll card interaction the user requested without visual clutter or overlap bugs across 4–6 projects.
Output: `ProjectStackDeck.jsx`, `ProjectInspectModal.jsx`, and `.stack-deck-*` styles appended cleanly to `src/styles/stage.css`.
</objective>

<context>
Load for context:
- src/data/projects.js
- src/styles/cyber.css
- src/styles/stage.css
</context>

<tasks>

<task type="auto">
  <name>Build ProjectStackDeck with dynamic max-6 sticky stacking offsets and GSAP scrub animation</name>
  <files>src/components/ProjectStackDeck.jsx, src/styles/stage.css</files>
  <action>
    1. Create `src/components/ProjectStackDeck.jsx` (`id="projects"`):
       - Renders section heading (`CH.01 // INSTRUMENTS`, `"Production Systems & Deliverables"`, live count `[ 0{n} / 06 SLOTS ]`).
       - Reads `const deckProjects = getDeckProjects()` (`1..6` items).
       - Computes dynamic cascade spacing: `const peekStep = deckProjects.length > 4 ? 36 : 44;` and `top: calc(84px + idx * peekStep)` on `md+` when `!fastView && !reducedMotion` so up to 6 peeking header strips stay visible above the active card (`84 + 5*36 = 264px` top on #6, fitting a `clamp(380px, 55vh, 450px)` card cleanly inside `1536x770` desktop screens!).
       - Each big card renders:
         a) **Peeking Top Header Bar** (`h-[42px] px-5 flex items-center justify-between` with tonal cyan/gold/emerald/ice border & translucent tint per `project.headerAccent`): left shows `01 / 04 · {project.category}`, right shows `project.statusLabel` (`STATUS: IN DEVELOPMENT`) or `project.award`.
         b) **Uncluttered Big Card Body** (`grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-8`): crisp `.webp` image preview (`width`/`height`, `loading="lazy"`) on left (`lg:col-span-7`); prominent `project.title`, concise 1–2 line `project.outcomeLead`, up to 4 key stack pills, external link (`Source Code` / `Case Study`), and prominent gold-trimmed **`INSPECT SYSTEM`** button calling `onInspect(project, triggerEl)` on right (`lg:col-span-5`).
       - Animates underlying card depth with `gsap.matchMedia()` (`(min-width: 768px)`): for each `card[idx]` paired with `card[idx + 1]`, scrub `scale: 1 -> 0.94` and `opacity: 1 -> 0.68` (`transformOrigin: 'top center'`, GPU-only `transform` + `opacity`) cleanly as the next card rises over it. Mobile (`<768px`), `fastView`, and `prefers-reduced-motion` render clean vertical cards without trapping viewport height.
    2. Add minimal `.stack-card-*` styling utilities inside `src/styles/stage.css`.
    AVOID: Rendering specs bullet lists, Problem essays, or Post-mortem walls directly inside the scroll stack cards (all detail moves cleanly into `ProjectInspectModal`).
  </action>
  <verify>Select-String -Path src\components\ProjectStackDeck.jsx -Pattern 'getDeckProjects|peekStep|onInspect|ScrollTrigger'</verify>
  <done>`ProjectStackDeck.jsx` compiles cleanly with 1..6 sticky cards, peeking headers, GSAP scale/opacity scrub, and responsive fallbacks.</done>
</task>

<task type="auto">
  <name>Create accessible ProjectInspectModal pop-out for deep technical proof</name>
  <files>src/components/ProjectInspectModal.jsx</files>
  <action>
    1. Build `src/components/ProjectInspectModal.jsx` receiving `{ project, onClose, onPauseScroll }`:
       - Renders when `project` is non-null inside a high-z (`z-[80]`) dark blurred backdrop (`bg-void/85 backdrop-blur-xl`).
       - Traps/moves initial focus to close button on open, restores focus to the triggering element on close, locks document body overflow / calls `onPauseScroll(true/false)` for Lenis + marks modal scroll container with `data-lenis-prevent` so wheel scrolling scrolls inside the modal smoothly.
       - Closes on `Escape` keydown, backdrop outside click, `X` button, and `hashchange`.
       - Displays complete system dossier cleanly: full `.webp` preview (`aspect-[16/9]` crisp preview), `award` / `STATUS: IN DEVELOPMENT` pill, `outcomeLead`, `Summary & Problem`, full `Technical Specifications` list (`project.specs`), `Key Architecture Decision` (`project.decisionTitle` / `decisionText`), expanded `Post-mortem` breakdown when `project.postMortem` exists, full tech stack tags, and action links (`Source Code`, `/case-studies/document-portal.html`, `Request Demo`).
    AVOID: Adding React state or listeners when `project === null` (clean early return).
  </action>
  <verify>npm run build && Select-String -Path src\components\ProjectInspectModal.jsx -Pattern 'role="dialog"|data-lenis-prevent|Escape|postMortem'</verify>
  <done>`ProjectInspectModal.jsx` builds cleanly and satisfies all keyboard, Lenis-isolation, close-trigger, and content completeness requirements.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `npm run build` exits 0
- [ ] Both `ProjectStackDeck.jsx` and `ProjectInspectModal.jsx` satisfy zero-clutter card face + full detail pop-out contract
</verification>

<success_criteria>
- Both tasks verified; components ready for `BentoDossiers` separation & `App.jsx` wiring in Plan 7.3
</success_criteria>

