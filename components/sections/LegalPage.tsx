import { PageHero } from "./PageHero";
import { Confirm } from "@/components/ui/Confirm";

/** Legal pages ship as drafts (noindex) until the hospital's legal team approves the copy. [CONFIRM] */
export function LegalPage({ title, path, intro, children }: { title: string; path: string; intro: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, href: path }]} title={title} intro={intro}>
        <p className="mt-4">
          <Confirm note="Draft for legal review; page is noindex until approved" />
        </p>
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="prose-st">{children}</div>
        </div>
      </section>
    </>
  );
}
