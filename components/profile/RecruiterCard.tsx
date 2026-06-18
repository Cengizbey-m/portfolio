import Link from "next/link";
import { Briefcase, MapPin, Clock, GraduationCap, BadgeCheck, Download } from "lucide-react";
import { profile } from "@/data/profile";

function Row({ icon: Icon, label, value, accent }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 opacity-70" />
        {label}
      </span>
      <span className={`text-sm font-semibold ${accent ? "text-[hsl(var(--steam-green))]" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

export function RecruiterCard() {
  return (
    <div className="panel overflow-hidden rise-in">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="accent-bar" />
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-foreground">Hire me</p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--steam-green))]/15 px-2 py-0.5 text-[11px] font-semibold text-[hsl(var(--steam-green))]">
          <span className="status-dot status-dot--online" /> Available
        </span>
      </div>

      <div className="divide-y divide-border px-4">
        <Row icon={Briefcase} label="Looking for" value={profile.availability.detail} />
        <Row icon={MapPin} label="Location" value="GTA, Canada" />
        <Row icon={Clock} label="Response" value="< 1 day" accent />
        <Row icon={GraduationCap} label="Graduating" value={profile.education.grad} />
        <Row icon={BadgeCheck} label="Cost to chat" value="Free" accent />
      </div>

      <div className="space-y-2 p-4 pt-3">
        <Link
          href="/store"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition hover:brightness-110"
        >
          <Briefcase className="h-4 w-4" /> Why hire me
        </Link>
        <div className="flex gap-2">
          <Link href="/contact" className="link-pill flex-1 justify-center">
            Contact
          </Link>
          <a href={profile.links.resumePdf} target="_blank" rel="noreferrer" className="link-pill flex-1 justify-center">
            <Download className="h-4 w-4" /> Resume PDF
          </a>
        </div>
      </div>
    </div>
  );
}
