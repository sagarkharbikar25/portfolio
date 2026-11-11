---
phase: 1
plan: 5
wave: 3
depends_on:
  - "1"
  - "2"
  - "3"
  - "4"
files_modified:
  - src/components/ExperienceSection.jsx
  - src/components/ProjectsSection.jsx
  - src/components/ArchitectureSection.jsx
  - src/components/SkillsSection.jsx
  - src/components/CredentialsSection.jsx
  - src/components/ContactSection.jsx
  - src/App.jsx
  - src/main.jsx
  - src/index.css
autonomous: true
gap_closure: false

must_haves:
  truths:
    - "All 6 dossier sections are modular components consuming typed data without inline style baggage"
    - "ProjectsSection uses .projects-bento-grid and includes explicit width and height on every project image"
    - "ArchitectureSection renders interactive code tabs paired with authentic verification telemetry traces"
    - "src/App.jsx is a slim orchestrator under 120 lines"
    - "src/main.jsx imports ordered CSS modules and removes import of legacy src/index.css"
    - "src/index.css is deleted"
    - "npm run build completes cleanly with exit code 0"
  artifacts:
    - src/components/ExperienceSection.jsx
    - src/components/ProjectsSection.jsx
    - src/components/ArchitectureSection.jsx
    - src/components/SkillsSection.jsx
    - src/components/CredentialsSection.jsx
    - src/components/ContactSection.jsx
    - src/App.jsx
    - src/main.jsx
  key_links:
    - "src/App.jsx orchestrates Navbar, StoryStage, HeroSection, Dossiers, and Footer"
    - "src/main.jsx imports the CSS cascade from src/styles/"
    - "ProjectsSection renders assets generated and relocated in Plan 1.3"
---

# Plan 1.5: Recruiter Proof Dossier Components & Orchestrator Build

## Objective
Extract the 6 remaining recruiter proof sections (`ExperienceSection`, `ProjectsSection`, `ArchitectureSection`, `SkillsSection`, `CredentialsSection`, `ContactSection`), replace all inline `style={{...}}` blocks with CSS classes, and assemble the slim orchestrator `src/App.jsx` (< 120 lines). Update `src/main.jsx` to load the modular CSS cascade in strict order, delete the monolithic `src/index.css`, and verify a clean production build via `npm run build`.

## Context
Load these files for context:
- .gsd/SPEC.md
- .gsd/DECISIONS.md
- .gsd/phases/1/RESEARCH.md
- src/App.jsx
- src/data/projects.js
- src/data/architecture.js

## Tasks

<task type="auto">
  <name>Recruiter Proof Dossier Components</name>
  <files>
    src/components/ExperienceSection.jsx
    src/components/ProjectsSection.jsx
    src/components/ArchitectureSection.jsx
    src/components/SkillsSection.jsx
    src/components/CredentialsSection.jsx
    src/components/ContactSection.jsx
  </files>
  <action>
    Extract the 6 dossier sections into standalone components:

    1. Create `src/components/ExperienceSection.jsx`:
       - Render `<section id="experience" className="experience-section">`.
       - Import and iterate over `EXPERIENCE_DATA` from `src/data/experience.js`.
       - Render timeline milestone cards with company, role, period, location, and deliverable bullet points.

    2. Create `src/components/ProjectsSection.jsx`:
       - Render `<section id="projects" className="projects-section">`.
       - Render container with class `.projects-bento-grid`.
       - AVOID: Inline styles `style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '36px' }}` from `src/App.jsx:476`.
       - Import and iterate over `PROJECTS_DATA` from `src/data/projects.js`.
       - Render each project card (`.bento-project-card`):
         - Render project image with explicit `width`, `height`, `alt`, and `loading="lazy"`.
         - Render tags and title.
         - Render metrics chips.
         - Render description.
         - Render tech stack pills.
         - Render CTAs conditionally:
           - If `caseStudyUrl`: render link to `/case-studies/document-portal.html`.
           - If `repoUrl`: render link to GitHub repository.
           - If `repoUrl` is null: render honest note or badge ("Source code on request") rather than linking to profile root.

    3. Create `src/components/ArchitectureSection.jsx`:
       - Render `<section id="architecture" className="architecture-section">`.
       - Render 3 architecture principle cards as accessible buttons:
         `<button type="button" className="principle-card" onClick={...}>` (avoid clickable `<div>`).
       - Render interactive console with tab switcher:
         Import `CODE_TABS` and `VERIFICATION_TRACES` from `src/data/architecture.js`.
         Display active tab filename and code content in `<pre><code>`.
         Display matching verification telemetry trace below the code viewport:
         `<div className="verification-telemetry-rail">{VERIFICATION_TRACES[activeTab]}</div>`.

    4. Create `src/components/SkillsSection.jsx`:
       - Render `<section id="skills" className="skills-section">`.
       - Import and iterate over `SKILLS_DATA` from `src/data/skills.js`.
       - Render 4 cluster cards with skill tag pills.

    5. Create `src/components/CredentialsSection.jsx`:
       - Render `<section id="credentials" className="credentials-section">`.
       - Import and iterate over `CREDENTIALS_DATA` from `src/data/credentials.js`.
       - Render 6 credential cards displaying degree, awards, and certifications.

    6. Create `src/components/ContactSection.jsx`:
       - Render `<section id="contact" className="contact-section">`.
       - Render direct contact links: `mailto:sagarkharbikar25@gmail.com`, LinkedIn, GitHub.
       - Include anti-scraping note: "Direct phone available upon request to verified recruiters."
       - AVOID: Hardcoded phone numbers in the HTML.
  </action>
  <verify>
    node -e "const fs = require('fs'); ['ExperienceSection.jsx', 'ProjectsSection.jsx', 'ArchitectureSection.jsx', 'SkillsSection.jsx', 'CredentialsSection.jsx', 'ContactSection.jsx'].forEach(f => { if (!fs.existsSync('src/components/' + f)) throw new Error('Missing ' + f); }); const p = fs.readFileSync('src/components/ProjectsSection.jsx', 'utf8'); if (!p.includes('projects-bento-grid')) throw new Error('ProjectsSection missing projects-bento-grid'); const a = fs.readFileSync('src/components/ArchitectureSection.jsx', 'utf8'); if (!a.includes('VERIFICATION_TRACES')) throw new Error('ArchitectureSection missing VERIFICATION_TRACES'); console.log('All 6 dossier components verified OK');"
  </verify>
  <done>
    All 6 dossier components are created with clean classes, explicit image dimensions, interactive architecture traces, and zero inline style baggage.
  </done>
</task>

<task type="auto">
  <name>Assemble Slim App.jsx, Update main.jsx, Delete index.css & Verify Build</name>
  <files>
    src/App.jsx
    src/main.jsx
    src/index.css
  </files>
  <action>
    Wire together the modular application and verify the production build:

    1. Update `src/main.jsx`:
       - Remove `import './index.css';`.
       - Import modular CSS files in strict cascading order:
         ```javascript
         import './styles/tokens.css';
         import './styles/base.css';
         import './styles/hud.css';
         import './styles/sections.css';
         import './styles/odyssey.css';
         import './styles/responsive.css';
         ```
       - Mount `<App />` into `document.getElementById('root')`.

    2. Refactor `src/App.jsx`:
       - Replace the 1,211-line monolith with a slim orchestrator under 120 lines:
         ```javascript
         import React from 'react';
         import { useScrollSpy } from './hooks/useScrollSpy';
         import Navbar from './components/Navbar';
         import HeroSection from './components/HeroSection';
         import ExperienceSection from './components/ExperienceSection';
         import ProjectsSection from './components/ProjectsSection';
         import ArchitectureSection from './components/ArchitectureSection';
         import SkillsSection from './components/SkillsSection';
         import CredentialsSection from './components/CredentialsSection';
         import ContactSection from './components/ContactSection';
         import Footer from './components/Footer';
         import StoryStage from './scenes/StoryStage';

         export default function App() {
           const { activeSection, scrollTo } = useScrollSpy([
             'hero',
             'experience',
             'projects',
             'architecture',
             'skills',
             'credentials',
             'contact'
           ]);

           return (
             <div className="portfolio-app-root">
               <Navbar activeSection={activeSection} scrollTo={scrollTo} />
               <main id="main-content">
                 <StoryStage>
                   <HeroSection scrollTo={scrollTo} />
                 </StoryStage>
                 <ExperienceSection />
                 <ProjectsSection />
                 <ArchitectureSection />
                 <SkillsSection />
                 <CredentialsSection />
                 <ContactSection />
               </main>
               <Footer scrollTo={scrollTo} />
             </div>
           );
         }
         ```
       - Ensure `src/App.jsx` line count is strictly under 120 lines.

    3. Delete legacy `src/index.css`:
       - Use PowerShell `Remove-Item src/index.css -Force`.

    4. Run `npm run build` and ensure Vite compiles all JS/CSS into `dist/` with exit code 0.
    - AVOID: Leaving `src/index.css` in the project.
    - USE: PowerShell 5.1 compatible verification commands (no `&&` or `||`).
  </action>
  <verify>
    powershell -ExecutionPolicy Bypass -Command "if (Test-Path 'src/index.css') { throw 'src/index.css must be deleted' }; npm run build; if ($LASTEXITCODE -ne 0) { throw 'Build failed' }; node -e \"const fs = require('fs'); const lines = fs.readFileSync('src/App.jsx', 'utf8').split('\n').length; if (lines > 120) throw new Error('App.jsx exceeds 120 lines: ' + lines); if (!fs.existsSync('dist/index.html')) throw new Error('dist/index.html missing'); console.log('App.jsx lines: ' + lines + ' - Build verified OK');\""
  </verify>
  <done>
    `src/App.jsx` is under 120 lines, `src/index.css` is removed, and `npm run build` succeeds cleanly.
  </done>
</task>

## Must-Haves
After all tasks complete, verify:
- [ ] All 6 dossier components exist in `src/components/`.
- [ ] `src/App.jsx` is under 120 lines and orchestrates the modular components.
- [ ] `src/main.jsx` imports CSS modules in correct sequence.
- [ ] Legacy `src/index.css` is completely deleted.
- [ ] `npm run build` outputs valid assets in `dist/` with exit code 0.

## Success Criteria
- [ ] All tasks verified passing via PowerShell build check.
- [ ] Must-haves confirmed.
- [ ] Zero build warnings or errors.
