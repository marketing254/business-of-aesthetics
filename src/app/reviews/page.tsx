import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import ReviewsExplorer from "@/components/ReviewsExplorer";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import { OG_IMAGES, ORG_ID, SITE_NAME, abs, breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo";
import {
  averageStars,
  cleanQuote,
  countBy,
  reviews,
  vimeoEmbedUrl,
  vimeoId,
  vimeoPoster,
} from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews - What Our Guests Say",
  description:
    "Podcast guests, panelists and practice owners share what it is like to work with Business of Aesthetics - in their own words, on video.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Reviews - What Our Guests Say | Business of Aesthetics",
    description:
      "Podcast guests, panelists and practice owners share what it is like to work with Business of Aesthetics - in their own words, on video.",
    url: "/reviews",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews - What Our Guests Say | Business of Aesthetics",
    images: OG_IMAGES,
  },
};

export default function ReviewsPage() {
  const avg = averageStars();
  const count = reviews.length;

  const reviewNodes = reviews.map((r, i) => {
    const id = vimeoId(r.vimeo);
    return {
      "@type": "Review",
      "@id": abs(`/reviews#review-${i + 1}`),
      itemReviewed: { "@id": ORG_ID },
      author: { "@type": "Person", name: r.name, jobTitle: r.role },
      reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5, worstRating: 1 },
      reviewBody: cleanQuote(r.quote),
      ...(id && {
        video: {
          "@type": "VideoObject",
          name: `${r.name} - ${r.tag} review`,
          description: cleanQuote(r.quote),
          thumbnailUrl: vimeoPoster(r.vimeo),
          embedUrl: vimeoEmbedUrl(r.vimeo),
          uploadDate: "2026-11-03",
        },
      }),
    };
  });

  return (
    <>
      <JsonLd
        data={graph(
          {
            ...webPageJsonLd({
              path: "/reviews",
              name: `Reviews - ${SITE_NAME}`,
              description: metadata.description as string,
              type: "CollectionPage",
            }),
            mainEntity: { "@id": ORG_ID },
          },
          count > 0 && {
            "@type": "Organization",
            "@id": ORG_ID,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: avg,
              bestRating: 5,
              worstRating: 1,
              reviewCount: count,
            },
            review: reviewNodes,
          },
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }])
        )}
      />

      <PageHero
        compact
        kicker="Reviews"
        title={
          <>
            What our guests <em>say about us.</em>
          </>
        }
        lede="Podcast guests, panelists and practice owners share what it was like to work with Business of Aesthetics - in their own words."
      >
        <Link href="/speakers#apply" className="btn btn-navy">
          Apply to Be a Guest <span className="arr">→</span>
        </Link>
        <Link href="/podcast" className="btn btn-outline">
          Listen to the Podcast
        </Link>
      </PageHero>

      {/* quick numbers - computed from the reviews list */}
      <section className="border-b border-line bg-paper py-9">
        <Stagger className="mx-auto grid max-w-[880px] grid-cols-2 gap-x-6 gap-y-8 px-5 text-center sm:grid-cols-4">
          {[
            { v: avg.toFixed(1), label: "Average rating" },
            { v: String(countBy("podcast")), label: "Podcast guests" },
            { v: String(countBy("panel")), label: "Expert panelists" },
            { v: "3,700+", label: "Practitioners reached" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="display text-[clamp(22px,2.6vw,30px)] leading-none text-navy">{s.v}</div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* reviews */}
      <section id="reviews" className="scroll-mt-24 py-14 lg:py-18">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="In Their Own Words"
            title={
              <>
                Honest feedback from the people <em>we work with.</em>
              </>
            }
            lede="Every review is recorded by the guest themselves. Filter by podcast guests or expert panelists, and tap a video to watch."
          />

          <ReviewsExplorer reviews={reviews} />

          {count === 0 && (
            <FadeUp>
              <p className="mt-12 text-center text-muted">Reviews are on their way - check back soon.</p>
            </FadeUp>
          )}
        </div>
      </section>

      <CtaBand
        eyebrow="Join the Conversation"
        title={
          <>
            Share your expertise with <em>3,700+ practitioners.</em>
          </>
        }
        copy="Join us as a podcast guest or expert panelist, or book a free strategy meeting to see how your practice shows up online."
        primary={{ href: "/speakers#apply", label: "Apply to Be a Guest" }}
        secondary={{ href: "/marketing#book", label: "Book a Free Strategy Meeting" }}
      />
    </>
  );
}
