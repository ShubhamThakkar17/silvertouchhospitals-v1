import Link from "next/link";
import { Phone } from "lucide-react";
import { BRANCH_LIST } from "@/lib/site";
import { SPECIALITIES, specialityHref } from "@/content/specialities";
import { PillLink } from "@/components/ui/Pill";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center">
        <p className="text-[clamp(6rem,18vw,12rem)] font-semibold leading-none tracking-tighter text-primary">404</p>
        <h1 className="mt-4 text-h2">We couldn’t find that page</h1>
        <p className="mx-auto mt-4 max-w-xl text-lead">It may have moved when we rebuilt our website. Try one of these instead, or call us.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <PillLink href="/">Go to home</PillLink>
          <PillLink href="/specialities-services/" variant="outline">
            All specialities
          </PillLink>
        </div>
        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2">
          {SPECIALITIES.slice(0, 10).map((s) => (
            <li key={s.slug}>
              <Link href={specialityHref(s.slug)} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 hover:border-primary hover:text-primary">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {BRANCH_LIST.map((b) => (
            <li key={b.id}>
              <a href={b.phoneHref} className="inline-flex min-h-[48px] items-center gap-2 font-semibold text-ink hover:underline">
                <Phone className="h-4 w-4 text-emergency" aria-hidden="true" /> {b.name}: {b.phone}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
