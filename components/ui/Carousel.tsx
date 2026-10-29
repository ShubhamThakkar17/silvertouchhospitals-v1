"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Scroll-snap carousel with arrow buttons and mouse drag (brief 2.5).
 * Touch devices use native swipe. Keyboard users can tab through items.
 */
export function Carousel({
  children,
  label,
  className,
  itemClassName = "w-[85%] sm:w-[48%] lg:w-[31.5%]",
  tone = "light",
}: {
  children: React.ReactNode[];
  label: string;
  className?: string;
  itemClassName?: string;
  tone?: "light" | "dark";
}) {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector("li");
    el.scrollBy({ left: dir * ((item?.clientWidth ?? 300) + 20), behavior: "smooth" });
  };

  const btn = cn(
    "grid h-12 w-12 place-items-center rounded-full border transition-colors",
    tone === "dark" ? "border-white/30 text-white hover:bg-white hover:text-ink" : "border-line bg-white text-ink hover:bg-ink hover:text-white",
  );

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" className={btn} onClick={() => scrollBy(-1)} aria-label="Previous">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" className={btn} onClick={() => scrollBy(1)} aria-label="Next">
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0 [&.dragging]:cursor-grabbing [&.dragging]:snap-none"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          const el = track.current;
          if (!d || !el) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) {
            d.moved = true;
            el.classList.add("dragging");
            el.style.scrollBehavior = "auto";
          }
          el.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          const el = track.current;
          if (el) {
            el.classList.remove("dragging");
            el.style.scrollBehavior = "";
          }
          setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => {
          track.current?.classList.remove("dragging");
          drag.current = null;
        }}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {children.map((child, i) => (
          <li key={i} className={cn("shrink-0 snap-start", itemClassName)}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
