import { pageMeta } from "@/lib/seo";
import { TESTIMONIALS } from "@/content/testimonials";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { AppointmentBand } from "@/components/sections/AppointmentBand";

export const metadata = pageMeta({
  title: "Patient Testimonials | Silver Touch Hospitals Ahmedabad",
  description: "What patients and their families say about their care at Silver Touch Hospitals, Ahmedabad.",
  path: "/testimonials/",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Testimonials", href: "/testimonials/" }]}
        eyebrow="Testimonials"
        title="What our patients say"
        intro="Reviews from patients and families, shared exactly as written."
      />
      <section className="section bg-surface">
        <div className="container">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <li key={t.slug} id={t.slug} className="scroll-mt-40">
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <AppointmentBand />
    </>
  );
}
