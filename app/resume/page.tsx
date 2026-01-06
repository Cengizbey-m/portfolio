import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Resume",
  description: "Resume PDF (download + embedded preview).",
};

export default function ResumePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            title="Resume"
            description="Add your PDF at /public/resume.pdf (then this page will show it)."
          />
          <Button asChild className="normal-case tracking-normal font-medium">
            <a href="/resume.pdf" download>
              Download PDF
            </a>
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-hidden rounded-sm border border-border bg-black/10 ring-1 ring-white/5">
            <iframe
              title="Resume PDF"
              src="/resume.pdf"
              className="h-[78vh] w-full"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            If the PDF preview doesn’t load in your browser, use the download button.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


