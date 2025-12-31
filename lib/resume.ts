import fs from "fs";
import path from "path";

export function hasResumePdf() {
  try {
    const p = path.join(process.cwd(), "public", "resume.pdf");
    return fs.existsSync(p);
  } catch {
    return false;
  }
}


