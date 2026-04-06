import fs from "fs";
import path from "path";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { readingTime } from "reading-time-estimator";
import { cache } from "react";

import type { Frontmatter, PostWithScope } from "@/lib/types/posts";

export function getMarkdownExtension(
  fileName: `${string}.md` | `${string}.mdx`
): "md" | "mdx" {
  const match = fileName.match(/\.mdx?$/);

  if (!match) {
    throw new Error(`Unsupported markdown file: ${fileName}`);
  }

  return match[0].substring(1) as "md" | "mdx";
}

export const RE = /\.mdx?$/;

export const getSource = async (
  filename: string
): Promise<string | undefined> => {
  const sourcePath = path.join(process.cwd(), "posts", filename);
  if (!fs.existsSync(sourcePath)) return;
  return await fs.promises.readFile(sourcePath, "utf8");
};

export const getSourceSync = (filename: string): string | undefined => {
  const sourcePath = path.join(process.cwd(), "posts", filename);
  if (!fs.existsSync(sourcePath)) return;
  return fs.readFileSync(sourcePath, "utf8");
};

const readMarkdownFiles = (): string[] => {
  return fs
    .readdirSync(path.join(process.cwd(), "posts"))
    .filter((filePath: string) => RE.test(filePath));
};

export const getMarkdownFiles = cache(readMarkdownFiles);

export const getMarkdownFromSlug = async (
  slug: string
): Promise<
  | {
      source: string;
      format: "md" | "mdx";
    }
  | undefined
> => {
  for (const extension of ["mdx", "md"] as const) {
    const filename = `${slug}.${extension}` as const;
    const fullPath = path.join(process.cwd(), "posts", filename);

    if (!fs.existsSync(fullPath)) continue;

    const source = await getSource(filename);

    if (!source) continue;

    return {
      source,
      format: getMarkdownExtension(filename),
    };
  }
};

const readPostInformation = (
  filename: string
): PostWithScope | undefined => {
  const source = getSourceSync(filename);

  if (!source) return;

  const req = getFrontmatter(source);

  const frontmatter = req.frontmatter as Frontmatter;
  const content = req.strippedSource;

  const post: PostWithScope = {
    ...frontmatter,
    slug: filename.replace(/\.mdx?$/, ""),
    readingTime: readingTime(content).text,
  };

  return post;
};

export const getPostInformation = cache(readPostInformation);

const readPosts = (): PostWithScope[] => {
  const files = getMarkdownFiles();

  return files
    .map((file) => getPostInformation(file))
    .filter((post): post is PostWithScope => post !== undefined);
};

export const getPosts = cache(readPosts);
