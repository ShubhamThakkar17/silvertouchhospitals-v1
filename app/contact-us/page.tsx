import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { BRANCH_LIST, OPD_HOURS } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowDisc, pillClasses } from "@/components/ui/Pill";
import { SocialIcons } from "@/components/ui/SocialIcons";

export const metadata = pageMeta({
  title: "Get in Touch | Silver Touch Hospitals Ahmedabad",
  description:
    "Reach out to Silver Touch Hospitals in Ahmedabad. Visit our Satellite-Prahladnagar and Nirnay Nagar branches for appointments, emergencies or general queries.",
  path: "/contact-us/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact us", href: "/contact-us/" }]}
        eyebrow="Contact"
        title="Get in touch"
        intro="Two hospitals in Ahmedabad, open for emergencies 24x7. Call, email, visit or send us an appointment request."
      />
      <section className="section" aria-label="Our branches">
        <div className="container grid gap-5 lg:grid-cols-2">
          {BRANCH_LIST.map((b) => (
            <article key={b.id} className="flex flex-col overflow-hidden rounded-[18px] border border-line">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold">{b.label}</h2>
                <div className="mt-6 space-y-5">
                  <div className="flex gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink">Address</p>
                      <div>
                        <address className="not-italic">
                          {b.addressLines.map((l) => (
                            <span key={l} className="block">
                              {l}
                            </span>
                          ))}
                        </address>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-emergency" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink">Emergency Cases</p>
                      <div>
                        <a href={b.phoneHref} className="text-lg font-semibold text-ink hover:underline">
                          {b.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink">OPD Timings</p>
                      <div>
                        {OPD_HOURS.label}. Emergency 24x7.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink">Get Support</p>
                      <div className="[overflow-wrap:anywhere]">
                        <a href={`mailto:${b.email}`} className="flex min-h-[36px] items-center hover:underline">
                          {b.email}
                        </a>
                        <a href={`mailto:${b.hrEmail}`} className="flex min-h-[36px] items-center text-sm hover:underline">
                          HR: {b.hrEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={b.phoneHref} className={pillClasses("emergency")}>
                    <span>Call {b.name}</span>
                    <ArrowDisc variant="emergency" icon={<Phone className="h-4 w-4" aria-hidden="true" />} />
                  </a>
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="directions_click"
                    data-branch={b.id}
                    className={pillClasses("outline")}
                  >
                    <span>Get directions</span>
                    <ArrowDisc variant="outline" icon={<Navigation className="h-4 w-4" aria-hidden="true" />} />
                  </a>
                </div>
              </div>
              <iframe
                title={`Map: Silver Touch Hospital, ${b.label}`}
                src={b.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-auto h-72 w-full border-0"
              />
            </article>
          ))}
        </div>
      </section>

      <section id="contactForm" className="section bg-surface scroll-mt-40" aria-labelledby="contact-form-heading">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow>Appointments</Eyebrow>
            <h2 id="contact-form-heading" className="mt-5 text-h2">
              Book an appointment
            </h2>
            <p className="mt-5 text-lead">Send us your details and our team will call you to confirm a time. For emergencies, please call.</p>
            <div className="mt-8 inline-flex rounded-full bg-ink p-1 text-white">
              <SocialIcons />
            </div>
          </div>
          <div className="rounded-[18px] bg-white p-6 sm:p-8">
            <AppointmentForm idPrefix="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
