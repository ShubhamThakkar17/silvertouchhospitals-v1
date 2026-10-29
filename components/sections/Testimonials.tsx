import { TESTIMONIALS } from "@/content/testimonials";
import { BRANCH_LIST } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Carousel } from "@/components/ui/Carousel";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Confirm } from "@/components/ui/Confirm";
import Link from "next/link";

export function Testimonials({ items = TESTIMONIALS, title = "What our patients say" }: { items?: typeof TESTIMONIALS; title?: string }) {
  const reviewLinks = BRANCH_LIST.filter((b) => b.reviewsUrl);
  return (
    <section className="section bg-ink" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow tone="dark">Testimonials</Eyebrow>
            <h2 id="testimonials-heading" className="mt-5 text-h2 text-white">
              {title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 text-white/80">
            <Link href="/testimonials/" className="inline-flex min-h-[44px] items-center font-medium text-white underline underline-offset-4">
              All testimonials
            </Link>
            {reviewLinks.length ? (
              reviewLinks.map((b) => (
                <a key={b.id} href={b.reviewsUrl!} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center underline underline-offset-4">
                  Read more reviews on Google ({b.name})
                </a>
              ))
            ) : (
              <Confirm note="Google Business review URLs for both branches" />
            )}
          </div>
        </div>
        <Carousel label="Patient testimonials" tone="dark" className="mt-4">
          {items.map((t) => (
            <TestimonialCard key={t.slug} t={t} tone="dark" />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
