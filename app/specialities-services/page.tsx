import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { AppointmentBand } from "@/components/sections/AppointmentBand";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SpecialityFilter } from "./SpecialityFilter";

export const metadata = pageMeta({
  title: "Specialities & Services at Silver Touch Hospitals Ahmedabad",
  description:
    "From routine checkups to specialized surgeries, Silver Touch Hospitals provide complete healthcare services in a safe and trusted environment.",
  path: "/specialities-services/",
});

export default function SpecialitiesIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Specialities / Services", href: "/specialities-services/" }]}
        eyebrow="Our Specialities"
        title="Specialities & Services"
        intro="From routine checkups to specialised surgeries, our two Ahmedabad hospitals offer complete care in a safe and trusted environment."
      />
      <section className="section">
        <div className="container">
          <SpecialityFilter />
        </div>
      </section>
      <AppointmentBand title="Not sure which department you need?" />
      <CtaBanner />
    </>
  );
}
