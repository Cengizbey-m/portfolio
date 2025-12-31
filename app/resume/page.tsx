import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Resume",
  description: "Resume PDF (download + embedded preview).",
};

export default function ResumePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          title="Resume"
          description="Add your PDF at /public/resume.pdf (then this page will show it)."
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


