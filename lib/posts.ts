import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  accent?: "coral" | "sun" | "mint";
};

export type Post = PostMeta & { contentHtml: string; readingTime: number };

function formatPostMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? "Post sem título"),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    category: String(data.category ?? "Devlog"),
    accent: data.accent === "coral" || data.accent === "sun" || data.accent === "mint" ? data.accent : "mint",
  };
}

export function getSortedPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const { data } = matter(source);
      return formatPostMeta(slug, data);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const processedContent = await remark().use(html).process(content);
  const readingTime = Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));

  return {
    ...formatPostMeta(slug, data),
    contentHtml: processedContent.toString(),
    readingTime,
  };
}

export function formatPostDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${String(day).padStart(2, "0")} ${months[month - 1]} ${year}`;
}
