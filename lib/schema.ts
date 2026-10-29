/** JSON-LD builders (brief section 10). */
import { BRANCH_LIST, LOGO, OPD_HOURS, SITE_NAME, SITE_URL, SOCIALS, type Branch } from "./site";
import { img } from "./media";
import { EMPANELMENTS } from "@/content/insurers";

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);
const ORG_ID = `${SITE_URL}/#organization`;
const branchId = (b: Branch) => `${SITE_URL}/#hospital-${b.id}`;

function branchSchema(b: Branch) {
  return {
    "@type": ["Hospital", "MedicalClinic"],
    "@id": branchId(b),
    name: `${SITE_NAME}, ${b.label}`,
    url: `${SITE_URL}/contact-us/`,
    telephone: b.phone.replace(/\s/g, ""),
    email: b.email,
    image: abs(img(LOGO).src),
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      addressRegion: b.address.region,
      postalCode: b.address.postalCode,
      addressCountry: "IN",
    },
    ...(b.geo ? { geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng } } : {}),
    hasMap: b.mapUrl,
    openingHours: OPD_HOURS.schema,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        name: "Emergency",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    isAcceptingNewPatients: true,
    availableService: { "@type": "MedicalProcedure", name: "24x7 Emergency and Critical Care" },
    currenciesAccepted: "INR",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalOrganization", "Hospital"],
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: abs(img(LOGO).src),
        slogan: "Healing Touch for Good Health",
        sameAs: SOCIALS.map((s) => s.href),
        telephone: BRANCH_LIST[0].phone.replace(/\s/g, ""),
        areaServed: { "@type": "City", name: "Ahmedabad" },
        memberOf: EMPANELMENTS.map((e) => ({ "@type": "Organization", name: e.name })),
        subOrganization: BRANCH_LIST.map((b) => ({ "@id": branchId(b) })),
      },
      ...BRANCH_LIST.map(branchSchema),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.href) })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function specialitySchema(s: { name: string; slug: string; description: string; conditions: string[]; procedures: { title: string }[] }, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    url: abs(url),
    name: s.name,
    description: s.description,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    about: {
      "@type": "MedicalSpecialty",
      name: s.name,
    },
    mainEntity: {
      "@type": "MedicalClinic",
      name: `${s.name} at ${SITE_NAME}`,
      parentOrganization: { "@id": ORG_ID },
      medicalSpecialty: s.name,
      availableService: s.procedures.map((p) => ({ "@type": "MedicalProcedure", name: p.title })),
    },
  };
}

export function physicianSchema(d: {
  name: string;
  slug: string;
  designation: string;
  qualifications: string[];
  expertise: string[];
  photo: string | null;
  specialityNames: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/doctor-team/${d.slug}/#physician`,
    name: d.name,
    url: abs(`/doctor-team/${d.slug}/`),
    jobTitle: d.designation,
    description: d.designation,
    medicalSpecialty: d.specialityNames,
    knowsAbout: d.expertise,
    hasCredential: d.qualifications.map((q) => ({ "@type": "EducationalOccupationalCredential", name: q })),
    ...(d.photo ? { image: abs(img(d.photo).src) } : {}),
    worksFor: { "@id": ORG_ID },
    hospitalAffiliation: BRANCH_LIST.map((b) => ({ "@id": branchId(b) })),
  };
}

export function blogPostingSchema(p: {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified: string;
  image: string | null;
  reviewer?: { name: string; slug: string } | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: abs(`/${p.slug}/`),
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.modified,
    inLanguage: "en-IN",
    ...(p.image ? { image: abs(p.image) } : {}),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": ORG_ID },
    ...(p.reviewer
      ? { reviewedBy: { "@type": "Physician", name: p.reviewer.name, url: abs(`/doctor-team/${p.reviewer.slug}/`) } }
      : {}),
  };
}
