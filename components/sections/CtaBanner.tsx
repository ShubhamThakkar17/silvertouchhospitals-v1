import Image from "next/image";
import { Phone } from "lucide-react";
import { BRANCH_LIST } from "@/lib/site";
import { up } from "@/lib/media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowDisc, pillClasses } from "@/components/ui/Pill";

/** Full-width emergency CTA with both numbers (brief 2.4 #14, 5.1 #14). */
export function CtaBanner({
  eyebrow = "24x7 Emergency",
  title = "24x7 Emergency. We’re here when you need us most.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  const photo = up("2025/07/24-hours-hospital.jpg");
  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 md:py-28" aria-labelledby="cta-heading">
      <Image src={photo.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />
      <div className="container">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h2 id="cta-heading" className="mt-5 max-w-3xl text-h2 text-white">
          {title}
        </h2>
        <ul className="mt-10 flex flex-col gap-3 sm:flex-row">
          {BRANCH_LIST.map((b) => (
            <li key={b.id}>
              <a href={b.phoneHref} className={pillClasses("emergency", "w-full !min-h-[60px] text-lg sm:w-auto")}>
                <span>
                  {b.name}: {b.phone}
                </span>
                <ArrowDisc variant="emergency" icon={<Phone className="h-4 w-4" aria-hidden="true" />} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
