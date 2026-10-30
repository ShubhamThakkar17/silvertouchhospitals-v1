"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FILTER_LABELS, SPECIALITIES, type SpecialityGroup } from "@/content/specialities";
import { cn } from "@/lib/utils";
import { SpecialityCard } from "@/components/cards/SpecialityCard";

const FILTERS: ("all" | SpecialityGroup)[] = ["all", "surgery", "medicine", "care"];

export function SpecialityFilter() {
  const [filter, setFilter] = useState<"all" | SpecialityGroup>("all");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return SPECIALITIES.filter((s) => filter === "all" || s.group === filter).filter(
      (s) =>
        !term ||
        [s.name, s.oneLiner, ...s.conditions, ...s.procedures.map((p) => p.title)].join(" ").toLowerCase().includes(term),
    );
  }, [filter, q]);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter specialities" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-[48px] rounded-full border px-5 font-medium transition-colors",
                filter === f ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink",
              )}
            >
              {f === "all" ? "All" : FILTER_LABELS[f]}
            </button>
          ))}
        </div>
        <label className="relative block md:w-80">
          <span className="sr-only">Search specialities, conditions or treatments</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search e.g. knee, kidney stone"
            className="min-h-[52px] w-full rounded-full border border-line bg-white pl-12 pr-5 text-base text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </div>
      <p className="mt-6 text-sm" aria-live="polite">
        Showing {list.length} of {SPECIALITIES.length}
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {list.map((s) => (
          <li key={s.slug}>
            <SpecialityCard s={s} headingLevel="h2" compactOnMobile />
          </li>
        ))}
      </ul>
      {!list.length && <p className="mt-8 text-lead">No matches. Try another word, or call us and we’ll guide you.</p>}
    </>
  );
}
