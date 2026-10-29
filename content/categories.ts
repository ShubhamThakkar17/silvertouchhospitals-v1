/** Blog categories (brief section 9). Slugs kept; display names cleaned up. */
export type Category = { slug: string; name: string; speciality?: string };

export const CATEGORIES: Category[] = [
  { slug: "knee-replacement", name: "Knee Replacement", speciality: "orthopedics-joint-replacement-surgery" },
  { slug: "joint-replacement", name: "Joint Replacement", speciality: "orthopedics-joint-replacement-surgery" },
  { slug: "hip-replacement", name: "Hip Replacement", speciality: "hip-replacement-ahmedabad" },
  { slug: "bariatric-surgery", name: "Bariatric Surgery", speciality: "bariatric-surgery-ahmedabad" },
  { slug: "gastrologist", name: "Gastroenterology", speciality: "gastroenterology" },
  { slug: "diabetes", name: "Diabetes", speciality: "endocrinologist-diabetes-hospital-ahmedabad" },
  { slug: "full-body-checkup", name: "Full Body Checkup", speciality: "full-body-health-checkup" },
  { slug: "ent", name: "ENT", speciality: "ear-nose-throat" },
  { slug: "dental", name: "Dental", speciality: "dentistry" },
  { slug: "spine-specialist", name: "Spine Specialist", speciality: "spine-surgery" },
  { slug: "lung-specialist", name: "Lung Specialist", speciality: "pulmonology" },
  { slug: "general-surgeon", name: "General Surgeon", speciality: "general-surgery" },
  { slug: "heart-health", name: "Heart Health", speciality: "critical-care" },
  { slug: "kidney-transplant", name: "Kidney / Nephrology", speciality: "nephrology" },
  { slug: "emergency-care", name: "Emergency Care", speciality: "critical-care" },
  { slug: "multispeciality-hospital", name: "Multispeciality Hospital" },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c])) as Record<string, Category>;

/**
 * [CONFIRM] Medical reviewer per category (brief 9: replace "admin" with
 * the reviewing doctor). Fill with doctor slugs once the hospital agrees.
 */
export const REVIEWERS: Record<string, string | undefined> = {};
