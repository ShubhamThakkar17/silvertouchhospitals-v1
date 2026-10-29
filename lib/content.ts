import "server-only";
import fs from "node:fs";
import path from "node:path";
import { CATEGORY_BY_SLUG } from "@/content/categories";
import { SPECIALITIES, SPECIALITY_BY_SLUG, type Speciality } from "@/content/specialities";
import type { Img } from "@/lib/media";

const DIR = path.join(process.cwd(), "content", "imported");

function readJson<T>(...parts: string[]): T | null {
  const file = path.join(DIR, ...parts);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

export type Faq = { q: string; a: string };

export type ImportedPage = {
  slug: string;
  source: string;
  seoTitle: string;
  description: string;
  h1: string;
  html: string;
  images: Img[];
  faqs: Faq[];
};

export type Post = {
  slug: string;
  source: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  modified: string;
  categories: string[];
  image: (Img & { alt: string }) | null;
  html: string;
};

/* ------------------------------- Pages ------------------------------- */

export function getImportedPage(slug: string) {
  return readJson<ImportedPage>("pages", `${slug}.json`);
}

export type SpecialityPage = Speciality & { body: ImportedPage | null; faqs: Faq[] };

export function getSpeciality(slug: string): SpecialityPage | null {
  const s = SPECIALITY_BY_SLUG[slug];
  if (!s) return null;
  const body = getImportedPage(slug);
  return { ...s, body, faqs: [...(body?.faqs ?? []), ...(s.extraFaqs ?? [])] };
}

export function getAllSpecialities() {
  return SPECIALITIES.map((s) => getSpeciality(s.slug)!);
}

/* ------------------------------- Posts ------------------------------- */

let postsCache: Post[] | null = null;

/** All posts, newest first. "uncategorized" is retired (brief 9). */
export function getPosts(): Post[] {
  if (postsCache) return postsCache;
  const files = fs.readdirSync(path.join(DIR, "posts")).filter((f) => f.endsWith(".json"));
  postsCache = files
    .map((f) => readJson<Post>("posts", f)!)
    .map((p) => {
      const cats = p.categories.filter((c) => c !== "uncategorized" && CATEGORY_BY_SLUG[c]);
      return { ...p, categories: cats.length ? cats : ["multispeciality-hospital"] };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  return postsCache;
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug) ?? null;
}

export function getPostsByCategory(slug: string) {
  return getPosts().filter((p) => p.categories.includes(slug));
}

export function getPostsForCategories(cats: string[], limit = 3, exclude?: string) {
  const hits = getPosts().filter((p) => p.slug !== exclude && p.categories.some((c) => cats.includes(c)));
  return hits.slice(0, limit);
}

/** Related posts: same category first, then newest. */
export function getRelatedPosts(post: Post, limit = 3) {
  const same = getPostsForCategories(post.categories, limit, post.slug);
  if (same.length >= limit) return same;
  const rest = getPosts().filter((p) => p.slug !== post.slug && !same.includes(p));
  return [...same, ...rest].slice(0, limit);
}

export function primarySpecialityForPost(post: Post) {
  for (const c of post.categories) {
    const s = CATEGORY_BY_SLUG[c]?.speciality;
    if (s) return SPECIALITY_BY_SLUG[s];
  }
  return null;
}

export const POSTS_PER_PAGE = 9;
