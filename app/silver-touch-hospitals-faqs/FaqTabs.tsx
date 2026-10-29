"use client";

import { useEffect, useRef, useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

export type FaqGroup = { id: string; label: string; faqs: { q: string; a: string }[]; href?: string };

/** Accessible tabs (roving tabindex, arrow keys). Every panel stays in the HTML for SEO. */
export function FaqTabs({ groups }: { groups: FaqGroup[] }) {
  const [active, setActive] = useState(groups[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (groups.some((g) => g.id === hash)) setActive(hash);
  }, [groups]);

  const select = (i: number) => {
    const g = groups[(i + groups.length) % groups.length];
    setActive(g.id);
    tabs.current[(i + groups.length) % groups.length]?.focus();
    history.replaceState(null, "", `#${g.id}`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div role="tablist" aria-label="FAQ topics" aria-orientation="vertical" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
        {groups.map((g, i) => (
          <button
            key={g.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${g.id}`}
            aria-selected={active === g.id}
            aria-controls={`panel-${g.id}`}
            tabIndex={active === g.id ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                select(i + 1);
              } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                select(i - 1);
              }
            }}
            className={cn(
              "flex min-h-[48px] shrink-0 items-center justify-between gap-3 rounded-full px-5 text-left font-medium transition-colors lg:rounded-card",
              active === g.id ? "bg-ink text-white" : "bg-surface text-ink hover:bg-line/60",
            )}
          >
            <span className="whitespace-nowrap lg:whitespace-normal">{g.label}</span>
            <span className={cn("text-sm", active === g.id ? "text-white/70" : "text-body")}>{g.faqs.length}</span>
          </button>
        ))}
      </div>
      <div>
        {groups.map((g) => (
          <div key={g.id} role="tabpanel" id={`panel-${g.id}`} aria-labelledby={`tab-${g.id}`} hidden={active !== g.id} tabIndex={0}>
            <h2 className="mb-6 text-h3 font-semibold">{g.label}</h2>
            <Accordion items={g.faqs} />
            {g.href && (
              <a href={g.href} className="mt-6 inline-block font-medium text-primary underline underline-offset-4">
                Go to {g.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
