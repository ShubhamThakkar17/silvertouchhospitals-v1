import Image from "next/image";
import { BadgeCheck, Phone } from "lucide-react";
import { BRANCH_LIST, TAGLINE } from "@/lib/site";
import { img, up } from "@/lib/media";
import { VISIBLE_DOCTORS } from "@/content/doctors";
import { DEPARTMENT_FOR, SPECIALITY_BY_SLUG } from "@/content/specialities";
import { EMPANELMENTS, NABH } from "@/content/insurers";
import { BookButton } from "@/components/forms/BookButton";
import { pillClasses, ArrowDisc } from "@/components/ui/Pill";
import { HeroDoctors, type HeroDoctor } from "./HeroDoctors";

/** One-line highlight per doctor, from their published profile. */
const HIGHLIGHTS: Record<string, string> = {
  "dr-jil-p-patel": "VELYS robotic knee, CT-free",
  "dr-manthan-patel": "Brain & spine micro-neurosurgery",
  "dr-simple-bhadania": "Skull base & scarless ENT surgery",
  "dr-harshil": "Spine surgery",
};

/**
 * Doctors with a real headshot rotate in the hero card. More join
 * automatically as headshots are added to content/doctors.ts.
 */
function heroDoctors(): HeroDoctor[] {
  const withPhoto = VISIBLE_DOCTORS.filter((d) => d.photo);
  // Featured first, Dr Jil P. Patel (the brief's featured doctor) leading.
  withPhoto.sort((a, b) => Number(b.slug === "dr-jil-p-patel") - Number(a.slug === "dr-jil-p-patel") || Number(!!b.featured) - Number(!!a.featured));
  return withPhoto.map((d) => {
    const spec = SPECIALITY_BY_SLUG[d.specialities[0]];
    return {
      slug: d.slug,
      name: d.name,
      designation: d.designation,
      speciality: spec?.name ?? "",
      highlight: HIGHLIGHTS[d.slug] ?? spec?.name ?? d.designation,
      department: DEPARTMENT_FOR[d.specialities[0]],
      phone: d.phone,
      photo: img(d.photo!),
    };
  });
}

/** Home hero (brief 2.4 #3, 5.1 #1). Photo: ward at a Silver Touch hospital. */
export function Hero() {
  const bg = up("2023/09/banner04.jpg");
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src={bg.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 animate-hero-zoom object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" aria-hidden="true" />
      <div className="container grid min-h-[min(88vh,820px)] items-center gap-10 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-24">
        <div className="text-white">
          <div className="inline-flex max-w-full flex-col gap-2 rounded-2xl bg-ink/60 p-2 pr-4 text-sm ring-1 ring-white/15 backdrop-blur">
            <p className="flex items-center gap-3">
            <span className="flex -space-x-2" aria-hidden="true">
              {EMPANELMENTS.map((e) => {
                const logo = img(e.image);
                return (
                  <span key={e.name} className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-white">
                    <Image src={logo.src} alt="" fill sizes="36px" className="object-contain p-0.5" />
                  </span>
                );
              })}
            </span>
              <span className="font-medium">PMJAY, CGHS, ISRO &amp; MA Yojana empanelled</span>
            </p>
            <p className="flex items-start gap-1.5 pl-1 text-white/90">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {NABH.name} · {NABH.branch}
              </span>
            </p>
          </div>
          <h1 className="mt-6 max-w-[14ch] text-display text-white">{TAGLINE}</h1>
          <p className="mt-6 max-w-xl text-lead text-white/85">
            Multispeciality ICU and surgical care in Ahmedabad, with 24x7 emergency at Nirnay Nagar and Satellite.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookButton variant="white" className="w-full sm:w-auto">Book An Appointment</BookButton>
            <details className="group relative w-full sm:w-auto">
              <summary className={pillClasses("emergency", "w-full cursor-pointer list-none sm:w-auto [&::-webkit-details-marker]:hidden")}>
                <span>Call Emergency</span>
                <ArrowDisc variant="emergency" icon={<Phone className="h-4 w-4" aria-hidden="true" />} />
              </summary>
              <div className="absolute left-0 z-10 mt-2 w-72 rounded-card bg-white p-2 shadow-xl">
                {BRANCH_LIST.map((b) => (
                  <a key={b.id} href={b.phoneHref} className="flex min-h-[56px] flex-col justify-center rounded-card px-3 hover:bg-surface">
                    <span className="text-sm text-body">{b.label}</span>
                    <span className="font-semibold text-ink">{b.phone}</span>
                  </a>
                ))}
              </div>
            </details>
          </div>
        </div>

        <HeroDoctors doctors={heroDoctors()} />
      </div>
    </section>
  );
}
