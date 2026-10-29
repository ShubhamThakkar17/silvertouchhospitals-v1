import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts, getPostsByCategory, POSTS_PER_PAGE } from "@/lib/content";
import { SPECIALITIES, specialityHref } from "@/content/specialities";
import { VISIBLE_DOCTORS, doctorHref } from "@/content/doctors";
import { CATEGORIES } from "@/content/categories";
import { TESTIMONIALS } from "@/content/testimonials";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, priority = 0.6, lastModified?: string) => ({
    url: `${SITE_URL}${path}`,
    priority,
    ...(lastModified ? { lastModified } : {}),
  });
  const posts = getPosts();
  const pages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return [
    u("/", 1),
    u("/about-us/", 0.8),
    u("/specialities-services/", 0.9),
    // "new" specialities are noindex until approved, so they stay out of the sitemap.
    ...SPECIALITIES.filter((s) => s.status === "live").map((s) => u(specialityHref(s.slug), 0.9)),
    u("/doctor-team/", 0.8),
    ...VISIBLE_DOCTORS.map((d) => u(doctorHref(d.slug), 0.7)),
    u("/patients-insurance/", 0.8),
    u("/contact-us/", 0.8),
    u("/silver-touch-hospitals-faqs/", 0.6),
    u("/media/", 0.4),
    u("/work-with-us/", 0.5),
    u("/apply-for-job/", 0.4),
    u("/testimonials/", 0.5),
    ...TESTIMONIALS.map((t) => u(`/testimonials/${t.slug}/`, 0.3)),
    u("/blogs/", 0.7, posts[0]?.modified),
    ...Array.from({ length: pages - 1 }, (_, i) => u(`/blogs/page/${i + 2}/`, 0.3)),
    ...CATEGORIES.filter((c) => getPostsByCategory(c.slug).length).map((c) => u(`/category/${c.slug}/`, 0.4)),
    ...posts.map((p) => u(`/${p.slug}/`, 0.6, p.modified)),
  ];
}
