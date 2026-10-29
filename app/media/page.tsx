import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import { img } from "@/lib/media";
import { INSTAGRAM_HANDLE, SOCIALS } from "@/lib/site";
import { NABH } from "@/content/insurers";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillLink } from "@/components/ui/Pill";
import { Confirm } from "@/components/ui/Confirm";
import { LogoMarquee } from "@/components/sections/LogoMarquee";

export const metadata = pageMeta({
  title: "Media - Silver Touch Hospital",
  description:
    "Explore the latest Instagram updates, events, health awareness posts, and hospital activities from Silver Touch Hospital, Ahmedabad.",
  path: "/media/",
});

/**
 * The old page relied on an Instagram embed that no longer renders. Until the
 * hospital picks a feed provider, this page links to the profiles directly.
 * Set NEXT_PUBLIC_INSTAGRAM_FEED_URL to an embeddable feed (e.g. Behold,
 * SnapWidget) to show a live grid.
 */
const FEED_URL = process.env.NEXT_PUBLIC_INSTAGRAM_FEED_URL;

export default function MediaPage() {
  const nabh = img(NABH.image);
  const instagram = SOCIALS.find((s) => s.name === "Instagram")!;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Media", href: "/media/" }]}
        eyebrow="Media & News"
        title="News, events and health awareness"
        intro="Hospital updates, health camps and awareness posts from Silver Touch Hospitals."
      />

      <section className="section" aria-labelledby="news-heading">
        <div className="container">
          <SectionHeading id="news-heading" eyebrow="News" title="Latest news" />
          <article className="mt-12 grid gap-8 overflow-hidden rounded-[18px] bg-surface md:grid-cols-[360px_1fr]">
            <div className="relative aspect-[4/5]">
              <Image src={nabh.src} alt="Announcement: Silver Touch Hospital, Prahladnagar is now NABH (6th Edition) accredited" fill sizes="360px" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10 md:pl-0">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Accreditation</p>
              <h3 className="mt-3 text-h3 font-semibold">Silver Touch Hospital, Prahladnagar is now NABH (6th Edition) accredited</h3>
              <p className="mt-4 text-lead">
                Our Satellite (Prahladnagar) hospital has been accredited by the National Accreditation Board for Hospitals &amp;
                Healthcare Providers, reflecting our commitment to quality health care and patient safety.
              </p>
              <Confirm note="NABH accreditation wording and date" className="mt-4 self-start" />
            </div>
          </article>
          <p className="mt-6">
            <Confirm note="Press and news items, events and health camp photos" />
          </p>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="instagram-heading">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="instagram-heading" eyebrow="Instagram" title={`@${INSTAGRAM_HANDLE}`} intro="Health tips, hospital updates and community events." />
            <PillLink href={instagram.href}>Follow on Instagram</PillLink>
          </div>
          {FEED_URL ? (
            <iframe title="Silver Touch Hospitals on Instagram" src={FEED_URL} loading="lazy" className="mt-12 h-[640px] w-full rounded-[18px] border-0 bg-white" />
          ) : (
            <div className="mt-12 rounded-[18px] border border-dashed border-line bg-white p-10 text-center">
              <p className="text-lead">See our latest posts on Instagram, Facebook, X and LinkedIn.</p>
              <ul className="mt-6 flex flex-wrap justify-center gap-3">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center rounded-full border border-line px-5 font-medium text-ink hover:border-ink">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
              <Confirm note="Instagram feed provider (set NEXT_PUBLIC_INSTAGRAM_FEED_URL)" className="mt-6" />
            </div>
          )}
        </div>
      </section>

      <LogoMarquee title="Empanelments" />
    </>
  );
}
