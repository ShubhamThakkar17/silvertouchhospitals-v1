export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function readingTime(html: string) {
  const words = stripHtml(html).split(" ").length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/** Adds ids to h2/h3 and returns the table of contents. */
export function withHeadingIds(html: string) {
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const text = stripHtml(inner);
    let id = slugify(text) || "section";
    while (used.has(id)) id += "-x";
    used.add(id);
    toc.push({ id, text, level: Number(level) as 2 | 3 });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: out, toc };
}

/**
 * Shifts headings so the highest level in migrated copy is h2 (the page owns
 * the h1). WordPress authors often skipped straight from h1 to h3.
 */
export function normaliseHeadings(html: string) {
  const levels = Array.from(html.matchAll(/<h([2-6])[\s>]/g), (m) => Number(m[1]));
  if (!levels.length) return html;
  const shift = Math.min(...levels) - 2;
  if (shift <= 0) return html;
  return html.replace(/<(\/?)h([2-6])([\s>])/g, (_, slash: string, n: string, end: string) => `<${slash}h${Number(n) - shift}${end}`);
}
