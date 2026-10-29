/**
 * Imports content from the current WordPress site (silvertouchhospitals.com)
 * into /content/imported and downloads every referenced image into
 * /public/media as WebP.
 *
 *   npm run import            # fetch everything
 *   npm run import -- --no-images
 *
 * Blog posts come from the WP REST API (clean Gutenberg HTML). Pages and
 * doctor profiles are built with WPBakery, whose REST output is raw
 * shortcodes, so those are scraped from the rendered HTML instead
 * (article .entry-content-1).
 */
import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { EXTRA_ASSETS } from "./assets";

const ORIGIN = "https://www.silvertouchhospitals.com";
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "content", "imported");
const MEDIA_DIR = path.join(ROOT, "public", "media");
const SKIP_IMAGES = process.argv.includes("--no-images");

/* ------------------------------------------------------------------ */
/* Source lists                                                         */
/* ------------------------------------------------------------------ */

const SPECIALITY_SLUGS = [
  "critical-care",
  "dentistry",
  "gastroenterology",
  "ear-nose-throat",
  "nephrology",
  "orthopedics-joint-replacement-surgery",
  "bariatric-surgery-ahmedabad",
  "hip-replacement-ahmedabad",
  "full-body-health-checkup",
  "fever-physician-ahmedabad",
  "general-surgery",
  "endocrinologist-diabetes-hospital-ahmedabad",
  "pulmonology",
  "neurology",
  "spine-surgery",
  "urology",
];

const PAGES: { slug: string; url: string }[] = [
  { slug: "home", url: `${ORIGIN}/` },
  { slug: "about-us", url: `${ORIGIN}/about-us/` },
  { slug: "silver-touch-hospitals-faqs", url: `${ORIGIN}/silver-touch-hospitals-faqs/` },
  { slug: "work-with-us", url: `${ORIGIN}/work-with-us/` },
  ...SPECIALITY_SLUGS.map((s) => ({
    slug: s,
    url: `${ORIGIN}/specialities-services/${s}/`,
  })),
];

const DOCTORS: { slug: string; url: string }[] = [
  { slug: "dr-jil-p-patel", url: `${ORIGIN}/dr-jil-p-patel/` },
  ...[
    "dr-chirag-patel",
    "dr-nisarg-patel",
    "dr-manthan-patel",
    "dr-harshil",
    "dr-ishan-shah",
    "dr-priyank-shah",
    "dr-mayur-patel",
    "dr-vikram-patel",
    "dr-ronak-vyas",
    "dr-gopal-singh-rajpurohit-2",
    "dr-manish-hathila",
    "dr-jitendra-shah",
    "dr-vaidik-chauhan",
    "dr-simple-bhadania",
  ].map((s) => ({ slug: s, url: `${ORIGIN}/doctor-team/${s}/` })),
];

/* ------------------------------------------------------------------ */
/* Copy fixes from the rebuild brief (section 12)                       */
/* ------------------------------------------------------------------ */

const TYPO_FIXES: [RegExp, string][] = [
  [/Gastroenterolgy/g, "Gastroenterology"],
  [/Defribilators/gi, "Defibrillators"],
  [/paramadeical/gi, "paramedical"],
  [/\bGenral\b/g, "General"],
  [/Surgical Oncologis\b/g, "Surgical Oncologist"],
  [/Orthope dics/g, "Orthopedics"],
  [/Nirmay Nagar/g, "Nirnay Nagar"],
  [/\bPahladnagar\b/g, "Prahladnagar"],
  [/spacialization/gi, "specialization"],
  [/\bCommited\b/g, "Committed"],
  [/\bcommited\b/g, "committed"],
  [/maxizum/gi, "maximum"],
  [/Visit us at for/g, "Visit us at"],
];

export function fixTypos(s: string): string {
  return TYPO_FIXES.reduce((acc, [re, to]) => acc.replace(re, to), s);
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

async function fetchText(url: string, tries = 4): Promise<string> {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "SilverTouchImporter/1.0" } });
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      return await res.text();
    } catch (err) {
      if (i === tries - 1) throw err;
      await new Promise((r) => setTimeout(r, 2 ** (i + 1) * 1000));
    }
  }
  throw new Error("unreachable");
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n");
}

/** Rewrites an absolute link on the old site into the new site's path. */
export function rewriteHref(href: string): string {
  if (!href) return href;
  let h = href.trim().replace(/^http:\/\//, "https://");
  if (h.startsWith("https://silvertouchhospitals.com")) h = h.replace("https://", "https://www.");
  if (!h.startsWith(ORIGIN)) return href;
  let p = h.slice(ORIGIN.length) || "/";
  if (p.startsWith("/wp-content/")) return h; // media links stay absolute until mapped
  p = p.replace(/^\/dr-jil-p-patel\/?/, "/doctor-team/dr-jil-p-patel/");
  p = p.replace(/^\/testimonails\//, "/testimonials/");
  p = p.replace(/^\/category\/uncategorized\/?$/, "/blogs/");
  p = p.replace(/^\/contact-us\/?#.*$/, "/contact-us/#contactForm");
  return p;
}

/* ------------------------------------------------------------------ */
/* Media                                                                */
/* ------------------------------------------------------------------ */

type MediaEntry = { src: string; width: number; height: number };
const mediaMap: Record<string, MediaEntry> = {};
const mediaFailures: string[] = [];

function normaliseMediaUrl(u: string): string {
  let url = u.trim().replace(/^http:\/\//, "https://");
  if (url.startsWith("//")) url = "https:" + url;
  if (url.startsWith("/wp-content/")) url = ORIGIN + url;
  url = url.replace("https://silvertouchhospitals.com", ORIGIN);
  return url.split("?")[0];
}

/** Downloads an image once, converts to WebP (max 1600px) and records it. */
export async function localMedia(rawUrl: string): Promise<MediaEntry | null> {
  const url = normaliseMediaUrl(rawUrl);
  if (mediaMap[url]) return mediaMap[url];
  const rel = url.replace(`${ORIGIN}/wp-content/`, "").replace(/\.[a-z0-9]+$/i, ".webp");
  if (rel === url) return null; // not a wp-content asset
  const file = path.join(MEDIA_DIR, rel);
  const publicSrc = "/media/" + rel;
  try {
    let buf: Buffer;
    try {
      buf = await fs.readFile(file);
    } catch {
      if (SKIP_IMAGES) return null;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status}`);
      const input = Buffer.from(await res.arrayBuffer());
      buf = await sharp(input)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toBuffer();
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, buf);
    }
    const meta = await sharp(buf).metadata();
    const entry = { src: publicSrc, width: meta.width ?? 0, height: meta.height ?? 0 };
    mediaMap[url] = entry;
    return entry;
  } catch (err) {
    mediaFailures.push(`${url} (${(err as Error).message})`);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* HTML cleaning                                                        */
/* ------------------------------------------------------------------ */

const KEEP_TAGS = new Set([
  "h2", "h3", "h4", "h5", "p", "ul", "ol", "li", "strong", "b", "em", "i", "a", "img",
  "table", "thead", "tbody", "tr", "th", "td", "blockquote", "br", "figure", "figcaption",
]);

const TEMPLATE_LOGOS = /\/2022\/04\/logo[1-5]\.(jpg|png)/;
// Generic stock banner repeated on every speciality page, and the test2 placeholder.
const PLACEHOLDER_IMAGES = /\/2022\/04\/test2?\.jpg/;

export type Faq = { q: string; a: string };

/** Pulls WPBakery toggles (and simple "Q:" paragraph pairs) out as FAQs. */
function extractFaqs($: cheerio.CheerioAPI, root: cheerio.Cheerio<AnyNode>): Faq[] {
  const faqs: Faq[] = [];
  root.find(".vc_toggle").each((_, el) => {
    const t = $(el).find(".vc_toggle_title").first().text();
    const a = $(el).find(".vc_toggle_content").first();
    const q = t.replace(/^\s*Q[:.]\s*/i, "").replace(/\s+/g, " ").trim();
    if (q) faqs.push({ q: fixTypos(q), a: a.html() ?? "" });
    $(el).remove();
  });
  root.find(".vc_tta-panel").each((_, el) => {
    const q = $(el).find(".vc_tta-panel-title").first().text().replace(/^\s*Q[:.]\s*/i, "").replace(/\s+/g, " ").trim();
    const a = $(el).find(".vc_tta-panel-body").first();
    if (q) faqs.push({ q: fixTypos(q), a: a.html() ?? "" });
    $(el).remove();
  });
  return faqs;
}

async function cleanHtml(
  $: cheerio.CheerioAPI,
  root: cheerio.Cheerio<AnyNode>,
): Promise<{ html: string; images: MediaEntry[] }> {
  root.find("script, style, noscript, iframe, form, .servicesBox, .wpb_raw_code, .vc_empty_space, .vc_separator").remove();

  // Template leftover logo strips and placeholder images.
  root.find("img").each((_, img) => {
    const src = $(img).attr("src") ?? "";
    if (TEMPLATE_LOGOS.test(src) || PLACEHOLDER_IMAGES.test(src)) {
      $(img).closest(".wpb_single_image, figure").remove();
      $(img).remove();
    }
  });

  // Unwrap every non-semantic element, deepest first.
  const all = root.find("*").toArray().reverse();
  for (const el of all) {
    if (el.type !== "tag") continue;
    const tag = el.tagName.toLowerCase();
    if (tag === "h1") {
      el.tagName = "h2";
    } else if (tag === "h6") {
      el.tagName = "h4";
    } else if (!KEEP_TAGS.has(tag)) {
      $(el).replaceWith($(el).contents());
      continue;
    }
  }

  const images: MediaEntry[] = [];
  for (const el of root.find("*").toArray()) {
    if (el.type !== "tag") continue;
    const $el = $(el);
    const attrs = { ...el.attribs };
    for (const name of Object.keys(attrs)) {
      if (!["href", "src", "alt", "target"].includes(name)) $el.removeAttr(name);
    }
    if (el.tagName === "a") {
      const href = rewriteHref(attrs.href ?? "");
      if (!href || href === "#") {
        $el.replaceWith($el.contents());
        continue;
      }
      $el.attr("href", href);
      if (/^https?:/.test(href) && !href.startsWith(ORIGIN)) {
        $el.attr("target", "_blank");
        $el.attr("rel", "noopener noreferrer");
      } else {
        $el.removeAttr("target");
      }
    }
    if (el.tagName === "img") {
      const src = attrs.src ?? "";
      const m = await localMedia(src);
      if (!m) {
        $el.remove();
        continue;
      }
      const alt = (attrs.alt ?? "").trim() || altFromFile(src);
      $el.attr("src", m.src);
      $el.attr("alt", alt);
      $el.attr("width", String(m.width));
      $el.attr("height", String(m.height));
      $el.attr("loading", "lazy");
      $el.attr("decoding", "async");
      images.push(m);
    }
  }

  let html = root.html() ?? "";
  html = html
    .replace(/&nbsp;/g, " ")
    .replace(/<(strong|b|em|i)>\s*<\/\1>/g, "")
    .replace(/>\s+</g, (m) => (m.includes("\n") ? ">\n<" : "> <"))
    .replace(/<p>\s*(<br\s*\/?>\s*)*<\/p>/g, "")
    .replace(/<li>\s*<\/li>/g, "")
    .replace(/<(ul|ol)>\s*<\/\1>/g, "")
    .replace(/<figure>\s*<\/figure>/g, "")
    .replace(/\s*<br\s*\/?>\s*<\/(p|li)>/g, "</$1>")
    .replace(/<h([2-4])>\s*<\/h\1>/g, "")
    .replace(/\n{2,}/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
  return { html: fixTypos(html), images };
}

function altFromFile(src: string): string {
  const base = decodeURIComponent(src.split("/").pop() ?? "").replace(/\.[a-z]+$/i, "");
  return base
    .replace(/-\d+x\d+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\d+\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

function meta($: cheerio.CheerioAPI) {
  return {
    seoTitle: fixTypos($("title").first().text().trim()),
    description: fixTypos($('meta[name="description"]').attr("content")?.trim() ?? ""),
    ogImage: $('meta[property="og:image"]').attr("content") ?? null,
  };
}

/* ------------------------------------------------------------------ */
/* Importers                                                            */
/* ------------------------------------------------------------------ */

async function importPage(slug: string, url: string) {
  const html = await fetchText(url);
  const $ = cheerio.load(html);
  const root = $("article .entry-content-1").first();
  const faqs = extractFaqs($, root);
  const faqsClean: Faq[] = [];
  for (const f of faqs) {
    const $a = cheerio.load(`<div id="r">${f.a}</div>`);
    const { html: a } = await cleanHtml($a, $a("#r"));
    faqsClean.push({ q: f.q, a });
  }
  // Drop a now-empty "Frequently Asked Questions" heading.
  if (faqsClean.length) {
    root.find("h2, h3, h4").each((_, h) => {
      if (/frequently asked questions|^faqs?$/i.test($(h).text().trim())) $(h).remove();
    });
  }
  const body = await cleanHtml($, root);
  await writeJson(path.join(OUT, "pages", `${slug}.json`), {
    slug,
    source: url,
    ...meta($),
    h1: $("h1.entry-title").first().text().trim(),
    html: body.html,
    images: body.images,
    faqs: faqsClean,
  });
  console.log(`page   ${slug}  (${faqsClean.length} faqs, ${body.images.length} images)`);
}

async function importDoctor(slug: string, url: string) {
  const html = await fetchText(url);
  const $ = cheerio.load(html);
  const root = $("article .entry-content-1").first();
  const firstImg = root.find("img").first().attr("src") ?? null;
  root.find("img").first().closest(".wpb_single_image").remove();
  const body = await cleanHtml($, root);
  const photo = firstImg ? await localMedia(firstImg) : null;
  await writeJson(path.join(OUT, "doctors", `${slug}.json`), {
    slug,
    source: url,
    ...meta($),
    h1: $("h1.entry-title").first().text().trim(),
    photoSource: firstImg,
    photo,
    html: body.html,
  });
  console.log(`doctor ${slug}`);
}

type WpPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  categories: number[];
  content: { rendered: string };
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_image?: { url: string; width: number; height: number }[];
  };
};

async function importPosts() {
  const cats: { id: number; slug: string; name: string }[] = JSON.parse(
    await fetchText(`${ORIGIN}/wp-json/wp/v2/categories?per_page=100&_fields=id,slug,name`),
  );
  const catById = new Map(cats.map((c) => [c.id, c.slug]));
  const posts: WpPost[] = JSON.parse(
    await fetchText(
      `${ORIGIN}/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,date,modified,title,categories,content,yoast_head_json`,
    ),
  );
  for (const p of posts) {
    const $ = cheerio.load(`<div id="r">${p.content.rendered}</div>`);
    const body = await cleanHtml($, $("#r"));
    const og = p.yoast_head_json?.og_image?.[0];
    const image = og ? await localMedia(og.url) : null;
    const title = cheerio.load(p.title.rendered).text();
    await writeJson(path.join(OUT, "posts", `${p.slug}.json`), {
      slug: p.slug,
      source: `${ORIGIN}/${p.slug}/`,
      title: fixTypos(title),
      seoTitle: fixTypos(p.yoast_head_json?.title ?? title),
      description: fixTypos(p.yoast_head_json?.description ?? ""),
      date: p.date,
      modified: p.modified,
      categories: p.categories.map((id) => catById.get(id)).filter(Boolean),
      image: image ? { ...image, alt: title } : null,
      html: body.html,
    });
  }
  console.log(`posts  ${posts.length}`);
}

/** Removes files in /public/media that are no longer referenced. */
async function pruneMedia(keep: Set<string>) {
  const walk = async (dir: string): Promise<string[]> => {
    const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
    const nested = await Promise.all(
      entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
    );
    return nested.flat();
  };
  for (const file of await walk(MEDIA_DIR)) {
    const src = "/media/" + path.relative(MEDIA_DIR, file).split(path.sep).join("/");
    if (!keep.has(src)) await fs.unlink(file);
  }
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  for (const p of PAGES) await importPage(p.slug, p.url);
  for (const d of DOCTORS) await importDoctor(d.slug, d.url);
  await importPosts();
  for (const url of EXTRA_ASSETS) await localMedia(url);

  const sorted = Object.fromEntries(Object.entries(mediaMap).sort(([a], [b]) => a.localeCompare(b)));
  await writeJson(path.join(OUT, "media.json"), sorted);
  console.log(`media  ${Object.keys(mediaMap).length} files`);
  if (!SKIP_IMAGES) await pruneMedia(new Set(Object.values(mediaMap).map((m) => m.src)));
  if (mediaFailures.length) {
    console.warn(`\n${mediaFailures.length} media downloads failed:\n  ` + mediaFailures.join("\n  "));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
