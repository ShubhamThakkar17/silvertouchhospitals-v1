import Image from "next/image";
import { BadgeCheck, Phone } from "lucide-react";
import { BRANCH_LIST, TAGLINE } from "@/lib/site";
import { img, up } from "@/lib/media";
import { DOCTOR_BY_SLUG, doctorHref } from "@/content/doctors";
import { EMPANELMENTS, NABH } from "@/content/insurers";
import { BookButton } from "@/components/forms/BookButton";
import { PillLink, pillClasses, ArrowDisc } from "@/components/ui/Pill";

/** Home hero (brief 2.4 #3, 5.1 #1). Photo: ward at a Silver Touch hospital. */
export function Hero() {
  const bg = up("2023/09/banner04.jpg");
  const jil = DOCTOR_BY_SLUG["dr-jil-p-patel"];
  const jilPhoto = img(jil.photo!);
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
          <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[28px] bg-white/10 py-2 pl-2 pr-4 text-sm backdrop-blur">
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
            <span className="font-medium">PMJAY &amp; CGHS empanelled</span>
            <span className="hidden text-white/60 sm:inline">·</span>
            <span className="inline-flex items-center gap-1 text-white/85">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" /> {NABH.name}, {NABH.branch}
            </span>
          </p>
          <h1 className="mt-6 max-w-[14ch] text-display text-white">{TAGLINE}</h1>
          <p className="mt-6 max-w-xl text-lead text-white/85">
            Multispeciality ICU and surgical care in Ahmedabad, with 24x7 emergency at Nirnay Nagar and Satellite.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookButton variant="white">Book An Appointment</BookButton>
            <details className="group relative">
              <summary className={pillClasses("emergency", "cursor-pointer list-none [&::-webkit-details-marker]:hidden")}>
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

        {/* Floating glass card stack */}
        <div className="relative mx-auto w-full max-w-sm lg:ml-auto">
          <div className="glass rounded-[18px] border border-white/20 p-3 shadow-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-white/10">
              <Image src={jilPhoto.src} alt={`Portrait of ${jil.name}`} fill sizes="380px" className="object-cover object-top" priority />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-16 text-white">
                <p className="text-sm text-white/75">Robotic Knee Replacement</p>
                <p className="text-lg font-semibold">{jil.name}</p>
                <p className="text-sm text-white/75">Gold Medalist, MS Ortho</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <BookButton
                plain
                preset={{ doctor: jil.name, department: "Orthopedics / Joint Replacement Surgery" }}
                className="flex min-h-[48px] items-center justify-center rounded-full bg-white px-3 text-sm font-semibold text-ink hover:bg-surface"
              >
                Book Appointment
              </BookButton>
              <a
                href={jil.phone!.href}
                className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-white/40 px-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Let&apos;s Talk
              </a>
            </div>
          </div>
          <PillLink
            href={doctorHref(jil.slug)}
            variant="outline-dark"
            className="glass absolute -left-4 top-6 hidden !min-h-[44px] text-sm sm:inline-flex lg:-left-12"
          >
            VELYS robotic knee, CT-free
          </PillLink>
        </div>
      </div>
    </section>
  );
}
