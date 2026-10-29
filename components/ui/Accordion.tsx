import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

/** Native <details> accordion: accessible and works without JavaScript. */
export function Accordion({ items, className, tone = "light" }: { items: AccordionItem[]; className?: string; tone?: "light" | "surface" }) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          className={cn(
            "group rounded-card border border-transparent transition-colors open:border-line",
            tone === "light" ? "bg-surface open:bg-white" : "bg-white",
          )}
          {...(i === 0 ? { open: true } : {})}
        >
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[1.0625rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-white transition-transform duration-300 group-open:rotate-45">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="prose-st max-w-none px-5 pb-5 text-base" dangerouslySetInnerHTML={{ __html: item.a }} />
        </details>
      ))}
    </div>
  );
}
