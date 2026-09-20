import Link from "next/link";
import { ExternalLink, Printer } from "lucide-react";
import { resumeVariantList } from "@/data/resume";
import { SectionHeader } from "@/components/SectionHeader";

/**
 * Private working page, not linked from the nav and not in the sitemap.
 *
 * The public /resume page shows one sheet on purpose: a recruiter who sees three
 * versions of the same person reads it as someone who has not decided what they
 * are. This page is the workbench behind that, for picking which sheet to send.
 */
export const metadata = {
  title: "Resume variants (private)",
  robots: { index: false, follow: false },
};

export default function ResumeVariantsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="panel overflow-hidden">
        <div className="border-b border-border p-4">
          <SectionHeader
            title="Resume variants"
            description="Three sheets, same facts, different emphasis. Match the title line to the posting and send that one."
          />
        </div>

        <div className="p-4">
          <div className="inset mb-4 p-4 text-sm text-muted-foreground">
            <p className="font-semibold uppercase tracking-[0.08em] text-foreground">
              How to export a PDF
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Open the print view for the variant you want.</li>
              <li>
                Press <span className="font-mono">Ctrl+P</span>, choose{" "}
                <span className="font-semibold">Save as PDF</span>.
              </li>
              <li>
                Set paper to <span className="font-semibold">A4</span>, margins to{" "}
                <span className="font-semibold">None</span>, and turn{" "}
                <span className="font-semibold">Headers and footers</span> off. The page box
                already carries the correct margins.
              </li>
              <li>
                Name the file{" "}
                <span className="font-mono">Muhammed-Cengiz-{"{variant}"}.pdf</span>. Recruiters
                see the file name.
              </li>
            </ol>
            <p className="mt-3">
              The full-stack sheet is also the one served at{" "}
              <span className="font-mono">/resume.pdf</span>. Replace that file when it changes.
            </p>
          </div>

          <div className="space-y-3">
            {resumeVariantList.map((v) => (
              <div key={v.id} className="inset p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{v.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Title line on the sheet: <span className="font-mono">{v.role}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/resume/print?variant=${v.id}`}
                      className="link-pill h-9"
                      target="_blank"
                    >
                      <Printer className="h-3.5 w-3.5" /> Print view
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Send this one for: </span>
                  {v.sendWhen}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
