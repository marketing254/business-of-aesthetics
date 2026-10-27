import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import SectionHead from "@/components/SectionHead";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";

const pillars = [
  {
    no: "01",
    title: "SEO",
    copy: "Rank higher and attract local patients who are actively searching for aesthetic services in your area.",
    points: [
      "Local SEO & Google Business Profile",
      "Content built for high-intent keywords",
      "Technical optimization & site speed",
    ],
  },
  {
    no: "02",
    title: "Social Media",
    copy: "Build a recognizable brand across Instagram, Facebook and YouTube - without burning out.",
    points: [
      "Content strategy & production",
      "Community engagement",
      "Paid social campaigns",
    ],
  },
  {
    no: "03",
    title: "Website",
    copy: "Modern, conversion-focused websites that reflect the quality of your work and make it easy to book.",
    points: [
      "Custom design & UX",
      "Mobile-first & lightning fast",
      "Built-in conversion tracking",
    ],
  },
  {
    no: "04",
    title: "Reputation",
    copy: "Earn and showcase the reviews that build patient trust - and turn happy patients into referrals.",
    points: [
      "Review generation systems",
      "Reputation monitoring",
      "Reply & recovery support",
    ],
  },
];

const processSteps = [
  { no: "01", title: "Discover", copy: "We learn your goals, market and patients." },
  { no: "02", title: "Plan", copy: "You get a custom strategy built around what works." },
  { no: "03", title: "Execute", copy: "We do the work - you focus on patient care." },
  { no: "04", title: "Refine", copy: "Monthly reporting and continuous improvement." },
];

/**
 * Shared Marketing Services (MSM) landing. /marketing embeds the main BOA
 * scheduler; /msm/podcast is the same page with the podcast scheduler
 * (its bookings are handled by Nimasha's n8n workflow).
 */
const BOOKING_PAGES: Record<string, string> = {
  default: "https://ekwasales-withoutceo-boa.youcanbook.me",
  podcast: "https://ekwasales-withoutceo-boa-podcast.youcanbook.me",
};

export function bookingUrl(bookingRef?: string) {
  const page = (bookingRef && BOOKING_PAGES[bookingRef]) || BOOKING_PAGES.default;
  return `${page}?embed=true&noframe=true&skipHeaderFooter=true`;
}

export default function MarketingLanding({ bookingRef }: { bookingRef?: string }) {
  return (
    <>
      {/* hero - copy left, booking calendar right (above the fold) */}
      <section
        id="book"
        className="relative scroll-mt-24 overflow-hidden border-b border-line bg-cream"
      >
        <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-5 pb-14 pt-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-14 lg:pb-20 lg:pt-16">
          <FadeUp eager>
            <div className="lg:pt-6">
              <span className="kicker">Marketing Services by Ekwa</span>
              <h1 className="display mt-5 max-w-[640px] text-[clamp(34px,4.6vw,58px)] leading-[1.02] text-navy">
                Attract patients who <em>choose you</em>, not just whoever
                finds you first.
              </h1>
              <p className="lede mt-6 max-w-[560px] text-[16.5px]">
                Ekwa Marketing helps dermatology, plastic surgery and aesthetic
                practices rank higher, convert more website visitors, and bring
                in the kind of patients who stay for years.
              </p>
              <ul className="mt-8 space-y-3.5">
                {[
                  "200+ aesthetic practices served",
                  "60-minute strategy meeting, no obligation",
                  "A senior advisor reviews your practice before the call",
                  "You keep the plan, whether you work with us or not",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-ink">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal-deep">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#services" className="btn btn-navy">
                  See What We Do <span className="arr">→</span>
                </a>
                <Link href="/blog" className="btn btn-outline">
                  Read Growth Insights
                </Link>
              </div>
            </div>
          </FadeUp>

          <FadeUp eager delay={0.05}>
            <div className="card-frame overflow-hidden !p-0">
              <div className="border-b-4 border-teal bg-sand px-6 py-6 sm:px-8">
                <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                  Free · No obligation
                </div>
                <h2 className="display mt-2 text-[clamp(21px,2.4vw,27px)] text-navy">
                  Book a Marketing Strategy Meeting
                </h2>
                <p className="mt-1.5 text-[14px] text-muted">
                  Pick a date and time that works for you.
                </p>
              </div>
              <div className="bg-white p-2 sm:p-3">
                <iframe
                  src={bookingUrl(bookingRef)}
                  title="Book your free Marketing Strategy Meeting"
                  allow="payment"
                  className="h-[640px] w-full rounded-xl border-0 bg-white"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* pillars */}
      <section id="services" className="scroll-mt-24 bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Four Focus Areas"
            title={
              <>
                Everything you need, <em>nothing you don&apos;t.</em>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <StaggerItem key={p.no} className="h-full">
                <div className="group h-full bg-paper p-8 transition-colors hover:bg-cream">
                  <span className="display text-[30px] text-teal-deep/25 transition-colors duration-300 group-hover:text-teal">
                    {p.no}
                  </span>
                  <h3 className="display mt-3 text-[22px] text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                    {p.copy}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-3 text-[13px] font-semibold text-ink/85"
                      >
                        <span
                          className="mt-[8px] h-1 w-3 shrink-0 bg-teal"
                          aria-hidden
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* process */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="How It Works"
            title={
              <>
                A simple, <em>proven process</em>
              </>
            }
          />
          <Stagger className="mx-auto mt-14 grid max-w-[980px] gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <StaggerItem key={s.no} className="h-full">
                <div className="h-full">
                  <span className="dark-canvas mx-auto grid h-14 w-14 place-items-center rounded-full">
                    <span className="display text-[17px] text-teal">
                      {s.no}
                    </span>
                  </span>
                  <h3 className="display mt-4 text-[20px] text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {s.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* results */}
      <section className="dark-canvas on-dark py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            dark
            kicker="Real Results"
            title={
              <>
                What growth <em>looks like</em>
              </>
            }
            lede="Numbers from real practices in our community."
          />
          <div className="mx-auto mt-14 grid max-w-[880px] gap-10 text-center sm:grid-cols-3">
            {[
              {
                v: "3.2×",
                title: "Patient Inquiries",
                copy: "Average increase within 12 months.",
              },
              {
                v: "200+",
                title: "Practices Supported",
                copy: "From start-ups to multi-location clinics.",
              },
              {
                v: "#1",
                title: "Local Rankings",
                copy: "Across hundreds of high-intent search terms.",
              },
            ].map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.09}>
                <div>
                  <div className="display text-[clamp(34px,3.8vw,46px)] leading-none text-white">
                    {s.v}
                  </div>
                  <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-teal">
                    {s.title}
                  </div>
                  <p className="mt-2 text-[13.5px] text-white/65">{s.copy}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[780px] px-5">
          <SectionHead
            kicker="FAQ"
            title={
              <>
                Questions, <em>answered</em>
              </>
            }
          />
          <div className="mt-10">
            {[
              {
                q: "Is the Strategy Meeting really free?",
                a: "Yes - completely. No credit card, no hidden fees. We invest the time because we know practices that get clear, honest advice tend to come back when they're ready to grow.",
              },
              {
                q: "Who will I be meeting with?",
                a: "You'll meet 1-on-1 with a senior marketing advisor who specializes in aesthetic practices - not a junior salesperson reading a script.",
              },
              {
                q: "What should I prepare beforehand?",
                a: "Nothing required. If you have a few goals or questions in mind, bring them. We do our research on your practice before the call.",
              },
              {
                q: "Will I be pressured to buy something?",
                a: "Absolutely not. The plan we give you is yours to keep. Use it on your own, hand it to your team, or - if it's a fit - explore working together.",
              },
            ].map((f, i) => (
              <details key={f.q} className="faq" open={i === 0}>
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        primary={{ href: "/marketing#book", label: "Book My Strategy Meeting" }}
      />
    </>
  );
}
