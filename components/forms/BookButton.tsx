"use client";

import { CalendarCheck } from "lucide-react";
import { useAppointment } from "./AppointmentProvider";
import type { AppointmentPreset } from "./AppointmentForm";
import { ArrowDisc, pillClasses, type PillVariant } from "@/components/ui/Pill";

/**
 * Opens the appointment modal. Rendered as a link to the contact form so it
 * still works before JavaScript loads.
 */
export function BookButton({
  children = "Book An Appointment",
  preset,
  variant = "primary",
  className,
  plain = false,
}: {
  children?: React.ReactNode;
  preset?: AppointmentPreset;
  variant?: PillVariant;
  className?: string;
  /** Render without pill styling (e.g. text link in a card). */
  plain?: boolean;
}) {
  const { open } = useAppointment();
  return (
    <a
      href="/contact-us/#contactForm"
      onClick={(e) => {
        e.preventDefault();
        open(preset);
      }}
      className={plain ? className : pillClasses(variant, className)}
    >
      {plain ? (
        children
      ) : (
        <>
          <span>{children}</span>
          <ArrowDisc variant={variant} icon={variant === "white" ? <CalendarCheck className="h-4 w-4" aria-hidden="true" /> : undefined} />
        </>
      )}
    </a>
  );
}
