import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import VideoEmbed from "@/components/VideoEmbed";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import { OG_IMAGES, ORG_ID, SITE_NAME, abs, breadcrumbJsonLd, graph, webPageJsonLd } from "@/lib/seo";
import {
  averageStars,
  initials,
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

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-[2px] text-gold" aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.9l1.2-6.6L2.5 9.7l6.6-.9z" />
        </svg>
      ))}
    </span>
  );
}

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
      reviewBody: r.quote,
      ...(id && {
        video: {
          "@type": "VideoObject",
          name: `${r.name} - ${r.tag} review`,
          description: r.quote,
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
      <section className="border-b border-line bg-paper py-12">
        <Stagger className="mx-auto grid max-w-[880px] grid-cols-3 gap-x-6 gap-y-8 px-5 text-center">
          {[
            { v: avg.toFixed(1), label: "Average rating" },
            { v: String(count), label: count === 1 ? "Video review" : "Video reviews" },
            { v: "3,700+", label: "Practitioners reached" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="display text-[clamp(26px,3vw,36px)] leading-none text-navy">{s.v}</div>
              <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* reviews */}
      <section id="reviews" className="scroll-mt-24 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="In Their Own Words"
            title={
              <>
                Honest feedback from the people <em>we work with.</em>
              </>
            }
            lede="Every review is recorded by the guest themselves. Tap a video to watch."
          />

          <Stagger
            className={`mt-14 grid gap-8 ${count === 1 ? "mx-auto max-w-[600px]" : "md:grid-cols-2"}`}
          >
            {reviews.map((r, i) => (
              <StaggerItem key={`${r.name}-${i}`}>
                <article
                  id={`review-${i + 1}`}
                  className="card-frame flex h-full flex-col overflow-hidden scroll-mt-28"
                >
                  <div className="p-3 pb-0">
                    <VideoEmbed
                      embedUrl={vimeoEmbedUrl(r.vimeo)}
                      title={`${r.name} - ${r.tag} review`}
                      poster={vimeoPoster(r.vimeo)}
                      cta="Play review"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-7 pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-teal-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-deep">
                        {r.tag}
                      </span>
                      <Stars n={r.stars} />
                    </div>
                    <blockquote className="display text-[clamp(19px,1.7vw,23px)] leading-[1.3] text-navy">
                      “{r.quote.replace(/^[“"]|[”"]$/g, "")}”
                    </blockquote>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-[13px] font-bold tracking-wide text-white">
                        {initials(r.name)}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[15px] font-semibold text-navy">{r.name}</div>
                        <div className="text-[13px] text-muted">{r.role}</div>
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

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
