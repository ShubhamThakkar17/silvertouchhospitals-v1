import { Quote } from "lucide-react";
import { initials, type Testimonial } from "@/content/testimonials";

export function TestimonialCard({ t, tone = "light" }: { t: Testimonial; tone?: "light" | "dark" }) {
  return (
    <figure className={`flex h-full flex-col rounded-card p-7 ${tone === "dark" ? "bg-white/5 text-white/85" : "bg-white"}`}>
      <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-primary font-semibold text-white">
          {initials(t.name)}
        </span>
        <span>
          <span className={`block font-semibold ${tone === "dark" ? "text-white" : "text-ink"}`}>{t.name}</span>
          <span className="block text-sm">Patient review</span>
        </span>
      </figcaption>
    </figure>
  );
}
