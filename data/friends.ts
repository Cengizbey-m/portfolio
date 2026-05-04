export type FriendStatus = "online" | "offline" | "away" | "in-game";

export type Friend = {
  name: string;
  status: FriendStatus;
  /** What they're "playing" — your stack told as a story */
  playing?: string;
  avatarColor: string; // tailwind/hsl
  bio: string;
  /** Optional link if they're a real tool/site */
  href?: string;
};

export const friends: Friend[] = [
  {
    name: "Next.js",
    status: "in-game",
    playing: "Server Components",
    avatarColor: "bg-black",
    bio: "Best teammate. Always shipping.",
    href: "https://nextjs.org",
  },
  {
    name: "TypeScript",
    status: "online",
    avatarColor: "bg-[#3178c6]",
    bio: "Catches my mistakes before the user does.",
    href: "https://www.typescriptlang.org",
  },
  {
    name: "PostgreSQL",
    status: "online",
    avatarColor: "bg-[#336791]",
    bio: "Stores the truth. Reluctantly.",
    href: "https://www.postgresql.org",
  },
  {
    name: "Tailwind",
    status: "in-game",
    playing: "Tailwind v4",
    avatarColor: "bg-[#06b6d4]",
    bio: "Class names go brrr.",
    href: "https://tailwindcss.com",
  },
  {
    name: "GitHub Copilot",
    status: "away",
    avatarColor: "bg-[#1f883d]",
    bio: "Smart, but I still review every diff.",
  },
  {
    name: "Linux",
    status: "online",
    avatarColor: "bg-[#fcc624] text-black",
    bio: "tail -f /var/log/cengiz.log",
  },
  {
    name: "Wireshark",
    status: "offline",
    avatarColor: "bg-[#1679a7]",
    bio: "Packets don't lie.",
    href: "https://www.wireshark.org",
  },
  {
    name: "Vercel",
    status: "in-game",
    playing: "Deploying",
    avatarColor: "bg-white text-black",
    bio: "Push to main, magic happens.",
    href: "https://vercel.com",
  },
];
