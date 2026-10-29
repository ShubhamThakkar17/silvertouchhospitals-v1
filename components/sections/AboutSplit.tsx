import Image from "next/image";
import { up } from "@/lib/media";
import { PROOF_POINTS } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Confirm } from "@/components/ui/Confirm";

/** About split + overlapping photos + stats column (brief 2.4 #4, 5.1 #2). */
export function AboutSplit() {
  const a = up("2024/05/about-01.jpg");
  const b = up("2024/05/about-04.jpg");
  return (
    <section className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1fr_2.2fr]">
          <Reveal>
            <Eyebrow>About Us</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-heading" className="text-h3 font-medium text-ink">
              Welcome to Silver Touch Hospitals, where excellence meets compassion.
            </h2>
            <p className="mt-6 max-w-3xl text-lead">
              Silver Touch Hospitals, a prominent group of corporate hospitals in Ahmedabad, operates on the belief that health is the
              cornerstone of a meaningful life. It is our mission to deliver professional medical care with a touch of humanity across our
              facilities. Strategically situated and supported by cutting-edge technology, our multi-specialty ICU hospitals are designed to
              provide comprehensive, end-to-end treatment, whether for routine check-ups or urgent health crises.
            </p>
            <PillLink href="/about-us/" variant="outline" className="mt-8">
              More about us
            </PillLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[2.2fr_1fr] lg:items-end">
          <Reveal className="relative pb-16 sm:pb-24">
            <div className="relative aspect-[1125/453] w-full overflow-hidden rounded-card sm:w-[85%]">
              <Image src={a.src} alt="Patient waiting area at a Silver Touch hospital" fill sizes="(min-width: 1024px) 700px, 90vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 aspect-[1125/453] w-[70%] overflow-hidden rounded-card border-[6px] border-white sm:w-[55%]">
              <Image src={b.src} alt="Patient room at a Silver Touch hospital" fill sizes="(min-width: 1024px) 460px, 70vw" className="object-cover" />
            </div>
          </Reveal>
          <dl className="divide-y divide-line">
            {PROOF_POINTS.map((p, i) => (
              <Reveal key={p.label} delay={i * 80} className="py-5 first:pt-0">
                <dt className="sr-only">{p.label}</dt>
                <dd className="text-5xl font-semibold tracking-tight text-ink">
                  <CountUp value={p.value} prefix={"prefix" in p ? p.prefix : ""} suffix={p.suffix} />
                </dd>
                <dd className="mt-1 text-base">{p.label}</dd>
              </Reveal>
            ))}
            <div className="pt-5">
              <Confirm note="Doctor count, surgeries performed, years since founding, Google rating" />
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
