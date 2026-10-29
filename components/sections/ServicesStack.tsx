import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { up } from "@/lib/media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/forms/BookButton";

const ITEMS = [
  {
    title: "Medical Treatment",
    text: "All types of medical treatment including hypertension, diabetes, cardiac and respiratory care under one roof. Complex and multi-organ cases are managed in critical care. Super-specialities like Nephrology, Neurology and Gastroenterology are also available.",
    icon: "2025/07/Medical-Treatment.png",
    photo: "2024/05/about-06.jpg",
    href: "/specialities-services/gastroenterology/",
    link: "Gastroenterology",
  },
  {
    title: "24/7 Emergency Help",
    text: "24x7 emergency room. Critical care is equipped with ventilators, BiPAP machines, defibrillators and dialysis machines.",
    icon: "2025/07/Emergency-Help.png",
    photo: "2025/07/24-hours-hospital.jpg",
    href: "/specialities-services/critical-care/",
    link: "Critical Care",
  },
  {
    title: "Medical Professionals",
    text: "Qualified doctors and paramedical staff round the clock, caring for every patient with sympathy and kindness.",
    icon: "2025/07/Medical-professionals.png",
    photo: "2024/05/about-02.jpg",
    href: "/doctor-team/",
    link: "Our doctors",
  },
  {
    title: "Surgical Department",
    text: "All types of surgeries in 3 high-end operation theatres, with a dedicated recovery unit and a high-end CSSD department as the backbone of the OT complex.",
    icon: "2025/07/Surgical-Department.png",
    photo: "2024/05/about-05.jpg",
    href: "/specialities-services/general-surgery/",
    link: "General Surgery",
  },
];

/** "What to expect" stacked cards with sticky left column (brief 2.4 #5, 5.1 #3). */
export function ServicesStack() {
  return (
    <section className="section bg-surface" aria-labelledby="expect-heading">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <Eyebrow>Our Services</Eyebrow>
          <h2 id="expect-heading" className="mt-5 text-h2">
            What to expect at Silver Touch Hospitals
          </h2>
          <p className="mt-5 text-lead">
            Routine check-ups, a second opinion, surgery or an emergency: our doctors guide you from the first visit to recovery.
          </p>
          <BookButton className="mt-8" />
        </div>
        <ul className="space-y-5">
          {ITEMS.map((it, i) => {
            const icon = up(it.icon);
            const photo = up(it.photo);
            return (
              <Reveal as="li" key={it.title} delay={i * 80}>
                <article className="group relative grid gap-5 rounded-card bg-white p-5 sm:grid-cols-[1fr_180px] sm:p-6">
                  <div>
                    <Image src={icon.src} alt="" width={56} height={56} className="h-14 w-14 rounded-full" />
                    <h3 className="mt-4 text-2xl font-semibold">{it.title}</h3>
                    <p className="mt-2">{it.text}</p>
                    <Link href={it.href} className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 font-medium text-primary hover:underline">
                      {it.link} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-card">
                    <Image src={photo.src} alt="" fill sizes="180px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
