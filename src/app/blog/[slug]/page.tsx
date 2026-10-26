import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ShareBar from "@/components/ShareBar";
import { FadeUp } from "@/components/motion/Animate";
import { blogPosts, getBlogPost, relatedPosts } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { blogPostingJsonLd, breadcrumbJsonLd, graph } from "@/lib/seo";


type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

/* Blog data is local, so the archive prerenders fully in both hosting modes. */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article" };
  const description = post.excerpt.length > 158 ? post.excerpt.slice(0, 155).replace(/\s+\S*$/, "") + "…" : post.excerpt;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      section: post.category,
      authors: ["Business of Aesthetics"],
      ...(post.image ? { images: [{ url: post.image, width: 1200, height: 675, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // prev / next stay within the same kind (articles with articles, notes with notes)
  const siblings = blogPosts.filter((p) => p.kind === post.kind);
  const index = siblings.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? siblings[index - 1] : null;
  const older = index < siblings.length - 1 ? siblings[index + 1] : null;
  const related = relatedPosts(post, 3);

  return (
    <>
      <JsonLd
        data={graph(
          blogPostingJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />
      {/* centered header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[880px] px-5 pb-12 pt-12 lg:pt-16">
          <FadeUp>
            <Link href="/blog#articles" className="linkline">
              <span className="arr">&lt;-</span> Back to all articles
            </Link>
            <div className="mx-auto mt-8 text-center">
              <span className="kicker center justify-center">
                {post.kind === "article" ? `The BOA Blog · ${post.category}` : "Podcast Episode Notes"}
              </span>
              <h1 className="display mx-auto mt-5 text-[clamp(26px,3.4vw,38px)] leading-snug text-navy">
                {post.title}
              </h1>
              <div className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
                By Business of Aesthetics ·{" "}
                <time dateTime={post.date}>{post.dateLabel}</time> · {post.readMins} min read
              </div>
              <div className="mt-5 flex justify-center">
                <ShareBar title={post.title} />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* article body - no reveal wrapper: tall content must render outright */}
      <section className="bg-paper py-14 lg:py-16">
        <div className="mx-auto max-w-[760px] px-5">
          {post.image && (
            <div className="tone-img mb-10 overflow-hidden rounded-2xl border border-line bg-sand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/_next/image?url=${encodeURIComponent(post.image)}&w=1200&q=75`}
                alt={post.title}
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
              />
            </div>
          )}
          <article
            className="prose-boa"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </section>

      {/* prev / next */}
      {(newer || older) && (
        <section className="border-t border-line py-10">
          <div className="mx-auto grid max-w-[880px] gap-5 px-5 md:grid-cols-2">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="card-frame group block h-full p-6"
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  &lt;- Older
                </span>
                <h3 className="mt-2.5 line-clamp-2 text-[15px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                  {older.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="card-frame group block h-full p-6 md:text-right"
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  Newer -&gt;
                </span>
                <h3 className="mt-2.5 line-clamp-2 text-[15px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                  {newer.title}
                </h3>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* related - keeps readers (and crawlers) moving through the archive */}
      {related.length > 0 && (
        <section className="border-t border-line bg-paper py-14">
          <div className="mx-auto max-w-[1180px] px-5">
            <h2 className="display text-center text-[clamp(22px,2.6vw,28px)] text-navy">
              {post.kind === "article" ? "More from the blog" : "More episode notes"}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="card-frame group flex h-full flex-col p-6">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {r.dateLabel} · {r.readMins} min read
                  </div>
                  <h3 className="mt-3 line-clamp-3 text-[15.5px] font-semibold leading-snug text-navy transition-colors group-hover:text-teal-deep">
                    {r.title}
                  </h3>
                  <span className="linkline mt-auto pt-4">
                    Read <span className="arr">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="Keep Learning"
        primary={{ href: "/marketing#book", label: "Book a Strategy Meeting" }}
        secondary={{ href: "/blog", label: "More Articles" }}
      />
    </>
  );
}
