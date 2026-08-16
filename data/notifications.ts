export type NotificationKind = "achievement" | "friend" | "update" | "sale";

export type StaticNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  /** Relative time string (kept stable for SSR) */
  when: string;
  href?: string;
};

export const staticNotifications: StaticNotification[] = [
  {
    id: "n-welcome",
    kind: "update",
    title: "Welcome to Cengiz Portfolio",
    body: "You've been auto-added as a friend. Look around, there's loot.",
    when: "just now",
  },
  {
    id: "n-capstone",
    kind: "achievement",
    title: "Achievement: Ranked #1 of 50+ 🏆",
    body: "Feather was judged first overall at Sheridan's 2026 capstone showcase. A year-long build, graded 97/100.",
    when: "new",
    href: "/projects/capstone-ai-finance",
  },
  {
    id: "n-bloom",
    kind: "update",
    title: "New release: Bloom is live 🌸",
    body: "A cloud-synced life planner with Google sign-in, offline support, and sync across every device.",
    when: "new",
    href: "/projects/bloom",
  },
  {
    id: "n-library",
    kind: "update",
    title: "6 projects in your library",
    body: "TheTripMan, Feather, Le Pathétique, Puffy, Bloom and Formally are ready to launch.",
    when: "today",
    href: "/library",
  },
  {
    id: "n-arcade",
    kind: "achievement",
    title: "Arcade is open",
    body: "Six mini-games, including a slide puzzle you can load your own photo into.",
    when: "today",
    href: "/library/arcade",
  },
  {
    id: "n-hire",
    kind: "sale",
    title: "Now available: full-time",
    body: "Graduated and available for full-time developer roles. Canadian PR, no sponsorship needed.",
    when: "ongoing",
    href: "/store",
  },
  {
    id: "n-friend",
    kind: "friend",
    title: "Next.js wants to play",
    body: "Your favorite framework is online and shipping.",
    when: "yesterday",
  },
];
