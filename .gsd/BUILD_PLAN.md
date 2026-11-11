# Architecture & Implementation Plan — Deep Space Cybernetic HUD (`sagardev.me`)

> **Methodology:** GSD (`SPEC → PLAN → EXECUTE → VERIFY`) + **Ponytail (`full`)**
> **Design Target:** Stitch UI `"Deep Space Cybernetic HUD"` (Project `5178435804571070554`) fused with kinetic cybernetic festival choreography (`#08080C` void + `48px` orthogonal cyber-grid, Electric Cyan `#00F0FF`, Vivid Purple `#9D4EDD`, Indigo glassmorphism)
> **Workspace Safety:** Local changes only in `d:\GitHub\portfolio` — **no `git merge`, no `git push`, no live deploy**.

---

## 1. Architectural File Mapping

```text
d:\GitHub\portfolio\
├── index.html                        # Space Grotesk, JetBrains Mono, Cinzel + dark void shell
├── tailwind.config.js                # Deep Space palette (#08080C, #00F0FF, #9D4EDD, #1A1A2E) & font tokens
├── postcss.config.js                 # Tailwind CSS + Autoprefixer ESM pipeline
├── vite.config.js                    # Vite 5 + React 18 + manualChunks (vendor-three, vendor-motion)
└── src\
    ├── main.jsx                      # React root mounting App with src/styles/cyber.css
    ├── App.jsx                       # Lenis smooth scroll + GSAP ScrollTrigger ticker sync + section spy
    ├── styles\
    │   └── cyber.css                 # Tailwind directives, .cosmic-void-grid, .hud-trapezoid,
    │                                 # .preloader-curtain clip-path & .bento-spotlight-card radial glow
    ├── data\                         # 100% authentic Sagar Kharbikar career, project & code proof data
    │   ├── profile.js                # PROFILE, HERO_METRICS, HUD metadata
    │   ├── experience.js             # 4iBiz Techno-Solutions (Jun–Aug 2026) + TechAlfa & Schollogma
    │   ├── projects.js               # Digital Document Portal, Gig Flow, Cyber Hunt, SAAR AI Assistant
    │   ├── architecture.js           # 3 Principles, 4 CODE_TABS & VERIFICATION_TRACES
    │   ├── skills.js                 # 4-tier skills matrix (Daily Drivers → Core CS Foundations)
    │   └── credentials.js            # 6 verified competition, certification & academic citations
    ├── components\
    │   ├── CustomPreloader.jsx       # Phase A: 0–100% counter, cipher-scramble readout, Escape/Skip,
    │   │                             #          GSAP polygon clip-path curtain reveal
    │   ├── HeroSection.jsx           # Phase B UI: HUD targeting brackets, GSAP split-char title stagger,
    │   │                             #             CTAs & verified 4-card HERO_METRICS strip
    │   ├── HudShell.jsx              # Fixed trapezoidal top HUD, XL chapter/social rails & mobile dock
    │   ├── BentoSpotlightCard.jsx    # Phase D card wrapper updating local --bx/--by pointer radial glow
    │   ├── BentoDossiers.jsx         # Phase D 12-col asymmetrical Bento grid: Projects, Experience,
    │   │                             #         Architecture Console (Copy + Run Test), Skills, Credentials,
    │   │                             #         Direct Transmission Contact & Footer
    │   └── SocialIcons.jsx           # Shared SVG GitHub & LinkedIn icons
    └── scenes\
        ├── HeroCanvas.jsx            # Phase B WebGL: Three.js dual wireframe icosahedra, orbital torus
        │                             #                gyro rings & pointer-reactive additive starfield
        └── PinnedShowcase.jsx        # Phase C ScrollTrigger: vertical depth parallax + desktop-pinned
                                      #                        horizontal Flagship Acts scrub track
```

---

## 2. Implemented Animation & Interactive Phases

1. **Phase A — `CustomPreloader.jsx`:**
   - Percentage counter (`000%` to `100%`) gated cleanly on `document.fonts.ready` / `load` hydration with a `1600ms` safety ceiling so slow networks never stall.
   - Kinetic cipher-scrambling telemetry messages (`INIT_SYSTEM // SAGARDEV.ME`, `MOUNTING_RBAC_AND_STATE_CONTRACTS`, `HYDRATING_WEBGL_SPHERE_& _LENIS`).
   - Accessible `SKIP_BOOT [ESC]` button + automatic bypass when `prefers-reduced-motion: reduce` is active + `BOOT` / `REPLAY_BOOT` trigger in HUD/Footer.
   - Exits with a GSAP `clipPath: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)` curtain wipe right as `HeroSection` fires entrance motion.

2. **Phase B — `HeroCanvas.jsx` + `HeroSection.jsx`:**
   - Interactive `Three.js` scene: cyan outer `IcosahedronGeometry(8.5)`, purple inner core `IcosahedronGeometry(4.8)`, dual tilted `TorusGeometry` orbital rings, and an additive vertex-colored particle cloud smoothly tilting via `pointermove` lerp.
   - Uppercase `Space Grotesk` display lockup (`SAGAR KHARBIKAR`) split cleanly into visual `.hero-split-char` spans animated by `gsap.from(...)` (`aria-label` preserves screen-reader continuity).
   - Paired with HUD corner targeting brackets and the 4-metric verified bottom strip (`4iBiz`, `1st`, `Top 10`, `8.70`).

3. **Phase C — `App.jsx` (`Lenis`) + `PinnedShowcase.jsx` (`ScrollTrigger`):**
   - `Lenis` smooth virtual scroll bound strictly to `gsap.ticker` and `ScrollTrigger.update` (disabled automatically under `prefers-reduced-motion: reduce`).
   - Vertical depth parallax between background `.cosmic-void-grid` and section header.
   - `gsap.matchMedia()` pins `#acts` cleanly on desktop (`>= 1024px`) while scrubbing 4 authentic Flagship Acts (`// ACT_01`..`// ACT_04`) horizontally with a scaled progress bar and `"SKIP TO MATRIX"` escape button; falls back cleanly to a vertical 1–2 column grid on tablets/phones (`< 1024px`).

4. **Phase D — `BentoSpotlightCard.jsx` + `BentoDossiers.jsx`:**
   - 12-column asymmetrical CSS Grid Bento (`lg:col-span-8` Systems + Console paired with `lg:col-span-4` Experience + Skills + Credentials, followed by `lg:col-span-12` Contact terminal).
   - Zero-re-render pointer spotlight (`--bx`, `--by`, `--b-opacity` CSS custom properties updating radial cyan/purple border mask & interior glow).

---

## 3. Asset Handling & 60 FPS Performance Rules

1. **Three.js / WebGL Frame Budget & GPU Disposal:**
   - Cap renderer pixel ratio: desktop `Math.min(devicePixelRatio, 2)`, compact/mobile `<= 1.5`, disabling MSAA antialias on phones.
   - Throttle particle vertices on mobile (`700` on `<= 768px` vs `1,700` on desktop).
   - Pause `requestAnimationFrame` completely via `IntersectionObserver` when scrolled past Hero and on `document.hidden`; dispose all geometries, materials, and WebGL renderer on unmount.
2. **If Future `.glb` / `.gltf` 3D Meshes Are Added (Draco + Lazy Loading Pipeline):**
   - Compress `.glb` meshes via `gltf-transform draco input.glb output-draco.glb --quantize-position 14` or `gltfpack` with KTX2/Basis Universal textures (`>= 60–75%` payload reduction).
   - Dynamically `import()` `GLTFLoader` + `DRACOLoader` (pointing `setDecoderPath('/draco/')` to local WASM decoder binaries) only after `CustomPreloader` releases or Hero enters viewport, keeping above-the-fold JS chunk small.
   - Keep draw calls low (`< 50` calls), bake ambient occlusion instead of heavy real-time shadow maps on mobile, and prefer compressed `.webp`/`.avif` for project screenshots (`loading="lazy"` below fold).
3. **Scroll & Compositor Discipline:**
   - Animate compositor-only properties (`transform`, `opacity`, `clip-path`) — zero scroll-loop React `setState` calls.
   - Keep `ScrollTrigger` pinning wrapped inside `gsap.matchMedia()` so narrow touch devices never fight synthetic horizontal pinning.
4. **Bundle Splitting:**
   - `vite.config.js` separates `three` (`vendor-three`) and `gsap` + `lenis` (`vendor-motion`) from application logic (`index`), keeping CSS cleanly compiled at ~30 kB.
