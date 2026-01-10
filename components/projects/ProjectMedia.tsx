"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProjectMedia({
  gallery,
  demoVideo,
}: {
  gallery?: string[];
  demoVideo?: string;
}) {
  if ((!gallery || gallery.length === 0) && !demoVideo) return null;

  const images = gallery ?? [];
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  const close = React.useCallback(() => setOpenIdx(null), []);

  const next = React.useCallback(() => {
    if (openIdx === null || images.length === 0) return;
    setOpenIdx((openIdx + 1) % images.length);
  }, [openIdx, images.length]);

  const prev = React.useCallback(() => {
    if (openIdx === null || images.length === 0) return;
    setOpenIdx((openIdx - 1 + images.length) % images.length);
  }, [openIdx, images.length]);

  React.useEffect(() => {
    if (openIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIdx, close, next, prev]);

  return (
    <>
      <Card>
        <CardHeader>
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
            Media
          </p>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {demoVideo ? (
            <div className="overflow-hidden rounded-sm border border-border bg-black/15 ring-1 ring-white/5">
              <video
                className="w-full"
                controls
                preload="metadata"
                playsInline
                src={demoVideo}
              />
            </div>
          ) : null}

          {images.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {images.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setOpenIdx(idx)}
                  className="overflow-hidden rounded-sm border border-border bg-black/10 text-left ring-1 ring-white/5 hover:bg-white/5"
                  aria-label="Open image viewer"
                >
                  <img src={src} alt="" className="h-48 w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {openIdx !== null ? (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="steam-container flex min-h-dvh items-center justify-center py-10">
            <div className="w-full max-w-5xl overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-topbar))] shadow-2xl ring-1 ring-white/10">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                  Image {openIdx + 1} / {images.length}
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={images[openIdx]}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm bg-white/5 px-2 py-1 text-xs font-semibold tracking-[0.12em] text-foreground ring-1 ring-white/10 hover:bg-white/10"
                  >
                    Open original
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-sm bg-white/5 px-2 py-1 text-xs font-semibold tracking-[0.12em] text-foreground ring-1 ring-white/10 hover:bg-white/10"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-[56px_1fr_56px]">
                <button
                  type="button"
                  onClick={prev}
                  className="hidden md:flex items-center justify-center border-r border-border bg-black/20 text-foreground/80 hover:bg-white/5"
                  aria-label="Previous image"
                >
                  ‹
                </button>

                <div className="bg-black/20">
                  <img
                    src={images[openIdx]}
                    alt=""
                    className="max-h-[72vh] w-full object-contain"
                  />
                </div>

                <button
                  type="button"
                  onClick={next}
                  className="hidden md:flex items-center justify-center border-l border-border bg-black/20 text-foreground/80 hover:bg-white/5"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3 md:hidden">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-sm bg-white/5 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-foreground ring-1 ring-white/10 hover:bg-white/10"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-sm bg-white/5 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-foreground ring-1 ring-white/10 hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

