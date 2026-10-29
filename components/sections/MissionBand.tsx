import Image from "next/image";
import { up } from "@/lib/media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const MISSION =
  "Delivering comprehensive care with a collaborative approach to all stakeholders. Working with a transparent system with the highest ethical and quality standards.";
export const VISION = "Leader in providing quality treatment with Care, Cure & Compassion. Fulfilling the vision of Healthcare to All.";
export const VALUES = ["Quality", "Ethics", "Transparency", "Compassion", "Collaboration", "Communication"];

/** Mission / Vision / Values on the dark ink band (brief 5.1 #4). */
export function MissionBand({ withImage = true }: { withImage?: boolean }) {
  const photo = up("2025/12/Silver-Touch-Gujrat-hospital.jpg");
  return (
    <section className="section bg-ink text-white/80" aria-labelledby="mission-heading">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="dark">Who We Are</Eyebrow>
            <h2 id="mission-heading" className="mt-5 text-h2 text-white">
              Care, Cure &amp; Compassion
            </h2>
          </div>
          {withImage && (
            <div className="relative hidden aspect-[1108/600] overflow-hidden rounded-card lg:block">
              <Image src={photo.src} alt="" fill sizes="480px" className="object-cover object-top" />
            </div>
          )}
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-white/10 md:grid-cols-3">
          <Reveal className="bg-ink p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">Mission</h3>
            <p className="mt-4 text-lg text-white">{MISSION}</p>
          </Reveal>
          <Reveal delay={80} className="bg-ink p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">Vision</h3>
            <p className="mt-4 text-lg text-white">{VISION}</p>
          </Reveal>
          <Reveal delay={160} className="bg-ink p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">Values</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {VALUES.map((v) => (
                <li key={v} className="rounded-full border border-white/20 px-3.5 py-1.5 text-white">
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
