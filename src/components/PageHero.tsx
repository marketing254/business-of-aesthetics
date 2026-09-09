import { FadeUp } from "@/components/motion/Animate";

/**
 * Centered page hero - kicker, display headline, lede, and an optional row
 * of CTAs, all on one calm centered column. Every page opens with this so
 * the site reads as one considered system.
 */
export default function PageHero({
  kicker,
  title,
  lede,
  children,
  compact = false,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** CTA buttons / meta row rendered centered under the lede */
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className={`mx-auto max-w-[880px] px-5 text-center ${
          compact ? "pb-12 pt-12 lg:pb-14 lg:pt-16" : "pb-16 pt-14 lg:pb-20 lg:pt-20"
        }`}
      >
        <FadeUp>
          <span className="kicker center justify-center">{kicker}</span>
          <h1 className="display mx-auto mt-5 max-w-[820px] text-[clamp(30px,4vw,48px)] text-navy">
            {title}
          </h1>
          {lede && (
            <p className="lede mx-auto mt-5 max-w-[640px] text-[16.5px]">
              {lede}
            </p>
          )}
          {children && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
