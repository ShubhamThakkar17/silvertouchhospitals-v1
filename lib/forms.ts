/** Shared validation for the appointment and job forms (client + server). */
import { DEPARTMENT_OPTIONS } from "@/content/specialities";
import { APPLY_FOR_OPTIONS } from "@/content/jobs";

export const BRANCH_CHOICES = ["Nirnay Nagar", "Satellite", "Either"] as const;
export const JOB_LOCATIONS = ["Nirnay Nagar", "Satellite", "Both"] as const;

/** Indian mobile: optional +91/91/0 prefix, then 10 digits starting 6–9. */
export function normaliseIndianMobile(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "");
  const m = digits.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  return m ? `+91${m[1]}` : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type AppointmentInput = {
  name: string;
  phone: string;
  email?: string;
  branch: string;
  department: string;
  doctor?: string;
  date?: string;
  message?: string;
  consent: boolean;
  source?: string;
};

export type FieldErrors = Partial<Record<keyof AppointmentInput | "resume" | "location" | "applyFor", string>>;

export function validateAppointment(input: Partial<AppointmentInput>): { data?: AppointmentInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = (input.name ?? "").trim();
  if (name.length < 2 || name.length > 80) errors.name = "Please enter your full name.";
  const phone = normaliseIndianMobile(input.phone ?? "");
  if (!phone) errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  const email = (input.email ?? "").trim();
  if (email && !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!BRANCH_CHOICES.includes(input.branch as (typeof BRANCH_CHOICES)[number])) errors.branch = "Please choose a branch.";
  if (!DEPARTMENT_OPTIONS.includes(input.department as (typeof DEPARTMENT_OPTIONS)[number]))
    errors.department = "Please choose a department.";
  const date = (input.date ?? "").trim();
  if (date) {
    const d = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime()) || d < today) errors.date = "Please choose today or a later date.";
  }
  const message = (input.message ?? "").trim();
  if (message.length > 1000) errors.message = "Please keep your message under 1,000 characters.";
  if (!input.consent) errors.consent = "Please agree so we can contact you about your appointment.";

  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    data: {
      name,
      phone: phone!,
      email: email || undefined,
      branch: input.branch!,
      department: input.department!,
      doctor: (input.doctor ?? "").trim().slice(0, 80) || undefined,
      date: date || undefined,
      message: message || undefined,
      consent: true,
      source: (input.source ?? "").slice(0, 200) || undefined,
    },
  };
}

export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const RESUME_MAX_BYTES = 10 * 1024 * 1024;

export function isApplyFor(v: string) {
  return (APPLY_FOR_OPTIONS as readonly string[]).includes(v);
}
