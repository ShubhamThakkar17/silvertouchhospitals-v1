import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { getPostsByCategory } from "@/lib/content";
import { CATEGORIES, CATEGORY_BY_SLUG } from "@/content/categories";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.filter((c) => getPostsByCategory(c.slug).length).map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = CATEGORY_BY_SLUG[params.slug];
  if (!c) return {};
  return pageMeta({
    title: `${c.name} Articles | Silver Touch Hospitals Blog`,
    description: `Articles on ${c.name.toLowerCase()} from the doctors at Silver Touch Hospitals, Ahmedabad.`,
    path: `/category/${c.slug}/`,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const c = CATEGORY_BY_SLUG[params.slug];
  if (!c) notFound();
  const posts = getPostsByCategory(c.slug);
  return (
    <BlogIndex
      page={1}
      category={c.slug}
      title={c.name}
      crumbs={[
        { name: "Blogs", href: "/blogs/" },
        { name: c.name, href: `/category/${c.slug}/` },
      ]}
      posts={posts}
    />
  );
}
