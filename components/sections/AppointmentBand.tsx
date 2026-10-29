import { Phone } from "lucide-react";
import { BRANCH_LIST, OPD_HOURS } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AppointmentForm, type AppointmentPreset } from "@/components/forms/AppointmentForm";

/** Appointment band: headline left, compact form right (brief 2.4 #8). */
export function AppointmentBand({
  title = "Book a consultation at your nearest Silver Touch Hospital",
  preset,
  id = "book",
}: {
  title?: string;
  preset?: AppointmentPreset;
  id?: string;
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <div className="container">
        <div className="relative overflow-hidden rounded-[18px] bg-primary p-6 sm:p-10 lg:p-14">
          <svg className="absolute -right-24 -top-24 h-96 w-96 text-white/5" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M6 1.5h4v4.5h4.5v4H10v4.5H6V10H1.5V6H6z" fill="currentColor" />
          </svg>
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="text-white">
              <Eyebrow tone="dark">Appointments</Eyebrow>
              <h2 id={`${id}-heading`} className="mt-5 text-h2 text-white">
                {title}
              </h2>
              <p className="mt-5 text-lead text-white/80">
                Leave your number and our team will call to confirm a time. OPD {OPD_HOURS.label}. Emergency 24x7.
              </p>
              <ul className="mt-8 space-y-3">
                {BRANCH_LIST.map((b) => (
                  <li key={b.id}>
                    <a href={b.phoneHref} className="inline-flex min-h-[48px] items-center gap-3 text-white hover:underline">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm text-white/70">{b.label}</span>
                        <span className="block text-lg font-semibold">{b.phone}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card bg-white p-6 sm:p-8">
              <AppointmentForm compact preset={preset} idPrefix={id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
