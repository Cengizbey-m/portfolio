/**
 * Structured resume content. Drives the /resume page, which is styled to print
 * cleanly to PDF (Ctrl/Cmd+P → Save as PDF) so this file is the single source
 * of truth for both the web and paper versions.
 *
 * Written for humans first, but keyword coverage is deliberate: most postings
 * are filtered by an ATS before a person reads them.
 */

export const resumeSummary =
  "Full-stack developer with an advanced diploma in Software Development and Network Engineering and a track record of shipping software that people use. Built and maintain a booking and payments platform processing live Stripe transactions for a client with a 1.2M-follower audience, and designed and launched Bloom, a cloud-synced planner with offline support and realtime multi-device sync. Year-long capstone team ranked #1 of 50+ projects at the 2026 Sheridan showcase, graded 97/100. Canadian permanent resident, available across the Greater Toronto Area or remote.";

export type ResumeRole = {
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  tech?: string;
};

export const experience: ResumeRole[] = [
  {
    title: "Full-Stack Developer (Contract)",
    org: "TheTripMan / Trvoo",
    location: "Greater Toronto Area",
    period: "2025 – Present",
    bullets: [
      "Designed, built, and deployed a production booking and payments platform as the sole developer for a transportation business with a 1.2M-follower audience.",
      "Integrated Stripe checkout with webhook-driven confirmation, so a reservation is only committed after payment settles, eliminating unpaid bookings in the database.",
      "Built an authenticated admin dashboard that replaced DM and phone-based booking management, removing the client's day-to-day dependency on a developer.",
      "Automated confirmation email and calendar invites through Resend and Google Calendar, removing manual follow-up on every reservation.",
      "Modelled the relational schema in PostgreSQL with Prisma and ship changes against live traffic under a revenue-share agreement.",
      "Added Jest and jest-axe accessibility tests enforced through Husky pre-commit hooks and CI.",
    ],
    tech: "Next.js 15, TypeScript, Tailwind, Stripe, PostgreSQL, Prisma, Resend, Vercel, Jest",
  },
  {
    title: "Web Developer (Contract)",
    org: "Puffy Patisserie",
    location: "Greater Toronto Area",
    period: "2026",
    bullets: [
      "Took a local business with no online presence to a launched, mobile-first marketing site covering products, location, and hours.",
      "Built the layout at phone width first and kept the bundle light, since the majority of local discovery happens on mobile connections.",
      "Currently implementing a QR-code in-store menu and a Google Business listing to capture local search traffic.",
    ],
    tech: "Next.js, TypeScript, Tailwind CSS, Vercel",
  },
  {
    title: "Software Developer, Capstone (Team of 4)",
    org: "Feather, Sheridan College",
    location: "Oakville, ON",
    period: "2025 – 2026",
    bullets: [
      "Ranked #1 out of 50+ projects at the 2026 capstone showcase, selected for the final showcase round and judged first overall. Graded 97/100 in the final term, up from 94/100 at the prototype stage.",
      "Delivered across two terms and a full academic year with a team of four, using code review, shared ownership, and scope renegotiation as the project grew.",
      "Owned the model evaluation layer, scoring every run against naive baselines so the interface reports accuracy honestly instead of displaying unqualified predictions.",
      "Defined and implemented the REST API contract between the FastAPI service and the React client, allowing frontend and ML work to proceed in parallel without blocking.",
      "Containerized the backend with Docker to give four developers an identical environment and a reproducible demo setup.",
    ],
    tech: "React, TypeScript, FastAPI, Python, SQLAlchemy, scikit-learn, Docker",
  },
];

export const sideProjects: ResumeRole[] = [
  {
    title: "Bloom, Cloud-Synced Life Planner (live product)",
    org: "Independent product · bloom-cal.vercel.app",
    location: "Sole developer and designer",
    period: "2026 – Present",
    bullets: [
      "Designed, built, and launched a complete planner covering seven connected modules: calendar, tasks, habits, notes, journal, goals, and a focus timer. Live and in daily use.",
      "Engineered an offline-first sync layer: writes commit to local state immediately and sync to PostgreSQL on a debounce, so the interface stays responsive on unreliable connections and keeps working with no network at all.",
      "Implemented Supabase Realtime subscriptions so edits propagate across every signed-in device within seconds, including theme and settings, not just content.",
      "Secured multi-tenant data with Row Level Security across 10 PostgreSQL tables, isolating every account at the database layer rather than relying on client-side checks, with Google OAuth for sign-in.",
      "Shipped as an installable PWA using Workbox service workers, and sanitized all user-authored markdown with DOMPurify to prevent stored XSS.",
      "Designed a forgiveness-based habit scoring model to replace binary streaks, alongside mood correlation analytics over a rolling 30-day window.",
    ],
    tech: "React 18, TypeScript, Vite, Supabase, PostgreSQL, Zustand, Tailwind CSS v4, Workbox, Framer Motion",
  },
  {
    title: "Le Pathétique, Multimodal AI Application",
    org: "BearHacks 2026",
    location: "Solo build",
    period: "2026",
    bullets: [
      "Built a multimodal pipeline chaining Google Cloud Vision, Gemini Flash, and ElevenLabs to turn a photo into spoken critique and generated recipes, solo, in one weekend.",
      "Implemented a graceful offline fallback mode so the application degrades predictably when a third-party API is unavailable.",
    ],
    tech: "Next.js 16, React 19, TypeScript, Google Cloud Vision, Gemini, ElevenLabs",
  },
];

export const skills: { label: string; items: string }[] = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript, Python, Java, C#, SQL, C, HTML, CSS",
  },
  {
    label: "Frontend",
    items: "React, Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motion, Vite, PWA",
  },
  {
    label: "Backend",
    items: "Node.js, Express, FastAPI, REST API design, JWT authentication, role-based access control, Stripe",
  },
  {
    label: "Data",
    items: "PostgreSQL, Prisma, Supabase, MongoDB, SQLAlchemy, schema design, migrations",
  },
  {
    label: "Infrastructure & Tools",
    items: "Docker, Git, GitHub Actions, CI/CD, Vercel, Linux, Jest, jest-axe, Postman",
  },
  {
    label: "Networking & Security",
    items: "TCP/IP, subnetting, IPv6, DNS, cloud-enabled networks, Row Level Security, OWASP fundamentals",
  },
];
