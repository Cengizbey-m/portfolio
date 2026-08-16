export const profile = {
  // Identity
  displayName: "Cengiz",
  realName: "Muhammed Cengiz",
  role: "Full-Stack Developer",
  headline: "Full-stack developer with a networking background",
  tagline:
    "I build and ship production web apps end to end. Live client platforms taking real payments, a product with real users, and the networking and security background to understand what runs underneath.",
  location: "Greater Toronto Area, Canada",
  country: "Canada",

  // Availability
  status: {
    label: "Open to full-time roles",
    sublabel: "Canadian PR · GTA or remote",
    accent: "online" as const,
  },
  availability: {
    value: "Available now",
    detail: "Full-time software developer",
    workAuth: "Canadian Permanent Resident",
    responseTime: "Replies within a day",
  },

  // Education
  education: {
    program: "Software Development & Network Engineering (SDNE)",
    school: "Sheridan College",
    grad: "Aug 2026",
    status: "Graduated",
    honour: "Capstone ranked #1 of 50+ projects at the 2026 showcase",
  },

  // Steam-flavored profile chrome
  level: 26,
  avatarUrl: "/steam/avatar.jpg",
  // Empty → ProfileHero renders a clean CSS-gradient banner (no baked-in text).
  bannerUrl: "",
  background: {
    // Steam-like "profile background" behind the whole site.
    type: "video" as "image" | "video",
    src: "/Background-images/Background-video-3.mp4",
  },

  // Links, surfaced prominently for recruiters
  links: {
    github: "https://github.com/Cengizbey-m",
    linkedin: "https://www.linkedin.com/in/muhammed-cengiz/",
    email: "muhammedcengiz2778@gmail.com",
    resume: "/resume",
    resumePdf: "/resume.pdf",
  },

  // Headline stats on the profile hero. These are the three facts that
  // separate him from every other new grad in the GTA.
  stats: [
    { label: "Capstone showcase", value: "#1 of 50+" },
    { label: "Apps in production", value: "3 live" },
    { label: "No sponsorship needed", value: "Canadian PR" },
  ],
  sideStats: [
    { label: "Graduated", value: "Aug 2026" },
    { label: "Location", value: "GTA" },
    { label: "Stack", value: "Next.js" },
  ],

  featuredProjectSlug: "thetripman",
} as const;
