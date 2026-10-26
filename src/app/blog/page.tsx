import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import NewsletterBand from "@/components/NewsletterBand";
import BlogExplorer from "@/components/BlogExplorer";
import { FadeUp } from "@/components/motion/Animate";
import { blogArticles, blogCards } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { blogIndexJsonLd, breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog - Growth Insights for Aesthetic Practices",
  description:
    "Practical articles on marketing, patient retention, operations, finance and leadership for dermatology, plastic surgery and med spa practices, plus show notes for every podcast episode.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title: "The Business of Aesthetics Blog", url: "/blog" },
};

export default function BlogPage() {
  const cards = blogCards();
  const featured = blogArticles[0];
  const articleCount = blogArticles.length;
  const episodeCount = cards.length - articleCount;

  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: "/blog", name: "The Business of Aesthetics Blog", description: metadata.description as string, type: "CollectionPage" }),
          blogIndexJsonLd(blogArticles),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])
        )}
      />
      <PageHero
        kicker="The BOA Blog"
        title={
          <>
            Ideas worth <em>reading twice.</em>
          </>
        }
        lede={`${articleCount} articles on the business side of aesthetic medicine - marketing, operations, finance, and leadership - plus show notes for all ${episodeCount} podcast episodes.`}
      >
        <a href="#articles" className="btn btn-navy">
          Browse Articles <span className="arr">→</span>
        </a>
        <Link href="/podcast" className="btn btn-outline">
          Listen Instead
        </Link>
      </PageHero>

      {/* featured latest */}
      {featured && (
        <section className="border-b border-line bg-paper py-14">
          <div className="mx-auto max-w-[880px] px-5">
            <FadeUp>
              <Link
                href={`/blog/${featured.slug}`}
                className="card-frame group block bg-sand p-8 text-center sm:p-10"
              >
                <span className="chip teal">Latest Article · {featured.category}</span>
                <h2 className="display mx-auto mt-5 max-w-[720px] text-[clamp(21px,2.6vw,29px)] leading-snug text-navy transition-colors group-hover:text-teal-deep">
                  {featured.title}
                </h2>
                <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <div className="mt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {featured.dateLabel} · {featured.readMins} min read
                </div>
                <span className="linkline mt-5">
                  Read the article <span className="arr">→</span>
                </span>
              </Link>
            </FadeUp>
          </div>
        </section>
      )}

      {/* archive */}
      <section id="articles" className="scroll-mt-24 py-16 lg:py-20">
        <div className="mx-auto max-w-[1180px] px-5">
          <BlogExplorer posts={cards} />
        </div>
      </section>

      <NewsletterBand />
      <CtaBand
        eyebrow="Put It Into Practice"
        title={
          <>
            Reading is step one. <em>Doing is step two.</em>
          </>
        }
        copy="Book a free 60-minute Marketing Strategy Meeting and turn these ideas into a plan for your own practice."
        primary={{ href: "/marketing#book", label: "Book My Strategy Meeting" }}
        secondary={{ href: "/podcast", label: "Listen to the Podcast" }}
      />
    </>
  );
}
