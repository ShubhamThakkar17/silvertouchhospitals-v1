import Image from "next/image";
import Link from "next/link";
import { doctorHref, type Doctor } from "@/content/doctors";
import { DEPARTMENT_FOR, SPECIALITY_BY_SLUG } from "@/content/specialities";
import { img } from "@/lib/media";
import { initials } from "@/content/testimonials";
import { BookButton } from "@/components/forms/BookButton";

/**
 * 3:4 portrait card (brief 2.4 #11). On desktop, hover/focus reveals "View
 * profile" and "Book"; on touch screens the photo links to the profile and a
 * Book button sits under the name, so cards stay compact two-up on phones.
 */
export function DoctorCard({ d, headingLevel = "h3" }: { d: Doctor; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const photo = d.photo ? img(d.photo) : null;
  const primary = SPECIALITY_BY_SLUG[d.specialities[0]];
  const preset = { doctor: d.name, department: DEPARTMENT_FOR[d.specialities[0]] };
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-primary-tint">
        <Link href={doctorHref(d.slug)} tabIndex={-1} aria-hidden="true" className="absolute inset-0 lg:pointer-events-none">
          {photo ? (
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 300px, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="grid h-full place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-xl font-semibold text-primary shadow-sm sm:h-28 sm:w-28 sm:text-3xl">
                {initials(d.name.replace(/^Dr\.?\s*/, ""))}
              </span>
            </span>
          )}
        </Link>
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-2 gap-2 opacity-0 transition duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
          <Link
            href={doctorHref(d.slug)}
            className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-ink hover:bg-surface"
          >
            View profile<span className="sr-only">: {d.name}</span>
          </Link>
          <BookButton
            plain
            preset={preset}
            className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Book<span className="sr-only"> with {d.name}</span>
          </BookButton>
        </div>
      </div>
      <H className="mt-2 text-base font-semibold leading-snug sm:text-lg">
        <Link href={doctorHref(d.slug)} className="inline-flex min-h-[44px] items-center hover:text-primary">
          {d.name}
        </Link>
      </H>
      <p className="text-sm leading-snug sm:text-base">{d.designation}</p>
      {primary && <p className="mt-1 text-sm text-primary">{primary.name}</p>}
      <div className="mt-auto pt-3 lg:hidden">
        <BookButton
          plain
          preset={preset}
          className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-primary px-3 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Book<span className="sr-only"> with {d.name}</span>
        </BookButton>
      </div>
    </article>
  );
}
