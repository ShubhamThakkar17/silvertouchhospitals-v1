import Image from "next/image";
import Link from "next/link";
import { doctorHref, type Doctor } from "@/content/doctors";
import { SPECIALITY_BY_SLUG } from "@/content/specialities";
import { DEPARTMENT_FOR } from "@/content/specialities";
import { img } from "@/lib/media";
import { initials } from "@/content/testimonials";
import { BookButton } from "@/components/forms/BookButton";

/** 3:4 portrait card; hover/focus reveals "View profile" and "Book" (brief 2.4 #11). */
export function DoctorCard({ d, headingLevel = "h3" }: { d: Doctor; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const photo = d.photo ? img(d.photo) : null;
  const primary = SPECIALITY_BY_SLUG[d.specialities[0]];
  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-primary-tint">
        {photo ? (
          <Image
            src={photo.src}
            alt={`Portrait of ${d.name}`}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center" aria-hidden="true">
            <span className="grid h-28 w-28 place-items-center rounded-full bg-white text-3xl font-semibold text-primary shadow-sm">
              {initials(d.name.replace(/^Dr\.?\s*/, ""))}
            </span>
          </div>
        )}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-100 transition-opacity duration-300 lg:translate-y-2 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <Link
            href={doctorHref(d.slug)}
            className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-ink hover:bg-surface"
          >
            View profile<span className="sr-only">: {d.name}</span>
          </Link>
          <BookButton
            plain
            preset={{ doctor: d.name, department: DEPARTMENT_FOR[d.specialities[0]] }}
            className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Book<span className="sr-only"> with {d.name}</span>
          </BookButton>
        </div>
      </div>
      <H className="mt-4 text-lg font-semibold">
        <Link href={doctorHref(d.slug)} className="hover:text-primary">
          {d.name}
        </Link>
      </H>
      <p className="text-base">{d.designation}</p>
      {primary && <p className="mt-0.5 text-sm text-primary">{primary.name}</p>}
    </article>
  );
}
