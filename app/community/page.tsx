import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { FriendsPanel } from "@/components/steam/FriendsPanel";
import { AchievementsPanel } from "@/components/steam/AchievementsPanel";
import { ReviewsPanel } from "@/components/steam/ReviewsPanel";
import { GuidesPanel } from "@/components/steam/GuidesPanel";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";

export const metadata = {
  title: "Community",
  description: "Reviews, friends list, achievements, contact, and resume — Steam-style community hub.",
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "reviews", label: "Reviews" },
  { id: "guides", label: "Guides" },
  { id: "friends", label: "Friends" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden">
        <div className="relative h-32 w-full md:h-40">
          <div className="h-full w-full bg-[radial-gradient(800px_240px_at_15%_15%,rgba(102,192,244,0.25),transparent_55%),linear-gradient(180deg,rgba(23,26,33,0.9),rgba(27,40,56,0.9))]" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--steam-link))]">
                Community Hub
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {profile.displayName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Reviews · Friends · Achievements · Contact
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1 border-t border-border bg-black/20 px-3 py-2">
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="rounded px-3 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {t.label}
            </a>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
              <Link href="/about">About</Link>
            </Button>
            <Button variant="secondary" asChild className="normal-case tracking-normal font-medium">
              <Link href="/resume">Resume</Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Overview */}
      <Card id="overview" className="scroll-mt-24">
        <CardHeader>
          <SectionHeader
            title="Hi, I'm Cengiz"
            description="Software developer with a networking background. Welcome to the Community Hub."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Players online
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">1</p>
              <p className="text-[11px] text-muted-foreground">that&rsquo;s me</p>
            </div>
            <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Members
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">∞</p>
              <p className="text-[11px] text-muted-foreground">recruiters welcome</p>
            </div>
            <div className="rounded-sm border border-border bg-white/5 p-3 ring-1 ring-white/10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Server uptime
              </p>
              <p className="mt-1 text-2xl font-bold text-[hsl(var(--steam-green))]">99.9%</p>
              <p className="text-[11px] text-muted-foreground">on a good week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ReviewsPanel id="reviews" />
      <GuidesPanel id="guides" />
      <FriendsPanel id="friends" />
      <AchievementsPanel id="achievements" />

      <Card id="contact" className="scroll-mt-24">
        <CardHeader>
          <SectionHeader
            title="Send Friend Request"
            description="Real talk: this is just the contact form. Replies within a day."
          />
        </CardHeader>
        <CardContent className="pt-4">
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
