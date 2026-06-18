"use client";

const MUTE_KEY = "cengiz.muted.v1";

let ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  return ctx;
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(MUTE_KEY) === "1";
}

export function setMuted(value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  window.dispatchEvent(new CustomEvent("sound:muted", { detail: { muted: value } }));
}

export function onMuteChange(handler: (muted: boolean) => void) {
  if (typeof window === "undefined") return () => {};
  const wrapped = (e: Event) => {
    const detail = (e as CustomEvent<{ muted: boolean }>).detail;
    handler(detail.muted);
  };
  window.addEventListener("sound:muted", wrapped);
  return () => window.removeEventListener("sound:muted", wrapped);
}

type Tone = {
  freq: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
};

function playTones(tones: Tone[]) {
  if (isMuted()) return;
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") audio.resume().catch(() => {});

  let t = audio.currentTime;
  for (const tone of tones) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = tone.type ?? "sine";
    osc.frequency.value = tone.freq;
    const peak = tone.gain ?? 0.045;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peak, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + tone.duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(t);
    osc.stop(t + tone.duration + 0.02);
    t += tone.duration;
  }
}

export const sfx = {
  hover: () => playTones([{ freq: 660, duration: 0.05, type: "sine", gain: 0.02 }]),
  click: () => playTones([{ freq: 880, duration: 0.06, type: "triangle", gain: 0.04 }]),
  unlock: () =>
    playTones([
      { freq: 523.25, duration: 0.09, type: "triangle" },
      { freq: 659.25, duration: 0.09, type: "triangle" },
      { freq: 783.99, duration: 0.16, type: "triangle" },
    ]),
  notify: () =>
    playTones([
      { freq: 660, duration: 0.07, type: "sine" },
      { freq: 990, duration: 0.1, type: "sine" },
    ]),
  konami: () =>
    playTones([
      { freq: 523.25, duration: 0.08, type: "square", gain: 0.05 },
      { freq: 659.25, duration: 0.08, type: "square", gain: 0.05 },
      { freq: 783.99, duration: 0.08, type: "square", gain: 0.05 },
      { freq: 1046.5, duration: 0.18, type: "square", gain: 0.05 },
    ]),
  arcadeEat: () => playTones([{ freq: 1200, duration: 0.05, type: "square", gain: 0.04 }]),
  tone: (freq: number, duration = 0.22) =>
    playTones([{ freq, duration, type: "sine", gain: 0.05 }]),
  arcadeOver: () =>
    playTones([
      { freq: 392, duration: 0.12, type: "sawtooth", gain: 0.05 },
      { freq: 311.13, duration: 0.16, type: "sawtooth", gain: 0.05 },
      { freq: 233.08, duration: 0.22, type: "sawtooth", gain: 0.05 },
    ]),
};
