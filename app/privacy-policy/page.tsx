import { pageMeta } from "@/lib/seo";
import { BRANCH_LIST, HR_EMAIL } from "@/lib/site";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({
  title: "Privacy Policy | Silver Touch Hospitals",
  description: "How Silver Touch Hospitals collects, uses and protects personal data submitted through this website.",
  path: "/privacy-policy/",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/" intro="How we handle the personal data you share with us through this website.">
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Appointment requests:</strong> your name, mobile number, optional email, preferred branch, department, doctor, date
          and message.
        </li>
        <li>
          <strong>Job applications:</strong> your name, email, contact number, preferred location, role and resume.
        </li>
        <li>
          <strong>Website usage:</strong> if analytics are enabled, anonymous usage data such as pages visited and buttons clicked.
        </li>
      </ul>
      <h2>Why we use it</h2>
      <p>
        We use appointment details only to contact you about your appointment, and job applications only to assess your application.
        We do not sell your data.
      </p>
      <h2>Consent and your rights</h2>
      <p>
        We process your data with your consent, given when you submit a form. Under the Digital Personal Data Protection Act, 2023 you
        may ask us to access, correct or erase your data, or withdraw consent, by writing to us.
      </p>
      <h2>How long we keep it</h2>
      <p>We keep form submissions only as long as needed for the purpose they were collected for, or as required by law.</p>
      <h2>Contact</h2>
      <ul>
        {BRANCH_LIST.map((b) => (
          <li key={b.id}>
            {b.label}: <a href={`mailto:${b.email}`}>{b.email}</a>
          </li>
        ))}
        <li>
          Job applications: <a href={`mailto:${HR_EMAIL}`}>{HR_EMAIL}</a>
        </li>
      </ul>
    </LegalPage>
  );
}
