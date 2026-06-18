export type AchievementRarity = "common" | "uncommon" | "rare" | "legendary";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  hint?: string;
  icon: string; // lucide icon name (mapped in component)
  rarity: AchievementRarity;
  /** True if unlocked by simply existing (visiting site, scrolling, etc.) */
  preunlocked?: boolean;
  hidden?: boolean;
};

export const achievements: Achievement[] = [
  {
    id: "welcome",
    title: "First Boot",
    description: "Loaded the portfolio for the first time. Welcome aboard.",
    icon: "rocket",
    rarity: "common",
    preunlocked: true,
  },
  {
    id: "browse-projects",
    title: "Window Shopper",
    description: "Opened the project library.",
    icon: "library",
    rarity: "common",
  },
  {
    id: "open-case-study",
    title: "Deep Reader",
    description: "Opened a project case study.",
    icon: "book-open",
    rarity: "uncommon",
  },
  {
    id: "play-snake",
    title: "Snake Charmer",
    description: "Played a round of Commit Snake in the arcade.",
    icon: "gamepad-2",
    rarity: "uncommon",
  },
  {
    id: "snake-score-50",
    title: "Half-Century Hacker",
    description: "Scored 50+ in Commit Snake.",
    icon: "trophy",
    rarity: "rare",
  },
  {
    id: "subnet-perfect",
    title: "Subnet Sensei",
    description: "Got every Subnet Sprint question right in one round.",
    icon: "network",
    rarity: "rare",
  },
  {
    id: "konami",
    title: "Up Up Down Down",
    description: "Entered the Konami code somewhere on the site.",
    hint: "Old-school cheat code. The classic one.",
    icon: "keyboard",
    rarity: "legendary",
    hidden: true,
  },
  {
    id: "avatar-spam",
    title: "True Fan",
    description: "Clicked the profile avatar ten times in a row.",
    hint: "An avatar can only take so much love.",
    icon: "heart",
    rarity: "rare",
    hidden: true,
  },
  {
    id: "open-store",
    title: "Browsing the Aisles",
    description: "Visited the Store page.",
    icon: "shopping-cart",
    rarity: "common",
  },
  {
    id: "add-to-cart",
    title: "Almost Closed the Deal",
    description: "Added \"Cengiz\" to your cart on the Store page.",
    icon: "shopping-bag",
    rarity: "uncommon",
  },
  {
    id: "checkout",
    title: "Hire Initiated",
    description: "Hit checkout on the Store page (it just opens email — no charges, promise).",
    icon: "credit-card",
    rarity: "rare",
  },
  {
    id: "open-resume",
    title: "Recruiter Mode",
    description: "Opened the resume.",
    icon: "file-text",
    rarity: "common",
  },
  {
    id: "send-message",
    title: "Friend Request Sent",
    description: "Sent a message via the contact form.",
    icon: "send",
    rarity: "uncommon",
  },
  {
    id: "toggle-mute",
    title: "Sound Engineer",
    description: "Toggled the sound effect setting.",
    icon: "volume-2",
    rarity: "common",
  },
  {
    id: "all-pages",
    title: "Cartographer",
    description: "Visited every primary page (Profile, Library, Arcade, Store).",
    icon: "map",
    rarity: "rare",
  },
  {
    id: "play-whack",
    title: "Pest Control",
    description: "Played a round of Whack-a-Bug.",
    icon: "bug",
    rarity: "uncommon",
  },
  {
    id: "whack-30",
    title: "Senior QA",
    description: "Scored 30+ in Whack-a-Bug. Bugs feared you.",
    icon: "bug",
    rarity: "rare",
  },
  {
    id: "first-card",
    title: "First of the Set",
    description: "Earned your first trading card just by hanging around.",
    icon: "sparkles",
    rarity: "uncommon",
  },
  {
    id: "all-cards",
    title: "Completionist",
    description: "Collected every trading card. Foil included.",
    icon: "sparkles",
    rarity: "legendary",
  },
  {
    id: "open-inventory",
    title: "Backpack Check",
    description: "Opened the trading-card inventory.",
    icon: "package",
    rarity: "common",
  },
  {
    id: "watched-replay",
    title: "Year in Code",
    description: "Watched the 2025 Replay. Closure: achieved.",
    icon: "play",
    rarity: "rare",
  },
  {
    id: "play-memory",
    title: "Warm Cache",
    description: "Played a round of Cache Match.",
    icon: "gamepad-2",
    rarity: "uncommon",
  },
  {
    id: "memory-win",
    title: "Cache Hit",
    description: "Cleared the whole Cache Match board.",
    icon: "trophy",
    rarity: "rare",
  },
  {
    id: "play-reflex",
    title: "On the Clock",
    description: "Played a round of Ship It (the reflex bar).",
    icon: "gamepad-2",
    rarity: "uncommon",
  },
  {
    id: "reflex-streak",
    title: "Clean Deploy Streak",
    description: "Hit 5 perfect deploys in a row in Ship It.",
    icon: "trophy",
    rarity: "rare",
  },
  {
    id: "play-echo",
    title: "Listening on Port",
    description: "Played a round of Packet Echo.",
    icon: "gamepad-2",
    rarity: "uncommon",
  },
  {
    id: "echo-master",
    title: "Low Latency",
    description: "Repeated a packet sequence of length 8+ in Packet Echo.",
    icon: "network",
    rarity: "rare",
  },
];

export function getAchievement(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}
