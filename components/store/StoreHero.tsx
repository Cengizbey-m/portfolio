"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Tag,
  Star,
  Award,
  Calendar,
  Globe2,
  Cpu,
  HardDrive,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { sfx } from "@/lib/sound";
import { unlock } from "@/lib/achievements";
import { fireConfetti } from "@/lib/confetti";

const features = [
  {
    icon: Zap,
    title: "Ships features end-to-end",
    body: "From schema to deployment. Comfortable across the stack and won't bounce a ticket because it touches Postgres.",
  },
  {
    icon: Globe2,
    title: "Networking native",
    body: "SDNE student — IP/subnetting, IPv6, security fundamentals. Reads packet captures for fun.",
  },
  {
    icon: Cpu,
    title: "AI/ML prototyping",
    body: "Python + notebooks. Knows when to use a model and when 'if/else' is the better answer.",
  },
  {
    icon: Award,
    title: "Production-minded",
    body: "Code reviews, tests when they matter, observability basics, sane env management.",
  },
];

const screenshots = [
  "/images/Tripman-general.png",
  "/images/Feather-marketstatic.png",
  "/images/Formally-Home.png",
  "/images/Tripman-bio.png",
  "/images/Feather-charts.png",
];

export function StoreHero() {
  const [inCart, setInCart] = React.useState(false);
  const [wishlisted, setWishlisted] = React.useState(false);
  const [selected, setSelected] = React.useState(0);

  function addToCart() {
    sfx.click();
    setInCart(true);
    unlock("add-to-cart");
  }

  function checkout() {
    sfx.unlock();
    fireConfetti(120);
    unlock("checkout");
    if (typeof window !== "undefined") {
      window.location.href = `mailto:${profile.links.email}?subject=Checkout%20%E2%80%94%20Hire%20Cengiz&body=Hi%20Cengiz%2C%0A%0AI%20opened%20your%20Steam%20store%20page%20and%20clicked%20checkout.%20I'd%20like%20to%20chat%20about%3A%0A%0A-%20%5Brole%20%2F%20project%5D%0A-%20%5Btimeline%5D%0A-%20%5Bnext%20step%5D%0A%0AThanks!`;
    }
  }

  return (
    <div className="space-y-6">
      {/* Tag pill (Steam: New release / Sale / etc.) */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded bg-[hsl(var(--steam-green))]/20 px-2 py-1 font-semibold uppercase tracking-[0.18em] text-[hsl(var(--steam-green))] ring-1 ring-[hsl(var(--steam-green))]/40">
          New &amp; Trending
        </span>
        <span className="rounded bg-[hsl(var(--steam-orange))]/20 px-2 py-1 font-semibold uppercase tracking-[0.18em] text-[hsl(var(--steam-orange))] ring-1 ring-[hsl(var(--steam-orange))]/40">
          On sale · -100% cost to ask
        </span>
        <span className="text-muted-foreground">|</span>
        <Link href="/library" className="text-[hsl(var(--steam-link))] hover:underline">
          ← Back to library
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Hire Cengiz
      </h1>
      <p className="text-sm text-muted-foreground md:text-base">
        A full-stack developer with a strong networking foundation. SDNE @ Sheridan College, graduating 2026.
      </p>

      {/* Hero: screenshots + buy box */}
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-md border border-border bg-black/30 ring-1 ring-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshots[selected]}
              alt=""
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {screenshots.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setSelected(i);
                  sfx.hover();
                }}
                className={`overflow-hidden rounded-sm ring-1 ring-white/10 transition ${
                  selected === i ? "outline outline-2 outline-[hsl(var(--steam-link))]" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="aspect-[16/9] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-3">
          <div className="overflow-hidden rounded-md border border-border bg-[hsl(var(--steam-panel))] ring-1 ring-white/5">
            <div className="border-b border-border p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Product
              </p>
              <p className="text-base font-semibold text-foreground">Cengiz · Full-stack edition</p>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[hsl(var(--steam-green))]/30 px-1.5 py-0.5 text-[11px] font-bold text-[hsl(var(--steam-green))]">
                  -100%
                </span>
                <span className="text-xs text-muted-foreground line-through">Way too much</span>
                <span className="ml-auto text-2xl font-extrabold tracking-tight text-foreground">
                  Free <span className="text-sm font-medium text-muted-foreground">to chat</span>
                </span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Includes: code reviews, deploys, real shipped projects. Excludes: crypto, scope creep.
              </p>

              <div className="mt-3 flex flex-col gap-2">
                {!inCart ? (
                  <Button onClick={addToCart}>
                    <ShoppingCart className="h-4 w-4" /> Add to cart
                  </Button>
                ) : (
                  <Button onClick={checkout}>
                    <Tag className="h-4 w-4" /> Checkout (opens email)
                  </Button>
                )}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setWishlisted((v) => !v);
                    sfx.click();
                  }}
                  className="normal-case tracking-normal font-medium"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlisted ? "fill-[hsl(var(--steam-red))] text-[hsl(var(--steam-red))]" : ""
                    }`}
                  />
                  {wishlisted ? "Wishlisted" : "Add to wishlist"}
                </Button>
                <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
                  <Link href="/contact">Send a message</Link>
                </Button>
                <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
                  <Link href="/resume">View resume</Link>
                </Button>
              </div>

              {inCart && (
                <p className="mt-3 rounded-sm bg-[hsl(var(--steam-green))]/15 p-2 text-[11px] text-[hsl(var(--steam-green))] ring-1 ring-[hsl(var(--steam-green))]/30">
                  Added to cart. Hit checkout when you&rsquo;re ready — it just opens an email.
                </p>
              )}
            </div>
          </div>

          {/* Rating tile */}
          <div className="rounded-md border border-border bg-[hsl(var(--steam-panel))] p-3 ring-1 ring-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              All Reviews
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[hsl(var(--steam-link))]">
              Overwhelmingly Positive
              <span className="text-[11px] text-muted-foreground">(4 reviews)</span>
            </p>
            <div className="mt-1 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[hsl(var(--steam-gold))] text-[hsl(var(--steam-gold))]" />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-md border border-border bg-[hsl(var(--steam-panel))] p-3 ring-1 ring-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Popular tags for this product
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Full-stack",
                "Next.js",
                "TypeScript",
                "Networking",
                "PostgreSQL",
                "AI/ML",
                "Co-op-ready",
                "New-grad",
                "Indie",
                "Story-rich",
              ].map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* About this product */}
      <section className="rounded-md border border-border bg-[hsl(var(--steam-panel))] p-4 ring-1 ring-white/5">
        <h2 className="text-lg font-semibold text-foreground">About this product</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Cengiz is a single-player, co-op-friendly, story-rich full-stack developer with deep
          systems-and-networks DLC. Optimized for new-grad and co-op slots. Auto-saves on every
          deploy. Multiplayer mode supported (pairs well with senior engineers).
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <li
                key={f.title}
                className="flex gap-3 rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--steam-link))]" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs leading-6 text-muted-foreground">{f.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* System requirements */}
      <section className="rounded-md border border-border bg-[hsl(var(--steam-panel))] p-4 ring-1 ring-white/5">
        <h2 className="text-lg font-semibold text-foreground">System requirements</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Minimum
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><HardDrive className="mr-1 inline h-3.5 w-3.5" /> Storage: a Slack channel</li>
              <li><Cpu className="mr-1 inline h-3.5 w-3.5" /> CPU: any laptop with Node.js</li>
              <li><Calendar className="mr-1 inline h-3.5 w-3.5" /> Internet: required for stand-ups</li>
              <li><CheckCircle2 className="mr-1 inline h-3.5 w-3.5" /> Patience: low — ships fast</li>
            </ul>
          </div>
          <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Recommended
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><HardDrive className="mr-1 inline h-3.5 w-3.5" /> Storage: real GitHub repo</li>
              <li><Cpu className="mr-1 inline h-3.5 w-3.5" /> CPU: a CI runner that doesn&rsquo;t suck</li>
              <li><Calendar className="mr-1 inline h-3.5 w-3.5" /> Schedule: 4-month co-op or full-time</li>
              <li><CheckCircle2 className="mr-1 inline h-3.5 w-3.5" /> Bonus: senior teammates to learn from</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
