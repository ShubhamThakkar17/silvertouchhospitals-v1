"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { APPLY_FOR_OPTIONS } from "@/content/jobs";
import { JOB_LOCATIONS, RESUME_MAX_BYTES, normaliseIndianMobile, type FieldErrors } from "@/lib/forms";
import { HR_EMAIL } from "@/lib/site";
import { track } from "@/lib/analytics";
import { getRecaptchaToken } from "@/lib/recaptcha";
import { ArrowDisc, pillClasses } from "@/components/ui/Pill";

const input =
  "block w-full min-h-[52px] rounded-card border border-line bg-white px-4 py-3 text-base text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 aria-[invalid=true]:border-emergency";
const label = "mb-1.5 block text-sm font-medium text-ink";

export function ApplyForm() {
  const params = useSearchParams();
  const preset = params.get("applyfor") ?? "";
  const initialRole = (APPLY_FOR_OPTIONS as readonly string[]).find((o) => o.toLowerCase() === preset.toLowerCase()) ?? "";
  const [role, setRole] = useState(initialRole);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => setRole(initialRole), [initialRole]);
  useEffect(() => {
    if (status === "done" || status === "failed") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: FieldErrors = {};
    if (!fd.get("location")) errs.location = "Please choose a location.";
    if (!fd.get("applyFor")) errs.applyFor = "Please choose a role.";
    if (String(fd.get("name") ?? "").trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(fd.get("email") ?? ""))) errs.email = "Please enter a valid email address.";
    if (!normaliseIndianMobile(String(fd.get("phone") ?? ""))) errs.phone = "Please enter a valid 10-digit Indian mobile number.";
    const file = fd.get("resume");
    if (!(file instanceof File) || !file.size) errs.resume = "Please attach your resume.";
    else if (file.size > RESUME_MAX_BYTES) errs.resume = "Your resume must be 10 MB or smaller.";
    else if (!/\.(pdf|docx?)$/i.test(file.name)) errs.resume = "Please upload a PDF or Word document.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const token = await getRecaptchaToken("apply");
      if (token) fd.set("recaptchaToken", token);
      const res = await fetch("/api/apply/", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) {
          setErrors(json.errors);
          setStatus("idle");
        } else {
          setMessage(json.message ?? "");
          setStatus("failed");
        }
        return;
      }
      track("form_submit", { form: "job", role: String(fd.get("applyFor")) });
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "done" || status === "failed") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-card bg-surface p-8 outline-none">
        {status === "done" && <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />}
        <h2 className="mt-4 text-2xl font-semibold">{status === "done" ? "Thank you for applying." : "We couldn’t send your application."}</h2>
        <p className="mt-3">
          {status === "done"
            ? "Our HR team will review your application and contact you if your profile matches an opening."
            : message || (
                <>
                  Please email your resume to{" "}
                  <a href={`mailto:${HR_EMAIL}`} className="font-medium text-primary underline">
                    {HR_EMAIL}
                  </a>
                  .
                </>
              )}
        </p>
      </div>
    );
  }

  const err = (n: keyof FieldErrors) =>
    errors[n] ? (
      <p id={`apply-${n}-err`} className="mt-1.5 text-sm font-medium text-emergency">
        {errors[n]}
      </p>
    ) : null;
  const aria = (n: keyof FieldErrors) => ({
    "aria-invalid": errors[n] ? true : undefined,
    "aria-describedby": errors[n] ? `apply-${n}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" encType="multipart/form-data">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor="apply-location" className={label}>
          Location <span aria-hidden="true">*</span>
        </label>
        <select id="apply-location" name="location" required defaultValue="" className={input} {...aria("location")}>
          <option value="" disabled>
            Select location
          </option>
          {JOB_LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        {err("location")}
      </div>
      <div>
        <label htmlFor="apply-role" className={label}>
          Apply for <span aria-hidden="true">*</span>
        </label>
        <select id="apply-role" name="applyFor" required value={role} onChange={(e) => setRole(e.target.value)} className={input} {...aria("applyFor")}>
          <option value="" disabled>
            Select role
          </option>
          {APPLY_FOR_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {err("applyFor")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="apply-name" className={label}>
          Your name <span aria-hidden="true">*</span>
        </label>
        <input id="apply-name" name="name" autoComplete="name" required className={input} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="apply-email" className={label}>
          Your email <span aria-hidden="true">*</span>
        </label>
        <input id="apply-email" name="email" type="email" autoComplete="email" required className={input} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="apply-phone" className={label}>
          Contact number <span aria-hidden="true">*</span>
        </label>
        <input id="apply-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" required placeholder="98765 43210" className={input} {...aria("phone")} />
        {err("phone")}
      </div>
      <div className="sm:col-span-2">
        <span className={label}>
          Upload resume <span aria-hidden="true">*</span>
        </span>
        <label
          htmlFor="apply-resume"
          className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-line bg-surface px-4 py-6 text-center hover:border-primary focus-within:border-primary"
        >
          <Upload className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="font-medium text-ink">{fileName || "Choose a file"}</span>
          <span className="text-sm">PDF or Word, up to 10 MB</span>
          <input
            id="apply-resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            {...aria("resume")}
          />
        </label>
        {err("resume")}
      </div>
      <p className="text-sm sm:col-span-2">
        By applying you agree that Silver Touch Hospitals may store your details to process your application, as described in our{" "}
        <a href="/privacy-policy/" className="underline">
          privacy policy
        </a>
        .
      </p>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className={pillClasses("primary", "w-full disabled:opacity-70 sm:w-auto")}>
          <span>{status === "sending" ? "Sending…" : "Submit application"}</span>
          <ArrowDisc icon={status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : undefined} />
        </button>
      </div>
    </form>
  );
}
