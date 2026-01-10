export const profile = {
  displayName: "Cengiz",
  realName: "Muhammed Cengiz",
  headline: "SDNE student • Full‑stack + Networking",
  location: "Oakville / GTA",
  country: "Canada",
  status: {
    label: "Open to opportunities",
    sublabel: "Co-op / Internship",
    accent: "offline" as const,
  },
  level: 22,
  avatarUrl: "/steam/avatar.jpg",
  bannerUrl: "/steam/banner.jpg",
  background: {
    // Steam-like "profile background" behind the whole site.
    // Use image for performance; video is supported too.
    type: "video" as "image" | "video",
    src: "/Background-images/Background-video-3.mp4",
  },
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
    { label: "Grad", value: "2026" },
    { label: "Location", value: "GTA" },
    { label: "Stack", value: "Next.js" },
  ],
  featuredProjectSlug: "thetripman",
} as const;


