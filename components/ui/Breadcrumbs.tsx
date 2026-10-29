import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, tone = "light", className }: { items: Crumb[]; tone?: "light" | "dark"; className?: string }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", tone === "dark" ? "text-white/75" : "text-body")}>
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
            {i === all.length - 1 ? (
              <span aria-current="page" className={tone === "dark" ? "text-white" : "text-ink"}>
                {c.name}
              </span>
            ) : (
              <Link href={c.href} className="underline-offset-4 hover:underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
