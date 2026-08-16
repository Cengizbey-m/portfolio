"use client";

import {
  Award,
  Beaker,
  Box,
  CheckCircle2,
  Code2,
  Database,
  Eye,
  Lock,
  Network,
  Rocket,
  Shield,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";

type ProjectAch = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  unlocked: boolean;
};

const PER_PROJECT: Record<string, ProjectAch[]> = {
  "le-pathetique": [
    { id: "lp-shipped", title: "Solo Hack Shipped", body: "Built, shipped, and demoed Le Pathétique at BearHacks 2026, solo, in one weekend.", icon: Rocket, unlocked: true },
    { id: "lp-multimodal", title: "Multimodal in One Shot", body: "Gemini Flash handled vision and creative writing in a single call. No chaining required.", icon: Beaker, unlocked: true },
    { id: "lp-resilient", title: "Wi-Fi Will Not Stop Me", body: "An offline mock mode keeps the demo alive when venue Wi-Fi or an API key dies.", icon: Shield, unlocked: true },
    { id: "lp-personas", title: "13 Easter Eggs", body: "Six critic personas, thirteen hidden easter eggs. Repeat-play tested.", icon: Award, unlocked: true },
  ],
  thetripman: [
    { id: "tm-shipped", title: "Goes Live", body: "Deployed for a paying client. Real customers book and pay on it.", icon: Rocket, unlocked: true },
    { id: "tm-stripe", title: "Money Moves", body: "Stripe wired end to end. A booking confirms only after the webhook says payment settled.", icon: CheckCircle2, unlocked: true },
    { id: "tm-admin", title: "Made Myself Optional", body: "An admin dashboard so the owner runs daily operations without calling me.", icon: Code2, unlocked: true },
    { id: "tm-secret", title: "Quiet Room", body: "Production code stays private out of respect for the client.", icon: Lock, unlocked: false },
  ],
  "capstone-ai-finance": [
    { id: "ca-first", title: "First Place", body: "Judged #1 out of 50+ projects at Sheridan's 2026 capstone showcase. Graded 97/100.", icon: Award, unlocked: true },
    { id: "ca-authfix", title: "Found the Hole", body: "The API trusted a header as proof of identity. Anyone could read any account. I proved it against production, then built the gateway that closed it.", icon: Shield, unlocked: true },
    { id: "ca-rls", title: "Twelve Tables Later", body: "Audited the database, found 12 tables with Row Level Security switched off, and wrote the migration that fixed it.", icon: Lock, unlocked: true },
    { id: "ca-eval", title: "Evaluation Owner", body: "Built the harness that scores every model against a naive baseline, so the UI can be honest.", icon: Beaker, unlocked: true },
    { id: "ca-api", title: "Contract Driven", body: "Defined the API between model and frontend so neither half of the team sat blocked.", icon: Box, unlocked: true },
    { id: "ca-team", title: "Team Player", body: "A year with a team of four: code review, sprint planning, and the boring coordination that makes it work.", icon: Users, unlocked: true },
  ],
  "formally-prototype": [
    { id: "fm-onboard", title: "First-Run Polish", body: "An onboarding flow that gets you training before it asks you to configure anything.", icon: Eye, unlocked: true },
    { id: "fm-design", title: "Design System Seed", body: "A reusable component library that outlived the prototype it was built for.", icon: Code2, unlocked: true },
    { id: "fm-auth", title: "Locked Down", body: "JWT auth with role-based access, so admin and member views diverge safely.", icon: Shield, unlocked: false },
  ],
  puffy: [
    { id: "pf-client", title: "Second Real Client", body: "Designed and shipped a website for a real local patisserie.", icon: Rocket, unlocked: true },
    { id: "pf-mobile", title: "Mobile-First", body: "Designed at phone width first, because that is where local customers actually look.", icon: Eye, unlocked: true },
    { id: "pf-local", title: "Found on Google", body: "A QR-code menu and Google Business listing are in progress to bring walk-ins online.", icon: Network, unlocked: false },
  ],
  bloom: [
    { id: "bl-product", title: "Product From Scratch", body: "Designed and shipped a full life planner end to end, solo. Live right now.", icon: Rocket, unlocked: true },
    { id: "bl-focus", title: "Sync That Disappears", body: "Offline-first writes, debounced cloud sync, realtime across every signed-in device.", icon: Eye, unlocked: true },
    { id: "bl-rls", title: "Locked at the Database", body: "Row Level Security across 10 Postgres tables. A frontend bug cannot leak another account.", icon: Shield, unlocked: true },
    { id: "bl-ship", title: "Everywhere at Once", body: "Public launch on web, iOS, and Android is in progress.", icon: Code2, unlocked: false },
  ],
};

const FALLBACK: ProjectAch[] = [
  { id: "f-shipped", title: "Made It Real", body: "Took an idea, made it run.", icon: Rocket, unlocked: true },
  { id: "f-data", title: "Data Modeled", body: "Schema before code. Migrations on day one.", icon: Database, unlocked: true },
  { id: "f-net", title: "Networked Carefully", body: "Headers, CORS, and rate limits handled.", icon: Network, unlocked: false },
];

export function ProjectAchievements({ slug }: { slug: string }) {
  const list = PER_PROJECT[slug] ?? FALLBACK;
  const unlockedCount = list.filter((a) => a.unlocked).length;
  return (
    <Card>
      <CardHeader className="flex flex-row items-end justify-between gap-3">
        <SectionHeader
          title="Achievements"
          description={`${unlockedCount} of ${list.length} unlocked`}
        />
        <Trophy className="h-4 w-4 text-[hsl(var(--steam-gold))]" />
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="grid gap-2 sm:grid-cols-2">
          {list.map((a) => {
            const Icon = a.icon;
            return (
              <li
                key={a.id}
                className={`flex items-start gap-3 rounded-sm border bg-white/5 p-3 ring-1 ring-white/10 ${
                  a.unlocked ? "border-border" : "border-border opacity-60"
                }`}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-black/30 ring-1 ring-white/10">
                  {a.unlocked ? (
                    <Icon className="h-5 w-5 text-[hsl(var(--steam-link))]" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {a.unlocked ? a.title : "Hidden achievement"}
                  </p>
                  <p className="line-clamp-2 text-[11px] leading-5 text-muted-foreground">
                    {a.unlocked ? a.body : "Keep playing this project to find out."}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
