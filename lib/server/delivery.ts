import "server-only";

/**
 * Form delivery (brief 4.5 / 5.23 / 10). [CONFIRM] the hospital's endpoint.
 *
 * Two optional sinks, used together or separately:
 *  - Email via Resend (RESEND_API_KEY + FORM_FROM_EMAIL): sent to the inbox
 *    of the branch the patient chose (both inboxes for "Either").
 *  - FORM_WEBHOOK_URL: JSON POST, e.g. a Google Apps Script web app writing
 *    to a Sheet, Zapier/Make, or a CRM endpoint.
 *
 * With neither configured, development logs the submission and succeeds;
 * production returns "not configured" so the form shows the phone numbers
 * instead of silently losing a lead.
 */

const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.FORM_FROM_EMAIL;
const WEBHOOK = process.env.FORM_WEBHOOK_URL;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

export const deliveryConfigured = Boolean((RESEND_KEY && FROM) || WEBHOOK);

export type Attachment = { filename: string; content: Buffer };

export async function deliver({
  kind,
  to,
  subject,
  fields,
  replyTo,
  attachment,
}: {
  kind: "appointment" | "job";
  to: string[];
  subject: string;
  fields: Record<string, string | undefined>;
  replyTo?: string;
  attachment?: Attachment;
}): Promise<{ ok: boolean; reason?: string }> {
  if (!deliveryConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[forms] ${kind} (not delivered: no sink configured)`, { to, subject, fields, file: attachment?.filename });
      return { ok: true };
    }
    return { ok: false, reason: "not-configured" };
  }

  const tasks: Promise<boolean>[] = [];

  if (RESEND_KEY && FROM) {
    const rows = Object.entries(fields)
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${esc(k)}</th><td>${esc(v!)}</td></tr>`)
      .join("");
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to,
          subject,
          html: `<h2>${esc(subject)}</h2><table>${rows}</table>`,
          ...(replyTo ? { reply_to: replyTo } : {}),
          ...(attachment
            ? { attachments: [{ filename: attachment.filename, content: attachment.content.toString("base64") }] }
            : {}),
        }),
      }).then((r) => r.ok),
    );
  }

  if (WEBHOOK) {
    tasks.push(
      fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          to,
          subject,
          submittedAt: new Date().toISOString(),
          ...fields,
          ...(attachment
            ? { resumeFilename: attachment.filename, resumeBase64: attachment.content.toString("base64") }
            : {}),
        }),
      }).then((r) => r.ok),
    );
  }

  const results = await Promise.allSettled(tasks);
  const ok = results.some((r) => r.status === "fulfilled" && r.value);
  return ok ? { ok } : { ok, reason: "delivery-failed" };
}

export async function verifyRecaptcha(token: unknown, action: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    });
    const json = (await res.json()) as { success: boolean; score?: number; action?: string };
    return json.success && (json.score ?? 0) >= 0.5 && json.action === action;
  } catch {
    return false;
  }
}

/** Best-effort per-instance rate limit: 5 submissions / 10 minutes / IP. */
const hits = new Map<string, number[]>();
export function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
