import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { hasResumePdf } from "@/lib/resume";
import Link from "next/link";

export const metadata = {
  title: "Resume",
  description: "Resume PDF (download + embedded preview).",
};

export default function ResumePage() {
  const showResume = hasResumePdf();

  if (!showResume) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <SectionHeader
          title="Resume"
          description="Resume will be added soon."
        />
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            In the meantime, you can contact me directly:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <a href="mailto:muhammedcengiz2778@gmail.com">Email</a>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/contact">Contact page</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          title="Resume"
          description="PDF preview and download."
        />
        <Button asChild>
          <a href="/resume.pdf" download>
            Download PDF
          </a>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <iframe
          title="Resume PDF"
          src="/resume.pdf"
          className="h-[78vh] w-full rounded-xl"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        If the PDF preview doesn’t load in your browser, use the download button.
      </p>
    </div>
  );
}


