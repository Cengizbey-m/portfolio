/**
 * Resume content, built for ATS parsing first and a human skim second.
 *
 * Rules this file follows:
 *  - Single column, standard section names (Skills, Experience, Projects,
 *    Education, Certifications). Creative headings confuse parsers.
 *  - Every bullet opens with an action verb and, wherever a real number exists,
 *    states the outcome rather than the activity.
 *  - Technology names are spelled the way postings spell them (TypeScript, not
 *    TS; PostgreSQL, not Postgres) so keyword matching actually hits.
 *  - Skills lead with the full-stack TypeScript set the applications target.
 *    Breadth that no posting asks for costs a line and dilutes the signal.
 *  - One A4 page, filled. Nothing goes in without something coming out.
 */

export const resumeContact = {
  phone: "+1 437-260-2183",
  website: "muhammedcengiz.vercel.app",
  location: "Oakville, ON",
  linkedin: "linkedin.com/in/muhammed-cengiz",
  github: "github.com/Cengizbey-m",
};

/** Sits directly under the contact block. In Canada this is a screening gate. */
export const workAuthorization =
  "Canadian Permanent Resident — authorized to work in Canada, no sponsorship required.";

export const resumeSummary =
  "Full-stack developer who ships production software end to end. Built and deployed a live booking and payments platform solo for a client with a 1.2M-follower audience, now taking real customer payments weekly. 2026 Sheridan graduate, capstone ranked #1 of 50+ projects. Strong in TypeScript, React, Next.js, PostgreSQL, and application security.";

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

/**
 * Labels are kept short and the values trimmed so every row lands on exactly
 * one line. A wrapped skills row costs a line and reads as clutter.
 */
export const skills: { label: string; items: string }[] = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript, Python, SQL, C#, Java, HTML/CSS",
  },
  {
    label: "Frontend",
    items: "React, Next.js, Tailwind CSS, Zustand, Vite, shadcn/ui, accessible UI",
  },
  {
    label: "Backend & Data",
    items: "Node.js, Express.js, FastAPI, .NET, REST APIs, PostgreSQL, Supabase, Prisma",
  },
  {
    label: "Cloud & DevOps",
    items: "Vercel, Docker, Google Cloud Run, GitHub Actions, CI/CD, Git, Jest, Vitest",
  },
  {
    label: "Security",
    items: "OAuth 2.0, JWT/JWKS verification, Row Level Security, rate limiting, TCP/IP, Linux",
  },
];

export const experience: ResumeRole[] = [
  {
    title: "Contract Full-Stack Developer",
    org: "TheTripMan",
    location: "Remote, Ontario",
    period: "Aug 2025 – Present",
    bullets: [
      "Engineered and deployed a booking and payments platform solo for a transportation business with a 1.2M-follower audience, generating $1,000+ in revenue across 11+ bookings in a single month.",
      "Integrated Stripe Checkout with webhook confirmation, ending unpaid reservations by booking only after payment settles.",
      // No hyphenated compound here on purpose: when one breaks across a line,
      // the PDF text layer extracts it welded together ("directmessage"), which
      // is exactly the kind of token an ATS fails to match.
      "Built an authenticated admin dashboard over a Prisma and PostgreSQL schema, replacing phone and direct message booking management and ending the client's daily dependency on a developer.",
      "Shipped to production on Vercel with automated email and calendar confirmations, jest-axe accessibility tests, and CI.",
    ],
  },
  {
    title: "Freelance Web Developer",
    org: "Puffy",
    location: "Oakville, ON",
    period: "2026",
    bullets: [
      "Engineered a mobile-first responsive site for a GTA dessert business with no prior online presence, tuning Core Web Vitals and local SEO into its first search-indexed storefront, with a QR-code in-store menu and Google Business listing.",
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
      "Ranked #1 of 50+ projects at the 2026 Sheridan capstone showcase, graded 97/100 over a full academic year.",
      "Identified and resolved a critical authentication vulnerability that let any caller read or write any user account, engineering a Vercel Edge gateway with Firebase ID token verification against Google JWKS and dual-window rate limiting.",
      "Remediated 12 tables running without Row Level Security, including user profile data, via SQL migration.",
    ],
  },
  {
    title: "Bloom, Cloud-Synced Life Planner",
    org: "Independent product",
    tech: "React, TypeScript, Vite, Supabase, PostgreSQL, Zustand, Tailwind CSS, PWA",
    period: "2026 – Present",
    links: [{ label: "Live Demo", href: "https://bloom-cal.vercel.app" }],
    bullets: [
      "Launched a production planner covering calendar, tasks, habits, notes, journal, goals, and focus timing, in daily use.",
      "Engineered an offline-first sync layer committing writes to local state before debounced PostgreSQL persistence, with Realtime cross-device sync and Row Level Security isolating every account across 10 tables.",
    ],
  },
  {
    title: "Le Pathétique, AI Cooking Critic Web App",
    org: "BearHacks 2026, solo build",
    tech: "Next.js, React, TypeScript, Google Cloud Vision, Gemini, ElevenLabs",
    period: "2026",
    links: [
      { label: "GitHub", href: "https://github.com/Cengizbey-m/Le-Pathetique" },
      { label: "DevPost", href: "https://devpost.com/software/le-pathetique" },
    ],
    bullets: [
      "Built a multimodal pipeline chaining Google Cloud Vision, Gemini, and ElevenLabs to turn a photo of a dish into spoken critique and recipes, with an offline fallback that survived venue network outages.",
    ],
  },
];

export const coursework =
  "Coursework: AI & Machine Learning, Cloud Systems, Database Design, .NET/C#, Enterprise Java, Network Security, Linux/UNIX.";

export const certifications =
  "CCNA IP Addressing & Subnetting · IPv6 Fundamentals (APNIC) · Cisco Introduction to Cybersecurity";
