import { Check } from "lucide-react";
import { PACKAGE_NOTE, PACKAGES } from "@/content/packages";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/forms/BookButton";
import { Confirm } from "@/components/ui/Confirm";
import { Reveal } from "@/components/ui/Reveal";

/** Health checkup packages in the Hospic pricing layout (brief 4.8). */
export function Packages({ headingLevel = "h2" }: { headingLevel?: "h2" | "h1" }) {
  return (
    <section className="section bg-surface" aria-labelledby="packages-heading">
      <div className="container">
        <SectionHeading
          id="packages-heading"
          as={headingLevel}
          eyebrow="Health Checkups"
          title="A full body checkup for every stage of life"
          intro="Choose by age. Every package ends with a one-to-one review with a doctor."
          align="center"
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-card p-7 md:p-8",
                  p.highlight ? "bg-ink text-white/80" : "bg-white",
                )}
              >
                <span
                  className={cn(
                    "self-start rounded-full px-3 py-1 text-sm font-semibold",
                    p.highlight ? "bg-white/10 text-white" : "bg-primary-tint text-primary",
                  )}
                >
                  {p.tag}
                </span>
                <h3 className={cn("mt-5 text-2xl font-semibold", p.highlight && "text-white")}>{p.name}</h3>
                <p className="mt-2">{p.summary}</p>
                <p className={cn("mt-6 text-3xl font-semibold", p.highlight ? "text-white" : "text-ink")}>
                  {p.price ? `₹${p.price.toLocaleString("en-IN")}` : "Call for price"}
                </p>
                {!p.price && <Confirm note="package name and ₹ price" className="mt-2 self-start" />}
                <ul className={cn("mt-6 flex-1 space-y-3 border-t pt-6", p.highlight ? "border-white/15" : "border-line")}>
                  {p.inclusions.map((inc) => (
                    <li key={inc} className="flex gap-3">
                      <span className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full", p.highlight ? "bg-white text-ink" : "bg-primary text-white")}>
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className={p.highlight ? "text-white" : "text-ink"}>{inc}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm">{PACKAGE_NOTE}</p>
                <BookButton
                  preset={{ department: "Full Body Checkup" }}
                  variant={p.highlight ? "white" : "primary"}
                  className="mt-5 w-full"
                >
                  Book this checkup
                </BookButton>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
