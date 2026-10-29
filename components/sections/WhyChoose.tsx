import Image from "next/image";
import Link from "next/link";
import { Building2, Clock, HeartHandshake, Hospital, ShieldPlus } from "lucide-react";
import { up } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const CARDS = [
  {
    title: "Multi-Specialty Care Under One Roof",
    text: "From internal medicine to advanced surgeries, all our specialists work together across departments to provide coordinated care that’s uniquely suited to your requirements.",
    icon: Hospital,
  },
  {
    title: "State-of-the-Art Infrastructure",
    text: "Each of our multispeciality hospitals in Ahmedabad has new operation theatres, cutting-edge diagnostics and well-equipped ICUs, all intended to comply with international standards.",
    icon: Building2,
  },
  {
    title: "24/7 Assistance",
    text: "Our emergency, pharmacy and medical services are available day and night across all our hospitals, so help is always at hand when you need it the most.",
    icon: Clock,
  },
  {
    title: "Personalised Healing Environment",
    text: "Recovery extends beyond treatment. With dedicated care teams and thoughtfully designed spaces, we focus on your comfort and well-being, offering secondary and tertiary care tailored to your needs.",
    icon: HeartHandshake,
  },
];

/** Why choose us: 2×2 cards + wide PMJAY card + wide photo (brief 2.4 #6, 5.1 #5). */
export function WhyChoose() {
  const photo = up("2024/05/about-03.jpg");
  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="container">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Choose Us"
          title="Your trusted multispecialty healthcare network in Ahmedabad"
          align="center"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 80}>
              <article className="flex h-full gap-5 rounded-card border border-line bg-white p-6 md:p-8">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <p className="mt-3">{c.text}</p>
                </div>
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-card bg-surface text-primary">
                  <c.icon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </article>
            </Reveal>
          ))}
          <Reveal className="md:col-span-2">
            <article className="flex flex-col gap-5 rounded-card bg-primary p-6 text-white sm:flex-row sm:items-center md:p-8">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-card bg-white/15">
                <ShieldPlus className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">Accessible Healthcare with PMJAY</h3>
                <p className="mt-2 text-white/85">
                  Silver Touch Hospitals is proud to be a recognised PMJAY hospital in Ahmedabad, dedicated to making quality healthcare
                  accessible to all and supporting beneficiaries of the Pradhan Mantri Jan Arogya Yojana.
                </p>
              </div>
              <Link href="/patients-insurance/" className="inline-flex min-h-[48px] items-center rounded-full bg-white px-6 font-medium text-primary hover:bg-surface">
                PMJAY &amp; insurance
              </Link>
            </article>
          </Reveal>
        </div>
        <Reveal className="relative mt-5 aspect-[1125/453] overflow-hidden rounded-card">
          <Image src={photo.src} alt="Waiting lounge at a Silver Touch hospital" fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
        </Reveal>
      </div>
    </section>
  );
}
