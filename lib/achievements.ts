"use client";

const STORAGE_KEY = "cengiz.achievements.v1";
const EVENT_NAME = "achievement:unlocked";

export type AchievementUnlockEvent = {
  id: string;
  at: number;
};

function read(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function write(map: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function getUnlocked(): Record<string, number> {
  return read();
}

export function isUnlocked(id: string): boolean {
  return Boolean(read()[id]);
}

export function unlock(id: string): boolean {
  if (typeof window === "undefined") return false;
  const map = read();
  if (map[id]) return false;
  map[id] = Date.now();
  write(map);
  window.dispatchEvent(
    new CustomEvent<AchievementUnlockEvent>(EVENT_NAME, {
      detail: { id, at: map[id] },
    })
  );
  return true;
}

export function resetAll() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { id: "__reset__", at: Date.now() } }));
}

export function onUnlock(handler: (e: AchievementUnlockEvent) => void) {
  if (typeof window === "undefined") return () => {};
  const wrapped = (evt: Event) => {
    const e = evt as CustomEvent<AchievementUnlockEvent>;
    handler(e.detail);
  };
  window.addEventListener(EVENT_NAME, wrapped);
  return () => window.removeEventListener(EVENT_NAME, wrapped);
}
