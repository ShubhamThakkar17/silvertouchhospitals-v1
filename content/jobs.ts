/** Open roles on Work With Us (brief 5.22). Titles match ?applyfor= values. */
export const JOB_ROLES = [
  { title: "Nursing", blurb: "Ward, ICU and OT nursing across both branches." },
  { title: "OT Staff", blurb: "Support our three high-end operation theatres." },
  { title: "OT Technician", blurb: "Prepare and run theatre equipment for surgical teams." },
  { title: "CSSD Technician", blurb: "Sterilisation services, the backbone of our OT complex." },
  { title: "X-Ray Technician", blurb: "In-house imaging for OPD, emergency and inpatients." },
  { title: "Receptionist", blurb: "The first friendly face for patients and families." },
  { title: "Billing", blurb: "Help patients with billing, insurance and PMJAY paperwork." },
  { title: "Admin", blurb: "Keep hospital operations running smoothly." },
  { title: "HR", blurb: "Hire, support and grow our people." },
] as const;

export const APPLY_FOR_OPTIONS = [
  "Nursing",
  "Admin",
  "Receptionist",
  "HR",
  "Doctor",
  "OT Staff",
  "OT Technician",
  "Billing",
  "CSSD Technician",
  "X-Ray Technician",
] as const;

export const applyHref = (role: string) => `/apply-for-job/?applyfor=${encodeURIComponent(role)}`;
