import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PostCard } from "@/components/cards/PostCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Post } from "@/lib/content";

export function LatestPosts({ posts, title = "Latest from our blog", surface = false }: { posts: Post[]; title?: string; surface?: boolean }) {
  if (!posts.length) return null;
  return (
    <section className={`section ${surface ? "bg-surface" : ""}`} aria-labelledby="posts-heading">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Health Blog</Eyebrow>
            <h2 id="posts-heading" className="mt-5 text-h2">
              {title}
            </h2>
          </div>
          <Link href="/blogs/" className="inline-flex min-h-[48px] items-center gap-1.5 font-medium text-primary hover:underline">
            All articles <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-5 gap-y-10 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
