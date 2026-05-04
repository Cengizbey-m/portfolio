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
    coverImage: "/images/le-pathetique/original.png",
    gallery: [
      "/images/le-pathetique/original.png",
      "/images/le-pathetique/gallery.jpg",
      "/images/le-pathetique/gallery-1.jpg",
      "/images/le-pathetique/gallery-2.jpg",
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
    title: "TheTripMan (Client • Transportation Booking + Sales)",
    slug: "thetripman",
    tags: ["Web", "Networking"],
    short:
      "Transportation booking + sales website built for a paying client. Production code is private due to business confidentiality.",
    problem:
      "Client needed a fast way for customers to browse services, request bookings, and convert leads without exposing operational details.",
    role:
      "Full‑stack developer: UI build, API integration patterns, deployment setup, and security/privacy constraints for a client project.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind + shadcn/ui",
      "Postgres (Neon) + Prisma",
      "Scheduling: Cal.com/Calendly + FullCalendar",
      "Resend email",
      "GA4 analytics",
      "Vercel",
    ],
    impact: [
      "Built and deployed a conversion-focused marketing + booking experience with clear CTAs and service pages.",
      "Implemented a reliable request/booking flow with validation and production-ready UX polish.",
    ],
    coverImage: "/images/Tripman-general.png",
    gallery: [
      "/images/Tripman-general.png",
      "/images/Tripman-bio.png",
      "/images/Tripman-bottomofpage.png",
    ],
    links: {
      caseStudy: "/projects/thetripman",
      liveDemo: "https://www.thetripman.com",
    },
    confidentialityNote:
      "The production repository is private due to business confidentiality.",
  },
  {
    title: "Capstone (Team) — AI Finance Prediction App",
    slug: "capstone-ai-finance",
    tags: ["AI/ML", "Web"],
    short:
      "Team capstone building an AI-assisted finance prediction workflow with clear evaluation, safeguards, and a web UI.",
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
    ],
    coverImage: "/images/Feather-marketstatic.png",
    gallery: [
      "/images/Feather-marketstatic.png",
      "/images/Feather-charts.png",
      "/images/Feather-analytics.png",
    ],
    demoVideo: "/demo-videos/Feather-demo-video-2min.mp4",
    links: {
      caseStudy: "/projects/capstone-ai-finance",
      github: "https://github.com/Cengizbey-m/Feather-Capstone",
      liveDemo: "https://feather-capstone-omega.vercel.app/",
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


