import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({
  title: "Terms of Use | Silver Touch Hospitals",
  description: "Terms of use for the Silver Touch Hospitals website.",
  path: "/terms/",
  noindex: true,
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms/" intro="The terms that apply when you use this website.">
      <h2>Medical information</h2>
      <p>
        Content on this website is for general information and awareness. It is not a substitute for professional medical advice,
        diagnosis or treatment. Always consult a qualified doctor about your health. In an emergency, call the hospital immediately.
      </p>
      <h2>Appointments</h2>
      <p>
        Submitting an appointment request does not confirm an appointment. Our team will contact you to confirm a time, subject to
        doctor availability.
      </p>
      <h2>Prices and coverage</h2>
      <p>
        Treatment costs, packages and insurance or scheme coverage are confirmed by the hospital after consultation and eligibility
        checks.
      </p>
      <h2>Content</h2>
      <p>Text, images and logos on this website belong to Silver Touch Hospitals or their respective owners and may not be reused without permission.</p>
    </LegalPage>
  );
}
