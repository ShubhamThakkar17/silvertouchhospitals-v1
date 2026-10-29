import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldPlus } from "lucide-react";
import { up } from "@/lib/media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillLink } from "@/components/ui/Pill";
import { DOCTOR_BY_SLUG, doctorHref } from "@/content/doctors";

/** Flagship blocks on the orthopaedics page (brief 5.9). */
export function OrthoFeatures() {
  const photo = up("2026/06/Robotic-Knee-Replacement.png");
  const jil = DOCTOR_BY_SLUG["dr-jil-p-patel"];
  return (
    <section className="section bg-ink" aria-labelledby="velys-heading">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow tone="dark">Robotic Knee Replacement</Eyebrow>
            <h2 id="velys-heading" className="mt-5 text-h2 text-white">
              VELYS robotic-assisted knee replacement, CT-free
            </h2>
            <p className="mt-5 text-lead text-white/80">
              {jil.name} offers robotic-assisted knee replacement using the VELYS Robotic-Assisted Solution, with personalised
              surgical planning. Depending on the patient’s condition and suitability, modern joint replacement techniques may offer
              smaller incisions, reduced tissue disruption and improved rehabilitation.
            </p>
            <ul className="mt-8 space-y-3">
              <li>
                <Link href="/what-are-the-benefits-of-velys-robotic-knee-replacement/" className="inline-flex min-h-[44px] items-center gap-2 text-white underline-offset-4 hover:underline">
                  What are the benefits of VELYS robotic knee replacement? <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href="/what-makes-ct-free-robotic-knee-replacement-safer-than-traditional-robotic-methods/"
                  className="inline-flex min-h-[44px] items-center gap-2 text-white underline-offset-4 hover:underline"
                >
                  What makes CT-free robotic knee replacement safer? <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
            <PillLink href={doctorHref(jil.slug)} variant="white" className="mt-8">
              Meet {jil.name}
            </PillLink>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[18px]">
            <Image src={photo.src} alt="Robotic knee replacement at Silver Touch Hospitals" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 rounded-[18px] bg-primary p-6 text-white sm:flex-row sm:items-center sm:p-10">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-card bg-white/15">
            <ShieldPlus className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-white">Ayushman Bharat covers joint replacement</h3>
            <p className="mt-2 text-white/85">
              Eligible PMJAY families can get cashless hospitalisation up to ₹5,00,000 per year. Our staff help with the documentation.
            </p>
          </div>
          <PillLink href="/does-ayushman-bharat-cover-joint-replacement-at-silver-touch-hospitals/" variant="white">
            Read the guide
          </PillLink>
        </div>
      </div>
    </section>
  );
}
