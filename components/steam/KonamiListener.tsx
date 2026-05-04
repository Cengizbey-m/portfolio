"use client";

import * as React from "react";
import { unlock } from "@/lib/achievements";
import { sfx } from "@/lib/sound";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiListener() {
  React.useEffect(() => {
    let buffer: string[] = [];
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.push(key);
      if (buffer.length > SEQUENCE.length) buffer = buffer.slice(-SEQUENCE.length);
      if (
        buffer.length === SEQUENCE.length &&
        buffer.every((k, i) => k === SEQUENCE[i])
      ) {
        sfx.konami();
        unlock("konami");
        buffer = [];
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
