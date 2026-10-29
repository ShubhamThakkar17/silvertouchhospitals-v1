"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export type SearchItem = { slug: string; title: string; category: string; date: string };

export function BlogSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return items.filter((i) => `${i.title} ${i.category}`.toLowerCase().includes(t)).slice(0, 8);
  }, [q, items]);
  return (
    <div className="relative w-full md:w-96">
      <label className="relative block">
        <span className="sr-only">Search articles</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body" aria-hidden="true" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles"
          aria-controls="blog-search-results"
          className="min-h-[52px] w-full rounded-full border border-line bg-white pl-12 pr-5 text-base text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </label>
      <div id="blog-search-results" aria-live="polite">
        {q.trim().length >= 2 && (
          <ul className="absolute inset-x-0 top-[calc(100%+8px)] z-20 max-h-96 overflow-y-auto rounded-card border border-line bg-white p-2 shadow-xl">
            {hits.length ? (
              hits.map((h) => (
                <li key={h.slug}>
                  <Link href={`/${h.slug}/`} className="block rounded-card px-3 py-2.5 hover:bg-surface">
                    <span className="block font-medium text-ink">{h.title}</span>
                    <span className="block text-sm">{h.category}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-3 py-2.5">No articles found.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
