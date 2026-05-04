export type CardRarity = "common" | "rare" | "foil";

export type TradingCard = {
  id: string;
  title: string;
  flavor: string;
  /** Hex / CSS color for the card art background */
  art: string;
  /** Big monochrome glyph displayed in the card art */
  glyph: string;
  rarity: CardRarity;
};

/**
 * Cards drop from "playing" the portfolio (i.e. having a tab open).
 * Drop one ~every 90s of active time on the site, capped at deck size.
 */
export const cards: TradingCard[] = [
  {
    id: "card-commit",
    title: "The Commit",
    flavor: "Atomic. Conventional. Reverted twice on a Friday.",
    art: "linear-gradient(135deg,#3a4d5e,#1b2838)",
    glyph: "{ }",
    rarity: "common",
  },
  {
    id: "card-coffee",
    title: "The Coffee",
    flavor: "+50% productivity for 22 minutes. Side effect: typing very fast.",
    art: "linear-gradient(135deg,#553a1b,#2a1810)",
    glyph: "☕",
    rarity: "common",
  },
  {
    id: "card-bug",
    title: "The Bug",
    flavor: "Reproduces in production only. Disappears when console.log is added.",
    art: "linear-gradient(135deg,#591a26,#2a0a10)",
    glyph: "🐞",
    rarity: "common",
  },
  {
    id: "card-subnet",
    title: "The Subnet",
    flavor: "/24 of pure bliss. No collisions inside this broadcast domain.",
    art: "linear-gradient(135deg,#1a4a59,#0a262e)",
    glyph: "/24",
    rarity: "rare",
  },
  {
    id: "card-deploy",
    title: "The Deploy",
    flavor: "Push to main, hold breath, release. CI green. Smile.",
    art: "linear-gradient(135deg,#1a5933,#0a2a18)",
    glyph: "▲",
    rarity: "rare",
  },
  {
    id: "card-shipit",
    title: "Ship It",
    flavor: "The most powerful card. Foil. Glowing. Slightly intimidating.",
    art: "linear-gradient(135deg,#e1ad21,#a07000,#e1ad21,#5c4000)",
    glyph: "🚀",
    rarity: "foil",
  },
];

export function getCard(id: string): TradingCard | undefined {
  return cards.find((c) => c.id === id);
}
