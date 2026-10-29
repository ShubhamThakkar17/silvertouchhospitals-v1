import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({
  title: "Patient Rights & Responsibilities | Silver Touch Hospitals",
  description: "The rights and responsibilities of patients and families at Silver Touch Hospitals, Ahmedabad.",
  path: "/patient-rights/",
  noindex: true,
});

export default function PatientRightsPage() {
  return (
    <LegalPage
      title="Patient Rights & Responsibilities"
      path="/patient-rights/"
      intro="Every patient deserves care that is safe, respectful and transparent."
    >
      <h2>Your rights</h2>
      <ul>
        <li>To receive information about your condition, treatment options and expected costs in a language you understand.</li>
        <li>To give or refuse informed consent before any procedure.</li>
        <li>To privacy and confidentiality of your medical information.</li>
        <li>To be treated with dignity, without discrimination.</li>
        <li>To ask for a second opinion.</li>
        <li>To receive copies of your medical records and reports.</li>
        <li>To raise a complaint and have it addressed.</li>
      </ul>
      <h2>Your responsibilities</h2>
      <ul>
        <li>Share complete and accurate information about your health and medicines.</li>
        <li>Follow the treatment plan agreed with your doctor.</li>
        <li>Respect hospital staff, other patients and hospital rules.</li>
        <li>Settle bills or insurance formalities on time.</li>
      </ul>
    </LegalPage>
  );
}
