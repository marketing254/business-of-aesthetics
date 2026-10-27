import type { Metadata } from "next";
import MarketingLanding from "@/components/MarketingLanding";

export const metadata: Metadata = {
  title: "Marketing Services (MSM)",
  description:
    "Proven marketing for aesthetic practices - SEO, social media, websites and reputation, all tailored to dermatology, plastic surgery and aesthetics.",
};

export default function MarketingPage() {
  return <MarketingLanding />;
}
