import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, Clock, FileText, Phone, Receipt } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { img } from "@/lib/media";
import { BRANCH_LIST } from "@/lib/site";
import { EMPANELMENTS, INSURERS } from "@/content/insurers";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Confirm } from "@/components/ui/Confirm";
import { FaqSection } from "@/components/sections/FaqSection";
import { AppointmentBand } from "@/components/sections/AppointmentBand";
import { GENERAL_FAQS } from "@/content/faqs";

export const metadata = pageMeta({
  title: "Patients & Insurance: PMJAY, CGHS, Cashless | Silver Touch Hospitals",
  description:
    "Cashless treatment at Silver Touch Hospitals, Ahmedabad: PMJAY (Ayushman Bharat) up to ₹5 lakh per family per year, CGHS, ISRO, MA Yojana and leading insurers.",
  path: "/patients-insurance/",
});

export default function PatientsInsurancePage() {
  const pmjay = EMPANELMENTS[0];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Patients & Insurance", href: "/patients-insurance/" }]}
        eyebrow="Patients & Insurance"
        title="Cashless care, explained"
        intro="We are empanelled under PMJAY (Ayushman Bharat), CGHS, ISRO and Mukhyamantri Amrutam, and offer cashless treatment with leading insurers. Our billing desk helps with the paperwork."
      />

      <section className="section" aria-labelledby="pmjay-heading">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="grid aspect-[4/3] min-w-0 place-items-center rounded-[18px] bg-surface p-6 sm:p-10">
            <Image src={img(pmjay.image).src} width={img(pmjay.image).width} height={img(pmjay.image).height} alt="PMJAY Ayushman Bharat logo" className="h-auto max-h-56 w-auto max-w-full" />
          </div>
          <div>
            <SectionHeading id="pmjay-heading" eyebrow="PMJAY / Ayushman Bharat" title="Up to ₹5,00,000 cashless cover per family, every year" />
            <p className="mt-5 text-lead">
              As a recognised PMJAY hospital in Ahmedabad, Silver Touch Hospitals provides eligible families cashless hospitalisation for
              secondary and tertiary care under the Pradhan Mantri Jan Arogya Yojana. Our staff guide you through the process and the
              documentation.
            </p>
            <ol className="mt-8 space-y-4">
              {[
                ["Bring your Ayushman card", "Visit either branch with your PMJAY (Ayushman) card or eligibility details."],
                ["We verify eligibility", "Our PMJAY desk checks your eligibility and the treatment package."],
                ["Cashless treatment", "Approved treatment is cashless up to your family’s annual cover."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-semibold text-white">{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-ink">{t}</span>
                    <span className="block">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6">
              <Confirm note="Exact PMJAY process and list of documents" />
            </p>
            <ul className="mt-6 space-y-2">
              <li>
                <Link href="/does-ayushman-bharat-cover-joint-replacement-at-silver-touch-hospitals/" className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-primary hover:underline">
                  Does Ayushman Bharat cover joint replacement? <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/can-i-get-bariatric-surgery-under-the-pmjay-scheme-at-silver-touch-hospitals/" className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-primary hover:underline">
                  Can I get bariatric surgery under PMJAY? <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="schemes-heading">
        <div className="container">
          <SectionHeading id="schemes-heading" eyebrow="Empanelments" title="Government schemes we accept" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EMPANELMENTS.map((e) => {
              const logo = img(e.image);
              return (
                <li key={e.name} className="rounded-card bg-white p-6">
                  <div className="grid h-28 place-items-center">
                    <Image src={logo.src} width={logo.width} height={logo.height} alt={`${e.name} logo`} className="max-h-24 w-auto" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{e.name}</h3>
                  {e.note && <p className="mt-1">{e.note}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="insurers-heading">
        <div className="container">
          <SectionHeading id="insurers-heading" eyebrow="Cashless Insurance" title="Cashless with leading insurers" intro="Covered patients can be treated cashless. Our billing desk supports you through pre-authorisation and claims." />
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {INSURERS.map((i) => {
              const logo = img(i.image);
              return (
                <li key={i.name} className="grid h-28 place-items-center rounded-card border border-line p-4">
                  <Image src={logo.src} width={logo.width} height={logo.height} alt={i.name} className="max-h-16 w-auto object-contain" />
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm">Don’t see your insurer? Call the billing desk at either branch to check.</p>
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="admission-heading">
        <div className="container">
          <SectionHeading id="admission-heading" eyebrow="Your Visit" title="Before you come in" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <article className="rounded-card bg-white p-7">
              <Receipt className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">Billing desk</h3>
              <p className="mt-2">Questions about estimates, insurance or PMJAY? Call the branch you are visiting:</p>
              <ul className="mt-3 space-y-1">
                {BRANCH_LIST.map((b) => (
                  <li key={b.id}>
                    <a href={b.phoneHref} className="inline-flex min-h-[40px] items-center gap-2 font-medium text-ink hover:underline">
                      <Phone className="h-4 w-4 text-primary" aria-hidden="true" /> {b.name}: {b.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-card bg-white p-7">
              <ClipboardList className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">What to bring for admission</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Photo ID</li>
                <li>Insurance card / policy, or PMJAY / CGHS / MA card</li>
                <li>Previous reports, prescriptions and current medicines</li>
              </ul>
              <Confirm note="Admission checklist" className="mt-3" />
            </article>
            <article className="rounded-card bg-white p-7">
              <Clock className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold">Hours</h3>
              <p className="mt-2">OPD: Mon – Sat, 8 AM – 7 PM</p>
              <p>Emergency, ICU and ambulance: 24x7</p>
              <p className="mt-2">Visiting hours: please ask at reception.</p>
              <Confirm note="Visiting hours" className="mt-3" />
            </article>
          </div>
          <p className="mt-8 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
            <Link href="/patient-rights/" className="font-medium text-primary underline underline-offset-4">
              Patient rights and responsibilities
            </Link>
          </p>
        </div>
      </section>

      <FaqSection faqs={GENERAL_FAQS.filter((f) => /insurance|PMJAY|appointment/i.test(f.q))} title="Insurance questions" schema={false} />
      <AppointmentBand />
    </>
  );
}
