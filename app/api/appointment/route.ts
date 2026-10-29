import { NextResponse } from "next/server";
import { validateAppointment } from "@/lib/forms";
import { BRANCHES } from "@/lib/site";
import { deliver, rateLimited, verifyRecaptcha } from "@/lib/server/delivery";

const UNAVAILABLE = "Online booking is temporarily unavailable. Please call us and our team will book your appointment.";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (typeof body.company === "string" && body.company.trim()) return NextResponse.json({ ok: true });
  if (rateLimited(ip)) return NextResponse.json({ message: "Too many requests. Please call us instead." }, { status: 429 });
  if (!(await verifyRecaptcha(body.recaptchaToken, "appointment")))
    return NextResponse.json({ message: "We could not verify your request. Please call us instead." }, { status: 400 });

  const { data, errors } = validateAppointment({
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    branch: String(body.branch ?? ""),
    department: String(body.department ?? ""),
    doctor: String(body.doctor ?? ""),
    date: String(body.date ?? ""),
    message: String(body.message ?? ""),
    consent: body.consent === true,
    source: String(body.source ?? ""),
  });
  if (!data) return NextResponse.json({ errors }, { status: 422 });

  const to =
    data.branch === "Nirnay Nagar"
      ? [BRANCHES["nirnay-nagar"].email]
      : data.branch === "Satellite"
        ? [BRANCHES.satellite.email]
        : [BRANCHES["nirnay-nagar"].email, BRANCHES.satellite.email];

  const result = await deliver({
    kind: "appointment",
    to,
    subject: `Appointment request: ${data.department} (${data.branch})`,
    replyTo: data.email,
    fields: {
      Name: data.name,
      Mobile: data.phone,
      Email: data.email,
      Branch: data.branch,
      Department: data.department,
      Doctor: data.doctor,
      "Preferred date": data.date,
      Message: data.message,
      Page: data.source,
      Consent: "Yes",
    },
  });
  if (!result.ok) return NextResponse.json({ message: UNAVAILABLE }, { status: 503 });
  return NextResponse.json({ ok: true });
}
