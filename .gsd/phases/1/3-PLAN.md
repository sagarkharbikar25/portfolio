---
phase: 1
plan: 3
wave: 1
depends_on: []
files_modified:
  - scripts/generate-brand-assets.ps1
  - public/favicon.svg
  - public/assets/img/og-image.png
  - public/assets/projects/document-portal-dashboard.png
  - public/assets/projects/saar-assistant.png
  - public/case-studies/document-portal.html
autonomous: true
gap_closure: false

must_haves:
  truths:
    - "Over 6.8 MB of dead video, duplicate PDFs, and unused project screenshots are permanently purged from public/ and root"
    - "public/avatar/avatar.png is cleanly removed with git history recovery documented at commit 023f0fa"
    - "Active screenshots are relocated to clean paths without spaces under public/assets/projects/"
    - "public/favicon.svg and a real 1200x630 public/assets/img/og-image.png are generated with zero npm dependencies via scripts/generate-brand-assets.ps1"
    - "public/case-studies/document-portal.html back-link points to canonical / and links to /favicon.svg"
  artifacts:
    - scripts/generate-brand-assets.ps1
    - public/favicon.svg
    - public/assets/img/og-image.png
    - public/assets/projects/document-portal-dashboard.png
    - public/assets/projects/saar-assistant.png
    - public/case-studies/document-portal.html
  key_links:
    - "index.html and case-studies/document-portal.html link to public/favicon.svg"
    - "index.html og:image points to public/assets/img/og-image.png"
    - "src/data/projects.js references relocated images under public/assets/projects/"
---

# Plan 1.3: Asset Hygiene, Scriptable Brand Assets & Case Study Sync

## Objective
Purge ~6.92 MB of unreferenced and duplicate media from `public/` and the project root (removing dead video, duplicate PDFs, spaces in directory names, and unreferenced screenshots while safely noting git commit `023f0fa` recovery for `avatar.png`). Relocate active project screenshots to clean paths under `public/assets/projects/`, generate the missing `public/favicon.svg` and `public/assets/img/og-image.png` (`1200x630`) via a zero-npm-dependency PowerShell script, and update `public/case-studies/document-portal.html` with canonical root links and brand assets.

## Context
Load these files for context:
- .gsd/SPEC.md
- .gsd/STACK.md
- .gsd/phases/1/RESEARCH.md
- public/case-studies/document-portal.html

## Tasks

<task type="auto">
  <name>Asset Purge & Project Screenshot Relocation</name>
  <files>
    public/assets/projects/document-portal-dashboard.png
    public/assets/projects/saar-assistant.png
  </files>
  <action>
    Relocate active media and purge orphaned/duplicate files:

    1. Ensure directory `public/assets/projects` exists.
    2. Move active screenshots to clean paths without spaces:
       - Move `public/Digital Doc Service Portal/DASHBOARD.png` → `public/assets/projects/document-portal-dashboard.png`.
       - Move `public/SAAR/SAAR.png` → `public/assets/projects/saar-assistant.png`.
    3. Purge dead and duplicate files (~6.92 MB):
       - Remove `public/avatar/avatar-video.mp4` (2.48 MB legacy video).
       - Remove `public/avatar/avatar.png` (1.84 MB raw PNG; recovery note: permanently preserved in git history at commit `023f0fa` should Act II scrollytelling silhouette require a compressed WebP derivative).
       - Remove directory `public/avatar/`.
       - Remove the 7 unreferenced PNGs in `public/Digital Doc Service Portal/` (`APPLY .png`, `DOWNLOAD.png`, `HELP .png`, `MY APPLICATION.png`, `NOTIFICATION.png`, `PROFILE.png`, `TRACKING .png`) and remove directory `public/Digital Doc Service Portal/`.
       - Remove directory `public/SAAR/`.
       - Remove duplicate PDF `public/resume/Sagar_Kharbikar_Resume.pdf` and directory `public/resume/`.
       - Remove root duplicate PDF `resume/Sagar_Kharbikar_Resume.pdf` and directory `resume/`.
       - Remove placeholder `public/assets/resume/README.md`.
       - Remove redundant root `CNAME` file.
    4. PRESERVE:
       - `public/CNAME` (required for GitHub Pages custom domain `sagardev.me`).
       - `public/assets/resume/Sagar_Kharbikar_Resume.pdf` (the single canonical resume).
       - `public/assets/projects/cyber-hunt.jpg` and `public/assets/projects/gig-flow.jpg`.
    - AVOID: Deleting `public/CNAME` or `public/assets/resume/Sagar_Kharbikar_Resume.pdf`.
    - USE: PowerShell `Move-Item -Force` and `Remove-Item -Recurse -Force`.
  </action>
  <verify>
    powershell -ExecutionPolicy Bypass -Command "if (Test-Path 'public/avatar') { throw 'public/avatar still exists' }; if (Test-Path 'public/Digital Doc Service Portal') { throw 'Digital Doc folder still exists' }; if (Test-Path 'public/SAAR') { throw 'SAAR folder still exists' }; if (Test-Path 'public/resume') { throw 'public/resume still exists' }; if (Test-Path 'resume') { throw 'root resume folder still exists' }; if (-not (Test-Path 'public/assets/projects/document-portal-dashboard.png')) { throw 'document-portal-dashboard.png missing' }; if (-not (Test-Path 'public/assets/projects/saar-assistant.png')) { throw 'saar-assistant.png missing' }; if (-not (Test-Path 'public/CNAME')) { throw 'public/CNAME must be preserved' }; Write-Host 'Asset purge and relocation verified OK'"
  </verify>
  <done>
    Over 6.8 MB of dead assets purged, active project images cleanly relocated to `public/assets/projects/`, and `public/CNAME` preserved.
  </done>
</task>

<task type="auto">
  <name>Brand Asset Generation Script & Deterministic Execution</name>
  <files>
    scripts/generate-brand-assets.ps1
    public/favicon.svg
    public/assets/img/og-image.png
  </files>
  <action>
    Create and execute the zero-dependency brand asset generator:

    1. Create `scripts/generate-brand-assets.ps1`:
       - Create `public/favicon.svg`:
         - Clean vector SVG (`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">`).
         - Chamfered squircle / polygon background in `#0a0a0c` with cyan `#6fc4f2` (1.5px) border.
         - Geometric `SK` monogram rendered with gold gradient (`#ffd700` to `#ffaa00`).
         - Output UTF-8 string to `public/favicon.svg` (< 1 KB).
       - Create `public/assets/img/og-image.png` (exact `1200x630` pixels) using native Windows `.NET System.Drawing`:
         - `Add-Type -AssemblyName System.Drawing`
         - Create `[System.Drawing.Bitmap]::new(1200, 630)` and `[System.Drawing.Graphics]::FromImage($bmp)`
         - Set `SmoothingMode = AntiAlias` and `TextRenderingHint = AntiAliasGridFit`
         - Draw deep obsidian background gradient (`#0a0a0c` to `#111420`)
         - Draw subtle cyber-arcane orbital arcs and gridline geometry in cyan (`rgba(111, 196, 242, 0.12)`)
         - Draw a glass card container with gold/cyan border
         - Render high-contrast typography:
           - "SAGAR KHARBIKAR" (large title)
           - "The Aetherial Systems Observatory" (subtitle)
           - "Backend · AI Systems · Architecture" (role tagline)
           - Proof badges: "4iBiz Intern", "B.Tech CSE 8.70 CGPA", "1st Prize State-Level ERP"
           - Domain badge: "sagardev.me"
         - Save bitmap directly as PNG to `public/assets/img/og-image.png`
         - Dispose graphics and bitmap objects properly
    2. Execute `scripts/generate-brand-assets.ps1` to produce both brand files.
    3. Ensure generated files are committed to git so Linux GitHub Actions CI never needs to run Windows `.NET` code.
    - AVOID: npm packages like `canvas`, `sharp`, or `puppeteer` that require native C++ build tools or browser downloads.
    - USE: Native Windows `.NET System.Drawing` via PowerShell for zero-dependency generation.
  </action>
  <verify>
    powershell -ExecutionPolicy Bypass -Command "& scripts/generate-brand-assets.ps1; Add-Type -AssemblyName System.Drawing; $img = [System.Drawing.Image]::FromFile((Resolve-Path 'public/assets/img/og-image.png')); if ($img.Width -ne 1200 -or $img.Height -ne 630) { throw 'OG image dimensions are not 1200x630' }; $img.Dispose(); if ((Get-Item 'public/favicon.svg').Length -lt 100) { throw 'favicon.svg is too small or missing' }; Write-Host 'Brand assets verified OK'"
  </verify>
  <done>
    `scripts/generate-brand-assets.ps1` generates valid vector `public/favicon.svg` and a real 1200x630 `public/assets/img/og-image.png` with zero external dependencies.
  </done>
</task>

<task type="auto">
  <name>Case Study Link & Brand Asset Synchronization</name>
  <files>
    public/case-studies/document-portal.html
  </files>
  <action>
    Synchronize `public/case-studies/document-portal.html` links and brand identity:

    1. Replace relative back-link at line 169 (`href="../index.html"`) with canonical root `href="/"`.
    2. Replace missing/emoji favicon with `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.
    3. Add Google Fonts preconnect and stylesheet links for `Cinzel` and `Space Grotesk` with `display=swap`.
    4. Ensure any image references pointing to `Digital Doc Service Portal/DASHBOARD.png` are updated to `/assets/projects/document-portal-dashboard.png`.
    5. AVOID: Overwriting case study technical content; focus on link integrity, favicon, and font readiness.
    6. USE: Canonical root link `href="/"`.
  </action>
  <verify>
    node -e "const fs = require('fs'); const html = fs.readFileSync('public/case-studies/document-portal.html', 'utf8'); if (html.includes('../index.html')) throw new Error('Found old ../index.html link'); if (!html.includes('/favicon.svg')) throw new Error('Missing favicon link'); if (!html.includes('href=\"/\"')) throw new Error('Missing canonical home link'); console.log('Case study links verified OK');"
  </verify>
  <done>
    `document-portal.html` links back to `/`, uses `/favicon.svg`, and matches the portfolio typography hints.
  </done>
</task>

## Must-Haves
After all tasks complete, verify:
- [ ] Over 6.8 MB of dead assets are removed from `public/` and root.
- [ ] Active project screenshots exist at `public/assets/projects/document-portal-dashboard.png` and `public/assets/projects/saar-assistant.png`.
- [ ] `public/favicon.svg` exists and is a valid SVG.
- [ ] `public/assets/img/og-image.png` exists with dimensions `1200x630`.
- [ ] `public/case-studies/document-portal.html` back-link points to `/`.
- [ ] `public/CNAME` is preserved.

## Success Criteria
- [ ] All tasks verified passing via PowerShell and Node test commands.
- [ ] Must-haves confirmed.
- [ ] Zero missing asset 404s.
