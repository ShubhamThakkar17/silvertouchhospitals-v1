import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/content/faqs";

/** FAQ: heading + "Get in touch" left, accordion right; emits FAQPage JSON-LD (brief 2.4 #12, 8). */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  surface = false,
  schema = true,
}: {
  faqs: Faq[];
  title?: string;
  surface?: boolean;
  schema?: boolean;
}) {
  if (!faqs.length) return null;
  return (
    <section className={`section ${surface ? "bg-surface" : ""}`} aria-labelledby="faq-heading">
      {schema && <JsonLd data={faqSchema(faqs)} />}
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <Eyebrow>FAQs</Eyebrow>
          <h2 id="faq-heading" className="mt-5 text-h2">
            {title}
          </h2>
          <p className="mt-5 text-lead">Can’t find your answer? Our team is happy to help.</p>
          <PillLink href="/contact-us/" variant="outline" className="mt-8">
            Get in touch
          </PillLink>
        </div>
        <Accordion items={faqs} tone={surface ? "surface" : "light"} />
      </div>
    </section>
  );
}
