import Link from "next/link";
import { FadeUp } from "@/components/motion/Animate";

/**
 * Closing call-to-action band - one calm, centered dark panel shared by
 * every page.
 */
export default function CtaBand({
  eyebrow = "Free Strategy Meeting",
  title = (
    <>
      One conversation could <em>change everything</em>.
    </>
  ),
  copy = "Get a free 60-minute Marketing Strategy Meeting with a senior advisor. Walk away with a clear, custom growth plan for your practice - no pressure, no pitch.",
  primary = { href: "/marketing#book", label: "Book My Strategy Meeting" },
  secondary = { href: "/podcast", label: "Listen to the Podcast" },
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  copy?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="dark-canvas on-dark py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5">
        <FadeUp>
          <div className="mx-auto max-w-[720px] text-center">
            <span className="kicker center justify-center">{eyebrow}</span>
            <h2 className="display mx-auto mt-5 text-[clamp(26px,3.4vw,40px)] text-white">
              {title}
            </h2>
            <p className="lede mx-auto mt-5 max-w-[580px]">{copy}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href={primary.href} className="btn btn-teal">
                {primary.label} <span className="arr">→</span>
              </Link>
              <Link href={secondary.href} className="btn btn-ghost-light">
                {secondary.label}
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
