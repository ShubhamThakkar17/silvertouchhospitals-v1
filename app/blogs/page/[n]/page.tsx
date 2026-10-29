import { notFound, redirect } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { getPosts, POSTS_PER_PAGE } from "@/lib/content";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const dynamicParams = false;

const totalPages = () => Math.ceil(getPosts().length / POSTS_PER_PAGE);

export function generateStaticParams() {
  // WordPress paginated at 10 per page up to /page/6/; keep every old page URL alive.
  const n = Math.max(totalPages(), 6);
  return Array.from({ length: n - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export function generateMetadata({ params }: { params: { n: string } }) {
  return pageMeta({
    title: `Blogs - Page ${params.n} - Silver Touch Hospital`,
    description: "Health articles from the doctors at Silver Touch Hospitals, Ahmedabad.",
    path: `/blogs/page/${params.n}/`,
  });
}

export default function BlogsPaged({ params }: { params: { n: string } }) {
  const n = Number(params.n);
  if (!Number.isInteger(n) || n < 2) notFound();
  if (n > totalPages()) redirect("/blogs/");
  return (
    <BlogIndex
      page={n}
      title={`Health blog: page ${n}`}
      crumbs={[
        { name: "Blogs", href: "/blogs/" },
        { name: `Page ${n}`, href: `/blogs/page/${n}/` },
      ]}
      posts={getPosts()}
    />
  );
}
