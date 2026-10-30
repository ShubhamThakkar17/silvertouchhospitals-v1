"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Phone, Play, UserRound } from "lucide-react";
import { BookButton } from "@/components/forms/BookButton";
import type { Img } from "@/lib/media";
import { cn } from "@/lib/utils";

export type HeroDoctor = {
  slug: string;
  name: string;
  designation: string;
  speciality: string;
  highlight: string;
  department?: string;
  phone?: { label: string; href: string };
  photo: Img;
};

const INTERVAL = 5000;

/**
 * Auto-rotating doctor card in the home hero. Pauses on hover, keyboard focus,
 * hidden tabs and the pause button; never auto-rotates with reduced motion.
 */
export function HeroDoctors({ doctors }: { doctors: HeroDoctor[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const n = doctors.length;
  const go = useCallback((to: number) => setI(((to % n) + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const rotating = n > 1 && !paused && !hovered && !reduced;
  useEffect(() => {
    if (!rotating) return;
    const t = setInterval(() => {
      if (document.visibilityState === "visible") setI((x) => (x + 1) % n);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [rotating, n]);

  const d = doctors[i];
  const ctl =
    "grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white hover:text-ink";

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our doctors"
      className="relative mx-auto w-full max-w-sm lg:ml-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setHovered(false);
      }}
    >
      <div className="glass rounded-[18px] border border-white/20 p-3 shadow-2xl">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-primary-tint">
          {doctors.map((doc, k) => (
            <Image
              key={doc.slug}
              src={doc.photo.src}
              alt={k === i ? `Portrait of ${doc.name}` : ""}
              aria-hidden={k !== i}
              fill
              sizes="(min-width: 1024px) 384px, 92vw"
              priority={k === 0}
              className={cn(
                "object-cover object-top transition-opacity duration-700",
                k === i ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          {/* Solid chip so the label stays readable on any photo. */}
          <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-ink/90 px-3.5 py-1.5 text-sm font-medium text-white shadow-lg">
            {d.highlight}
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-4 pt-20 text-white" aria-live={rotating ? "off" : "polite"}>
            <p className="text-sm text-white/85">{d.speciality}</p>
            <p className="text-xl font-semibold">
              <Link href={`/doctor-team/${d.slug}/`} className="underline-offset-4 hover:underline">
                {d.name}
              </Link>
            </p>
            <p className="text-sm text-white/85">{d.designation}</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <BookButton
            plain
            preset={{ doctor: d.name, department: d.department }}
            className="flex min-h-[48px] items-center justify-center rounded-full bg-white px-3 text-center text-sm font-semibold text-ink hover:bg-surface"
          >
            Book Appointment
          </BookButton>
          {d.phone ? (
            <a
              href={d.phone.href}
              className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-white/50 bg-ink/40 px-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Let&apos;s Talk
            </a>
          ) : (
            <Link
              href={`/doctor-team/${d.slug}/`}
              className="flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-white/50 bg-ink/40 px-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              View Profile
            </Link>
          )}
        </div>

        {n > 1 && (
          <div className="mt-3 flex items-center justify-between gap-2">
            <button type="button" className={ctl} onClick={() => go(i - 1)} aria-label="Previous doctor">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-1">
              {doctors.map((doc, k) => (
                <button
                  key={doc.slug}
                  type="button"
                  onClick={() => go(k)}
                  aria-label={`Show ${doc.name}`}
                  aria-current={k === i ? "true" : undefined}
                  className="grid h-11 w-7 place-items-center"
                >
                  <span className={cn("h-2 rounded-full bg-white transition-all", k === i ? "w-6" : "w-2 opacity-50")} />
                </button>
              ))}
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play doctor slideshow" : "Pause doctor slideshow"}
                  className="ml-1 grid h-11 w-9 place-items-center text-white/85 hover:text-white"
                >
                  {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
                </button>
              )}
            </div>
            <button type="button" className={ctl} onClick={() => go(i + 1)} aria-label="Next doctor">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
