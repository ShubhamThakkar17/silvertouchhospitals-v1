import { pageMeta } from "@/lib/seo";
import { getPosts } from "@/lib/content";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata = pageMeta({
  title: "Blogs - Silver Touch Hospital",
  description:
    "Explore the latest blog posts on diabetes management, treatment options, healthy living tips, and expert medical advice from Silver Touch Hospital.",
  path: "/blogs/",
});

export default function BlogsPage() {
  return <BlogIndex page={1} title="Health blog" crumbs={[{ name: "Blogs", href: "/blogs/" }]} posts={getPosts()} />;
}
