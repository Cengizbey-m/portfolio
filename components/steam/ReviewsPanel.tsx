"use client";

import * as React from "react";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { reviews } from "@/data/reviews";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

export function ReviewsPanel({ id }: { id?: string }) {
  const total = reviews.length;
  const positive = reviews.filter((r) => r.recommended).length;
  const pct = Math.round((positive / total) * 100);

  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader className="flex flex-row items-end justify-between gap-3">
        <SectionHeader
          title="Reviews"
          description="What teammates, clients, and one production server have to say."
        />
        <div className="text-right">
          <p className="text-sm font-semibold text-[hsl(var(--steam-link))]">
            Overwhelmingly Positive
          </p>
          <p className="text-[11px] text-muted-foreground">
            {pct}% of {total} user reviews are positive
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="grid gap-3 md:grid-cols-2">
          {reviews.map((r) => (
            <li
              key={r.author}
              className="overflow-hidden rounded-sm border border-border bg-white/5 ring-1 ring-white/10"
            >
              <div className="flex items-center gap-3 border-b border-border bg-black/30 px-3 py-2">
                {r.recommended ? (
                  <ThumbsUp className="h-5 w-5 text-[hsl(var(--steam-link))]" />
                ) : (
                  <ThumbsDown className="h-5 w-5 text-[hsl(var(--steam-red))]" />
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {r.recommended ? "Recommended" : "Not Recommended"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {r.hoursOnRecord} hrs on record
                  </p>
                </div>
              </div>
              <div className="p-3 text-sm text-muted-foreground">
                <p className="leading-6 text-foreground/90">&ldquo;{r.body}&rdquo;</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>
                    — <span className="text-foreground">{r.author}</span>, {r.role}
                  </span>
                  <span>{r.postedAgo}</span>
                </div>
                <div className="mt-2 flex items-center gap-3 border-t border-border pt-2 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> {r.helpful} helpful
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> {r.funny} funny
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
