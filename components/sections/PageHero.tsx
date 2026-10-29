import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Img } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Inner-page hero: breadcrumb, eyebrow, H1, intro, optional actions and photo. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  image,
  imageAlt = "",
  tone = "surface",
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  image?: Img | null;
  imageAlt?: string;
  tone?: "surface" | "dark" | "emergency";
  children?: React.ReactNode;
}) {
  const dark = tone !== "surface";
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        tone === "surface" && "bg-surface",
        tone === "dark" && "bg-ink",
        tone === "emergency" && "bg-gradient-to-br from-emergency-dark via-emergency to-[#b3141b]",
      )}
    >
      <div className={cn("container grid gap-10 py-12 md:py-16", image && "lg:grid-cols-[1.3fr_1fr] lg:items-center")}>
        <div>
          <Breadcrumbs items={crumbs} tone={dark ? "dark" : "light"} />
          {eyebrow && <Eyebrow tone={dark ? "dark" : "light"} className="mt-8">{eyebrow}</Eyebrow>}
          <h1 className={cn("mt-5 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.02em]", dark && "text-white")}>
            {title}
          </h1>
          {intro && <p className={cn("mt-5 max-w-2xl text-lead", dark ? "text-white/85" : "text-body")}>{intro}</p>}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
          {children}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] lg:aspect-[4/4.2]">
            <Image src={image.src} alt={imageAlt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
