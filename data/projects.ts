export type ProjectTag = "Web" | "AI/ML" | "Networking";

export type ProjectLinks = {
  caseStudy: string;
  liveDemo?: string;
  github?: string;
  deployment?: string;
};

export type Project = {
  title: string;
  slug: string;
  tags: ProjectTag[];
  short: string;
  problem: string;
  role: string;
  stack: string[];
  features: string[];
  impact: string[];
  links: ProjectLinks;
  confidentialityNote?: string;
  deployment?: string;
};

export const projects: Project[] = [
  {
    title: "TheTripMan (Client • Transportation Booking + Sales)",
    slug: "thetripman",
    tags: ["Web", "Networking"],
    short:
      "Transportation booking + sales website built for a paying client. Production code is private; a safe demo/prototype is public.",
    problem:
      "Client needed a fast way for customers to browse services, request bookings, and convert leads without exposing operational details.",
    role:
      "Full‑stack developer: UI build, API integration patterns, deployment setup, and security/privacy constraints for a client project.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind",
      "REST APIs",
      "CI/CD (GitHub Actions)",
    ],
    features: [
      "Conversion-focused landing + service pages",
      "Booking/request flow with validation",
      "Clear privacy boundary (public demo vs. private production)",
    ],
    impact: [
      "Placeholder: reduce booking friction by X% (track via form drop‑off / analytics)",
      "Placeholder: improve lead response time by X minutes (process metric)",
    ],
    links: {
      caseStudy: "/projects/thetripman",
      liveDemo: "https://PLACEHOLDER-LIVE-DEMO",
      github: "https://github.com/Cengizbey-m",
    },
    confidentialityNote:
      "Production code is private due to client confidentiality. This page describes the architecture and shows a safe demo/prototype.",
    deployment: "Vercel (prod + preview deploys)",
  },
  {
    title: "Capstone (Team) — AI Finance Prediction App",
    slug: "capstone-ai-finance",
    tags: ["AI/ML", "Web"],
    short:
      "Team capstone building a finance prediction workflow with evaluation, guardrails, and a simple web UI.",
    problem:
      "Users wanted a simple UI for exploring signals and predictions with transparent evaluation and limits on overconfident outputs.",
    role:
      "Team contributor: owned ML evaluation + API contract; implemented feature work end‑to‑end and documented trade‑offs.",
    stack: ["Python", "Pandas", "Model evaluation", "Next.js", "TypeScript"],
    features: [
      "Repeatable preprocessing + evaluation",
      "Clear baselines and metrics",
      "UI for running and reviewing predictions",
    ],
    impact: [
      "Placeholder: model metrics (MAE/RMSE) + baseline comparison",
      "Placeholder: reduced analysis time by X% via one‑click reports",
    ],
    links: {
      caseStudy: "/projects/capstone-ai-finance",
      liveDemo: "https://PLACEHOLDER-LIVE-DEMO",
      github: "https://github.com/Cengizbey-m",
    },
    deployment: "Vercel (UI) + service hosting (TBD)",
  },
  {
    title: "Formally (Prototype) — Fitness + Personal Development Platform",
    slug: "formally-prototype",
    tags: ["Web"],
    short:
      "Public UI/UX prototype (fake data) for a future fitness + personal development platform. Core product code is private.",
    problem:
      "Needed a clean onboarding + habit flow that keeps users focused on next actions, not configuration.",
    role:
      "Product + engineering: UX flows, component library, and front-end architecture that can evolve into a full system.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Component design"],
    features: [
      "Onboarding flow with sensible defaults",
      "Today-focused task/habit views",
      "Reusable UI patterns for future expansion",
    ],
    impact: [
      "Placeholder: usability test notes + iteration count",
      "Placeholder: task completion time improvements",
    ],
    links: {
      caseStudy: "/projects/formally-prototype",
      liveDemo: "https://PLACEHOLDER-LIVE-DEMO",
      github: "https://github.com/Cengizbey-m",
    },
    deployment: "Vercel (prototype)",
  },
];

export const projectSlugs = projects.map((p) => p.slug);


