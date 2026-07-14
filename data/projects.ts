export type ProjectTag = "Web" | "AI/ML" | "Networking" | "Hackathon";

export type ProjectLinks = {
  caseStudy: string;
  liveDemo?: string;
  github?: string;
  app?: string;
};

export type Project = {
  title: string;
  slug: string;
  tags: ProjectTag[];
  short: string;
  problem: string;
  role: string;
  stack: string[];
  impact: string[];
  coverImage?: string;
  gallery?: string[];
  demoVideo?: string;
  links: ProjectLinks;
  confidentialityNote?: string;
};

export const projects: Project[] = [
  {
    title: "TheTripMan (Client • Booking + Payments Platform)",
    slug: "thetripman",
    tags: ["Web", "Networking"],
    short:
      "Booking + payments platform I built solo for an influencer-led transportation business (~1.2M audience). Live in production, taking real bookings on a revenue-share deal. Production code is private.",
    problem:
      "A real business with a large social audience needed customers to browse services, book, and pay online — with no developer in the loop day-to-day — plus an admin to manage every booking.",
    role:
      "Solo full-stack developer: design, frontend, backend, Stripe payments, database, deployment, and ongoing maintenance. I own the whole thing.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind + shadcn/ui",
      "Stripe (payments)",
      "Postgres (Neon) + Prisma",
      "Scheduling: Cal.com/Calendly + FullCalendar + Google Calendar",
      "Resend email",
      "GA4 analytics",
      "Vercel",
    ],
    impact: [
      "Designed, built, and deployed the entire booking + payments platform solo for a client with a ~1.2M-follower audience.",
      "Integrated Stripe for end-to-end payments, an authenticated admin dashboard, and automated email + calendar confirmations.",
      "Shipped to production with CI, accessibility tests, and analytics — the platform processes live customer bookings on a revenue-share agreement.",
    ],
    coverImage: "/images/tripman/tripman-1.png",
    gallery: [
      "/images/tripman/tripman-1.png",
      "/images/tripman/tripman-2.png",
      "/images/tripman/tripman-3.png",
      "/images/tripman/tripman-4.png",
      "/images/tripman/tripman-5.png",
    ],
    links: {
      caseStudy: "/projects/thetripman",
      liveDemo: "https://www.trvoo.com",
    },
    confidentialityNote:
      "The production repository is private due to business confidentiality. Screenshots avoid any sensitive client data.",
  },
  {
    title: "Bloom (Product • Cloud-Synced Life Planner PWA)",
    slug: "bloom",
    tags: ["Web"],
    short:
      "A cute, cloud-synced life planner — calendar, tasks, habits, notes, journal, goals, and a focus timer in one warm workspace. Sign in with Google and your data follows you: start on your phone, continue on your PC. Live now; web, iOS, and Android launch in the works.",
    problem:
      "Students and workers juggle classes, tasks, habits, and notes across a pile of cold, disconnected apps. Bloom pulls daily life into one friendly workspace that stays in sync on every device — and keeps working offline.",
    role:
      "Solo: product design and full-stack build — data model, offline-first sync engine, auth, theming, and every screen of the UI.",
    stack: [
      "React 18 + TypeScript (Vite)",
      "Tailwind CSS v4",
      "Zustand (state + localStorage persistence)",
      "Supabase (PostgreSQL + Google Auth + Realtime)",
      "Offline-first PWA (Workbox)",
      "Row Level Security + DOMPurify sanitization",
      "Framer Motion",
      "Vercel",
    ],
    impact: [
      "Built an offline-first sync engine: everything saves locally first, then debounce-syncs to Supabase — Realtime subscriptions keep every signed-in device up to date, theme and notes included.",
      "Google sign-in with Row Level Security across 10 Postgres tables, so each user's data is isolated at the database level.",
      "Designed a forgiveness-based habit score (0–100%) instead of punishing streak resets, plus mood–habit correlation stats.",
      "Quality-of-life details everywhere: global Ctrl/Cmd+K quick-add, a Pomodoro timer that follows you across pages, 3 themes + custom accent colors, and achievements.",
    ],
    coverImage: "/images/bloom/bloom-1.png",
    gallery: [
      "/images/bloom/bloom-1.png",
      "/images/bloom/bloom-2.png",
      "/images/bloom/bloom-3.png",
      "/images/bloom/bloom-4.png",
      "/images/bloom/bloom-5.png",
    ],
    links: {
      caseStudy: "/projects/bloom",
      liveDemo: "https://bloom-cal.vercel.app",
    },
    confidentialityNote:
      "The codebase is private while Bloom prepares for public launch on web, iOS, and Android.",
  },
  {
    title: "Le Pathétique (BearHacks 2026 — AI French Food Critic)",
    slug: "le-pathetique",
    tags: ["AI/ML", "Web", "Hackathon"],
    short:
      "Solo BearHacks 2026 build. Upload a photo of your sad cooking, get roasted out loud by a pretentious French AI critic, then redeemed with broke / decent / fancy recipes.",
    problem:
      "Hackathon prompt: ship something that uses multimodal AI in a way that's actually fun, not a demo with three buttons. Needed an interaction that survives a shaky Wi-Fi judging room and doesn't depend on warm API caches.",
    role:
      "Solo developer. Designed the persona, built the pipeline (Vision → Gemini → ElevenLabs), wrote the brutalist newspaper UI, wired the offline mock mode for demo resilience, hid 13 easter eggs across 6 personas.",
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Google Cloud Vision API (image labeling)",
      "Gemini Flash (multimodal critique + recipe generation)",
      "ElevenLabs (text-to-speech, French accent)",
      "Web Audio API (in-browser SFX)",
      "Vercel (hosting)",
    ],
    impact: [
      "Shipped solo at BearHacks 2026 — concept to working multimodal demo in one weekend.",
      "Built an offline mock mode so the app keeps working when the venue Wi-Fi or an API key dies mid-judging.",
      "Designed 6 distinct critic personas with 13 hidden easter eggs to reward repeat use.",
      "Brutalist newspaper aesthetic that stood out from the standard hackathon Tailwind look.",
    ],
    coverImage: "/images/le-pathetique/home.jpg",
    gallery: [
      "/images/le-pathetique/home.jpg",
      "/images/le-pathetique/recipes.jpg",
      "/images/le-pathetique/verdict.jpg",
    ],
    links: {
      caseStudy: "/projects/le-pathetique",
      github: "https://github.com/Cengizbey-m/Le-Pathetique",
      liveDemo: "https://devpost.com/software/le-pathetique",
    },
    confidentialityNote:
      "A Vercel deployment exists but has known issues being polished post-hackathon — DevPost link is the source of truth for now.",
  },
  {
    title: "Feather — AI Market Insights Platform (Capstone, Team)",
    slug: "capstone-ai-finance",
    tags: ["AI/ML", "Web"],
    short:
      "Team capstone building an AI-assisted next-day stock prediction workflow with clear evaluation, safeguards, and a web UI. Capstone prototype graded 94/100.",
    problem:
      "Users wanted a simple UI for exploring signals and predictions with transparent evaluation and limits on overconfident outputs.",
    role:
      "Team contributor: owned ML evaluation + API contract; implemented feature work end‑to‑end and documented trade‑offs.",
    stack: [
      "React + TypeScript (Vite)",
      "FastAPI (Python)",
      "SQLAlchemy",
      "Docker",
      "ML baselines (SVR/RF)",
      "Vercel (frontend)",
    ],
    impact: [
      "Owned the evaluation approach (baselines + metrics) and translated results into clear UI-friendly outputs.",
      "Defined and implemented the API contract between model code and the web UI for predictable integrations.",
      "Capstone prototype graded 94/100.",
    ],
    coverImage: "/images/feather/feather-1.png",
    gallery: [
      "/images/feather/feather-1.png",
      "/images/feather/feather-2.png",
      "/images/feather/feather-3.png",
      "/images/feather/feather-4.png",
      "/images/feather/feather-5.png",
    ],
    demoVideo: "/demo-videos/Feather-demo-video-2min.mp4",
    links: {
      caseStudy: "/projects/capstone-ai-finance",
      liveDemo: "https://www.feathertrade.org/",
    },
  },
  {
    title: "Puffy (Client • Local Patisserie Website)",
    slug: "puffy",
    tags: ["Web"],
    short:
      "Marketing website I designed and built for a local patisserie / dessert shop — a second real client. Proof I can take a small business from zero to a clean, fast online presence.",
    problem:
      "A local patisserie had no real web presence. They needed a friendly, mobile-first site that tells their story, shows what they offer, and is easy to find on Google.",
    role:
      "Solo: design, build, and deployment. Currently adding a QR-code menu for in-store scanning and a Google Business presence.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    impact: [
      "Designed and shipped a clean, mobile-first marketing site for a real local dessert business.",
      "Adding a QR-code menu so customers can scan and browse in-store; Google Business integration in progress.",
    ],
    coverImage: "/images/puffy/puffy-1.png",
    gallery: [
      "/images/puffy/puffy-1.png",
      "/images/puffy/puffy-2.png",
      "/images/puffy/puffy-3.png",
      "/images/puffy/puffy-4.png",
      "/images/puffy/puffy-5.png",
    ],
    links: {
      caseStudy: "/projects/puffy",
      github: "https://github.com/Cengizbey-m/Puffy",
    },
  },
  {
    title: "Formally (Prototype) — Fitness + Personal Development Platform",
    slug: "formally-prototype",
    tags: ["Web", "AI/ML"],
    short:
      "Early-stage product prototype exploring onboarding, habit flows, and clean UI patterns. Codebase is private while the product is in development.",
    problem:
      "Needed a clean onboarding + habit flow that keeps users focused on next actions, not configuration.",
    role:
      "Product + engineering: UX flows, component library, and front-end architecture that can evolve into a full system.",
    stack: [
      "React",
      "Node.js / Express",
      "MongoDB (Mongoose)",
      "JWT auth + RBAC",
      "Socket.io",
      "Tailwind",
      "Docker",
    ],
    impact: [
      "Designed onboarding and habit flows focused on clarity and low cognitive load.",
      "Built reusable UI patterns that can evolve into a full product design system.",
    ],
    coverImage: "/images/Formally-Home.png",
    gallery: [
      "/images/Formally-Home.png",
      "/images/Formally-Nutrition.png",
      "/images/Formally-AiProgramBuilder.png",
      "/images/Formally-Workout-Session.png",
      "/images/Formally-Settings.png",
    ],
    links: {
      caseStudy: "/projects/formally-prototype",
    },
  },
];

export const projectSlugs = projects.map((p) => p.slug);


