import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingLanding from "@/components/MarketingLanding";

/**
 * Tracked copies of the Marketing Services page, one URL per traffic
 * source, e.g. /msm/podcast, /msm/nimasha, /msm/newsletter. Same content as
 * /marketing; the booking calendar is tagged with the source so the MSM
 * booking sheet shows where each meeting came from.
 *
 * Not indexed (canonical points at /marketing) so there is no duplicate
 * content - these URLs are for links in show notes, emails and bios.
 */
type Props = { params: Promise<{ ref: string }> };

const KNOWN = new Set(["podcast"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ref } = await params;
  return {
    title: "Marketing Services (MSM)",
    description:
      "Proven marketing for aesthetic practices - SEO, social media, websites and reputation, all tailored to dermatology, plastic surgery and aesthetics.",
    alternates: { canonical: "/marketing" },
    robots: { index: false, follow: true },
    openGraph: { title: "Marketing Services (MSM)", url: `/msm/${ref}` },
  };
}

export default async function TrackedMarketingPage({ params }: Props) {
  const { ref } = await params;
  const clean = ref.toLowerCase();
  if (!KNOWN.has(clean)) notFound();
  return <MarketingLanding bookingRef={clean} />;
}
