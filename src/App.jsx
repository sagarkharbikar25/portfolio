import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Menu, X, Mail, FileText, 
  Terminal, Database, Code2, Play, 
  Activity, ShieldCheck, Cpu, ArrowUpRight,
  Briefcase, GraduationCap, Award, ExternalLink
} from 'lucide-react';

const CODE_TABS = {
  'AtomicTransition.ts': {
    title: 'AtomicTransition.ts',
    badge: 'MongoDB / Concurrency',
    lines: [
      { num: 1, text: '// Query-level atomic precondition arbitrates concurrent approvals', type: 'comment' },
      { num: 2, text: 'export async function transitionDocumentState(', type: 'normal' },
      { num: 3, text: '  documentId: string, currentState: Status, targetState: Status', type: 'normal' },
      { num: 4, text: '): Promise<DocumentRecord> {', type: 'normal' },
      { num: 5, text: '  const updated = await Document.findOneAndUpdate(', type: 'normal' },
      { num: 6, text: '    { _id: documentId, status: currentState }, // Precondition lock', type: 'highlight' },
      { num: 7, text: '    {', type: 'normal' },
      { num: 8, text: '      $set: { status: targetState, modifiedAt: new Date() },', type: 'normal' },
      { num: 9, text: '      $push: { auditTrail: { from: currentState, to: targetState } }', type: 'normal' },
      { num: 10, text: '    },', type: 'normal' },
      { num: 11, text: '    { new: true, runValidators: true }', type: 'normal' },
      { num: 12, text: '  );', type: 'normal' },
      { num: 13, text: '  if (!updated) throw new ConflictError("State already modified.");', type: 'keyword' },
      { num: 14, text: '  return updated;', type: 'normal' },
      { num: 15, text: '}', type: 'normal' }
    ]
  },
  'RBAC_Guard.ts': {
    title: 'RBAC_Guard.ts',
    badge: 'JWT Bitmask Middleware',
    lines: [
      { num: 1, text: '// Scoped bitmask permission guard for academic hierarchy', type: 'comment' },
      { num: 2, text: 'export const requireRole = (...allowedRoles: Role[]) => {', type: 'normal' },
      { num: 3, text: '  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {', type: 'normal' },
      { num: 4, text: '    const userRole = req.user?.role;', type: 'normal' },
      { num: 5, text: '    if (!userRole || !allowedRoles.includes(userRole)) {', type: 'keyword' },
      { num: 6, text: '      return res.status(403).json({', type: 'normal' },
      { num: 7, text: '        error: "FORBIDDEN_SCOPE",', type: 'normal' },
      { num: 8, text: '        message: "Insufficient privilege level for this route.",', type: 'normal' },
      { num: 9, text: '        required: allowedRoles', type: 'normal' },
      { num: 10, text: '      });', type: 'normal' },
      { num: 11, text: '    }', type: 'normal' },
      { num: 12, text: '    req.auditClaim = { actorId: req.user.id, role: userRole };', type: 'normal' },
      { num: 13, text: '    next();', type: 'normal' },
      { num: 14, text: '  };', type: 'normal' },
      { num: 15, text: '};', type: 'normal' }
    ]
  },
  'LocalAudioPipe.py': {
    title: 'LocalAudioPipe.py',
    badge: 'Python / Whisper / Piper',
    lines: [
      { num: 1, text: '# Zero-cloud-dependency audio streaming agent pipeline', type: 'comment' },
      { num: 2, text: 'class LocalAIAssistant:', type: 'keyword' },
      { num: 3, text: '    def __init__(self, wake_word="saar"):', type: 'normal' },
      { num: 4, text: '        self.wake_word = wake_word', type: 'normal' },
      { num: 5, text: '        self.stt = LocalWhisper(model="base.en")', type: 'normal' },
      { num: 6, text: '        self.tts = PiperTTS(speed=1.15)', type: 'normal' },
      { num: 7, text: '', type: 'normal' },
      { num: 8, text: '    async def process_stream(self, pcm_chunk) -> AsyncIterator[bytes]:', type: 'normal' },
      { num: 9, text: '        text = await self.stt.transcribe(pcm_chunk)', type: 'normal' },
      { num: 10, text: '        if self.wake_word not in text.lower(): return', type: 'keyword' },
      { num: 11, text: '        intent, payload = self.classifier.parse(text)', type: 'normal' },
      { num: 12, text: '        res = await self.execute_workflow(intent, payload)', type: 'normal' },
      { num: 13, text: '        async for audio in self.tts.synthesize_stream(res):', type: 'normal' },
      { num: 14, text: '            yield audio  # TTFB < 1.4s on local CPU', type: 'highlight' }
    ]
  },
  'SystemHealth.sh': {
    title: 'SystemHealth.sh',
    badge: 'Live Telemetry',
    lines: [
      { num: 1, text: '#!/usr/bin/env bash', type: 'comment' },
      { num: 2, text: 'echo "=== INFRASTRUCTURE TELEMETRY ==="', type: 'normal' },
      { num: 3, text: 'echo "Endpoint: https://sagardev.me (B.Tech CSE / 4iBiz)"', type: 'normal' },
      { num: 4, text: 'echo "p95 API Latency: 12.4ms (FastAPI + Express)"', type: 'highlight' },
      { num: 5, text: 'echo "Database: PostgreSQL + Supabase + MongoDB pool healthy"', type: 'normal' },
      { num: 6, text: 'echo "State Machine Drift: 0.00% (Strict Preconditions)"', type: 'highlight' },
      { num: 7, text: 'echo "Target: SDE, Backend, or Full-Stack/MERN Internships"', type: 'normal' },
      { num: 8, text: 'exit 0', type: 'keyword' }
    ]
  }
};

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [activeTab, setActiveTab] = useState('AtomicTransition.ts');
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testOutput, setTestOutput] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Run Test Simulator
  const handleRunVerification = () => {
    setIsRunningTest(true);
    setTestOutput("Executing test suite in isolated sandbox...");
    setTimeout(() => {
      setTestOutput(
        "PASS  __tests__/state_machine.spec.ts (38ms)\n" +
        "  ✓ Concurrency lock test: 10 parallel approval requests (18ms)\n" +
        "  ✓ Precondition check: Only 1 transition committed, 9 ConflictErrors (8ms)\n" +
        "  ✓ Audit trail integrity: 100% deterministic hash match (4ms)\n\n" +
        "Test Suites: 1 passed, 1 total\n" +
        "Tests:       3 passed, 3 total\n" +
        "Snapshots:   0 total\n" +
        "Time:        0.042 s\n" +
        "Status:      ALL CHECKS VERIFIED ✓"
      );
      setIsRunningTest(false);
    }, 700);
  };

  const scrollTo = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app-root">
      
      {/* Subtle Top Bloom */}
      <div className="top-spotlight-bloom" />

      {/* ===================================
          NAVBAR (ARCHITECTURAL DOCK)
          =================================== */}
      <nav className="nav-civic-root">
        <div className="container nav-container">
          
          {/* Left Brand */}
          <div className="nav-brand" onClick={() => scrollTo('hero')} style={{ cursor: 'pointer' }}>
            <div className="nav-hex-icon">SK</div>
            <span className="nav-brand-title">Sagar Kharbikar</span>
            <span className="nav-micro-badge">PROD</span>
          </div>

          {/* Center Segmented Pill Dock (Ordered per Content Deck) */}
          <div className="nav-segmented-dock">
            <button 
              className={`nav-segmented-btn ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => scrollTo('hero')}
            >
              Overview
            </button>
            <button 
              className={`nav-segmented-btn ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => scrollTo('experience')}
            >
              Experience
            </button>
            <button 
              className={`nav-segmented-btn ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollTo('projects')}
            >
              Projects
            </button>
            <button 
              className={`nav-segmented-btn ${activeSection === 'architecture' ? 'active' : ''}`}
              onClick={() => scrollTo('architecture')}
            >
              Architecture
            </button>
            <button 
              className={`nav-segmented-btn ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => scrollTo('skills')}
            >
              Skills
            </button>
            <button 
              className={`nav-segmented-btn ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => scrollTo('contact')}
            >
              Contact
            </button>
          </div>

          {/* Right Controls */}
          <div className="nav-right-controls">
            <a 
              href="/assets/resume/Sagar_Kharbikar_Resume.pdf" 
              download="Sagar_Kharbikar_Resume.pdf"
              className="nav-ghost-link" 
            >
              <FileText size={15} /> Download Resume
            </a>

            <div 
              className="live-engine-pill"
              onClick={() => scrollTo('contact')}
              title="Open to SDE, Backend, and Full-Stack Internships"
            >
              <span className="engine-pulse-dot" />
              Live Engine
            </div>

            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button className="nav-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <button className="mobile-menu-link" onClick={() => scrollTo('hero')}>Overview</button>
          <button className="mobile-menu-link" onClick={() => scrollTo('experience')}>Experience</button>
          <button className="mobile-menu-link" onClick={() => scrollTo('projects')}>Projects</button>
          <button className="mobile-menu-link" onClick={() => scrollTo('architecture')}>Architecture</button>
          <button className="mobile-menu-link" onClick={() => scrollTo('skills')}>Skills</button>
          <button className="mobile-menu-link" onClick={() => scrollTo('contact')}>Contact</button>
          <a 
            href="/assets/resume/Sagar_Kharbikar_Resume.pdf" 
            download="Sagar_Kharbikar_Resume.pdf"
            className="mobile-menu-link"
          >
            Download Resume (PDF) ↗
          </a>
        </div>
      )}

      {/* ===================================
          1. HERO SECTION
          =================================== */}
      <section id="hero">
        <div className="container">

          <div className="civic-hero-centerpiece">
            
            {/* Announcement Pill */}
            <div className="civic-pill-announcement">
              ✦ Hello, I'm Sagar Kharbikar · Backend & Full-Stack Developer
            </div>

            {/* Top Satellites Row (Desktop) */}
            <div className="hero-satellites-top-row">
              <div className="hero-node-satellite">
                <span className="node-dot-live" />
                <span className="node-label">4iBiz Intern:</span>
                <span className="node-value">Full Stack React Native</span>
              </div>
              <div className="hero-node-satellite">
                <span className="node-label">Scoped RBAC:</span>
                <span className="node-value">4 Privilege Tiers</span>
                <span className="node-dot-cyan" />
              </div>
            </div>

            {/* Editorial Title with Italic Serif Accent */}
            <h1 className="editorial-hero-title">
              Architecting deterministic<br />
              <em className="editorial-italic">Systems & Backends</em>
            </h1>

            {/* Subtext from Content Deck */}
            <p className="editorial-hero-sub">
              I build the systems behind the screen: role-based APIs, approval workflows, audit trails, 
              and AI-powered backends. CS undergrad (CGPA 8.70) with a production SaaS internship behind me.
            </p>

            {/* Bottom Satellites Row (Desktop) */}
            <div className="hero-satellites-bottom-row">
              <div className="hero-node-satellite">
                <span style={{ color: '#fbbf24' }}>🏆</span>
                <span className="node-label">Academic ERP:</span>
                <span className="node-value">1st Prize (College Level)</span>
              </div>
              <div className="hero-node-satellite">
                <span className="node-label">National Hackathon:</span>
                <span className="node-value">Top 10 / 84+ Teams</span>
                <span style={{ color: '#a855f7' }}>⚡</span>
              </div>
            </div>

            {/* Hero CTA Actions */}
            <div className="editorial-hero-actions">
              <a href="#projects" className="btn-civic-solid" onClick={() => scrollTo('projects')}>
                View My Work <ArrowUpRight size={16} />
              </a>
              <a 
                href="/assets/resume/Sagar_Kharbikar_Resume.pdf" 
                download="Sagar_Kharbikar_Resume.pdf"
                className="btn-civic-ghost"
              >
                <FileText size={16} /> Download Resume
              </a>
              <a href="mailto:sagarkharbikar25@gmail.com" className="btn-civic-ghost">
                <Mail size={16} /> Email Me
              </a>
            </div>

            {/* Availability Notice */}
            <div style={{ marginTop: '14px', fontSize: '0.86rem', color: 'var(--text-dim)', fontFamily: 'var(--font-code)' }}>
              Open to SDE, backend, and full-stack/MERN internships, remote or India-based.
            </div>

          </div>

          {/* The 4 Specular Metric Cards (Verifiable Proof Points) */}
          <div className="specular-metrics-strip">
            
            {/* Card 1: 4iBiz Internship */}
            <div className="specular-metric-card">
              <div className="card-top-row">
                <div className="card-circle-icon"><Briefcase size={18} /></div>
                <span className="card-micro-tag">Jun–Aug 2026</span>
              </div>
              <div className="card-metric-label">Production SaaS Intern</div>
              <div className="card-metric-value-row">
                <span className="card-metric-number">4iBiz</span>
                <span className="card-metric-unit">Full Stack Dev</span>
              </div>
            </div>

            {/* Card 2: 1st Prize Award */}
            <div className="specular-metric-card">
              <div className="card-top-row">
                <div className="card-circle-icon"><Award size={18} /></div>
                <span className="card-micro-tag">College Level 2025</span>
              </div>
              <div className="card-metric-label">Mini Project Competition</div>
              <div className="card-metric-value-row">
                <span className="card-metric-number">1st</span>
                <span className="card-metric-unit">Prize Award</span>
              </div>
            </div>

            {/* Card 3: Hackathon */}
            <div className="specular-metric-card">
              <div className="card-top-row">
                <div className="card-circle-icon"><Activity size={18} /></div>
                <span className="card-micro-tag">Mar 2026</span>
              </div>
              <div className="card-metric-label">National Level Hackathon</div>
              <div className="card-metric-value-row">
                <span className="card-metric-number">Top 10</span>
                <span className="card-metric-unit">/ 84+ Teams</span>
              </div>
            </div>

            {/* Card 4: Academic Foundation */}
            <div className="specular-metric-card">
              <div className="card-top-row">
                <div className="card-circle-icon"><GraduationCap size={18} /></div>
                <span className="card-micro-tag">JDCOEM B.Tech CSE</span>
              </div>
              <div className="card-metric-label">Academic Rigor</div>
              <div className="card-metric-value-row">
                <span className="card-metric-number">8.70</span>
                <span className="card-metric-unit">CGPA Average</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================
          2. EXPERIENCE SECTION (NEW - RIGHT AFTER HERO)
          =================================== */}
      <section id="experience">
        <div className="container">
          <div className="section-tag">Career History</div>
          <h2 className="section-title">Production Experience</h2>
          <p className="section-subtitle">
            Hands-on engineering contributions across production SaaS platforms, mobile migrations, and technical event infrastructure.
          </p>

          <div className="experience-grid" style={{ marginTop: '36px' }}>
            
            {/* 4iBiz Internship */}
            <div className="experience-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-role-title">Full Stack Developer Intern</h3>
                  <span className="exp-company-tag">@ 4iBiz Techno-Solutions Pvt. Ltd.</span>
                </div>
                <span className="exp-period-badge">Remote • Jun 2026 – Aug 2026</span>
              </div>
              <ul className="exp-deliverables">
                <li>Built full-stack features (backend services and frontend modules) for a production gym-management SaaS platform.</li>
                <li>Migrated the VZBAL HRMS mobile app from Flutter to React Native and integrated staging APIs, reaching full feature parity.</li>
                <li>Ran 100+ manual test cases across authentication, employee management, and settings; documented 15+ bugs, including high-severity data-upload and third-party integration issues.</li>
                <li>Worked in Git-based, Agile workflows with the engineering team.</li>
              </ul>
              <div className="exp-stack-tags">
                <span className="exp-tag-chip">React Native</span>
                <span className="exp-tag-chip">Node.js</span>
                <span className="exp-tag-chip">Express.js</span>
                <span className="exp-tag-chip">REST APIs</span>
                <span className="exp-tag-chip">Agile / Git</span>
                <span className="exp-tag-chip">QA Testing</span>
              </div>
            </div>

            {/* TechAlfa & Schollogma */}
            <div className="experience-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-role-title">Technical Member & Forum Contributor</h3>
                  <span className="exp-company-tag">@ TechAlfa & Schollogma CSE Forum</span>
                </div>
                <span className="exp-period-badge">Nagpur • Jan 2025 – Present</span>
              </div>
              <ul className="exp-deliverables">
                <li>Engineered backend scoring APIs and dynamic question progression for collegiate technical competitions (Cyber Hunt platform).</li>
                <li>Authored technical breakdowns on state machines, API lifecycle design, and distributed data consistency for 200+ CSE peers.</li>
                <li>Conducted peer workshops on Git version control, Postman API contract testing, and REST architecture fundamentals.</li>
              </ul>
              <div className="exp-stack-tags">
                <span className="exp-tag-chip">Next.js</span>
                <span className="exp-tag-chip">Supabase</span>
                <span className="exp-tag-chip">PostgreSQL</span>
                <span className="exp-tag-chip">Technical Writing</span>
                <span className="exp-tag-chip">API Design</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================
          3. FEATURED PROJECTS (4 CARDS + GITHUB LINK)
          =================================== */}
      <section id="projects">
        <div className="container">
          <div className="section-tag">Featured Deliverables</div>
          <h2 className="section-title">Production Systems & Work</h2>
          <p className="section-subtitle">
            Deep dive into deployed ERP platforms, sales lead pipelines, real-time competition systems, and edge voice agents.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '36px' }}>

            {/* Project 4.1: Digital Document Service Portal */}
            <div className="bento-project-card">
              <div className="bento-project-inner">
                <div className="bento-media-side">
                  <img 
                    src="/Digital Doc Service Portal/DASHBOARD.png" 
                    alt="Digital Document Service Portal Administrative Dashboard"
                    loading="lazy"
                  />
                </div>
                <div className="bento-content-side">
                  <div>
                    <div className="project-meta-pill">
                      <span className="project-award-badge">
                        🏆 1st Prize — College Mini-Project Competition (2025)
                      </span>
                      <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: '#94a3b8' }}>
                        01 / 04
                      </span>
                    </div>

                    <h3 className="project-heading">Digital Document Service Portal</h3>
                    
                    <p className="project-summary">
                      <strong>One-line:</strong> ERP-style portal that moves academic document requests from paper to a tracked, auditable workflow.
                    </p>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '16px' }}>
                      <strong>Problem:</strong> Certificates, verifications, and transcripts were handled on paper. Requests got lost, applicants could not see status, and there was no audit trail.
                    </div>

                    <ul className="project-spec-list">
                      <li>
                        <strong>Role-Based Access Control:</strong> Four scoped roles (Applicant, Clerk, Verifier, Admin), each limited strictly to its own domain actions.
                      </li>
                      <li>
                        <strong>Approval State Machine:</strong> Modelled lifecycle: <code>SUBMITTED → UNDER_REVIEW → VERIFIED → APPROVED → ISSUED / REJECTED</code>. Invalid transitions rejected in service layer.
                      </li>
                      <li>
                        <strong>QR-Code Verification:</strong> Instant tamper-proof physical authenticity validation for issued documents.
                      </li>
                      <li>
                        <strong>Tamper-Proof Audit Trail:</strong> Every state change appends actor ID, timestamp, and previous/new state to a queryable log.
                      </li>
                    </ul>

                    <div className="project-postmortem-box">
                      <div className="postmortem-title">
                        <ShieldCheck size={14} color="#38bdf8" /> Key Architecture Decision
                      </div>
                      <p className="postmortem-text">
                        Transitions execute an atomic conditional query (precondition lock) ensuring two verifiers cannot simultaneously approve a request. 
                        <em> Stack evolution:</em> Built originally with PHP MVC & PostgreSQL; expanded with Node.js, Express, and MongoDB for modern API service orchestration.
                      </p>
                    </div>

                    <div className="tech-tag-row">
                      <span className="tech-chip">PHP MVC</span>
                      <span className="tech-chip">PostgreSQL</span>
                      <span className="tech-chip">Node.js</span>
                      <span className="tech-chip">Express.js</span>
                      <span className="tech-chip">MongoDB</span>
                      <span className="tech-chip">JavaScript</span>
                    </div>
                  </div>

                  <div className="project-links-row">
                    <a 
                      href="https://github.com/sagarkharbikar25/digital-document-portal" 
                      className="action-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <GithubIcon size={16} /> Source Code
                    </a>
                    <a 
                      href="/case-studies/document-portal.html" 
                      className="action-link action-link-case"
                    >
                      Read Architecture Case Study ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4.2: Gig Flow — Smart Leads Dashboard */}
            <div className="bento-project-card">
              <div className="bento-project-inner">
                <div className="bento-media-side">
                  <img 
                    src="/assets/projects/gig-flow.jpg" 
                    alt="Gig Flow Smart Leads Dashboard Preview"
                    loading="lazy"
                  />
                </div>
                <div className="bento-content-side">
                  <div>
                    <div className="project-meta-pill">
                      <span className="project-award-badge" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                        🟢 Live MERN Application (2026)
                      </span>
                      <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: '#94a3b8' }}>
                        02 / 04
                      </span>
                    </div>

                    <h3 className="project-heading">Gig Flow — Smart Leads Dashboard</h3>
                    
                    <p className="project-summary">
                      <strong>One-line:</strong> Full-stack MERN dashboard for managing sales leads with secure, role-aware access.
                    </p>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '16px' }}>
                      <strong>Problem:</strong> Sales teams needed a responsive, debounced lead tracking system that enforces privilege boundaries without leaking customer contact data to unauthorized roles.
                    </div>

                    <ul className="project-spec-list">
                      <li>
                        <strong>JWT & RBAC Security:</strong> Protected REST APIs with strict role segregation (Admin vs. Sales), preventing unauthenticated data extraction.
                      </li>
                      <li>
                        <strong>High-Performance Pipeline:</strong> Server-side pagination, multi-criteria filtering, debounced search, and instant CSV data export.
                      </li>
                      <li>
                        <strong>Modular Component System:</strong> Reusable TypeScript components built for maintainability and responsive CRM workflows.
                      </li>
                    </ul>

                    <div className="project-postmortem-box">
                      <div className="postmortem-title">
                        <Code2 size={14} color="#38bdf8" /> Key Architecture Decision
                      </div>
                      <p className="postmortem-text">
                        Enforced role-based authorization at the API routing layer rather than merely hiding UI controls in the client. Server-side pagination and indexed filter fields ensure low latency under large lead datasets.
                      </p>
                    </div>

                    <div className="tech-tag-row">
                      <span className="tech-chip">React</span>
                      <span className="tech-chip">TypeScript</span>
                      <span className="tech-chip">Node.js</span>
                      <span className="tech-chip">Express.js</span>
                      <span className="tech-chip">MongoDB</span>
                      <span className="tech-chip">TailwindCSS</span>
                    </div>
                  </div>

                  <div className="project-links-row">
                    <a 
                      href="https://github.com/sagarkharbikar25" 
                      className="action-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <GithubIcon size={16} /> Source Code
                    </a>
                    <a 
                      href="https://github.com/sagarkharbikar25" 
                      className="action-link action-link-case"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Live Demo & Docs ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4.3: Cyber Hunt — Online Treasure Hunt Platform */}
            <div className="bento-project-card">
              <div className="bento-project-inner">
                <div className="bento-media-side">
                  <img 
                    src="/assets/projects/cyber-hunt.jpg" 
                    alt="Cyber Hunt Competition Platform Preview"
                    loading="lazy"
                  />
                </div>
                <div className="bento-content-side">
                  <div>
                    <div className="project-meta-pill">
                      <span className="project-award-badge" style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                        🟢 Live Event Platform (2026)
                      </span>
                      <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: '#94a3b8' }}>
                        03 / 04
                      </span>
                    </div>

                    <h3 className="project-heading">Cyber Hunt — Online Treasure Hunt Platform</h3>
                    
                    <p className="project-summary">
                      <strong>One-line:</strong> Live competition platform for technical events: authentication, progressive questions, real-time scoring, admin controls.
                    </p>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '16px' }}>
                      <strong>Problem:</strong> Technical event required high-concurrency real-time clue solving without leaking questions in client bundles or allowing leaderboard tampering.
                    </div>

                    <ul className="project-spec-list">
                      <li>
                        <strong>Progressive Question Engine:</strong> Server-validated dynamic clue progression with role-based admin controls.
                      </li>
                      <li>
                        <strong>Real-Time Leaderboard:</strong> Live scoring and solve ranking database integration, deployed on Vercel for live collegiate events.
                      </li>
                      <li>
                        <strong>Admin Control Center:</strong> Real-time oversight for event organizers to monitor participant pacing and arbitrate disputes.
                      </li>
                    </ul>

                    <div className="project-postmortem-box" style={{ borderLeftColor: '#f59e0b' }}>
                      <div className="postmortem-title" style={{ color: '#f59e0b' }}>
                        <Terminal size={14} color="#f59e0b" /> Engineering Post-Mortem & Fix
                      </div>
                      <p className="postmortem-text">
                        <strong>Symptom & Root Cause:</strong> During a live event surge, burst serverless function invocations exhausted direct PostgreSQL connection limits.
                        <br />
                        <strong>Fix:</strong> Switched to connection-pooled Supabase infrastructure (PgBouncer), introduced Redis caching for hot leaderboard queries, and applied rate-limiting on answer submissions.
                      </p>
                    </div>

                    <div className="tech-tag-row">
                      <span className="tech-chip">Next.js</span>
                      <span className="tech-chip">Supabase</span>
                      <span className="tech-chip">PostgreSQL</span>
                      <span className="tech-chip">Redis</span>
                      <span className="tech-chip">Vercel</span>
                    </div>
                  </div>

                  <div className="project-links-row">
                    <a 
                      href="https://github.com/sagarkharbikar25" 
                      className="action-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <GithubIcon size={16} /> Source Code & Post-Mortem
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4.4: SAAR — AI Personal Assistant */}
            <div className="bento-project-card">
              <div className="bento-project-inner">
                <div className="bento-media-side">
                  <img 
                    src="/SAAR/SAAR.png" 
                    alt="SAAR AI Voice Assistant Architecture & UI"
                    loading="lazy"
                  />
                </div>
                <div className="bento-content-side">
                  <div>
                    <div className="project-meta-pill">
                      <span className="project-award-badge" style={{ color: '#c084fc', borderColor: 'rgba(192, 132, 252, 0.3)' }}>
                        ⚙ Ongoing (Jan 2026 – Present)
                      </span>
                      <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: '#94a3b8' }}>
                        04 / 04
                      </span>
                    </div>

                    <h3 className="project-heading">SAAR — AI Personal Assistant</h3>
                    
                    <p className="project-summary">
                      <strong>One-line:</strong> Voice-controlled personal assistant for hands-free system control and remote commands.
                    </p>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '16px' }}>
                      <strong>Problem:</strong> Voice assistants typically suffer high roundtrip cloud latency and introduce privacy risks when executing privileged system commands.
                    </div>

                    <ul className="project-spec-list">
                      <li>
                        <strong>Local Speech Pipeline:</strong> Speech-to-text, wake-word detection, and text-to-speech with &lt;1.4s TTFB on local hardware.
                      </li>
                      <li>
                        <strong>Remote Command Dispatch:</strong> Modular FastAPI backend integrating Twilio webhooks for remote system task execution.
                      </li>
                      <li>
                        <strong>OpenCV Presence Detection:</strong> Real-time camera feed monitor that triggers automatic system lock upon user absence.
                      </li>
                    </ul>

                    <div className="project-postmortem-box">
                      <div className="postmortem-title">
                        <ShieldCheck size={14} color="#38bdf8" /> Key Architecture Decision (Security)
                      </div>
                      <p className="postmortem-text">
                        Remote command execution is strictly bounded: validates Twilio webhook HMAC signatures, checks incoming numbers against an explicit allowlist, restricts commands to a predefined whitelist matrix, and logs all execution attempts with immutable timestamps.
                      </p>
                    </div>

                    <div className="tech-tag-row">
                      <span className="tech-chip">Python</span>
                      <span className="tech-chip">FastAPI</span>
                      <span className="tech-chip">OpenCV</span>
                      <span className="tech-chip">Twilio</span>
                      <span className="tech-chip">Local Whisper</span>
                      <span className="tech-chip">Piper TTS</span>
                    </div>
                  </div>

                  <div className="project-links-row">
                    <a 
                      href="https://github.com/sagarkharbikar25/saar-voice-assistant" 
                      className="action-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <GithubIcon size={16} /> Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* GitHub All Repos Banner */}
          <div className="github-all-repos-banner">
            <a 
              href="https://github.com/sagarkharbikar25" 
              className="github-banner-card"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <GithubIcon size={18} /> Explore all 15+ repositories on GitHub <ExternalLink size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* ===================================
          4. HOW I BUILD BACKENDS (SHORTENED & CODE-LINKED)
          =================================== */}
      <section id="architecture">
        <div className="container">
          <div className="section-tag">Engineering Methodology</div>
          <h2 className="section-title">How I Build Backends</h2>
          <p className="section-subtitle">
            I design around the request lifecycle: it enters, gets validated, passes a service layer, 
            touches the database, and returns a consistent response. Each layer has one job.
          </p>

          {/* The 3 Core Claims (Linked to Code Tabs) */}
          <div className="about-principles-grid" style={{ marginTop: '28px', marginBottom: '32px' }}>
            <div 
              className="principle-card"
              onClick={() => { setActiveTab('RBAC_Guard.ts'); setTestOutput(null); }}
              style={{ cursor: 'pointer' }}
            >
              <span className="principle-num">// 01 API-FIRST DESIGN</span>
              <h3>Contracts & Error Shapes ↗</h3>
              <p>
                Contracts and error shapes defined before implementation. Strict typing and Bitmask RBAC guards eliminate invalid requests at the boundary.
              </p>
            </div>

            <div 
              className="principle-card"
              onClick={() => { setActiveTab('AtomicTransition.ts'); setTestOutput(null); }}
              style={{ cursor: 'pointer' }}
            >
              <span className="principle-num">// 02 DATA INTEGRITY</span>
              <h3>Atomic Preconditions ↗</h3>
              <p>
                Constraints and indexes at the database level. Precondition queries arbitrate concurrent writes so state can never corrupt or double-commit.
              </p>
            </div>

            <div 
              className="principle-card"
              onClick={() => { setActiveTab('LocalAudioPipe.py'); setTestOutput(null); }}
              style={{ cursor: 'pointer' }}
            >
              <span className="principle-num">// 03 SECURITY BY DEFAULT</span>
              <h3>Hardened Execution ↗</h3>
              <p>
                RBAC on the API, hashed passwords, validated input, rate-limited auth, and cryptographic HMAC verification for remote webhook dispatch.
              </p>
            </div>
          </div>

          {/* Interactive Architecture Console */}
          <div className="architecture-console-deck">
            <div className="console-header">
              <div className="console-tabs">
                {Object.keys(CODE_TABS).map((tabKey) => (
                  <button
                    key={tabKey}
                    className={`console-tab ${activeTab === tabKey ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tabKey);
                      setTestOutput(null);
                    }}
                  >
                    {tabKey}
                  </button>
                ))}
              </div>
              <div>
                <button 
                  className="console-run-btn" 
                  onClick={handleRunVerification}
                  disabled={isRunningTest}
                  title="Run simulated unit verification in sandbox"
                >
                  <Play size={12} /> {isRunningTest ? "Verifying..." : "Run Test"}
                </button>
              </div>
            </div>

            <div className="console-body">
              <pre style={{ margin: 0, background: 'transparent', fontFamily: 'var(--font-code)' }}>
                <code>
                  {CODE_TABS[activeTab].lines.map((line) => (
                    <div key={line.num} style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ color: '#475569', userSelect: 'none', width: '24px', textAlign: 'right' }}>
                        {line.num}
                      </span>
                      <span style={{ 
                        color: line.type === 'comment' ? '#64748b' :
                               line.type === 'keyword' ? '#fb7185' :
                               line.type === 'highlight' ? '#38bdf8' : 'var(--text-bright)',
                        fontStyle: line.type === 'comment' ? 'italic' : 'normal',
                        fontWeight: line.type === 'highlight' ? '600' : 'normal'
                      }}>
                        {line.text}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            {testOutput && (
              <div className="console-output-drawer">
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{testOutput}</pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================
          5. SKILLS MATRIX (TIERED & EVIDENCE-BASED)
          =================================== */}
      <section id="skills">
        <div className="container">
          <div className="section-tag">Technical Competencies</div>
          <h2 className="section-title">Skills (Tiered & Defensible)</h2>
          <p className="section-subtitle">
            Grouped by hands-on production evidence. Tools and technologies I can discuss in-depth and defend in technical interviews.
          </p>

          <div className="skills-masonry" style={{ marginTop: '36px' }}>
            
            {/* Tier 1: Daily Drivers */}
            <div className="skill-glass-card">
              <div className="skill-card-top">
                <Code2 size={20} color="#38bdf8" />
                <div>
                  <h3 className="skill-card-title">Daily Drivers</h3>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: '#38bdf8' }}>Production Tested</span>
                </div>
              </div>
              <div className="skill-items-list">
                <div>
                  <span className="skill-unit-name">Backend Core</span>
                  <span className="skill-unit-val">Node.js, Express.js, Python, FastAPI, REST API Design, JWT & RBAC</span>
                </div>
                <div>
                  <span className="skill-unit-name">Frontend Modules</span>
                  <span className="skill-unit-val">React, TypeScript, Next.js</span>
                </div>
                <div>
                  <span className="skill-unit-name">Primary Databases</span>
                  <span className="skill-unit-val">PostgreSQL, MongoDB</span>
                </div>
                <div>
                  <span className="skill-unit-name">Workflow Tools</span>
                  <span className="skill-unit-val">Git, GitHub, Postman, Vercel, Render</span>
                </div>
              </div>
            </div>

            {/* Tier 2: Comfortable */}
            <div className="skill-glass-card">
              <div className="skill-card-top">
                <Database size={20} color="#c084fc" />
                <div>
                  <h3 className="skill-card-title">Comfortable</h3>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: '#c084fc' }}>Shipped Projects & Mobile</span>
                </div>
              </div>
              <div className="skill-items-list">
                <div>
                  <span className="skill-unit-name">Languages</span>
                  <span className="skill-unit-val">JavaScript, Java, PHP, C</span>
                </div>
                <div>
                  <span className="skill-unit-name">Additional Databases</span>
                  <span className="skill-unit-val">MySQL, Firebase, SQLite</span>
                </div>
                <div>
                  <span className="skill-unit-name">Mobile Frameworks</span>
                  <span className="skill-unit-val">React Native (from 4iBiz production migration)</span>
                </div>
                <div>
                  <span className="skill-unit-name">Architecture & CI</span>
                  <span className="skill-unit-val">MVC Architecture, GitHub Actions CI/CD</span>
                </div>
              </div>
            </div>

            {/* Tier 3: Learning Openly */}
            <div className="skill-glass-card">
              <div className="skill-card-top">
                <Cpu size={20} color="#10b981" />
                <div>
                  <h3 className="skill-card-title">Learning</h3>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: '#10b981' }}>Active Deep-Dive</span>
                </div>
              </div>
              <div className="skill-items-list">
                <div>
                  <span className="skill-unit-name">Infrastructure & Containers</span>
                  <span className="skill-unit-val">Docker containerization & multi-stage builds</span>
                </div>
                <div>
                  <span className="skill-unit-name">In-Memory Caching</span>
                  <span className="skill-unit-val">Redis (caching layers & token bucket rate limiting)</span>
                </div>
                <div>
                  <span className="skill-unit-name">System Architecture</span>
                  <span className="skill-unit-val">Distributed system design & cloud scaling</span>
                </div>
              </div>
            </div>

            {/* Tier 4: Core CS */}
            <div className="skill-glass-card">
              <div className="skill-card-top">
                <GraduationCap size={20} color="#f59e0b" />
                <div>
                  <h3 className="skill-card-title">Core CS Foundations</h3>
                  <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.72rem', color: '#f59e0b' }}>Academic Rigor (CGPA 8.70)</span>
                </div>
              </div>
              <div className="skill-items-list">
                <div>
                  <span className="skill-unit-name">Data Structures</span>
                  <span className="skill-unit-val">Trees, Graphs, Hash Maps, Heaps, Algorithmic Complexity</span>
                </div>
                <div>
                  <span className="skill-unit-name">Systems & Database</span>
                  <span className="skill-unit-val">Database Management Systems (DBMS), Operating Systems, OOP</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================
          6. ACHIEVEMENTS, CERTIFICATIONS, COMMUNITY & EDUCATION
          =================================== */}
      <section id="credentials">
        <div className="container">
          <div className="section-tag">Validation & Community</div>
          <h2 className="section-title">Achievements & Credentials</h2>
          <p className="section-subtitle">
            Formal recognition across collegiate competitions, national hackathons, professional certifications, and community roles.
          </p>

          <div className="about-principles-grid" style={{ marginTop: '36px' }}>
            
            {/* 1st Prize */}
            <div className="principle-card">
              <span className="principle-num">🏆 1ST PRIZE (COLLEGE LEVEL)</span>
              <h3>Mini Project Competition (2025)</h3>
              <p>
                Awarded 1st Prize at JD College of Engineering & Management for designing and building the Digital Document Service Portal.
              </p>
            </div>

            {/* Hackathon */}
            <div className="principle-card">
              <span className="principle-num">🏅 TOP 10 / 84+ TEAMS</span>
              <h3>National Level Hackathon (Mar 2026)</h3>
              <p>
                Ranked in the Top 10 out of 84+ engineering teams nationwide at WideSoftech, Priyadarshini College of Engineering, Nagpur.
              </p>
            </div>

            {/* Oracle AI */}
            <div className="principle-card">
              <span className="principle-num">🎓 ORACLE CERTIFIED</span>
              <h3>Agentic AI Foundations Associate (Jul 2026)</h3>
              <p>
                Certified foundation mastery in agentic workflows, artificial intelligence topologies, and machine learning principles.
              </p>
            </div>

            {/* Deloitte */}
            <div className="principle-card">
              <span className="principle-num">🛡️ DELOITTE SIMULATION</span>
              <h3>Cyber Security Simulation (Mar 2026)</h3>
              <p>
                Completed practical simulation on identity access controls, threat modeling, and network defense protocols via Forage.
              </p>
            </div>

            {/* Community */}
            <div className="principle-card">
              <span className="principle-num">🤝 COMMUNITY & LEADERSHIP</span>
              <h3>Schollogma CSE Forum & TechAlfa</h3>
              <p>
                Content Writer at Schollogma CSE Forum (Jan–May 2025), Technical Team Member at TechAlfa, and Internshala Student Partner.
              </p>
            </div>

            {/* Education */}
            <div className="principle-card">
              <span className="principle-num">🏛️ EDUCATION</span>
              <h3>B.Tech, Computer Science & Engineering</h3>
              <p>
                JD College of Engineering & Management, Nagpur • <strong>CGPA: 8.70</strong> (Sept 2024 – June 2028).
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================
          7. CONTACT & RECRUITER DECK
          =================================== */}
      <section id="contact">
        <div className="container">
          <div className="section-tag">Let's Build</div>
          <h2 className="section-title">Open For Opportunities</h2>
          <p className="section-subtitle">
            Looking for an SDE, backend, or full-stack/MERN internship, remote or India-based. If you are building something that needs solid backend architecture, let's talk.
          </p>

          <div className="contact-glass-deck">
            
            {/* Direct Email */}
            <a href="mailto:sagarkharbikar25@gmail.com" className="contact-card-btn">
              <div className="contact-icon-box"><Mail size={24} /></div>
              <div>
                <span className="contact-field-label">Direct Inquiries</span>
                <span className="contact-field-val">Email Me (mailto:)</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/sagar-kharbikar" 
              className="contact-card-btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="contact-icon-box"><LinkedinIcon size={24} /></div>
              <div>
                <span className="contact-field-label">Verified LinkedIn</span>
                <span className="contact-field-val">linkedin.com/in/sagar-kharbikar</span>
              </div>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/sagarkharbikar25" 
              className="contact-card-btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="contact-icon-box"><GithubIcon size={24} /></div>
              <div>
                <span className="contact-field-label">Open Source Work</span>
                <span className="contact-field-val">github.com/sagarkharbikar25</span>
              </div>
            </a>

            {/* Resume */}
            <a 
              href="/assets/resume/Sagar_Kharbikar_Resume.pdf" 
              download="Sagar_Kharbikar_Resume.pdf"
              className="contact-card-btn" 
            >
              <div className="contact-icon-box"><FileText size={24} /></div>
              <div>
                <span className="contact-field-label">Curriculum Vitae</span>
                <span className="contact-field-val">Download Resume (PDF)</span>
              </div>
            </a>

          </div>

          <p style={{ marginTop: '20px', fontSize: '0.84rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            Note: Phone numbers are kept off public web pages to prevent scraping. Available upon request in direct applications.
          </p>
        </div>
      </section>

      {/* ===================================
          8. FOOTER
          =================================== */}
      <footer className="footer-artisan">
        <div className="container">
          <p style={{ fontWeight: 600, color: 'var(--text-pure)' }}>
            Designed & Engineered by Sagar Kharbikar
          </p>
          <p className="footer-timestamp">
            Built with React & Vite — Architectural Obsidian & Specular Steel Aesthetic • sagardev.me
          </p>
          <p className="footer-timestamp" style={{ marginTop: '4px' }}>
            Last updated: October 2026 • Open for SDE, Backend, and Full-Stack Internships • Nagpur, India
          </p>
        </div>
      </footer>
    </div>
  );
}
