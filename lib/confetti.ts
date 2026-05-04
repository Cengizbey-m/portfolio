"use client";

const COLORS = ["#66c0f4", "#b6c645", "#e1ad21", "#ffffff", "#a679db", "#5c7e10"];

export function fireConfetti(count = 80) {
  if (typeof document === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.createElement("div");
  root.setAttribute("aria-hidden", "true");
  root.style.position = "fixed";
  root.style.inset = "0";
  root.style.pointerEvents = "none";
  root.style.zIndex = "9999";
  document.body.appendChild(root);

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti-piece";
    el.style.left = `${Math.random() * 100}vw`;
    el.style.background = COLORS[i % COLORS.length];
    el.style.transform = `translateY(-10vh) rotate(${Math.random() * 360}deg)`;
    el.style.animationDelay = `${Math.random() * 0.4}s`;
    el.style.animationDuration = `${2 + Math.random() * 1.6}s`;
    root.appendChild(el);
  }

  setTimeout(() => root.remove(), 4000);
}
