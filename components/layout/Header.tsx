"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, Siren, X } from "lucide-react";
import { GROUP_LABELS, SPECIALITIES, specialityHref, type SpecialityGroup } from "@/content/specialities";
import { BRANCH_LIST } from "@/lib/site";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { BookButton } from "@/components/forms/BookButton";
import { SocialIcons } from "@/components/ui/SocialIcons";
import type { Img } from "@/lib/media";

const NAV = [
  { name: "About Us", href: "/about-us/" },
  { name: "Specialities", href: "/specialities-services/", mega: true },
  { name: "Doctors", href: "/doctor-team/" },
  { name: "Health Checkups", href: "/specialities-services/full-body-health-checkup/" },
  { name: "Patients & Insurance", href: "/patients-insurance/" },
  { name: "Blog", href: "/blogs/" },
  { name: "Contact", href: "/contact-us/" },
];

const GROUPS: SpecialityGroup[] = ["surgery", "medicine", "care"];

/** Menu order from brief 3.1. */
const MENU_ORDER: Record<SpecialityGroup, string[]> = {
  surgery: [
    "orthopedics-joint-replacement-surgery",
    "hip-replacement-ahmedabad",
    "spine-surgery",
    "general-surgery",
    "bariatric-surgery-ahmedabad",
    "gi-surgery",
  ],
  medicine: [
    "gastroenterology",
    "nephrology",
    "urology",
    "neurology",
    "pulmonology",
    "endocrinologist-diabetes-hospital-ahmedabad",
    "fever-physician-ahmedabad",
    "general-medicine",
  ],
  care: ["critical-care", "full-body-health-checkup", "dentistry", "ear-nose-throat", "gynecology-obstetrics"],
};

const bySlug = Object.fromEntries(SPECIALITIES.map((s) => [s.slug, s]));

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header({ logo }: { logo: Img }) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);
  const emergencyRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
    setEmergencyOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setEmergencyOpen(false);
        setDrawerOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
      if (emergencyRef.current && !emergencyRef.current.contains(e.target as Node)) setEmergencyOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  const hoverOpen = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <>
    <div className="relative border-b border-line/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="shrink-0" aria-label="Silver Touch Hospitals, home">
          <Image src={logo.src} width={logo.width} height={logo.height} alt="Silver Touch Hospitals" priority className="h-12 w-auto lg:h-14" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) =>
              item.mega ? (
                <li key={item.href} ref={megaRef} onMouseEnter={hoverOpen} onMouseLeave={hoverClose} className="static">
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    onClick={() => setMegaOpen((o) => !o)}
                    className={cn(
                      "inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-[0.9375rem] font-medium transition-colors hover:bg-surface",
                      isActive(pathname, item.href) ? "text-primary" : "text-ink",
                    )}
                  >
                    {item.name}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                  <div
                    id="mega-menu"
                    hidden={!megaOpen}
                    className="absolute inset-x-0 top-full border-b border-line bg-white shadow-xl"
                  >
                    <div className="container grid grid-cols-[1fr_1fr_1fr_280px] gap-8 py-8">
                      {GROUPS.map((g) => (
                        <div key={g}>
                          <p className="text-sm font-semibold uppercase tracking-wide text-body">{GROUP_LABELS[g]}</p>
                          <ul className="mt-4 space-y-1">
                            {MENU_ORDER[g].map((slug) => {
                              const s = bySlug[slug];
                              return (
                                <li key={slug}>
                                  <Link
                                    href={specialityHref(slug)}
                                    className="group flex min-h-[44px] items-center gap-3 rounded-card px-2 py-1.5 text-[0.9375rem] text-ink hover:bg-surface"
                                  >
                                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-card bg-surface text-primary group-hover:bg-white">
                                      <Icon name={s.icon} className="h-5 w-5" />
                                    </span>
                                    {s.label ?? s.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                      <div className="flex flex-col justify-between rounded-card bg-primary p-6 text-white">
                        <div>
                          <p className="text-lg font-semibold text-white">Not sure which department?</p>
                          <p className="mt-2 text-white/80">Call either branch and our team will guide you to the right specialist.</p>
                        </div>
                        <div className="mt-6 space-y-2">
                          {BRANCH_LIST.map((b) => (
                            <a key={b.id} href={b.phoneHref} className="flex min-h-[44px] items-center gap-2 font-medium hover:underline">
                              <Phone className="h-4 w-4" aria-hidden="true" />
                              {b.name}: {b.phone}
                            </a>
                          ))}
                          <Link href="/specialities-services/" className="mt-2 inline-block text-sm font-semibold underline underline-offset-4">
                            All specialities
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-2.5 text-[0.9375rem] font-medium transition-colors hover:bg-surface",
                      isActive(pathname, item.href) ? "text-primary" : "text-ink",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div ref={emergencyRef} className="relative hidden sm:block">
            <button
              type="button"
              aria-expanded={emergencyOpen}
              aria-controls="emergency-numbers"
              onClick={() => setEmergencyOpen((o) => !o)}
              className="inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-full bg-emergency px-4 font-semibold text-white hover:bg-emergency-dark"
            >
              <Siren className="h-4 w-4" aria-hidden="true" />
              {t.emergency}
            </button>
            <div
              id="emergency-numbers"
              hidden={!emergencyOpen}
              className="absolute right-0 top-[calc(100%+8px)] w-72 rounded-card border border-line bg-white p-3 shadow-xl"
            >
              <p className="px-2 pb-2 text-sm text-body">24x7 emergency, tap to call</p>
              {BRANCH_LIST.map((b) => (
                <a
                  key={b.id}
                  href={b.phoneHref}
                  className="flex min-h-[56px] items-center justify-between gap-3 rounded-card px-3 hover:bg-surface"
                >
                  <span>
                    <span className="block text-sm text-body">{b.label}</span>
                    <span className="block font-semibold text-ink">{b.phone}</span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-emergency text-white">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
          <BookButton className="hidden whitespace-nowrap lg:inline-flex">Book Appointment</BookButton>
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full bg-surface text-ink xl:hidden"
            aria-label={t.menu}
            aria-expanded={drawerOpen}
            aria-controls="mobile-menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

      {/* Mobile / tablet drawer (outside the blurred bar: backdrop-filter would trap position:fixed) */}
      <div
        id="mobile-menu"
        hidden={!drawerOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-0 z-50 overflow-y-auto bg-white xl:hidden"
      >
        <div className="container flex h-[72px] items-center justify-between">
          <Image src={logo.src} width={logo.width} height={logo.height} alt="Silver Touch Hospitals" className="h-12 w-auto" />
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full bg-surface text-ink"
            aria-label={t.close}
            onClick={() => setDrawerOpen(false)}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container pb-32">
          <ul className="divide-y divide-line border-y border-line">
            <li>
              <Link href="/" className="flex min-h-[56px] items-center text-lg font-medium text-ink">
                Home
              </Link>
            </li>
            {NAV.map((item) =>
              item.mega ? (
                <li key={item.href}>
                  <details className="group">
                    <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                      {item.name}
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="space-y-5 pb-5">
                      {GROUPS.map((g) => (
                        <div key={g}>
                          <p className="text-sm font-semibold uppercase tracking-wide text-body">{GROUP_LABELS[g]}</p>
                          <ul className="mt-2">
                            {MENU_ORDER[g].map((slug) => (
                              <li key={slug}>
                                <Link href={specialityHref(slug)} className="flex min-h-[48px] items-center gap-3 text-ink">
                                  <Icon name={bySlug[slug].icon} className="h-5 w-5 text-primary" />
                                  {bySlug[slug].label ?? bySlug[slug].name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link href="/specialities-services/" className="inline-block font-semibold text-primary underline underline-offset-4">
                        All specialities
                      </Link>
                    </div>
                  </details>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-[56px] items-center text-lg font-medium text-ink">
                    {item.name}
                  </Link>
                </li>
              ),
            )}
            {[
              { name: "Media", href: "/media/" },
              { name: "FAQs", href: "/silver-touch-hospitals-faqs/" },
              { name: "Work With Us", href: "/work-with-us/" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex min-h-[48px] items-center text-base text-body">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3">
            <BookButton className="w-full">{t.bookAppointment}</BookButton>
            {BRANCH_LIST.map((b) => (
              <a key={b.id} href={b.phoneHref} className="flex min-h-[56px] items-center justify-between rounded-card bg-emergency/5 px-4 text-ink">
                <span>
                  <span className="block text-sm text-body">Emergency · {b.label}</span>
                  <span className="block font-semibold">{b.phone}</span>
                </span>
                <Phone className="h-5 w-5 text-emergency" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-6 rounded-card bg-ink p-2 text-white">
            <SocialIcons />
          </div>
        </nav>
      </div>
    </>
  );
}
