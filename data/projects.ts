export type ProjectTag = "Web" | "AI/ML" | "Networking";

export type ProjectLinks = {
  caseStudy: string;
  liveDemo?: string;
  github?: string;
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
  links: ProjectLinks;
  confidentialityNote?: string;
};

export const projects: Project[] = [
  {
    title: "TheTripMan (Client • Transportation Booking + Sales)",
    slug: "thetripman",
    tags: ["Web", "Networking"],
    short:
      "Transportation booking + sales website built for a paying client. Production code private; safe demo/prototype is public.",
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
    impact: [
      "Placeholder: reduce booking friction by X% (track via form drop‑off / analytics)",
      "Placeholder: improve lead response time by X minutes (process metric)",
    ],
    coverImage: "/images/thetripman-placeholder.svg",
    links: {
      caseStudy: "/projects/thetripman",
      github: "https://github.com/Cengizbey-m",
    },
    confidentialityNote:
      "Production code is private due to client confidentiality. This page describes the architecture and shows a safe demo/prototype.",
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
    stack: ["Python", "Pandas", "Model evaluation", "Next.js", "TypeScript"],
    impact: [
      "Placeholder: model metrics (MAE/RMSE) + baseline comparison",
      "Placeholder: reduced analysis time by X% via one‑click reports",
    ],
    coverImage: "/images/capstone-placeholder.svg",
    links: {
      caseStudy: "/projects/capstone-ai-finance",
      github: "https://github.com/Cengizbey-m",
    },
  },
  {
    title: "Formally (Prototype) — Fitness + Personal Development Platform",
    slug: "formally-prototype",
    tags: ["Web"],
    short:
      "Public UI/UX prototype (fake data) for a future fitness + personal development platform. Core repo private.",
    problem:
      "Needed a clean onboarding + habit flow that keeps users focused on next actions, not configuration.",
    role:
      "Product + engineering: UX flows, component library, and front-end architecture that can evolve into a full system.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Component design"],
    impact: [
      "Placeholder: usability test notes + iteration count",
      "Placeholder: task completion time improvements",
    ],
    coverImage: "/images/formally-placeholder.svg",
    links: {
      caseStudy: "/projects/formally-prototype",
      github: "https://github.com/Cengizbey-m",
    },
  },
];

export const projectSlugs = projects.map((p) => p.slug);


