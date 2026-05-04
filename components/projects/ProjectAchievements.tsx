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
import { getStatsFor } from "@/lib/projectStats";

type ProjectAch = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  unlocked: boolean;
};

const PER_PROJECT: Record<string, ProjectAch[]> = {
  "le-pathetique": [
    { id: "lp-shipped", title: "Solo Hack Shipped", body: "Built, shipped, and demoed Le Pathétique at BearHacks 2026 — solo, in one weekend.", icon: Rocket, unlocked: true },
    { id: "lp-multimodal", title: "Multimodal in One Shot", body: "Gemini Flash handled both vision + creative writing in a single call. No chaining required.", icon: Beaker, unlocked: true },
    { id: "lp-resilient", title: "Wi-Fi Will Not Stop Me", body: "Built an offline mock mode so the demo survives bad venue Wi-Fi or revoked keys.", icon: Shield, unlocked: true },
    { id: "lp-personas", title: "13 Easter Eggs", body: "Six critic personas, thirteen hidden easter eggs. Repeat-play tested.", icon: Award, unlocked: true },
  ],
  thetripman: [
    { id: "tm-shipped", title: "Goes Live", body: "Deployed for a paying client. The site is real and people are booking on it.", icon: Rocket, unlocked: true },
    { id: "tm-cms", title: "Content Pipeline", body: "Wired the CMS so the client can edit copy without calling me at 11 PM.", icon: Code2, unlocked: true },
    { id: "tm-uptime", title: "Two-Nines Club", body: "Site has been up reliably since launch.", icon: CheckCircle2, unlocked: true },
    { id: "tm-secret", title: "Quiet Room", body: "Production code stays private out of respect for the client.", icon: Lock, unlocked: false },
  ],
  "capstone-ai-finance": [
    { id: "ca-eval", title: "Evaluation Owner", body: "Built the evaluation harness — baselines, metrics, the whole thing.", icon: Beaker, unlocked: true },
    { id: "ca-api", title: "Contract Driven", body: "Defined the API between model and frontend so neither team blocked the other.", icon: Box, unlocked: true },
    { id: "ca-team", title: "Team Player", body: "Shipped as part of a 4-person team — code reviews, sprint planning, all of it.", icon: Users, unlocked: true },
    { id: "ca-models", title: "Model Whisperer", body: "Tuned SVR + RF baselines past the naïve forecast.", icon: Award, unlocked: false },
  ],
  "formally-prototype": [
    { id: "fm-onboard", title: "First-Run Polish", body: "Designed an onboarding flow that doesn't make the user configure anything to start.", icon: Eye, unlocked: true },
    { id: "fm-design", title: "Design System Seed", body: "Reusable component library that can grow into a full DS.", icon: Code2, unlocked: true },
    { id: "fm-auth", title: "Locked Down", body: "JWT auth + RBAC scaffolded.", icon: Shield, unlocked: false },
  ],
};

const FALLBACK: ProjectAch[] = [
  { id: "f-shipped", title: "Made It Real", body: "Took an idea, made it run.", icon: Rocket, unlocked: true },
  { id: "f-data", title: "Data Modeled", body: "Schema before code. Migrations on day one.", icon: Database, unlocked: true },
  { id: "f-net", title: "Networked Carefully", body: "Headers, CORS, rate limits — handled.", icon: Network, unlocked: false },
];

export function ProjectAchievements({ slug }: { slug: string }) {
  const list = PER_PROJECT[slug] ?? FALLBACK;
  const stats = getStatsFor(slug);
  const unlockedCount = list.filter((a) => a.unlocked).length;
  return (
    <Card>
      <CardHeader className="flex flex-row items-end justify-between gap-3">
        <SectionHeader
          title="Achievements"
          description={`${unlockedCount} of ${list.length} unlocked · ${stats.achievementsUnlocked} of ${stats.achievementsTotal} per Steam`}
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
