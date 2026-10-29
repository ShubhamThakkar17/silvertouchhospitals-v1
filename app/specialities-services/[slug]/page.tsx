import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Clock, MapPin, Phone } from "lucide-react";
import { getPostsForCategories, getPosts, getSpeciality } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { img } from "@/lib/media";
import { specialitySchema } from "@/lib/schema";
import { BRANCH_LIST, OPD_HOURS } from "@/lib/site";
import { DEPARTMENT_FOR, SPECIALITIES, specialityHref } from "@/content/specialities";
import { DOCTOR_BY_SLUG, withPhotosFirst } from "@/content/doctors";
import { TESTIMONIALS } from "@/content/testimonials";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { DoctorsGrid } from "@/components/sections/DoctorsGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Packages } from "@/components/sections/Packages";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookButton } from "@/components/forms/BookButton";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { ArrowDisc, pillClasses } from "@/components/ui/Pill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Confirm } from "@/components/ui/Confirm";
import { Reveal } from "@/components/ui/Reveal";
import { OrthoFeatures } from "./OrthoFeatures";
import { BmiCalculator } from "./BmiCalculator";

export const dynamicParams = false;

export function generateStaticParams() {
  return SPECIALITIES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getSpeciality(params.slug);
  if (!s) return {};
  return pageMeta({
    title: s.seoTitle,
    description: s.description,
    path: specialityHref(s.slug),
    image: s.image ? img(s.image).src : null,
    noindex: s.status === "new",
  });
}

export default function SpecialityPage({ params }: { params: { slug: string } }) {
  const s = getSpeciality(params.slug);
  if (!s) notFound();
  const department = DEPARTMENT_FOR[s.slug];
  const hero = s.image ? img(s.image) : null;
  const gallery = (s.gallery ?? []).map(img);
  const doctors = withPhotosFirst(s.doctors.map((d) => DOCTOR_BY_SLUG[d]).filter((d) => d && !d.hidden));
  const related = getPostsForCategories(s.blogCategories, 3);
  const posts = related.length ? related : getPosts().slice(0, 3);
  const testimonials = TESTIMONIALS.filter((t) => t.speciality === s.slug);
  const path = specialityHref(s.slug);

  const callButtons = BRANCH_LIST.map((b) => (
    <a key={b.id} href={b.phoneHref} className={pillClasses(s.emergency ? "white" : "outline", s.emergency ? "!min-h-[60px] text-lg" : "")}>
      <span>
        {s.emergency ? `${b.name}: ${b.phone}` : `Call ${b.name}`}
      </span>
      <ArrowDisc variant={s.emergency ? "white" : "outline"} icon={<Phone className="h-4 w-4" aria-hidden="true" />} />
    </a>
  ));

  return (
    <>
      <JsonLd data={specialitySchema(s, path)} />
      <PageHero
        crumbs={[
          { name: "Specialities / Services", href: "/specialities-services/" },
          { name: s.name, href: path },
        ]}
        eyebrow={s.emergency ? "24x7 Emergency" : s.name}
        title={s.h1}
        intro={s.intro}
        image={hero}
        imageAlt=""
        tone={s.emergency ? "emergency" : "surface"}
        actions={
          s.emergency ? (
            callButtons
          ) : (
            <>
              <BookButton preset={{ department }}>Book appointment</BookButton>
              {callButtons}
            </>
          )
        }
      >
        {s.status === "new" && (
          <p className="mt-6">
            <Confirm note="New page built from facts already on the site. Needs hospital-approved copy before it is indexed." />
          </p>
        )}
      </PageHero>

      {/* At a glance: conditions + procedures */}
      <section className="section" aria-labelledby="conditions-heading">
        <div className="container">
          <div className="max-w-2xl">
            <Eyebrow>At a glance</Eyebrow>
            <h2 id="conditions-heading" className="mt-5 text-h2">
              {s.conditionsTitle ?? "Conditions we treat"}
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.conditions.map((c, i) => (
              <Reveal as="li" key={c} delay={(i % 3) * 60}>
                <div className="flex h-full items-center gap-4 rounded-card bg-surface p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-card bg-white text-primary">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                  <span className="text-[1.0625rem] font-medium text-ink">{c}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <h2 className="mt-20 text-h2">{s.proceduresTitle ?? "Procedures & treatments"}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.procedures.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 60}>
                <article className="h-full rounded-card border border-line p-6">
                  <span className="text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                  {p.text && <p className="mt-2">{p.text}</p>}
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {s.slug === "orthopedics-joint-replacement-surgery" && <OrthoFeatures />}
      {s.slug === "full-body-health-checkup" && <Packages />}

      {/* Full migrated copy + sticky booking card */}
      {s.body?.html && (
        <section className="section bg-surface" aria-labelledby="overview-heading">
          <div className="container grid gap-12 lg:grid-cols-[1fr_360px]">
            <div className="min-w-0 rounded-[18px] bg-white p-6 sm:p-10">
              <h2 id="overview-heading" className="sr-only">
                About {s.name} at Silver Touch Hospitals
              </h2>
              <div className="prose-st" dangerouslySetInnerHTML={{ __html: s.body.html }} />
              {s.slug === "bariatric-surgery-ahmedabad" && <BmiCalculator />}
            </div>
            <aside className="lg:sticky lg:top-40 lg:self-start" aria-label="Book an appointment">
              <div className="rounded-[18px] bg-white p-6">
                <p className="text-xl font-semibold text-ink">Book a {s.label ?? s.name} consultation</p>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" /> OPD {OPD_HOURS.label}
                </p>
                <div className="mt-5">
                  <AppointmentForm compact preset={{ department }} idPrefix="rail" />
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {BRANCH_LIST.map((b) => (
                  <li key={b.id}>
                    <a href={b.phoneHref} className="flex min-h-[60px] items-center justify-between gap-3 rounded-card bg-white px-5">
                      <span>
                        <span className="flex items-center gap-1.5 text-sm">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {b.label}
                        </span>
                        <span className="font-semibold text-ink">{b.phone}</span>
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      )}

      {/* Why Silver Touch */}
      <section className="section" aria-labelledby="why-heading">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Why Silver Touch</Eyebrow>
            <h2 id="why-heading" className="mt-5 text-h2">
              Why patients choose us for {s.name.toLowerCase().startsWith("full") ? "their checkup" : s.name}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.whyUs.map((w) => (
                <li key={w} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-ink">{w}</span>
                </li>
              ))}
            </ul>
            <BookButton preset={{ department }} className="mt-10">
              Book appointment
            </BookButton>
          </div>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {gallery.slice(0, 2).map((g, i) => (
                <div key={g.src} className={`relative overflow-hidden rounded-card ${gallery.length === 1 ? "col-span-2 aspect-[4/3]" : i === 0 ? "aspect-[3/4]" : "mt-12 aspect-[3/4]"}`}>
                  <Image src={g.src} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid aspect-[4/3] place-items-center rounded-card bg-gradient-to-br from-primary to-primary-dark">
              <Icon name={s.icon} className="h-28 w-28 text-white/80" strokeWidth={1} />
            </div>
          )}
        </div>
      </section>

      {doctors.length > 0 ? (
        <DoctorsGrid doctors={doctors} title={`${s.name} doctors`} eyebrow="Specialists" surface />
      ) : (
        <section className="section bg-surface">
          <div className="container flex flex-col items-start gap-4">
            <Eyebrow>Specialists</Eyebrow>
            <h2 className="text-h2">Talk to our {s.name} team</h2>
            <p className="max-w-2xl text-lead">Call either branch and we will match you with the right specialist and OPD time.</p>
            <Confirm note={`Doctor profiles for ${s.name}`} />
          </div>
        </section>
      )}

      {testimonials.length > 0 && <Testimonials items={testimonials} title="What patients say" />}

      <FaqSection faqs={s.faqs} title={`${s.name}: frequently asked questions`} />

      <LatestPosts posts={posts} title={related.length ? `Read more about ${s.name}` : "From our health blog"} surface />

      <section className="py-12">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-wide text-body">Other specialities</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SPECIALITIES.filter((o) => o.slug !== s.slug && o.group === s.group).map((o) => (
              <li key={o.slug}>
                <Link href={specialityHref(o.slug)} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line px-4 hover:border-primary hover:text-primary">
                  {o.name} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
