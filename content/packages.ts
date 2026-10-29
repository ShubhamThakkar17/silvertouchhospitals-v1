/**
 * Health checkup packages (brief 4.8), laid out like Hospic's pricing page.
 * Names and inclusions follow the site's own article on age-based checkups.
 * [CONFIRM] package names and ₹ prices with the hospital.
 */
export type HealthPackage = {
  id: string;
  tag: string;
  name: string;
  summary: string;
  inclusions: string[];
  /** null until the hospital confirms a price. */
  price: number | null;
  highlight?: boolean;
};

const BASE = [
  "CBC & metabolic profile",
  "Lipid profile",
  "Diabetes screening",
  "Thyroid profile",
  "Urine & stool analysis",
  "Doctor consultation",
];

export const PACKAGES: HealthPackage[] = [
  {
    id: "energy-lifestyle",
    tag: "20s – 30s",
    name: "Energy & Lifestyle Check",
    summary: "A baseline for busy working years.",
    inclusions: BASE,
    price: null,
  },
  {
    id: "prevention-maintenance",
    tag: "40s – 50s",
    name: "Prevention & Maintenance",
    summary: "Everything in Energy & Lifestyle, plus organ and heart checks.",
    inclusions: [...BASE, "Liver & kidney function", "ECG", "Chest X-ray", "Abdominal ultrasonography"],
    price: null,
    highlight: true,
  },
  {
    id: "vitality-longevity",
    tag: "60+",
    name: "Vitality & Longevity",
    summary: "Everything in Prevention & Maintenance, plus a detailed heart work-up.",
    inclusions: [
      ...BASE,
      "Liver & kidney function",
      "ECG",
      "Chest X-ray",
      "Abdominal ultrasonography",
      "2D Echo",
      "Treadmill Test (TMT)",
      "Personalised add-ons by family history",
    ],
    price: null,
  },
];

export const PACKAGE_NOTE = "10–12 hours fasting required. Reports in 24–48 hours.";
