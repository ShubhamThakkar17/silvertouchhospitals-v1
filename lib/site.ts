/**
 * Global facts about the hospital group (brief section 4). Anything marked
 * [CONFIRM] is waiting on the hospital; see CONFIRM.md.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.silvertouchhospitals.com").replace(/\/$/, "");
export const SITE_NAME = "Silver Touch Hospitals";
export const TAGLINE = "Healing Touch for Good Health";

export type BranchId = "nirnay-nagar" | "satellite";

export type Branch = {
  id: BranchId;
  name: string;
  /** Canonical display name with locality, e.g. "Nirnay Nagar (Ranip)". */
  label: string;
  locality: string;
  address: { street: string; locality: string; city: string; region: string; postalCode: string };
  addressLines: string[];
  phone: string;
  phoneHref: string;
  email: string;
  hrEmail: string;
  mapUrl: string;
  /** Google Maps embed (query based; no API key needed). */
  mapEmbed: string;
  /** [CONFIRM] Google Business Profile review URL. */
  reviewsUrl: string | null;
  geo: { lat: number; lng: number } | null;
};

export const BRANCHES: Record<BranchId, Branch> = {
  "nirnay-nagar": {
    id: "nirnay-nagar",
    name: "Nirnay Nagar",
    label: "Nirnay Nagar (Ranip)",
    locality: "Nirnay Nagar, Ranip",
    address: {
      street: "Shantaram Complex, Near Nirnaynagar Underbridge, Nirnay Nagar Sector I",
      locality: "Nirnay Nagar",
      city: "Ahmedabad",
      region: "Gujarat",
      postalCode: "380081",
    },
    addressLines: [
      "Silver Touch Hospital, Shantaram Complex",
      "Near Nirnaynagar Underbridge, Nirnay Nagar Sector I",
      "Ahmedabad, Gujarat 380081",
    ],
    phone: "+91 74349 00900",
    phoneHref: "tel:+917434900900",
    email: "silvertouchhospitals@gmail.com",
    hrEmail: "hr.silvertouchhospital@gmail.com",
    mapUrl: "https://share.google/iIYsJwjzUWj66Jq5s",
    mapEmbed:
      "https://maps.google.com/maps?q=Silver+Touch+Hospital+Shantaram+Complex+Nirnay+Nagar+Ahmedabad+380081&output=embed",
    reviewsUrl: null,
    geo: null,
  },
  satellite: {
    id: "satellite",
    name: "Satellite",
    label: "Satellite (Prahladnagar)",
    locality: "Satellite, Prahladnagar",
    address: {
      street: "100 Feet Anand Nagar Rd, opp. Shell Petrol Pump, near Platinum Hall, Satellite",
      locality: "Satellite",
      city: "Ahmedabad",
      region: "Gujarat",
      postalCode: "380015",
    },
    addressLines: [
      "Silver Touch Hospital, 100 Feet Anand Nagar Rd",
      "opp. Shell Petrol Pump, near Platinum Hall, Satellite",
      "Ahmedabad, Gujarat 380015",
    ],
    phone: "+91 74340 55055",
    phoneHref: "tel:+917434055055",
    email: "silvertouchhospitalsatellite@gmail.com",
    hrEmail: "hr.silvertouchhospital@gmail.com",
    mapUrl: "https://share.google/TaipwNXRgZ918CI9C",
    mapEmbed:
      "https://maps.google.com/maps?q=Silver+Touch+Hospital+100+Feet+Anand+Nagar+Road+Satellite+Ahmedabad+380015&output=embed",
    reviewsUrl: null,
    geo: null,
  },
};

export const BRANCH_LIST: Branch[] = [BRANCHES["nirnay-nagar"], BRANCHES.satellite];

export const OPD_HOURS = { label: "Mon – Sat, 8 AM – 7 PM", schema: "Mo-Sa 08:00-19:00" };
export const HR_EMAIL = "hr.silvertouchhospital@gmail.com";

/** [CONFIRM] WhatsApp number; the WhatsApp action stays hidden until set. */
export const WHATSAPP_NUMBER: string | null = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null;

export const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/silvertouchhospitals/" },
  { name: "Instagram", href: "https://instagram.com/silvertouchhospital?igshid=YmMyMTA2M2Y=" },
  { name: "X (Twitter)", href: "https://twitter.com/silvertouchhos1?t=xBNH6vLnvMs9mwPFxCHN5w&s=09" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/silver-touch-hospital/" },
] as const;

export const INSTAGRAM_HANDLE = "silvertouchhospital";

export const LOGO = "https://www.silvertouchhospitals.com/wp-content/themes/silver-touch-hospital/assets/images/logo.jpg";

/** Real proof points (brief 4.3). Counters that need hospital data are [CONFIRM]. */
export const PROOF_POINTS = [
  { value: 2, suffix: "", label: "Multispeciality hospitals in Ahmedabad" },
  { value: 24, suffix: "/7", label: "Emergency room, ICU and ambulance" },
  { value: 3, suffix: "", label: "High-end operation theatres" },
  { value: 5, prefix: "₹", suffix: " lakh", label: "PMJAY cashless cover per family, per year" },
] as const;

/**
 * [CONFIRM] placeholders are shown on staging/dev so reviewers can spot
 * them, and hidden on production builds unless explicitly turned on.
 */
export const SHOW_CONFIRM =
  process.env.NEXT_PUBLIC_SHOW_CONFIRM === "true" ||
  (process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SHOW_CONFIRM !== "false");
