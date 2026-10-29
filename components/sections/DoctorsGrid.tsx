import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VISIBLE_DOCTORS, withPhotosFirst, type Doctor } from "@/content/doctors";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DoctorCard } from "@/components/cards/DoctorCard";
import { Reveal } from "@/components/ui/Reveal";

export function DoctorsGrid({
  doctors = withPhotosFirst(VISIBLE_DOCTORS.filter((d) => d.featured)).slice(0, 8),
  title = "Meet our doctors",
  eyebrow = "Our Doctors",
  surface = false,
}: {
  doctors?: Doctor[];
  title?: string;
  eyebrow?: string;
  surface?: boolean;
}) {
  if (!doctors.length) return null;
  return (
    <section className={`section ${surface ? "bg-surface" : ""}`} aria-labelledby="doctors-heading">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="doctors-heading" className="mt-5 text-h2">
              {title}
            </h2>
          </div>
          <Link href="/doctor-team/" className="inline-flex min-h-[48px] items-center gap-1.5 font-medium text-primary hover:underline">
            View all doctors <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 4) * 80}>
              <DoctorCard d={d} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
