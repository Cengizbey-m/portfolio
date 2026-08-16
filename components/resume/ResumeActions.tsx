"use client";

import { Printer, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function ResumeActions({ hasPdf, pdfHref }: { hasPdf: boolean; pdfHref: string }) {
  return (
    <div className="resume-actions mb-5 flex flex-wrap items-center gap-2">
      <div className="mr-auto">
        <p className="eyebrow">Resume</p>
        <h2 className="mt-0.5 text-xl font-bold tracking-tight text-foreground">
          {profile.realName}
        </h2>
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex h-10 items-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition hover:brightness-110"
      >
        <Printer className="h-4 w-4" /> Print or save as PDF
      </button>

      {hasPdf ? (
        <a href={pdfHref} download className="link-pill h-10">
          <Download className="h-4 w-4" /> Download PDF
        </a>
      ) : null}

      <a href={`mailto:${profile.links.email}`} className="link-pill h-10">
        <Mail className="h-4 w-4" /> Email me
      </a>
    </div>
  );
}
