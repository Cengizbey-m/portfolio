import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import path from "path";
import { promises as fs } from "fs";

export const metadata = {
  title: "Resume",
  description: "Resume PDF (download + embedded preview).",
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
  const resumePublicPath = "/resume.pdf";
  const resumeDiskPath = path.join(process.cwd(), "public", "resume.pdf");
  const hasResume = await fileExists(resumeDiskPath);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            title="Resume"
            description="Download or view the PDF."
          />
          <Button
            asChild
            className="normal-case tracking-normal font-medium"
            disabled={!hasResume}
          >
            <a href={resumePublicPath} download aria-disabled={!hasResume}>
              Download PDF
            </a>
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          {hasResume ? (
            <>
              <div className="overflow-hidden rounded-sm border border-border bg-black/10 ring-1 ring-white/5">
                <iframe
                  title="Resume PDF"
                  src={resumePublicPath}
                  className="h-[78vh] w-full"
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                If the preview doesn’t load in your browser, use the download button.
              </p>
            </>
          ) : (
            <div className="rounded-sm border border-border bg-white/5 p-4 text-sm ring-1 ring-white/10">
              <p className="font-semibold tracking-[0.08em] uppercase text-foreground">
                Resume not uploaded yet
              </p>
              <p className="mt-2 text-muted-foreground">
                Add your PDF at <span className="font-mono">/public/resume.pdf</span> and redeploy.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


