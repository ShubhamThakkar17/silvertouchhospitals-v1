import Image from "next/image";
import Link from "next/link";
import { CATEGORY_BY_SLUG } from "@/content/categories";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/content";

export function PostCard({ post, headingLevel = "h3", priority = false }: { post: Post; headingLevel?: "h2" | "h3"; priority?: boolean }) {
  const H = headingLevel;
  const cat = CATEGORY_BY_SLUG[post.categories[0]];
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-card bg-surface">
        {post.image && (
          <Image
            src={post.image.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 48vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        {cat && (
          <Link
            href={`/category/${cat.slug}/`}
            className="relative z-10 rounded-card border border-line px-2.5 py-1 font-medium text-ink hover:border-primary hover:text-primary"
          >
            {cat.name}
          </Link>
        )}
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <H className="mt-3 text-xl font-semibold leading-snug">
        <Link href={`/${post.slug}/`} className="after:absolute after:inset-0 group-hover:text-primary">
          {post.title}
        </Link>
      </H>
    </article>
  );
}
