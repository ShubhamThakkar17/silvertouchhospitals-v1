import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview/staging deployments must not be indexed.
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return isProd
    ? { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
