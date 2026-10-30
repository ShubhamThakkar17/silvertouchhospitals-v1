import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { specialityHref, type Speciality } from "@/content/specialities";
import { img } from "@/lib/media";
import { Icon } from "@/components/ui/Icon";

/** Department card: photo (or icon panel), icon, name, one-liner, "View details". */
export function SpecialityCard({
  s,
  headingLevel = "h3",
  compactOnMobile = false,
}: {
  s: Speciality;
  headingLevel?: "h2" | "h3";
  /** Below 640px, render as a slim row (icon, name, one-liner) instead of a photo card. */
  compactOnMobile?: boolean;
}) {
  const H = headingLevel;
  const photo = s.image ? img(s.image) : null;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface">
      <div className={`relative aspect-[4/3] overflow-hidden ${compactOnMobile ? "hidden sm:block" : ""}`}>
        {photo ? (
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 48vw, 85vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-primary to-primary-dark">
            <Icon name={s.icon} className="h-20 w-20 text-white/90" strokeWidth={1.25} />
          </div>
        )}
        <span
          className={`absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-card ${s.emergency ? "bg-emergency text-white" : "bg-white text-primary"}`}
        >
          <Icon name={s.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${compactOnMobile ? "p-5 sm:p-6" : "p-6"}`}>
        {compactOnMobile && (
          <span
            className={`mb-3 grid h-11 w-11 place-items-center rounded-card sm:hidden ${s.emergency ? "bg-emergency text-white" : "bg-white text-primary"}`}
            aria-hidden="true"
          >
            <Icon name={s.icon} className="h-5 w-5" />
          </span>
        )}
        <H className="text-xl font-semibold">
          <Link href={specialityHref(s.slug)} className="after:absolute after:inset-0">
            {s.name}
          </Link>
        </H>
        <p className="mt-2 flex-1 text-base">{s.oneLiner}</p>
        <span className={`inline-flex items-center gap-1.5 font-medium text-primary ${compactOnMobile ? "mt-3 sm:mt-5" : "mt-5"}`} aria-hidden="true">
          View details <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </span>
      </div>
    </article>
  );
}
