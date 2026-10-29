import { NextResponse } from "next/server";
import { JOB_LOCATIONS, isApplyFor, normaliseIndianMobile, RESUME_MAX_BYTES, RESUME_TYPES, type FieldErrors } from "@/lib/forms";
import { HR_EMAIL } from "@/lib/site";
import { deliver, rateLimited, verifyRecaptcha } from "@/lib/server/delivery";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  if (String(fd.get("company") ?? "").trim()) return NextResponse.json({ ok: true });
  if (rateLimited(ip)) return NextResponse.json({ message: "Too many requests. Please email HR instead." }, { status: 429 });
  if (!(await verifyRecaptcha(fd.get("recaptchaToken"), "apply")))
    return NextResponse.json({ message: "We could not verify your request." }, { status: 400 });

  const errors: FieldErrors = {};
  const location = String(fd.get("location") ?? "");
  const applyFor = String(fd.get("applyFor") ?? "");
  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const phone = normaliseIndianMobile(String(fd.get("phone") ?? ""));
  const resume = fd.get("resume");

  if (!(JOB_LOCATIONS as readonly string[]).includes(location)) errors.location = "Please choose a location.";
  if (!isApplyFor(applyFor)) errors.applyFor = "Please choose a role.";
  if (name.length < 2 || name.length > 80) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!phone) errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  if (!(resume instanceof File) || resume.size === 0) errors.resume = "Please attach your resume.";
  else if (resume.size > RESUME_MAX_BYTES) errors.resume = "Your resume must be 10 MB or smaller.";
  else if (!RESUME_TYPES.includes(resume.type) && !/\.(pdf|docx?)$/i.test(resume.name))
    errors.resume = "Please upload a PDF or Word document.";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const file = resume as File;
  const result = await deliver({
    kind: "job",
    to: [HR_EMAIL],
    subject: `Job application: ${applyFor} (${location})`,
    replyTo: email,
    fields: { Name: name, Email: email, Mobile: phone!, Role: applyFor, Location: location },
    attachment: { filename: file.name.replace(/[^\w.\- ]/g, "_"), content: Buffer.from(await file.arrayBuffer()) },
  });
  if (!result.ok)
    return NextResponse.json(
      { message: `Online applications are temporarily unavailable. Please email your resume to ${HR_EMAIL}.` },
      { status: 503 },
    );
  return NextResponse.json({ ok: true });
}
