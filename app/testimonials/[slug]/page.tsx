import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { TESTIMONIALS } from "@/content/testimonials";
import { SPECIALITY_BY_SLUG, specialityHref } from "@/content/specialities";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return TESTIMONIALS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = TESTIMONIALS.find((x) => x.slug === params.slug);
  if (!t) return {};
  return pageMeta({
    title: `${t.name} - Testimonial | Silver Touch Hospitals`,
    description: t.quote.slice(0, 155),
    path: `/testimonials/${t.slug}/`,
  });
}

/** Keeps the old /testimonails/{slug}/ URLs alive (301 → here). */
export default function TestimonialPage({ params }: { params: { slug: string } }) {
  const t = TESTIMONIALS.find((x) => x.slug === params.slug);
  if (!t) notFound();
  const spec = t.speciality ? SPECIALITY_BY_SLUG[t.speciality] : null;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Testimonials", href: "/testimonials/" },
          { name: t.name, href: `/testimonials/${t.slug}/` },
        ]}
        title={`Testimonial from ${t.name}`}
      />
      <section className="section">
        <div className="container max-w-3xl">
          <div className="rounded-[18px] border border-line">
            <TestimonialCard t={t} />
          </div>
          <p className="mt-8 flex flex-wrap gap-4">
            <Link href="/testimonials/" className="font-medium text-primary underline underline-offset-4">
              All testimonials
            </Link>
            {spec && (
              <Link href={specialityHref(spec.slug)} className="font-medium text-primary underline underline-offset-4">
                About {spec.name}
              </Link>
            )}
          </p>
        </div>
      </section>
    </>
  );
}
