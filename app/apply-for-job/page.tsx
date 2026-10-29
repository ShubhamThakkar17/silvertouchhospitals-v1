import { Suspense } from "react";
import { pageMeta } from "@/lib/seo";
import { HR_EMAIL } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ApplyForm } from "./ApplyForm";

export const metadata = pageMeta({
  title: "Apply for Jobs | Careers at Silver Touch Hospital Ahmedabad",
  description:
    "Apply for hospital jobs in Ahmedabad at Silver Touch Hospital. Nursing, admin, reception, HR, doctors, OT staff, billing, CSSD and X-ray technician roles.",
  path: "/apply-for-job/",
});

export default function ApplyPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Work With Us", href: "/work-with-us/" },
          { name: "Apply for Job", href: "/apply-for-job/" },
        ]}
        eyebrow="Careers"
        title="Apply for a job"
        intro={`Fill in the form and attach your resume. Our HR team (${HR_EMAIL}) will get back to you.`}
      />
      <section className="section">
        <div className="container max-w-3xl">
          <div className="rounded-[18px] border border-line p-6 sm:p-10">
            <Suspense>
              <ApplyForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
