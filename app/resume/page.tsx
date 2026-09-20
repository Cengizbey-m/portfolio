import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";
import { Download, Mail, Printer, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeader } from "@/components/SectionHeader";
import { ResumeDocument } from "@/components/resume/ResumeDocument";

export const metadata = {
  title: "Resume",
  description:
    "One-page resume for Muhammed Cengiz, full-stack developer in the Greater Toronto Area. Canadian permanent resident.",
};

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * The sheet is rendered live from `data/resume.ts` rather than embedded as a
 * PDF. The PDF is a static file that goes stale the moment the data changes,
 * and a stale resume on the site is worse than no resume. The download button
 * still hands over a PDF for anyone who wants to file one.
 *
 * Only the full-stack variant is public. The QA and solutions sheets live at
 * /resume/variants, which is noindex and not linked from the nav: a recruiter
 * who sees three versions of the same person reads it as indecision.
 */
export default async function ResumePage() {
  const resumePublicPath = profile.links.resumePdf;
  const hasResume = await fileExists(path.join(process.cwd(), "public", "resume.pdf"));

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title="Resume"
            description="One page. Last updated September 2026."
          />
          <div className="flex flex-wrap gap-2">
            {hasResume ? (
              <a
                href={resumePublicPath}
                download="Muhammed-Cengiz-Full-Stack-Developer.pdf"
                className="inline-flex h-10 items-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition hover:brightness-110"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            ) : null}
            <Link href="/resume/print" className="link-pill h-10" target="_blank">
              <Printer className="h-4 w-4" /> Print view
              <ExternalLink className="h-3 w-3" />
            </Link>
            <a href={`mailto:${profile.links.email}`} className="link-pill h-10">
              <Mail className="h-4 w-4" /> Email me
            </a>
          </div>
        </div>

        {/* The sheet itself. It is a white A4 page on a dark site on purpose:
            it reads as paper, which is what it is. Horizontal scroll is kept
            inside this container so the page body never scrolls sideways. */}
        <div className="overflow-x-auto bg-[#525659] p-4 sm:p-6">
          <div className="mx-auto w-full min-w-[320px] max-w-[210mm] shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
            <ResumeDocument />
          </div>
        </div>
      </div>
    </div>
  );
}
