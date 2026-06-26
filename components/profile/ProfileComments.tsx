import Link from "next/link";
import { MessageSquare, Send } from "lucide-react";
import { reviews } from "@/data/reviews";

const AVATAR_COLORS = [
  "bg-[#4b6e8c]",
  "bg-[#6e4b8c]",
  "bg-[#4b8c63]",
  "bg-[#8c6b4b]",
  "bg-[#4b7d8c]",
  "bg-[#8c4b5e]",
];

function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export function ProfileComments() {
  return (
    <section id="comments" className="panel overflow-hidden rise-in scroll-mt-20">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <MessageSquare className="h-4 w-4 text-[hsl(var(--steam-link))]" />
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">Reviews</p>
        <span className="rounded bg-black/30 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground ring-1 ring-white/5">
          {reviews.length}
        </span>
        <span className="ml-auto text-[11px] italic text-muted-foreground">
          Written in good fun — the real way to reach me is below.
        </span>
      </div>

      <ul className="divide-y divide-border">
        {reviews.map((r) => (
          <li key={r.author} className="flex gap-3 px-4 py-4">
            <div
              className={`grid h-10 w-10 shrink-0 place-items-center rounded text-sm font-bold text-white ring-1 ring-white/10 ${colorFor(
                r.author
              )}`}
            >
              {r.author.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-semibold text-[hsl(var(--steam-link))]">{r.author}</span>
                <span className="text-[11px] text-muted-foreground">{r.role}</span>
                <span className="ml-auto text-[11px] text-muted-foreground">{r.postedAgo}</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-foreground/90">{r.body}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Composer — honest: real comments land in my inbox */}
      <div className="border-t border-border bg-black/15 p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded bg-[hsl(var(--steam-link))]/15 text-[hsl(var(--steam-link))] ring-1 ring-[hsl(var(--steam-link))]/20">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="rounded-md border border-border bg-[hsl(var(--muted))] px-3 py-2.5 text-sm text-foreground/80">
              Want to leave a comment? It comes straight to my inbox.
            </div>
            <Link
              href="/contact"
              className="mt-2 inline-flex h-9 items-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] px-4 text-xs font-semibold tracking-[0.06em] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition hover:brightness-110"
            >
              <Send className="h-3.5 w-3.5" /> Post a comment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
