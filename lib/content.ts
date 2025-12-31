import path from "path";
import { promises as fs } from "fs";

export const CONTENT_ROOT = path.join(process.cwd(), "content", "projects");

export async function readProjectMdx(slug: string) {
  const filePath = path.join(CONTENT_ROOT, `${slug}.mdx`);
  return await fs.readFile(filePath, "utf8");
}


