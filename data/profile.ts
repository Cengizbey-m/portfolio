export const profile = {
  // Identity
  displayName: "Cengiz",
  realName: "Muhammed Cengiz",
  role: "Full-Stack Developer",
  headline: "Full‑stack developer with a networking background",
  tagline:
    "I build fast, reliable web apps end‑to‑end — and I understand the network they run on.",
  location: "Oakville / GTA, Canada",
  country: "Canada",

  // Availability (recruiter-first)
  status: {
    label: "Open to opportunities",
    sublabel: "Co‑op / Internship · New grad",
    accent: "online" as const,
  },
  availability: {
    value: "Available",
    detail: "Co‑op / Internship",
    responseTime: "Replies within a day",
    cost: "Free to chat",
  },

  // Education
  education: {
    program: "Software Development & Network Engineering (SDNE)",
    school: "Sheridan College",
    grad: "Aug 2026",
  },

  // Steam-flavored profile chrome
  level: 22,
  avatarUrl: "/steam/avatar.jpg",
  // Empty → ProfileHero renders a clean CSS-gradient banner (no baked-in text).
  bannerUrl: "",
  background: {
    // Steam-like "profile background" behind the whole site.
    type: "video" as "image" | "video",
    src: "/Background-images/Background-video-3.mp4",
  },

  // Links — these are surfaced prominently, recruiter-first
  links: {
    github: "https://github.com/Cengizbey-m",
    linkedin: "https://www.linkedin.com/in/muhammed-cengiz/",
    email: "muhammedcengiz2778@gmail.com",
    resume: "/resume",
    resumePdf: "/resume.pdf",
  },

  // Headline stats shown on the profile hero
  stats: [
    { label: "Projects shipped", value: "6" },
    { label: "Focus", value: "Web + Networks" },
    { label: "Status", value: "Open to work" },
  ],
  sideStats: [
    { label: "Grad", value: "2026" },
    { label: "Location", value: "GTA" },
    { label: "Stack", value: "Next.js" },
  ],

  featuredProjectSlug: "thetripman",
} as const;
