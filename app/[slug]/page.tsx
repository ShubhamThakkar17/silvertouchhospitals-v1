import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Phone, UserRound } from "lucide-react";
import { getPost, getPosts, getRelatedPosts, primarySpecialityForPost } from "@/lib/content";
import { CATEGORY_BY_SLUG, REVIEWERS } from "@/content/categories";
import { DEPARTMENT_FOR, specialityHref } from "@/content/specialities";
import { DOCTOR_BY_SLUG, doctorHref } from "@/content/doctors";
import { BRANCH_LIST, SITE_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { blogPostingSchema } from "@/lib/schema";
import { formatDate, normaliseHeadings, readingTime, withHeadingIds } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Confirm } from "@/components/ui/Confirm";
import { Icon } from "@/components/ui/Icon";
import { BookButton } from "@/components/forms/BookButton";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { ShareButtons } from "@/components/blog/ShareButtons";

export const dynamicParams = false;

/** Blog posts live at root-level slugs, exactly as on WordPress. */
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return {};
  return pageMeta({
    title: p.seoTitle,
    description: p.description,
    path: `/${p.slug}/`,
    image: p.image?.src,
    type: "article",
  });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const { html, toc } = withHeadingIds(normaliseHeadings(post.html));
  const cat = CATEGORY_BY_SLUG[post.categories[0]];
  const spec = primarySpecialityForPost(post);
  const reviewerSlug = post.categories.map((c) => REVIEWERS[c]).find(Boolean);
  const reviewer = reviewerSlug ? DOCTOR_BY_SLUG[reviewerSlug] : null;
  const url = `${SITE_URL}/${post.slug}/`;

  return (
    <>
      <JsonLd
        data={blogPostingSchema({
          slug: post.slug,
          title: post.title,
          description: post.description,
          date: post.date,
          modified: post.modified,
          image: post.image?.src ?? null,
          reviewer: reviewer ? { name: reviewer.name, slug: reviewer.slug } : null,
        })}
      />
      <article>
        <header className="bg-surface">
          <div className="container max-w-5xl py-10 md:py-14">
            <Breadcrumbs
              items={[
                { name: "Blogs", href: "/blogs/" },
                ...(cat ? [{ name: cat.name, href: `/category/${cat.slug}/` }] : []),
                { name: post.title, href: `/${post.slug}/` },
              ]}
            />
            <h1 className="mt-8 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">{post.title}</h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" /> {readingTime(post.html)} min read
              </span>
              {cat && (
                <Link href={`/category/${cat.slug}/`} className="rounded-card border border-line bg-white px-2.5 py-1 font-medium text-ink hover:border-primary">
                  {cat.name}
                </Link>
              )}
            </p>
          </div>
          {post.image && (
            <div className="container max-w-5xl pb-0">
              <div className="relative -mb-24 aspect-[3/2] overflow-hidden rounded-[18px] md:-mb-32">
                <Image src={post.image.src} alt={post.image.alt} fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
              </div>
            </div>
          )}
        </header>

        <div className={`container max-w-5xl ${post.image ? "pt-32 md:pt-44" : "pt-12"} pb-16`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              {toc.length > 2 && (
                <nav aria-label="On this page" className="mb-10 rounded-card bg-surface p-6">
                  <p className="font-semibold text-ink">On this page</p>
                  <ol className="mt-3 space-y-2">
                    {toc.map((h) => (
                      <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                        <a href={`#${h.id}`} className="text-primary underline-offset-4 hover:underline">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="prose-st" dangerouslySetInnerHTML={{ __html: html }} />

              <div className="mt-12 flex items-start gap-4 rounded-card border border-line p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <UserRound className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Written by the Silver Touch Hospitals team</p>
                  {reviewer ? (
                    <p className="mt-1">
                      Medically reviewed by{" "}
                      <Link href={doctorHref(reviewer.slug)} className="font-medium text-primary underline">
                        {reviewer.name}
                      </Link>
                      , {reviewer.designation}.
                    </p>
                  ) : (
                    <Confirm note="Medical reviewer for this category" className="mt-2" />
                  )}
                  <p className="mt-2 text-sm">This article is for general information and is not a substitute for advice from your doctor.</p>
                </div>
              </div>

              <div className="mt-8">
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-40 lg:self-start" aria-label="Book a consultation">
              <div className="rounded-[18px] bg-primary p-6 text-white">
                {spec && (
                  <span className="grid h-12 w-12 place-items-center rounded-card bg-white/15">
                    <Icon name={spec.icon} className="h-6 w-6" />
                  </span>
                )}
                <p className="mt-4 text-xl font-semibold text-white">{spec ? `Talk to our ${spec.name} team` : "Talk to a specialist"}</p>
                <p className="mt-2 text-white/80">Book a consultation at Nirnay Nagar or Satellite.</p>
                <BookButton variant="white" preset={spec ? { department: DEPARTMENT_FOR[spec.slug] } : undefined} className="mt-5 w-full">
                  Book a consultation
                </BookButton>
                <ul className="mt-4 space-y-1">
                  {BRANCH_LIST.map((b) => (
                    <li key={b.id}>
                      <a href={b.phoneHref} className="inline-flex min-h-[44px] items-center gap-2 text-sm hover:underline">
                        <Phone className="h-4 w-4" aria-hidden="true" /> {b.name}: {b.phone}
                      </a>
                    </li>
                  ))}
                </ul>
                {spec && (
                  <Link href={specialityHref(spec.slug)} className="mt-2 inline-block text-sm font-semibold underline underline-offset-4">
                    About {spec.name}
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>
      <LatestPosts posts={getRelatedPosts(post, 3)} title="Related articles" surface />
    </>
  );
}
