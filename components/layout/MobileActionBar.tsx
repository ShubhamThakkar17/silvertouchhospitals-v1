"use client";

import { useState } from "react";
import { CalendarCheck, MessageCircle, Navigation, Phone, X } from "lucide-react";
import { BRANCH_LIST, WHATSAPP_NUMBER } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useAppointment } from "@/components/forms/AppointmentProvider";

/** Bottom sticky bar on mobile (brief 4.6): Call · Book · Directions (+ WhatsApp when configured). */
export function MobileActionBar() {
  const { open } = useAppointment();
  const [sheet, setSheet] = useState<null | "call" | "directions">(null);

  const btn = "flex min-h-[60px] flex-1 flex-col items-center justify-center gap-1 text-xs font-semibold";

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="flex">
          <button type="button" className={`${btn} text-emergency`} onClick={() => setSheet("call")} aria-haspopup="dialog">
            <Phone className="h-5 w-5" aria-hidden="true" />
            {t.call}
          </button>
          <button type="button" className={`${btn} bg-primary text-white`} onClick={() => open()}>
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            {t.book}
          </button>
          <button type="button" className={`${btn} text-ink`} onClick={() => setSheet("directions")} aria-haspopup="dialog">
            <Navigation className="h-5 w-5" aria-hidden="true" />
            {t.directions}
          </button>
          {WHATSAPP_NUMBER && (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              className={`${btn} text-[#128C7E]`}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp
            </a>
          )}
        </div>
      </div>

      {sheet && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/50 lg:hidden" onClick={() => setSheet(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={sheet === "call" ? "Call a branch" : "Get directions"}
            className="w-full rounded-t-[20px] bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-ink">{t.chooseBranch}</p>
              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-full bg-surface"
                onClick={() => setSheet(null)}
                aria-label={t.close}
                autoFocus
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              {BRANCH_LIST.map((b) => (
                <li key={b.id}>
                  {sheet === "call" ? (
                    <a href={b.phoneHref} className="flex min-h-[64px] items-center justify-between rounded-card bg-surface px-4">
                      <span>
                        <span className="block text-sm text-body">{b.label}</span>
                        <span className="block text-lg font-semibold text-ink">{b.phone}</span>
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-emergency text-white">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  ) : (
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="directions_click"
                      data-branch={b.id}
                      className="flex min-h-[64px] items-center justify-between rounded-card bg-surface px-4"
                    >
                      <span>
                        <span className="block text-lg font-semibold text-ink">{b.label}</span>
                        <span className="block text-sm text-body">{b.addressLines[1]}</span>
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white">
                        <Navigation className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
