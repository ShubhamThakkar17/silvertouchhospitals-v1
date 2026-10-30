import Image from "next/image";
import { Cpu, Eye, HeartHandshake, Lightbulb, ShieldCheck, Sparkles, Stethoscope, UserRoundCheck, Users, Accessibility, Activity } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { up } from "@/lib/media";
import { BRANCH_LIST } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { MissionBand } from "@/components/sections/MissionBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Confirm } from "@/components/ui/Confirm";
import { PillLink } from "@/components/ui/Pill";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { DoctorsGrid } from "@/components/sections/DoctorsGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata = pageMeta({
  title: "About Silver Touch Hospitals | Multispeciality Hospitals in Ahmedabad",
  description:
    "Silver Touch Hospitals transform healthcare with modern technology, compassionate care and a strong focus on giving every patient the best medical service.",
  path: "/about-us/",
  image: up("2024/05/about-01.jpg").src,
});

const PILLARS = [
  { title: "Deliver Comprehensive Care", text: "We strive to offer a wide range of medical services and treatments.", icon: Stethoscope },
  {
    title: "Promote Wellness",
    // [CONFIRM] The current site repeats the "Deliver Comprehensive Care" line here (brief 12 #13).
    text: "We encourage prevention and early detection through health checkups and patient education.",
    icon: Activity,
    confirm: true,
  },
  { title: "Embrace Compassion", text: "At the heart of our mission is a deep-seated compassion for our patients and their families.", icon: HeartHandshake },
  {
    title: "Advance Innovation",
    text: "We are committed to staying at the forefront of medical advancements, leveraging technology, research, and evidence-based practices to continually improve patient care.",
    icon: Lightbulb,
  },
  {
    title: "Ensure Accessibility",
    text: "We strive to make quality healthcare accessible to all, regardless of socioeconomic status, geographic location, or cultural background, through our network of hospitals.",
    icon: Accessibility,
  },
];

const DIFFERENTIATORS = [
  { title: "Management by a Team of Doctors", text: "Guided by medical expertise, our leadership ensures the highest standards of care.", icon: Users },
  { title: "Transparency", text: "We uphold transparency in all our interactions, fostering trust and accountability.", icon: Eye },
  { title: "Human Touch", text: "Every patient is treated with empathy and respect, recognizing the importance of the human connection in healing.", icon: HeartHandshake },
  { title: "Accountability", text: "We hold ourselves accountable for the well-being of our patients and the integrity of our services.", icon: UserRoundCheck },
  { title: "Quality", text: "Excellence is our benchmark, reflected in the quality of care and services we provide.", icon: ShieldCheck },
  {
    title: "Use of High-End Technology and Artificial Intelligence",
    text: "Leveraging cutting-edge technology, including artificial intelligence, we enhance diagnostic accuracy and treatment efficacy, driving innovation in healthcare delivery.",
    icon: Cpu,
  },
];

const GALLERY = [
  ["2024/05/about-01.jpg", "Patient waiting area"],
  ["2024/05/about-02.jpg", "Reception and front desk"],
  ["2024/05/about-03.jpg", "Waiting lounge"],
  ["2024/05/about-04.jpg", "Private patient room"],
  ["2024/05/about-05.jpg", "Clinical equipment"],
  ["2024/05/about-06.jpg", "Patient ward"],
  ["2024/05/about-07.jpg", "Ward bed"],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About us", href: "/about-us/" }]}
        eyebrow="About Us"
        title="Professional medical care with a touch of humanity"
        intro="Silver Touch Hospitals is a group of multispeciality ICU and surgical hospitals in Ahmedabad, at Nirnay Nagar (Ranip) and Satellite (Prahladnagar)."
        image={up("2024/05/about-01.jpg")}
        imageAlt="Patient waiting area at a Silver Touch hospital"
      >
        <p className="mt-4">
          <Confirm note="Year founded and leadership / management team" />
        </p>
      </PageHero>

      <section className="section" aria-labelledby="pillars-heading">
        <div className="container">
          <SectionHeading id="pillars-heading" eyebrow="Our Mission" title="What we work towards every day" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 80}>
                <article className="h-full rounded-card bg-surface p-7">
                  <span className="grid h-14 w-14 place-items-center rounded-card bg-white text-primary">
                    <p.icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2">{p.text}</p>
                  {p.confirm && <Confirm note="Promote Wellness copy (current site duplicates another pillar)" className="mt-3" />}
                </article>
              </Reveal>
            ))}
            <Reveal as="li" delay={160}>
              <div className="flex h-full flex-col justify-center rounded-card bg-primary p-7 text-white">
                <Sparkles className="h-8 w-8" aria-hidden="true" />
                <p className="mt-4 text-lg">
                  By living out our mission each day, we aim to make a positive impact on the health and well-being of individuals and
                  communities, ultimately striving towards a healthier, more equitable world.
                </p>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>

      <MissionBand />

      <section className="section" aria-labelledby="vision-heading">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Our Vision</Eyebrow>
            <h2 id="vision-heading" className="mt-5 text-h2">
              Health is an inalienable right for every individual
            </h2>
            <div className="mt-6 space-y-4 text-lead">
              <p>
                Our group of hospitals is committed to revolutionizing healthcare through a profound dedication to patient well-being and
                professional excellence. We envision a future where every individual receives treatment imbued with care, cure, and
                compassion, ensuring a transparent healthcare system accessible to all. By providing a nurturing platform for healthcare
                professionals to flourish, we aim to elevate standards across the industry.
              </p>
              <p>We stand firmly behind government initiatives, championing the belief that health is an inalienable right for every individual.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
            <Image src={up("2024/05/about-06.jpg").src} alt="Patient ward at a Silver Touch hospital" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="diff-heading">
        <div className="container">
          <SectionHeading id="diff-heading" eyebrow="What Sets Us Apart" title="Six things that make Silver Touch different" align="center" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal as="li" key={d.title} delay={(i % 3) * 80}>
                <article className="flex h-full gap-5 rounded-card bg-white p-7">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{d.title}</h3>
                    <p className="mt-2">{d.text}</p>
                  </div>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-card bg-surface text-primary">
                    <d.icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-heading">
        <div className="container">
          <SectionHeading id="gallery-heading" eyebrow="Inside Our Hospitals" title="A look around" />
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY.map(([src, alt], i) => {
              const g = up(src);
              return (
                <li
                  key={src}
                  className={
                    i === 0
                      ? "relative col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
                      : i === GALLERY.length - 1
                        ? "relative aspect-[4/3] md:col-span-3 md:aspect-[3/1]"
                        : "relative aspect-[4/3]"
                  }
                >
                  <Image
                    src={g.src}
                    alt={alt}
                    fill
                    sizes={i === 0 || i === GALLERY.length - 1 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                    className="rounded-card object-cover"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="branches-heading">
        <div className="container">
          <SectionHeading id="branches-heading" eyebrow="Our Hospitals" title="Two hospitals in Ahmedabad" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {BRANCH_LIST.map((b) => (
              <article key={b.id} className="rounded-[18px] bg-white p-7 md:p-9">
                <h3 className="text-2xl font-semibold">{b.label}</h3>
                <address className="mt-3 not-italic">
                  {b.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <p className="mt-3 font-semibold text-ink">
                  <a href={b.phoneHref} className="hover:underline">
                    {b.phone}
                  </a>
                </p>
                {b.id === "satellite" && <p className="mt-2 text-sm text-primary">NABH (6th Edition) accredited</p>}
                <Confirm note={`Branch photo for ${b.name}`} className="mt-3" />
                <PillLink href={b.mapUrl} variant="outline" className="mt-6" data-track="directions_click" data-branch={b.id}>
                  Get directions
                </PillLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LogoMarquee title="Empanelments & cashless insurance" />
      <DoctorsGrid />
      <CtaBanner />
    </>
  );
}
