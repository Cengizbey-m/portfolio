"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Expand, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = { kind: "video"; src: string } | { kind: "image"; src: string };

/**
 * The Steam store "highlight" player: one big 16:9 frame on black, a strip of
 * thumbnails underneath, and a slow auto-advance that stops for good the
 * moment the visitor takes over. Clicking the frame opens a full-size viewer.
 */
export function ProjectMedia({
  gallery,
  demoVideo,
  title,
}: {
  gallery?: string[];
  demoVideo?: string;
  title?: string;
}) {
  const slides = React.useMemo<Slide[]>(() => {
    const out: Slide[] = [];
    if (demoVideo) out.push({ kind: "video", src: demoVideo });
    for (const src of gallery ?? []) out.push({ kind: "image", src });
    return out;
  }, [gallery, demoVideo]);

  const images = React.useMemo(() => (gallery ?? []).slice(), [gallery]);
  const [index, setIndex] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  const [hovering, setHovering] = React.useState(false);
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const stripRef = React.useRef<HTMLDivElement>(null);

  const count = slides.length;
  const go = React.useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );
  const takeOver = React.useCallback((i: number) => {
    setAuto(false);
    go(i);
  }, [go]);

  // Auto-advance like the store does, unless motion is unwelcome, a video is
  // on screen, or the pointer is resting on the player.
  React.useEffect(() => {
    if (!auto || hovering || count < 2) return;
    if (slides[index]?.kind === "video") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(index + 1), 5000);
    return () => window.clearTimeout(id);
  }, [auto, hovering, count, index, slides, go]);

  // Keep the selected thumbnail in view inside the strip.
  React.useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.querySelector<HTMLElement>(`[data-idx="${index}"]`);
    if (!strip || !el) return;
    const left = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [index]);

  const close = React.useCallback(() => setOpenIdx(null), []);
  const nextImg = React.useCallback(() => {
    if (openIdx === null || images.length === 0) return;
    setOpenIdx((openIdx + 1) % images.length);
  }, [openIdx, images.length]);
  const prevImg = React.useCallback(() => {
    if (openIdx === null || images.length === 0) return;
    setOpenIdx((openIdx - 1 + images.length) % images.length);
  }, [openIdx, images.length]);

  React.useEffect(() => {
    if (openIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIdx, close, nextImg, prevImg]);

  if (count === 0) return null;
  const current = slides[index];

  return (
    <>
      <div
        className="min-w-0"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="group relative aspect-video w-full overflow-hidden bg-black">
          {current.kind === "video" ? (
            <video
              key={current.src}
              className="h-full w-full object-contain"
              controls
              preload="metadata"
              playsInline
              src={current.src}
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setAuto(false);
                setOpenIdx(images.indexOf(current.src));
              }}
              className="block h-full w-full cursor-zoom-in"
              aria-label={`Open screenshot ${index + 1} of ${count} full size`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.src}
                src={current.src}
                alt={title ? `${title} screenshot ${index + 1}` : ""}
                className="h-full w-full object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <span className="pointer-events-none absolute right-2 top-2 rounded-[2px] bg-black/60 p-1.5 text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
            </button>
          )}

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => takeOver(index - 1)}
                aria-label="Previous"
                className="absolute left-0 top-1/2 grid h-14 w-9 -translate-y-1/2 place-items-center bg-black/45 text-white/80 opacity-0 transition-opacity hover:bg-black/70 hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => takeOver(index + 1)}
                aria-label="Next"
                className="absolute right-0 top-1/2 grid h-14 w-9 -translate-y-1/2 place-items-center bg-black/45 text-white/80 opacity-0 transition-opacity hover:bg-black/70 hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          ) : null}
        </div>

        {count > 1 ? (
          <div
            ref={stripRef}
            className="steam-scroll mt-1.5 flex gap-1.5 overflow-x-auto pb-1.5"
            role="tablist"
            aria-label="Screenshots"
          >
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                data-idx={i}
                aria-selected={i === index}
                aria-label={s.kind === "video" ? "Video" : `Screenshot ${i + 1}`}
                onClick={() => takeOver(i)}
                className={cn(
                  "relative aspect-video w-[116px] shrink-0 overflow-hidden bg-black outline outline-2 -outline-offset-2 transition-[opacity,outline-color]",
                  i === index ? "outline-white opacity-100" : "outline-transparent opacity-60 hover:opacity-100"
                )}
              >
                {s.kind === "video" ? (
                  <span className="grid h-full w-full place-items-center bg-[#0e1720] text-white">
                    <Play className="h-6 w-6" />
                  </span>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.src} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                )}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {openIdx !== null && openIdx >= 0 ? (
        <div
          className="fixed inset-0 z-[100] bg-black/85"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="mx-auto flex min-h-dvh max-w-[90rem] flex-col items-center justify-center gap-3 px-3 py-6">
            <div className="flex w-full items-center justify-between text-xs text-[#8f98a0]">
              <span>
                {openIdx + 1} / {images.length}
              </span>
              <div className="flex items-center gap-2">
                <a href={images[openIdx]} target="_blank" rel="noreferrer" className="steam-btn-soft h-7 text-xs">
                  Open original
                </a>
                <button type="button" onClick={close} className="steam-btn-soft h-7 text-xs" aria-label="Close">
                  Close
                </button>
              </div>
            </div>
            <div className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[openIdx]} alt="" className="mx-auto max-h-[82vh] w-auto max-w-full object-contain" />
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={prevImg}
                    aria-label="Previous screenshot"
                    className="absolute left-0 top-1/2 grid h-16 w-10 -translate-y-1/2 place-items-center bg-black/50 text-white hover:bg-black/80"
                  >
                    <ChevronLeft className="h-7 w-7" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImg}
                    aria-label="Next screenshot"
                    className="absolute right-0 top-1/2 grid h-16 w-10 -translate-y-1/2 place-items-center bg-black/50 text-white hover:bg-black/80"
                  >
                    <ChevronRight className="h-7 w-7" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
