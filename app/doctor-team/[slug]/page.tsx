import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, GraduationCap, MapPin, Phone, Stethoscope } from "lucide-react";
import { DOCTOR_BY_SLUG, VISIBLE_DOCTORS, doctorHref } from "@/content/doctors";
import { DEPARTMENT_FOR, SPECIALITY_BY_SLUG, specialityHref } from "@/content/specialities";
import { initials } from "@/content/testimonials";
import { BRANCHES, BRANCH_LIST } from "@/lib/site";
import { img } from "@/lib/media";
import { pageMeta } from "@/lib/seo";
import { physicianSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Confirm } from "@/components/ui/Confirm";
import { BookButton } from "@/components/forms/BookButton";
import { ArrowDisc, pillClasses } from "@/components/ui/Pill";
import { Icon } from "@/components/ui/Icon";
import { DoctorsGrid } from "@/components/sections/DoctorsGrid";

export const dynamicParams = false;

export function generateStaticParams() {
  return VISIBLE_DOCTORS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = DOCTOR_BY_SLUG[params.slug];
  if (!d || d.hidden) return {};
  const spec = SPECIALITY_BY_SLUG[d.specialities[0]];
  return pageMeta({
    title: `${d.name}, ${d.designation} in Ahmedabad | Silver Touch Hospitals`,
    description: `${d.name}, ${d.designation}${d.qualifications.length ? ` (${d.qualifications.slice(0, 2).join(", ")})` : ""}, ${spec ? `${spec.name} at ` : ""}Silver Touch Hospitals, Ahmedabad. Book an appointment.`,
    path: doctorHref(d.slug),
    image: d.photo ? img(d.photo).src : null,
  });
}

export default function DoctorProfile({ params }: { params: { slug: string } }) {
  const d = DOCTOR_BY_SLUG[params.slug];
  if (!d || d.hidden) notFound();
  const photo = d.photo ? img(d.photo) : null;
  const poster = d.poster ? img(d.poster) : null;
  const specs = d.specialities.map((s) => SPECIALITY_BY_SLUG[s]).filter(Boolean);
  const primary = specs[0];
  const idx = VISIBLE_DOCTORS.findIndex((x) => x.slug === d.slug);
  const prev = VISIBLE_DOCTORS[(idx - 1 + VISIBLE_DOCTORS.length) % VISIBLE_DOCTORS.length];
  const next = VISIBLE_DOCTORS[(idx + 1) % VISIBLE_DOCTORS.length];
  const colleagues = VISIBLE_DOCTORS.filter((x) => x.slug !== d.slug && x.specialities.some((s) => d.specialities.includes(s))).slice(0, 4);
  const preset = { doctor: d.name, department: DEPARTMENT_FOR[d.specialities[0]] };
  const branches = d.branches.length ? d.branches.map((b) => BRANCHES[b]) : null;

  return (
    <>
      <JsonLd
        data={physicianSchema({
          ...d,
          specialityNames: specs.map((s) => s.name),
        })}
      />
      <section className="bg-surface">
        <div className="container py-10 md:py-14">
          <Breadcrumbs
            items={[
              { name: "Doctors", href: "/doctor-team/" },
              { name: d.name, href: doctorHref(d.slug) },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[380px_1fr]">
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-primary-tint">
                {photo ? (
                  <Image src={photo.src} alt={`Portrait of ${d.name}`} fill priority sizes="(min-width: 1024px) 380px, 100vw" className="object-cover object-top" />
                ) : (
                  <div className="grid h-full place-items-center" aria-hidden="true">
                    <span className="grid h-36 w-36 place-items-center rounded-full bg-white text-5xl font-semibold text-primary">
                      {initials(d.name.replace(/^Dr\.?\s*/, ""))}
                    </span>
                  </div>
                )}
              </div>
              {!photo && <Confirm note="Professional headshot on a plain background" className="mt-3" />}
            </div>

            <div>
              {primary && (
                <Link
                  href={specialityHref(primary.slug)}
                  className="inline-flex items-center gap-2 rounded-card border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink hover:border-primary"
                >
                  <Icon name={primary.icon} className="h-4 w-4 text-primary" /> {primary.name}
                </Link>
              )}
              <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-tight tracking-tight">{d.name}</h1>
              <p className="mt-2 text-xl text-ink">{d.designation}</p>
              {d.confirm?.map((c) => (
                <p key={c} className="mt-2">
                  <Confirm note={c} />
                </p>
              ))}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BookButton preset={preset}>Book with {d.name}</BookButton>
                {d.phone ? (
                  <a href={d.phone.href} className={pillClasses("outline")}>
                    <span>{d.phone.label}</span>
                    <ArrowDisc variant="outline" icon={<Phone className="h-4 w-4" aria-hidden="true" />} />
                  </a>
                ) : (
                  BRANCH_LIST.map((b) => (
                    <a key={b.id} href={b.phoneHref} className={pillClasses("outline")}>
                      <span>Call {b.name}</span>
                      <ArrowDisc variant="outline" icon={<Phone className="h-4 w-4" aria-hidden="true" />} />
                    </a>
                  ))
                )}
              </div>

              <dl className="mt-10 grid gap-6 rounded-[18px] bg-white p-6 sm:grid-cols-2 sm:p-8">
                {d.qualifications.length > 0 && (
                  <div>
                    <dt className="flex items-center gap-2 font-semibold text-ink">
                      <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" /> Qualifications
                    </dt>
                    <dd>
                      <ul className="mt-3 space-y-2">
                        {d.qualifications.map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="flex items-center gap-2 font-semibold text-ink">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden="true" /> Consults at
                  </dt>
                  <dd className="mt-3">
                    {branches ? (
                      <ul className="space-y-2">
                        {branches.map((b) => (
                          <li key={b.id}>Silver Touch Hospitals, {b.label}</li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <p>Please call either branch for OPD days and times.</p>
                        <Confirm note="Branch-wise OPD days" className="mt-2" />
                      </>
                    )}
                  </dd>
                </div>
                {d.expertise.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="flex items-center gap-2 font-semibold text-ink">
                      <Stethoscope className="h-5 w-5 text-primary" aria-hidden="true" /> Areas of expertise
                    </dt>
                    <dd>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {d.expertise.map((e) => (
                          <li key={e} className="flex gap-2.5">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={3} aria-hidden="true" />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {(d.bio.length > 0 || poster) && (
        <section className="section">
          <div className={`container grid gap-12 ${poster ? "lg:grid-cols-[1fr_380px]" : ""}`}>
            {d.bio.length > 0 ? (
              <div className="prose-st">
                <h2>About {d.name}</h2>
                {d.bio.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
                {d.slug === "dr-jil-p-patel" && (
                  <p>
                    <em>Please contact the hospital to confirm consultation timings and appointment availability.</em>
                  </p>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-h3 font-semibold">Book a consultation</h2>
                <p className="mt-3 max-w-xl">Call either branch to confirm {d.name}’s OPD days, or send us a request and we’ll call you back.</p>
                <BookButton preset={preset} className="mt-6">
                  Book with {d.name}
                </BookButton>
              </div>
            )}
            {poster && (
              <figure>
                <div className="overflow-hidden rounded-[18px] border border-line">
                  <Image src={poster.src} width={poster.width} height={poster.height} alt={`OPD schedule poster for ${d.name}`} sizes="380px" className="h-auto w-full" />
                </div>
                <figcaption className="mt-3 text-sm">OPD schedule as published by the hospital. Please call to confirm before visiting.</figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      <nav aria-label="More doctors" className="border-y border-line">
        <div className="container flex items-stretch justify-between gap-4 py-2">
          <Link href={doctorHref(prev.slug)} className="flex min-h-[64px] items-center gap-3 rounded-card px-3 hover:bg-surface">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            <span>
              <span className="block text-sm">Previous</span>
              <span className="block font-semibold text-ink">{prev.name}</span>
            </span>
          </Link>
          <Link href={doctorHref(next.slug)} className="flex min-h-[64px] items-center gap-3 rounded-card px-3 text-right hover:bg-surface">
            <span>
              <span className="block text-sm">Next</span>
              <span className="block font-semibold text-ink">{next.name}</span>
            </span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      {colleagues.length > 0 && <DoctorsGrid doctors={colleagues} title={`More ${primary?.name ?? ""} specialists`} eyebrow="Related" surface />}
    </>
  );
}
