import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

/**
 * Page metadata. `title` is used verbatim (SEO titles from the current site
 * already include the brand), so the root layout uses no title template.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  noindex,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  noindex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: { "en-IN": url } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
