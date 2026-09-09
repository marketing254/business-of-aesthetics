import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ShareBar from "@/components/ShareBar";
import { FadeUp } from "@/components/motion/Animate";
import { blogPosts, getBlogPost } from "@/lib/blog";

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
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const index = blogPosts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? blogPosts[index - 1] : null;
  const older = index < blogPosts.length - 1 ? blogPosts[index + 1] : null;

  return (
    <>
      {/* centered header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[880px] px-5 pb-12 pt-12 lg:pt-16">
          <FadeUp>
            <Link href="/blog#articles" className="linkline">
              <span className="arr">&lt;-</span> Back to all articles
            </Link>
            <div className="mx-auto mt-8 text-center">
              <span className="kicker center justify-center">The BOA Blog</span>
              <h1 className="display mx-auto mt-5 text-[clamp(26px,3.4vw,38px)] leading-snug text-navy">
                {post.title}
              </h1>
              <div className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
                {post.dateLabel} · {post.readMins} min read
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
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
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
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
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

      <CtaBand
        eyebrow="Keep Learning"
        primary={{ href: "/marketing#book", label: "Book a Strategy Meeting" }}
        secondary={{ href: "/blog", label: "More Articles" }}
      />
    </>
  );
}
