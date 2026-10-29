import Link from "next/link";
import { ArrowUpRight, Stethoscope } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { HR_EMAIL } from "@/lib/site";
import { JOB_ROLES, applyHref } from "@/content/jobs";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillLink } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { MissionBand } from "@/components/sections/MissionBand";

export const metadata = pageMeta({
  title: "Join Our Team | Careers at Silver Touch Hospitals Ahmedabad",
  description:
    "Be a part of a hospital that values compassion, innovation and growth. Apply at Silver Touch Hospital and shape the future of modern healthcare.",
  path: "/work-with-us/",
});

const WHY = [
  ["Management by a team of doctors", "Clinical leadership that understands the work on the floor."],
  ["A nurturing platform", "We aim to give healthcare professionals room to learn and flourish."],
  ["Modern facilities", "Three high-end operation theatres, ICUs and in-house diagnostics."],
  ["Values you can live by", "Quality, ethics, transparency, compassion, collaboration and communication."],
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Work With Us", href: "/work-with-us/" }]}
        eyebrow="Careers"
        title="Join our team"
        intro="Be part of a hospital that values compassion, innovation and growth, at Nirnay Nagar and Satellite in Ahmedabad."
        actions={<PillLink href="/apply-for-job/">Apply now</PillLink>}
      />
      <section className="section" aria-labelledby="roles-heading">
        <div className="container">
          <SectionHeading id="roles-heading" eyebrow="Open Roles" title="Current openings" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link href={applyHref("Doctor")} className="group flex h-full flex-col rounded-card bg-primary p-7 text-white">
                <Stethoscope className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-white">Doctors</h3>
                <p className="mt-2 flex-1 text-white/85">Consultants and medical officers across our specialities.</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-medium">
                  Apply <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </span>
              </Link>
            </li>
            {JOB_ROLES.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 3) * 60}>
                <Link href={applyHref(r.title)} className="group flex h-full flex-col rounded-card border border-line p-7 hover:border-ink">
                  <h3 className="text-xl font-semibold">{r.title}</h3>
                  <p className="mt-2 flex-1">{r.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-primary">
                    Apply<span className="sr-only"> for {r.title}</span> <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8">
            Prefer email? Send your CV to{" "}
            <a href={`mailto:${HR_EMAIL}`} className="font-medium text-primary underline">
              {HR_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
      <section className="section bg-surface" aria-labelledby="why-work-heading">
        <div className="container">
          <SectionHeading id="why-work-heading" eyebrow="Why Work With Us" title="A workplace built on care" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {WHY.map(([t, d]) => (
              <li key={t} className="rounded-card bg-white p-7">
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-2">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <MissionBand withImage={false} />
    </>
  );
}
