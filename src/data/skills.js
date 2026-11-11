export const SKILL_TIERS = [
  {
    id: 'daily-drivers',
    title: 'Daily Drivers',
    badge: 'Production Tested',
    badgeTone: 'gold',
    rows: [
      {
        label: 'Backend Core',
        items: 'Node.js, Express.js, Python, FastAPI, REST API Design, JWT & RBAC',
      },
      {
        label: 'Frontend Modules',
        items: 'React, TypeScript, Next.js',
      },
      {
        label: 'Primary Databases',
        items: 'PostgreSQL, MongoDB',
      },
      {
        label: 'Workflow Tools',
        items: 'Git, GitHub, Postman, Vercel, Render',
      },
    ],
  },
  {
    id: 'comfortable',
    title: 'Comfortable',
    badge: 'Shipped Projects & Mobile',
    badgeTone: 'cyan',
    rows: [
      {
        label: 'Languages',
        items: 'JavaScript, Java, PHP, C',
      },
      {
        label: 'Additional Databases',
        items: 'MySQL, Firebase, SQLite',
      },
      {
        label: 'Mobile Frameworks',
        items: 'React Native (from 4iBiz production migration)',
      },
      {
        label: 'Architecture & CI',
        items: 'MVC Architecture, GitHub Actions CI/CD',
      },
    ],
  },
  {
    id: 'learning',
    title: 'Learning',
    badge: 'Active Deep-Dive',
    badgeTone: 'muted',
    rows: [
      {
        label: 'Infrastructure & Containers',
        items: 'Docker containerization & multi-stage builds',
      },
      {
        label: 'In-Memory Caching',
        items: 'Redis (caching layers & token bucket rate limiting)',
      },
      {
        label: 'System Architecture',
        items: 'Distributed system design & cloud scaling',
      },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core CS Foundations',
    badge: 'Academic Rigor (CGPA 8.70)',
    badgeTone: 'amber',
    rows: [
      {
        label: 'Data Structures',
        items: 'Trees, Graphs, Hash Maps, Heaps, Algorithmic Complexity',
      },
      {
        label: 'Systems & Database',
        items: 'Database Management Systems (DBMS), Operating Systems, OOP',
      },
    ],
  },
];
