import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";
import { Download, Mail, FileText, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeader } from "@/components/SectionHeader";

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

export default async function ResumePage() {
  const resumePublicPath = profile.links.resumePdf;
  const hasResume = await fileExists(path.join(process.cwd(), "public", "resume.pdf"));

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title="Resume"
            description="One page. Read it here or download the PDF."
          />
          <div className="flex flex-wrap gap-2">
            {hasResume ? (
              <a
                href={resumePublicPath}
                download
                className="inline-flex h-10 items-center gap-2 rounded-sm bg-[linear-gradient(180deg,rgba(102,192,244,0.95),rgba(26,68,194,0.95))] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition hover:brightness-110"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            ) : null}
            <a href={`mailto:${profile.links.email}`} className="link-pill h-10">
              <Mail className="h-4 w-4" /> Email me
            </a>
          </div>
        </div>

        <div className="p-4">
          {hasResume ? (
            <>
              <div className="overflow-hidden rounded-sm border border-border bg-[#525659] ring-1 ring-white/5">
                <iframe
                  title="Resume, one page PDF"
                  src={`${resumePublicPath}#view=FitH&toolbar=1`}
                  className="h-[80vh] max-h-[1100px] w-full"
                />
              </div>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>If the preview does not load in your browser, use the download button.</span>
                <Link href="/resume/print" className="steam-link inline-flex items-center gap-1 font-semibold">
                  <FileText className="h-3.5 w-3.5" /> Read it as a page
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </p>
            </>
          ) : (
            <div className="inset p-4 text-sm">
              <p className="font-semibold uppercase tracking-[0.08em] text-foreground">
                Resume not uploaded yet
              </p>
              <p className="mt-2 text-muted-foreground">
                Add the PDF at <span className="font-mono">/public/resume.pdf</span> and redeploy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
