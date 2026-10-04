"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/store", label: "Your Store" },
  { href: "/library", label: "All Projects" },
  { href: "/library/arcade", label: "Arcade" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

/**
 * The blue store bar that sits under the header on every Steam store page.
 * Search jumps to the library with the term pre-filled.
 */
export function StoreSubNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/library?q=${encodeURIComponent(term)}` : "/library");
  }

  return (
    <div className="steam-subnav mb-5 flex h-9 items-center justify-between gap-2 pl-1 pr-1">
      <nav className="flex min-w-0 items-center overflow-x-auto" aria-label="Store">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-[2px] px-3 py-1.5 text-[13px] text-[#e5e5e5] transition-colors hover:bg-white/10 hover:text-white",
                active && "text-white"
              )}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>

      <form onSubmit={onSubmit} role="search" className="hidden shrink-0 items-center sm:flex">
        <label htmlFor="store-search" className="sr-only">
          Search projects
        </label>
        <input
          id="store-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search"
          className="h-[27px] w-44 rounded-l-[3px] border border-r-0 border-black/30 bg-[#316282] px-2 text-[13px] text-white placeholder:text-[#9cc5dc] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#67c1f5] lg:w-56"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid h-[27px] w-[27px] place-items-center rounded-r-[3px] bg-[#67c1f5] text-[#0e2a3d] hover:bg-white"
        >
          <Search className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
