"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { AppointmentForm, type AppointmentPreset } from "./AppointmentForm";

type Ctx = { open: (preset?: AppointmentPreset) => void };
const AppointmentContext = createContext<Ctx>({ open: () => {} });

export const useAppointment = () => useContext(AppointmentContext);

/** Global appointment modal (brief 4.5), opened from any "Book" button. */
export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [preset, setPreset] = useState<AppointmentPreset | undefined>();
  const [key, setKey] = useState(0);

  const open = useCallback((p?: AppointmentPreset) => {
    setPreset(p);
    setKey((k) => k + 1);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  return (
    <AppointmentContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="appointment-title"
        className="w-[calc(100%-2rem)] max-w-xl rounded-[18px] bg-white p-0 text-body shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="appointment-title" className="text-2xl font-semibold">
                Book an appointment
              </h2>
              <p className="mt-1 text-base">
                {preset?.doctor
                  ? `With ${preset.doctor}. We'll call you to confirm a time.`
                  : "Tell us what you need and we'll call you to confirm a time."}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-surface text-ink hover:bg-line"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            <AppointmentForm key={key} preset={preset} onDone={close} idPrefix="modal" />
          </div>
        </div>
      </dialog>
    </AppointmentContext.Provider>
  );
}
