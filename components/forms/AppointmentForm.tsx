"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { DEPARTMENT_OPTIONS } from "@/content/specialities";
import { BRANCHES } from "@/lib/site";
import { BRANCH_CHOICES, validateAppointment, type FieldErrors } from "@/lib/forms";
import { track } from "@/lib/analytics";
import { getRecaptchaToken } from "@/lib/recaptcha";
import { cn } from "@/lib/utils";
import { ArrowDisc, pillClasses } from "@/components/ui/Pill";

export type AppointmentPreset = { department?: string; doctor?: string; branch?: string };

const input =
  "block w-full min-h-[52px] rounded-card border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-body/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-emergency";
const label = "mb-1.5 block text-sm font-medium text-ink";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/**
 * Appointment form (brief 4.5): used inline and inside the modal.
 * `compact` shows only the required fields (Hospic appointment band).
 */
export function AppointmentForm({
  preset,
  compact = false,
  tone = "light",
  onDone,
  idPrefix,
  stacked = false,
}: {
  preset?: AppointmentPreset;
  compact?: boolean;
  /** Single column, for narrow containers such as a sidebar. */
  stacked?: boolean;
  tone?: "light" | "dark";
  onDone?: () => void;
  idPrefix?: string;
}) {
  const autoId = useId();
  const id = (n: string) => `${idPrefix ?? autoId}-${n}`;
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [branchChoice, setBranchChoice] = useState(preset?.branch ?? "");
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "done" || status === "failed") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      branch: String(fd.get("branch") ?? ""),
      department: String(fd.get("department") ?? ""),
      doctor: String(fd.get("doctor") ?? ""),
      date: String(fd.get("date") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""), // honeypot
      source: window.location.pathname,
    };
    const { errors: errs } = validateAppointment(payload);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const token = await getRecaptchaToken("appointment");
      const res = await fetch("/api/appointment/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, recaptchaToken: token }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setServerMessage(json.message ?? "");
        setStatus(json.errors ? "idle" : "failed");
        return;
      }
      track("form_submit", { form: "appointment", department: payload.department, branch: payload.branch });
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  const branches =
    branchChoice === "Nirnay Nagar"
      ? [BRANCHES["nirnay-nagar"]]
      : branchChoice === "Satellite"
        ? [BRANCHES.satellite]
        : [BRANCHES["nirnay-nagar"], BRANCHES.satellite];

  if (status === "done" || status === "failed") {
    const ok = status === "done";
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn("rounded-card p-6 outline-none md:p-8", tone === "dark" ? "bg-white/10 text-white" : "bg-surface")}
      >
        {ok && <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />}
        <h3 className={cn("mt-4 text-2xl font-semibold", tone === "dark" && "text-white")}>
          {ok ? "Thank you, we've received your request." : "We couldn't send your request online."}
        </h3>
        <p className={cn("mt-3", tone === "dark" ? "text-white/80" : "text-body")}>
          {ok
            ? "Our team will call you to confirm your appointment time. For anything urgent, call the hospital directly:"
            : serverMessage || "Please call us and our team will book your appointment right away:"}
        </p>
        <ul className="mt-5 space-y-3">
          {branches.map((b) => (
            <li key={b.id}>
              <a href={b.phoneHref} className={pillClasses("primary", "w-full sm:w-auto")}>
                <span>
                  {b.name}: {b.phone}
                </span>
                <ArrowDisc icon={<Phone className="h-4 w-4" aria-hidden="true" />} />
              </a>
            </li>
          ))}
        </ul>
        {onDone && (
          <button type="button" onClick={onDone} className="mt-6 text-sm font-medium underline underline-offset-4">
            Close
          </button>
        )}
      </div>
    );
  }

  const err = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={id(`${name}-err`)} className="mt-1.5 text-sm font-medium text-emergency">
        {errors[name]}
      </p>
    ) : null;
  const aria = (name: keyof FieldErrors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? id(`${name}-err`) : undefined,
  });
  const lbl = cn(label, tone === "dark" && "text-white");

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn("grid gap-4", !stacked && "sm:grid-cols-2")}>
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {preset?.doctor && <input type="hidden" name="doctor" value={preset.doctor} />}

      <div className="sm:col-span-2">
        <label htmlFor={id("name")} className={lbl}>
          Full name <span aria-hidden="true">*</span>
        </label>
        <input id={id("name")} name="name" autoComplete="name" required className={input} {...aria("name")} />
        {err("name")}
      </div>

      <div className={compact ? "sm:col-span-2" : ""}>
        <label htmlFor={id("phone")} className={lbl}>
          Mobile number <span aria-hidden="true">*</span>
        </label>
        <div className="flex">
          <span className="grid min-h-[52px] place-items-center rounded-l-card border border-r-0 border-line bg-surface px-3 text-base text-ink">
            +91
          </span>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="98765 43210"
            required
            className={cn(input, "rounded-l-none")}
            {...aria("phone")}
          />
        </div>
        {err("phone")}
      </div>

      {!compact && (
        <div>
          <label htmlFor={id("email")} className={lbl}>
            Email <span className="font-normal text-body">(optional)</span>
          </label>
          <input id={id("email")} name="email" type="email" autoComplete="email" className={input} {...aria("email")} />
          {err("email")}
        </div>
      )}

      <div>
        <label htmlFor={id("branch")} className={lbl}>
          Preferred branch <span aria-hidden="true">*</span>
        </label>
        <select
          id={id("branch")}
          name="branch"
          required
          className={input}
          value={branchChoice}
          onChange={(e) => setBranchChoice(e.target.value)}
          {...aria("branch")}
        >
          <option value="" disabled>
            Select branch
          </option>
          {BRANCH_CHOICES.map((b) => (
            <option key={b} value={b}>
              {b === "Nirnay Nagar" ? "Nirnay Nagar (Ranip)" : b === "Satellite" ? "Satellite (Prahladnagar)" : "Either branch"}
            </option>
          ))}
        </select>
        {err("branch")}
      </div>

      <div>
        <label htmlFor={id("department")} className={lbl}>
          Department <span aria-hidden="true">*</span>
        </label>
        <select
          id={id("department")}
          name="department"
          required
          className={input}
          defaultValue={preset?.department ?? ""}
          {...aria("department")}
        >
          <option value="" disabled>
            Select department
          </option>
          {DEPARTMENT_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {err("department")}
      </div>

      {!compact && (
        <>
          <div className="sm:col-span-2">
            <label htmlFor={id("date")} className={lbl}>
              Preferred date <span className="font-normal text-body">(optional)</span>
            </label>
            <input id={id("date")} name="date" type="date" min={todayISO()} className={input} {...aria("date")} />
            {err("date")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={id("message")} className={lbl}>
              Message <span className="font-normal text-body">(optional)</span>
            </label>
            <textarea id={id("message")} name="message" rows={3} maxLength={1000} className={cn(input, "min-h-[96px]")} {...aria("message")} />
            {err("message")}
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label className={cn("flex items-start gap-3 text-sm leading-relaxed", tone === "dark" ? "text-white/85" : "text-body")}>
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-[rgb(var(--primary))]"
            {...aria("consent")}
          />
          <span>
            I agree that Silver Touch Hospitals may call, SMS or email me about this appointment, and to the{" "}
            <Link href="/privacy-policy/" className="underline underline-offset-2">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={pillClasses(tone === "dark" ? "white" : "primary", "w-full disabled:opacity-70 sm:w-auto")}
        >
          <span>{status === "sending" ? "Sending…" : "Book Appointment"}</span>
          <ArrowDisc
            variant={tone === "dark" ? "white" : "primary"}
            icon={status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : undefined}
          />
        </button>
      </div>
    </form>
  );
}
