import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import BookingEmbed from "@/components/BookingEmbed";

export const metadata: Metadata = {
  title: "Book Your Strategy Meeting",
  description:
    "A free 60-minute Marketing Strategy Meeting with a senior advisor. Walk away with a clear, custom growth plan for your aesthetic practice.",
};

const perks = [
  {
    no: "01",
    title: "Honest Practice Audit",
    copy: "We'll review your website, search visibility, social presence, and reputation — then tell you exactly what's working and what isn't.",
  },
  {
    no: "02",
    title: "Custom Growth Plan",
    copy: "You'll leave with a prioritized roadmap covering SEO, social media, website, and patient acquisition — built for your specialty.",
  },
  {
    no: "03",
    title: "Zero Sales Pressure",
    copy: "It's a conversation, not a pitch. Take the plan and run with it yourself, hire your own team, or work with us — your call.",
  },
];

const steps = [
  { no: "01", title: "Book a Time", copy: "Pick a slot that fits your schedule." },
  { no: "02", title: "Quick Prep", copy: "We research your practice before we meet." },
  { no: "03", title: "The Meeting", copy: "60 minutes, 1-on-1 with a senior advisor." },
  { no: "04", title: "Your Plan", copy: "Walk away with a clear, custom action plan." },
];

const faqs = [
  {
    q: "Is the Strategy Meeting really free?",
    a: "Yes — completely. No credit card, no hidden fees. We invest the time because we know practices that get clear, honest advice tend to come back when they're ready to grow.",
  },
  {
    q: "Who will I be meeting with?",
    a: "You'll meet 1-on-1 with a senior marketing advisor who specializes in aesthetic practices — not a junior salesperson reading a script.",
  },
  {
    q: "What should I prepare beforehand?",
    a: "Nothing required. If you have a few goals or questions in mind, bring them. We do our research on your practice before the call.",
  },
  {
    q: "Will I be pressured to buy something?",
    a: "Absolutely not. The plan we give you is yours to keep. Use it on your own, hand it to your team, or — if it's a fit — explore working together.",
  },
  {
    q: "How long does the meeting last?",
    a: "About 60 minutes. We respect your time and keep things focused.",
  },
];

export default function MsmPage() {
  return (
    <>
      {/* hero + booking */}
      <section className="relative overflow-hidden">
        <div className="ghost-word left-[-2%] top-[60%] text-[clamp(110px,15vw,230px)]">
          book
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-start gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1fr_1fr] lg:pt-20">
          <Reveal>
            <span className="kicker">Free Strategy Meeting</span>
            <h1 className="display mt-6 text-[clamp(36px,4.6vw,58px)] text-navy">
              Get a custom growth plan for your <em>aesthetic practice</em> — in
              60 minutes.
            </h1>
            <p className="mt-6 max-w-[540px] text-[16.5px] leading-relaxed text-muted">
              Sit down with a senior advisor for a no-pressure Marketing
              Strategy Meeting. We&apos;ll audit where you stand, identify your
              biggest opportunities, and hand you a clear plan you can act on —
              whether you work with us or not.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-9 gap-y-3 border-t border-line pt-6 text-[13.5px] font-bold text-navy">
              <span>
                <b className="text-teal-deep">60 minutes</b>
              </span>
              <span>
                <b className="text-teal-deep">1-on-1</b> with a senior advisor
              </span>
              <span>
                <b className="text-teal-deep">100% free</b>
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {/* YouCanBook.me scheduler slot */}
            <BookingEmbed />
          </Reveal>
        </div>
      </section>

      {/* trust strip */}
      <section className="dark-canvas on-dark py-14">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 px-5 lg:grid-cols-4">
          {[
            { n: 3700, s: "+", label: "Practitioners in Community" },
            { n: 284, s: "+", label: "Podcast Episodes" },
            { n: 19, s: " yrs", label: "Industry Experience" },
            { n: 200, s: "+", label: "Practices Supported" },
          ].map((st) => (
            <div key={st.label} className="stat-rule">
              <div className="display text-[36px] leading-none text-white">
                <Counter target={st.n} suffix={st.s} />
              </div>
              <div className="mt-2 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-teal">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* perks */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[680px]">
              <span className="kicker">What You&apos;ll Get</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Three things you&apos;ll <em>walk away with</em>
              </h2>
              <p className="mt-4 text-[15.5px] text-muted">
                Every Strategy Meeting is built around your practice — your
                patients, your services, your goals. No templates.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {perks.map((p, i) => (
              <Reveal key={p.no} delay={i * 90} className="h-full">
                <div className="h-full bg-paper p-9">
                  <span className="display text-[40px] italic text-teal-deep/30">
                    {p.no}
                  </span>
                  <h3 className="display mt-4 text-[21px] text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {p.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* steps */}
      <section className="border-y border-line bg-paper py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[680px]">
              <span className="kicker">How It Works</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Four simple <em>steps</em>
              </h2>
              <p className="mt-4 text-[15.5px] text-muted">
                From booking to action plan, the whole thing takes less than a
                week.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.no} delay={i * 80} className="h-full">
                <div className="relative h-full border-l border-line pl-7">
                  <span
                    className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full bg-teal"
                    aria-hidden
                  />
                  <span className="index-no text-[14px]">{s.no}</span>
                  <h3 className="display mt-2 text-[21px] text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {s.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* quote */}
      <section className="dark-canvas on-dark py-24 text-center">
        <div className="mx-auto max-w-[820px] px-5">
          <Reveal>
            <blockquote className="display text-[clamp(21px,2.8vw,30px)] italic leading-snug text-white">
              &ldquo;What you guys are doing with this podcast, and just in
              general, I think it&apos;s so important for the whole community.
              You&apos;ve really found a niche — an unmet need.&rdquo;
            </blockquote>
            <div className="mx-auto mt-8 h-px w-10 bg-teal" />
            <div className="mt-4 text-[15px] font-extrabold text-white">
              Dr. WM. Philip Werschler
            </div>
            <div className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-white/55">
              MD, FAAD, FAACS
            </div>
          </Reveal>
        </div>
      </section>

      {/* faq */}
      <section className="py-24">
        <div className="mx-auto max-w-[820px] px-5">
          <Reveal>
            <span className="kicker">FAQ</span>
            <h2 className="display mt-5 text-[clamp(28px,3.8vw,44px)] text-navy">
              Questions, <em>answered</em>
            </h2>
          </Reveal>
          <div className="mt-10">
            {faqs.map((f, i) => (
              <details key={f.q} className="faq" open={i === 0}>
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* final */}
      <section className="border-t border-line bg-sand py-20 text-center">
        <div className="mx-auto max-w-[640px] px-5">
          <Reveal>
            <h2 className="display text-[clamp(28px,3.6vw,42px)] text-navy">
              Ready when <em>you are.</em>
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
              One conversation could change the trajectory of your practice.
              There&apos;s no risk, no pressure, and a clear plan waiting on the
              other side.
            </p>
            <a href="#top" className="btn btn-navy mt-8">
              Book Your Strategy Meeting <span className="arr">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
