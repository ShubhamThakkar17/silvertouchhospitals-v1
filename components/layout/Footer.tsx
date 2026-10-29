import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BRANCH_LIST, LOGO, OPD_HOURS, TAGLINE } from "@/lib/site";
import { img } from "@/lib/media";
import { specialityHref } from "@/content/specialities";
import { SocialIcons } from "@/components/ui/SocialIcons";

const IMPORTANT = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about-us/" },
  { name: "Specialities / Services", href: "/specialities-services/" },
  { name: "Doctors", href: "/doctor-team/" },
  { name: "Patients & Insurance", href: "/patients-insurance/" },
  { name: "Media", href: "/media/" },
  { name: "Blogs", href: "/blogs/" },
  { name: "Testimonials", href: "/testimonials/" },
  { name: "FAQs", href: "/silver-touch-hospitals-faqs/" },
  { name: "Work With Us", href: "/work-with-us/" },
  { name: "Contact us", href: "/contact-us/" },
];

const FOOTER_SPECIALITIES: [string, string][] = [
  ["Gastroenterology", "gastroenterology"],
  ["GI Surgery", "gi-surgery"],
  ["Critical Care", "critical-care"],
  ["Dentistry", "dentistry"],
  ["Nephrology", "nephrology"],
  ["Orthopedics / Joint Replacement Surgery", "orthopedics-joint-replacement-surgery"],
  ["Pulmonology", "pulmonology"],
  ["Spine Surgery", "spine-surgery"],
  ["Urology", "urology"],
  ["Bariatric Surgery", "bariatric-surgery-ahmedabad"],
];

function PreFooter() {
  return (
    <div className="border-b border-white/10">
      <div className="container grid gap-8 py-10 md:grid-cols-[1fr_1fr_auto] md:items-center">
        <div>
          <p className="text-lg font-semibold text-white">Book An Appointment? Call Us Now</p>
          <ul className="mt-3 space-y-1.5">
            {BRANCH_LIST.map((b) => (
              <li key={b.id}>
                <a href={b.phoneHref} className="inline-flex min-h-[40px] items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-white/60" aria-hidden="true" />
                  {b.name}: <span className="font-semibold text-white">{b.phone}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Need support? Drop us an email</p>
          <ul className="mt-3 space-y-1.5">
            {BRANCH_LIST.map((b) => (
              <li key={b.id}>
                <a href={`mailto:${b.email}`} className="inline-flex min-h-[40px] items-center gap-2 break-all hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
                  {b.name}: <span className="text-white">{b.email}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3 rounded-card bg-white/5 px-5 py-4">
          <Clock className="h-6 w-6 text-white/70" aria-hidden="true" />
          <div>
            <p className="font-semibold text-white">OPD Timings</p>
            <p>{OPD_HOURS.label}</p>
            <p className="text-sm text-white/60">Emergency 24x7</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const logo = img(LOGO);
  return (
    <footer className="bg-ink pb-24 text-white/75 lg:pb-0">
      <PreFooter />
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1fr_0.9fr_1.1fr_1.35fr_1.35fr]">
        <div>
          <Link href="/" className="inline-block rounded-card bg-white p-3">
            <Image src={logo.src} width={logo.width} height={logo.height} alt="Silver Touch Hospitals" className="h-14 w-auto" />
          </Link>
          <p className="mt-5 text-lg font-medium text-white">{TAGLINE}</p>
          <p className="mt-2 text-sm">Multispeciality ICU and surgical care in Ahmedabad.</p>
          <SocialIcons className="-ml-2 mt-4" />
        </div>

        <nav aria-label="Important links">
          <p className="font-semibold text-white">Important Links</p>
          <ul className="mt-4 space-y-1">
            {IMPORTANT.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Specialities">
          <p className="font-semibold text-white">Specialities</p>
          <ul className="mt-4 space-y-1">
            {FOOTER_SPECIALITIES.map(([name, slug]) => (
              <li key={slug}>
                <Link href={specialityHref(slug)} className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {BRANCH_LIST.map((b) => (
          <address key={b.id} className="not-italic">
            <p className="font-semibold text-white">{b.label}</p>
            <p className="mt-4 flex gap-2">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
              <span>
                {b.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <a href={b.phoneHref} className="inline-flex min-h-[36px] items-center gap-2 font-semibold text-white hover:underline">
                  <Phone className="h-4 w-4 text-white/60" aria-hidden="true" />
                  {b.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${b.email}`} className="inline-flex min-h-[36px] items-center gap-2 text-sm hover:text-white [overflow-wrap:anywhere]">
                  <Mail className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
                  {b.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${b.hrEmail}`} className="inline-flex min-h-[36px] items-center gap-2 text-sm hover:text-white [overflow-wrap:anywhere]">
                  <span className="sr-only">HR: </span>
                  <Mail className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
                  {b.hrEmail}
                </a>
              </li>
              <li>
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions_click"
                  data-branch={b.id}
                  className="inline-flex min-h-[36px] items-center gap-2 text-sm font-medium text-white underline underline-offset-4"
                >
                  Get directions
                </a>
              </li>
            </ul>
          </address>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 text-sm">
          <p className="max-w-4xl text-white/60">
            <strong className="font-semibold text-white/80">Medical disclaimer:</strong> Information on this website is for general
            awareness and is not a substitute for professional medical advice, diagnosis or treatment. Outcomes vary from patient to
            patient. In an emergency, call the hospital immediately.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright © {new Date().getFullYear()} Silver Touch Hospitals. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              <li>
                <Link href="/privacy-policy/" className="hover:text-white hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-white hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/patient-rights/" className="hover:text-white hover:underline">
                  Patient Rights
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white hover:underline" prefetch={false}>
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
