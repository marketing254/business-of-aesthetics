import { FadeUp } from "@/components/motion/Animate";

/**
 * Centered section header - the one heading pattern used site-wide so every
 * page shares the same rhythm: kicker with rules, display heading, optional
 * one-paragraph lede.
 */
export default function SectionHead({
  kicker,
  title,
  lede,
  dark = false,
  className = "",
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <FadeUp className={className}>
      <div className="mx-auto max-w-[680px] text-center">
        <span className="kicker center justify-center">{kicker}</span>
        <h2
          className={`display mt-4 text-[clamp(25px,3.1vw,35px)] ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </h2>
        {lede && <p className="lede mx-auto mt-4 max-w-[620px]">{lede}</p>}
      </div>
    </FadeUp>
  );
}
