import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { AppointmentBand } from "@/components/sections/AppointmentBand";
import { Confirm } from "@/components/ui/Confirm";
import { DoctorFilter } from "./DoctorFilter";

export const metadata = pageMeta({
  title: "Our Doctors | Silver Touch Hospitals Ahmedabad",
  description:
    "Meet the orthopaedic, spine, urology, ENT, gastroenterology, general surgery and medicine specialists at Silver Touch Hospitals, Nirnay Nagar and Satellite, Ahmedabad.",
  path: "/doctor-team/",
});

export default function DoctorsIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Doctors", href: "/doctor-team/" }]}
        eyebrow="Find a Doctor"
        title="Our doctors"
        intro="Specialists across surgery, medicine and diagnostics at Nirnay Nagar and Satellite. Filter by speciality or branch, then book in one tap."
      >
        <p className="mt-4">
          <Confirm note="Branch-wise OPD days per doctor and professional headshots" />
        </p>
      </PageHero>
      <section className="section">
        <div className="container">
          <DoctorFilter />
        </div>
      </section>
      <AppointmentBand title="Can’t find the right doctor? We’ll help you choose." />
    </>
  );
}
