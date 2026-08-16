/**
 * Resume content, built for ATS parsing first and a human skim second.
 *
 * Rules this file follows:
 *  - Single column, standard section names (Technical Skills, Work Experience,
 *    Projects, Education, Certifications). Creative headings confuse parsers.
 *  - Every bullet opens with an action verb and, wherever a real number exists,
 *    states the outcome rather than the activity.
 *  - Technology names are spelled the way postings spell them (TypeScript, not
 *    TS; PostgreSQL, not Postgres) so keyword matching actually hits.
 *  - One A4 page. Nothing goes in without something coming out.
 */

export const resumeContact = {
  phone: "+1 437-260-2183",
  website: "muhammedcengiz.vercel.app",
  location: "Oakville, ON",
  linkedin: "linkedin.com/in/muhammed-cengiz",
  github: "github.com/Cengizbey-m",
};

export const resumeSummary =
  "Full-stack developer who ships production software end to end. Built and deployed a live booking and payments platform solo for a client with a 1.2M-follower audience, now processing real customer transactions. Strong in TypeScript, React, Next.js, and PostgreSQL, with a network engineering and application security foundation. Comfortable owning a feature from database schema to production deployment.";

export type ResumeLink = { label: string; href: string };

export type ResumeRole = {
  title: string;
  org: string;
  /** Technology line, shown under the heading. */
  tech?: string;
  location?: string;
  period: string;
  links?: ResumeLink[];
  bullets: string[];
};

export const skills: { label: string; items: string }[] = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript, Python, C#, Java, SQL, Swift, HTML/CSS",
  },
  {
    label: "Frameworks & Libraries",
    items: "React, Next.js, Node.js, Express.js, FastAPI, .NET, Spring Boot, Tailwind CSS",
  },
  {
    label: "Databases & Cloud",
    items: "PostgreSQL, Supabase, Prisma, MongoDB, Oracle, SQL Server, Vercel, Google Cloud Run, Docker",
  },
  {
    label: "Practices & Tools",
    items: "REST API design, CI/CD, GitHub Actions, Git, Jest, Vitest, pytest, Agile, Linux/UNIX",
  },
  {
    label: "Security & Networking",
    items: "OAuth 2.0, JWT/JWKS verification, Row Level Security, rate limiting, CORS/CSP, TCP/IP, IPv6",
  },
];

export const experience: ResumeRole[] = [
  {
    title: "Freelance Full-Stack Developer",
    org: "TheTripMan (Contract, revenue-share)",
    location: "Remote, Ontario",
    period: "Aug 2025 – Present",
    bullets: [
      "Engineered and deployed a booking and payments platform solo for a transportation business with a 1.2M-follower audience, generating $1,000+ in revenue across 11+ bookings in a single month.",
      "Integrated Stripe checkout with webhook-driven confirmation, eliminating unpaid reservations by committing a booking only after payment settles.",
      "Built an authenticated admin dashboard that replaced manual phone and direct-message booking management, removing the client's daily dependency on a developer.",
      "Designed the PostgreSQL schema with Prisma and automated email and calendar confirmations, cutting manual follow-up on every reservation to zero.",
      "Deployed to production on Vercel with GA4 analytics, jest-axe accessibility tests, and a Husky-enforced CI pipeline.",
    ],
  },
  {
    title: "Freelance Web Developer",
    org: "Puffy (Client)",
    location: "Oakville, ON",
    period: "2026",
    bullets: [
      "Designed and shipped a mobile-first marketing site for a local dessert business with no prior web presence, establishing its first search-indexed storefront.",
      "Implementing a QR-code in-store menu and Google Business listing to convert foot traffic into online discovery.",
    ],
  },
];

export const sideProjects: ResumeRole[] = [
  {
    title: "Feather, AI Market Insights Platform",
    org: "Capstone, team of 4",
    tech: "React, TypeScript, FastAPI, Python, Vercel Edge Functions, Firebase Auth, PostgreSQL, Docker",
    period: "2025 – 2026",
    links: [{ label: "Live Demo", href: "https://www.feathertrade.org/" }],
    bullets: [
      "Ranked #1 of 50+ projects at the 2026 Sheridan capstone showcase, graded 97/100, delivered across a full academic year.",
      "Identified a critical authentication vulnerability in the production API that allowed any caller to read or write any user account, and verified it against the live service before designing the fix.",
      "Architected the API gateway that closed it using Vercel Edge Functions, implementing Firebase ID token verification against Google JWKS, allowlist routing, and dual-window rate limiting on shared PostgreSQL counters.",
      "Audited the database and remediated 12 tables running without Row Level Security, including user profile data, via SQL migration.",
    ],
  },
  {
    title: "Bloom, Cloud-Synced Life Planner",
    org: "Independent product",
    tech: "React, TypeScript, Vite, Supabase, PostgreSQL, Zustand, Tailwind CSS, PWA",
    period: "2026 – Present",
    links: [{ label: "Live Demo", href: "https://bloom-cal.vercel.app" }],
    bullets: [
      "Launched a production planner covering calendar, tasks, habits, notes, journal, goals, and focus timing, live and in daily use.",
      "Engineered an offline-first sync layer committing writes to local state before debounced PostgreSQL persistence, keeping the interface responsive with zero network latency and fully functional offline.",
      "Implemented Realtime subscriptions for cross-device sync and enforced Row Level Security across 10 tables, isolating every account at the database layer.",
    ],
  },
  {
    title: "Le Pathétique, Multimodal AI Web App",
    org: "BearHacks 2026, solo build",
    tech: "Next.js, React, TypeScript, Google Cloud Vision, Gemini, ElevenLabs",
    period: "2026",
    links: [
      { label: "GitHub", href: "https://github.com/Cengizbey-m/Le-Pathetique" },
      { label: "DevPost", href: "https://devpost.com/software/le-pathetique" },
    ],
    bullets: [
      "Built a multimodal pipeline chaining Google Cloud Vision, Gemini, and ElevenLabs to convert a photo into spoken critique and generated recipes, solo, within one weekend.",
      "Implemented an offline fallback mode that degrades gracefully when a third-party API fails, keeping the live demo functional through venue network outages.",
    ],
  },
];

export const certifications =
  "CCNA IP Addressing & Subnetting · IPv6 Fundamentals (APNIC) · Cisco Introduction to Cybersecurity · LinkedIn Networking Foundations";
