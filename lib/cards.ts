"use client";

import { cards } from "@/data/cards";

const STORAGE_KEY = "cengiz.cards.v1";
const TIME_KEY = "cengiz.cards.time.v1";
const EVENT_NAME = "card:dropped";

export type CardDropEvent = { id: string; at: number };

function readOwned(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function writeOwned(map: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {/* ignore */}
}

export function getOwnedCards(): Record<string, number> {
  return readOwned();
}

export function getOwnedCount(): number {
  return Object.keys(readOwned()).length;
}

export function ownAll(): boolean {
  return getOwnedCount() >= cards.length;
}

/** How many seconds the user has spent on the site (across visits). */
export function getActiveSeconds(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(TIME_KEY);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export function setActiveSeconds(n: number) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TIME_KEY, String(n));
  } catch {/* ignore */}
}

/**
 * Try to drop the next undropped card. Returns the dropped card id or null.
 * Cards drop in deck order (predictable, like Steam — first card is always "The Commit").
 */
export function tryDrop(): string | null {
  const owned = readOwned();
  const next = cards.find((c) => !owned[c.id]);
  if (!next) return null;
  owned[next.id] = Date.now();
  writeOwned(owned);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<CardDropEvent>(EVENT_NAME, { detail: { id: next.id, at: owned[next.id] } })
    );
  }
  return next.id;
}

export function onCardDrop(handler: (e: CardDropEvent) => void) {
  if (typeof window === "undefined") return () => {};
  const wrapped = (evt: Event) => handler((evt as CustomEvent<CardDropEvent>).detail);
  window.addEventListener(EVENT_NAME, wrapped);
  return () => window.removeEventListener(EVENT_NAME, wrapped);
}

export function resetCards() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(TIME_KEY);
}
