import { pageMeta } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { getAllSpecialities, getImportedPage } from "@/lib/content";
import { GENERAL_FAQS } from "@/content/faqs";
import { specialityHref } from "@/content/specialities";
import { PageHero } from "@/components/sections/PageHero";
import { AppointmentBand } from "@/components/sections/AppointmentBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqTabs, type FaqGroup } from "./FaqTabs";

export const metadata = pageMeta({
  title: "FAQs - Silver Touch Hospital",
  description:
    "Get quick answers to frequently asked questions about appointments, diabetes treatment, doctors, facilities, and patient care at Silver Touch Hospital.",
  path: "/silver-touch-hospitals-faqs/",
});

export default function FaqsPage() {
  const treatments = getImportedPage("silver-touch-hospitals-faqs")?.faqs ?? [];
  const groups: FaqGroup[] = [
    { id: "general", label: "General & Appointments", faqs: GENERAL_FAQS },
    { id: "treatments", label: "Treatments", faqs: treatments },
    ...getAllSpecialities()
      .filter((s) => s.faqs.length)
      .map((s) => ({ id: s.slug, label: s.name, faqs: s.faqs, href: specialityHref(s.slug) })),
  ];
  // Speciality FAQs are marked up on their own pages; this page marks up its own two groups.
  return (
    <>
      <JsonLd data={faqSchema([...GENERAL_FAQS, ...treatments])} />
      <PageHero
        crumbs={[{ name: "FAQs", href: "/silver-touch-hospitals-faqs/" }]}
        eyebrow="FAQs"
        title="Frequently asked questions"
        intro="Appointments, insurance and PMJAY, treatments and every department, in one place."
      />
      <section className="section">
        <div className="container">
          <FaqTabs groups={groups} />
        </div>
      </section>
      <AppointmentBand title="Still have a question? Ask our team." />
    </>
  );
}
