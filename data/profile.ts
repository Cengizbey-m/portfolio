export const profile = {
  displayName: "Cengiz",
  realName: "Muhammed “Cengiz” Cengiz",
  headline: "SDNE student • Full‑stack + Networking",
  location: "Oakville / GTA",
  country: "Canada",
  status: {
    label: "Currently Offline",
    sublabel: "Open to co-op / internships",
    accent: "offline" as const,
  },
  level: 22,
  avatarUrl: "/steam/avatar.svg",
  bannerUrl: "/steam/banner.svg",
  links: {
    github: "https://github.com/Cengizbey-m",
    linkedin: "https://www.linkedin.com/in/muhammed-cengiz-005aa0278/?locale=en_US",
    email: "muhammedcengiz2778@gmail.com",
  },
  stats: [
    { label: "Projects", value: "3" },
    { label: "Focus", value: "Web + Networks" },
    { label: "Grad", value: "~7–8 mo" },
  ],
  sideStats: [
    { label: "Games", value: "145" },
    { label: "Badges", value: "25" },
    { label: "Screenshots", value: "56" },
  ],
  featuredProjectSlug: "thetripman",
} as const;


