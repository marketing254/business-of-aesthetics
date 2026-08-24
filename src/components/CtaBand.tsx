import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBand({
  eyebrow = "Free Strategy Meeting",
  title = (
    <>
      One conversation could <em>change everything</em>.
    </>
  ),
  copy = "Get a free 60-minute Marketing Strategy Meeting with a senior advisor. Walk away with a clear, custom growth plan for your practice — no pressure, no pitch.",
  primary = { href: "/msm", label: "Book My Strategy Meeting" },
  secondary = { href: "/podcast", label: "Listen to the Podcast" },
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  copy?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy py-24 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 400px at 85% 10%, rgba(19,175,160,0.22), transparent 65%), radial-gradient(600px 400px at 5% 100%, rgba(12,18,41,0.8), transparent 60%)",
        }}
      />
      <div className="ghost-word bottom-[-4%] right-[-2%] text-[clamp(120px,17vw,270px)]">
        grow
      </div>
      <div className="relative mx-auto max-w-[1280px] px-5">
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <span className="kicker center justify-center">{eyebrow}</span>
            <h2 className="display mx-auto mt-5 text-[clamp(32px,4.6vw,58px)] text-white">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[16.5px] leading-relaxed text-white/75">
              {copy}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href={primary.href} className="btn btn-teal">
                {primary.label} <span className="arr">→</span>
              </Link>
              <Link href={secondary.href} className="btn btn-ghost-light">
                {secondary.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
