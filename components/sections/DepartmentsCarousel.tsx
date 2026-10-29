import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SPECIALITIES } from "@/content/specialities";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Carousel } from "@/components/ui/Carousel";
import { SpecialityCard } from "@/components/cards/SpecialityCard";

/** All 19 specialities in a draggable carousel (brief 2.4 #7, 5.1 #6). */
export function DepartmentsCarousel() {
  return (
    <section className="section bg-surface" aria-labelledby="departments-heading">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Specialities</Eyebrow>
            <h2 id="departments-heading" className="mt-5 text-h2">
              19 specialities and services across two hospitals
            </h2>
          </div>
          <Link href="/specialities-services/" className="inline-flex min-h-[48px] items-center gap-1.5 font-medium text-primary hover:underline">
            More departments <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <Carousel label="Specialities" className="mt-6" itemClassName="w-[85%] sm:w-[46%] lg:w-[31.8%]">
          {SPECIALITIES.map((s) => (
            <div key={s.slug} className="h-full bg-white rounded-card">
              <SpecialityCard s={s} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
