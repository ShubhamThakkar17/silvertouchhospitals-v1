import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CATEGORIES, CATEGORY_BY_SLUG } from "@/content/categories";
import { getPosts, POSTS_PER_PAGE, type Post } from "@/lib/content";
import { formatDate, readingTime, cn } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/cards/PostCard";
import { BlogSearch } from "./BlogSearch";
import type { Crumb } from "@/components/ui/Breadcrumbs";

export function CategoryChips({ active }: { active?: string }) {
  const counts = new Map<string, number>();
  for (const p of getPosts()) for (const c of p.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  return (
    <nav aria-label="Blog categories">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/blogs/"
            aria-current={!active ? "page" : undefined}
            className={cn("inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium", !active ? "border-ink bg-ink text-white" : "border-line hover:border-ink")}
          >
            All
          </Link>
        </li>
        {CATEGORIES.filter((c) => counts.get(c.slug)).map((c) => (
          <li key={c.slug}>
            <Link
              href={`/category/${c.slug}/`}
              aria-current={active === c.slug ? "page" : undefined}
              className={cn(
                "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-sm font-medium",
                active === c.slug ? "border-ink bg-ink text-white" : "border-line hover:border-ink",
              )}
            >
              {c.name} <span className="opacity-60">{counts.get(c.slug)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Featured({ post }: { post: Post }) {
  const cat = CATEGORY_BY_SLUG[post.categories[0]];
  return (
    <article className="group relative grid gap-8 overflow-hidden rounded-[18px] bg-surface lg:grid-cols-2">
      <div className="relative aspect-[3/2] lg:aspect-auto lg:min-h-[380px]">
        {post.image && <Image src={post.image.src} alt="" fill priority sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />}
      </div>
      <div className="flex flex-col justify-center p-6 pt-0 lg:p-10">
        <p className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-card bg-primary px-2.5 py-1 font-medium text-white">Latest</span>
          {cat && <span className="font-medium text-ink">{cat.name}</span>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>· {readingTime(post.html)} min read</span>
        </p>
        <h2 className="mt-4 text-h3 font-semibold">
          <Link href={`/${post.slug}/`} className="after:absolute after:inset-0 group-hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-3">{post.description}</p>
      </div>
    </article>
  );
}

export function BlogIndex({ page, title, crumbs, posts, category }: { page: number; title: string; crumbs: Crumb[]; posts: Post[]; category?: string }) {
  const total = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const showFeatured = page === 1 && !category;
  const pagePosts = category ? posts : posts.slice((page - 1) * POSTS_PER_PAGE + (showFeatured ? 1 : 0), page * POSTS_PER_PAGE);
  const href = (n: number) => (n === 1 ? "/blogs/" : `/blogs/page/${n}/`);
  const all = getPosts();
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Health Blog"
        title={title}
        intro="Doctor-led articles on knee and hip replacement, diabetes, digestive health, ENT, dental care and more."
      />
      <section className="section">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <CategoryChips active={category} />
            <BlogSearch
              items={all.map((p) => ({ slug: p.slug, title: p.title, date: p.date, category: CATEGORY_BY_SLUG[p.categories[0]]?.name ?? "" }))}
            />
          </div>
          {showFeatured && posts[0] && (
            <div className="mt-12">
              <Featured post={posts[0]} />
            </div>
          )}
          <ul className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} headingLevel="h2" />
              </li>
            ))}
          </ul>
          {!category && total > 1 && (
            <nav aria-label="Blog pages" className="mt-16 flex flex-wrap items-center justify-center gap-2">
              {page > 1 && (
                <Link href={href(page - 1)} className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-ink" aria-label="Previous page">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </Link>
              )}
              {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={href(n)}
                  aria-current={n === page ? "page" : undefined}
                  className={cn("grid h-12 w-12 place-items-center rounded-full border font-medium", n === page ? "border-ink bg-ink text-white" : "border-line hover:border-ink")}
                >
                  {n}
                </Link>
              ))}
              {page < total && (
                <Link href={href(page + 1)} className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-ink" aria-label="Next page">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
