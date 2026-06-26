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
    body: "You've been auto-added as a friend. Look around — there's loot.",
    when: "just now",
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
    body: "Commit Snake and Subnet Sprint are live. Try for a high score.",
    when: "today",
    href: "/library/arcade",
  },
  {
    id: "n-hire",
    kind: "sale",
    title: "Cengiz is on sale: -100% cost to ask",
    body: "Open to opportunities. Co-op + new-grad roles.",
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
