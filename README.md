# sagardev.me — Engineering Portfolio

[![Deploy to GitHub Pages](https://github.com/sagarkharbikar25/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/sagarkharbikar25/portfolio/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Live Site](https://img.shields.io/badge/Live-sagardev.me-0ea5e9?style=flat&logo=googlechrome&logoColor=white)](https://sagardev.me)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Live Website:** [https://sagardev.me](https://sagardev.me)  
> The personal portfolio and systems engineering showcase of **Sagar Kharbikar**, a Computer Science undergrad (CGPA 8.70) and production SaaS developer specializing in role-based APIs, approval workflows, audit trails, and AI-powered backends.

---

## ⚡ Highlights

- **Architectural Obsidian & Specular Steel Design**: Custom design system built with CSS tokens, fluid glassmorphism, and hardware-accelerated animations.
- **Dual Dynamic Theming**: Full-spectrum dark mode and high-contrast editorial light mode with seamless toggle.
- **Mobile-First Responsive Engine**: Zero-layout-shift UI engineered for fast mobile scanning by technical recruiters and engineering leads.
- **Interactive System Blueprints**: Visual workflow models showcasing state machines, multi-role access control, and transaction integrity.
- **Automated CI/CD Pipeline**: GitHub Actions workflow that builds, verifies, and deploys the production bundle directly to GitHub Pages on every push to `main`.
- **Integrated Resume Pipeline**: One-click download configuration delivering PDF resume directly to recruiters.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) |
| **Styling & Aesthetics** | Pure Vanilla CSS (Design Tokens, Glassmorphism, CSS Grid & Flexbox) |
| **Icons & Micro-animations** | [Lucide React](https://lucide.dev/) |
| **Core Competencies** | Node.js, Express.js, PostgreSQL, MongoDB, RESTful APIs, JWT Auth, MVC |
| **Deployment & CI/CD** | GitHub Actions, GitHub Pages, Custom DNS (`sagardev.me`) |

---

## 📂 Featured Engineering Projects

### 1. Academic ERP System
> **Awarded 1st Prize — Mini Project Competition (College Level)**
- **Problem**: Inefficient paper-based leave applications and fragmented student record tracking.
- **Solution**: Role-based institutional portal with hierarchical approval workflows (Student → Mentor → HOD).
- **Architecture**: Strict multi-role authorization, transaction-safe database writes, and immutable audit logs.

### 2. AI Voice Assistant Pipeline
> **Top 10 Finalist / 84+ Teams — National Hackathon**
- **Problem**: High latency and rigid query handling in traditional desktop voice interfaces.
- **Solution**: Modular speech-to-text and text-to-speech assistant with local wake-word trigger and system task automation.
- **Architecture**: Asynchronous audio streaming, context-aware command parser, and fallback handling.

### 3. GigFlow — Freelance Marketplace
- **Problem**: Unreliable communication and dispute risks during freelance milestones.
- **Solution**: Milestone-driven platform with role-based client-freelancer contracts and status tracking.
- **Architecture**: Event-driven notifications, state-guarded milestone transitions, and secured API endpoints.

### 4. CyberHunt — Gamified Security Platform
- **Problem**: Monotonous, unengaging cybersecurity awareness and training programs.
- **Solution**: Interactive jeopardy-style capture-the-flag (CTF) challenges with real-time scoring and leaderboards.
- **Architecture**: Isolated flag verification endpoints, rate-limited submissions, and dynamic scoreboard sync.

---

## 📁 Repository Structure

```tree
portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Pages build & deployment automation
│       └── checks.yml          # Pull request verification workflow
├── public/
│   ├── assets/
│   │   ├── projects/           # High-resolution project screenshots
│   │   └── resume/             # Downloadable resume PDF
│   ├── avatar/                 # Profile avatars and media assets
│   ├── case-studies/           # Deep-dive interactive case studies
│   ├── CNAME                   # Custom domain configuration (sagardev.me)
│   └── favicon.svg             # Custom vector brand icon
├── src/
│   ├── App.jsx                 # Core application component & navigation layout
│   ├── index.css               # Architectural Obsidian design tokens & styles
│   └── main.jsx                # React root mount and entry point
├── index.html                  # HTML5 entry with meta SEO & Google Fonts
├── package.json                # Project dependencies and script scripts
└── vite.config.js              # Vite configuration & build tuning
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sagarkharbikar25/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled, minified bundle will be generated in `./dist`.

---

## 📬 Contact & Connect

- **Portfolio**: [sagardev.me](https://sagardev.me)
- **LinkedIn**: [linkedin.com/in/sagar-kharbikar](https://linkedin.com/in/sagar-kharbikar)
- **GitHub**: [github.com/sagarkharbikar25](https://github.com/sagarkharbikar25)
- **Email**: [sagarkharbikar25@gmail.com](mailto:sagarkharbikar25@gmail.com)
- **Location**: Nagpur, Maharashtra, India

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).