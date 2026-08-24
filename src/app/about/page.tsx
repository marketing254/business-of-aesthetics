import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Business of Aesthetics — founded by Naren Arulrajah and Jeffrey Richmond to help aesthetic practitioners grow successful, fulfilling practices.",
};

const values = [
  {
    no: "01",
    title: "Honesty First",
    copy: "Real opinions, real lessons. No spin and no sugar-coating — just the kind of conversations that move practices forward.",
  },
  {
    no: "02",
    title: "Always Learning",
    copy: "The aesthetic industry changes fast. We bring you the people, ideas, and tools that keep you ahead of it.",
  },
  {
    no: "03",
    title: "Community Over Competition",
    copy: "A rising tide lifts every practice. Our members share freely because they know it makes the whole industry stronger.",
  },
];

const team = [
  {
    initials: "GB",
    name: "Gary Bird",
    role: "Head Coach · CSM",
    bio: "Award-winning coach helping aesthetic owners build practices they love. 19+ years in aesthetic industry growth.",
  },
  {
    initials: "LK",
    name: "Lena Kowalski",
    role: "Product Owner",
    bio: "Drives the BOA platform roadmap, podcast production, and member experience across every touchpoint.",
  },
  {
    initials: "DM",
    name: "David Martinez",
    role: "Partnership Manager",
    bio: "Builds relationships with industry partners, sponsors, and aesthetic vendors who share our community-first values.",
  },
  {
    initials: "AS",
    name: "Aisha Sharma",
    role: "Marketing Manager",
    bio: "Leads BOA marketing, brand storytelling, and helps members translate insight into measurable growth.",
  },
];

const timeline = [
  {
    year: "2019",
    title: "BOA is born",
    copy: "The idea for a candid, modern community for aesthetic practitioners takes shape.",
  },
  {
    year: "2020",
    title: "The podcast launches",
    copy: "The first episodes drop, featuring honest conversations with industry leaders.",
  },
  {
    year: "2022",
    title: "3,000+ members",
    copy: "Our community crosses 3,000 aesthetic practitioners — and keeps growing.",
  },
  {
    year: "2024",
    title: "Expert panels expand",
    copy: "We launch monthly expert panels covering everything from clinical safety to marketing.",
  },
  {
    year: "2026",
    title: "284+ episodes & counting",
    copy: "The BOA podcast becomes one of the most-listened resources in the aesthetic industry.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[55%] text-[clamp(110px,15vw,230px)]">
          about
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <Reveal>
            <span className="kicker">About Us</span>
            <h1 className="display mt-6 text-[clamp(38px,5vw,66px)] text-navy">
              Built by practitioners, <em>for practitioners.</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[17.5px] leading-relaxed text-muted">
              A modern community for leaders in Dermatology, Plastic Surgery and
              Aesthetics — built around honest conversations, real expertise,
              and shared success.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/msm" className="btn btn-navy">
                Book Strategy Meeting <span className="arr">→</span>
              </Link>
              <Link href="/podcast" className="linkline !text-[13px]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Listen to the Podcast
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="offset-frame tone-img relative mx-auto aspect-[4/5] max-w-[460px] overflow-hidden rounded-[3px]">
              <Image
                src="/assets/about-founders.jpg"
                alt="The founders of Business of Aesthetics"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* mission */}
      <section className="border-b border-line bg-paper py-24 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-16 px-5 lg:grid-cols-2">
          <Reveal>
            <div className="offset-frame tone-img relative aspect-[5/4] max-w-[520px] overflow-hidden rounded-[3px]">
              <Image
                src="/assets/stock-planning.jpg"
                alt="Aesthetic practitioners collaborating"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="kicker">Our Mission</span>
            <h2 className="display mt-5 text-[clamp(30px,3.8vw,46px)] text-navy">
              A platform where success is <em>shared, not hoarded.</em>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted">
              The Business of Aesthetics was founded on a simple belief — that
              aesthetic medicine professionals deserve a candid, modern space to
              learn from each other. No politics. No gatekeeping. Just real
              conversations about what works.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              From the BOA Podcast to live expert panels and our private
              community, every part of what we do is designed to help you grow a
              practice you&apos;re proud of.
            </p>
          </Reveal>
        </div>
      </section>

      {/* vision / why */}
      <section className="py-24">
        <div className="mx-auto grid max-w-[1280px] gap-7 px-5 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="card-frame h-full p-9">
              <span className="kicker">Our Vision</span>
              <h3 className="display mt-4 text-[26px] text-navy">
                A more connected, more confident aesthetic industry.
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                We see a future where every aesthetic practitioner has the
                peers, mentors, and tools they need to grow a practice they love
                — without sacrificing clinical excellence or personal wellbeing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="dark-canvas on-dark h-full rounded-[3px] p-9">
              <span className="kicker">Why We Exist</span>
              <h3 className="display mt-4 text-[26px] text-white">
                Because the old way of doing business is broken.
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-white/75">
                For too long, aesthetic medicine has felt isolating and
                competitive. BOA exists to replace that with a candid, modern
                community where success is a team sport.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="border-y border-line bg-sand py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">What We Stand For</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Our <em>values</em>
              </h2>
              <p className="mt-4 text-[16px] text-muted">
                Three principles that guide everything we build for the BOA
                community.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.no} delay={i * 90} className="h-full">
                <div className="card-frame h-full p-8">
                  <span className="index-no text-[16px]">{v.no}</span>
                  <h3 className="display mt-4 text-[22px] text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {v.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* founders */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">Meet The Founders</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                The people <em>behind BOA</em>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 space-y-20">
            <Reveal>
              <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="offset-frame tone-img relative aspect-[4/5] max-w-[380px] overflow-hidden rounded-[3px]">
                  <Image
                    src="/assets/jeffrey-richmond.jpg"
                    alt="Jeffrey Richmond"
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="display text-[clamp(26px,3vw,38px)] text-navy">
                    Jeffrey Richmond
                  </h3>
                  <div className="mt-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-teal-deep">
                    Co-Founder · Industry Expert
                  </div>
                  <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
                    An award-winning expert in the aesthetic industry, Jeffrey
                    specializes in cutting-edge research, light- and laser-based
                    dermatological therapies, and radiofrequency technologies
                    for cosmetic surgery practices.
                  </p>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                    Over the past 19 years, he has brought best-in-class
                    technologies from West Coast Laser to physicians throughout
                    the northwestern United States, generating over $50 million
                    in sales.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="lg:order-1">
                  <h3 className="display text-[clamp(26px,3vw,38px)] text-navy">
                    Naren Arulrajah
                  </h3>
                  <div className="mt-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-teal-deep">
                    Co-Founder · Founder &amp; CEO of Ekwa Marketing
                  </div>
                  <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
                    A self-described &ldquo;serial entrepreneur,&rdquo; Naren
                    finds his purpose in serving others — helping medical
                    practice owners, doctors and spa owners in dermatology,
                    plastic surgery and aesthetics find success and personal
                    fulfillment.
                  </p>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                    As founder and CEO of Ekwa Marketing, he leads a global team
                    of digital marketing experts supporting roughly 200
                    practices worldwide — from start-ups to growing businesses
                    going through mergers and acquisitions.
                  </p>
                </div>
                <div className="offset-frame tone-img relative ml-auto aspect-[4/5] max-w-[380px] overflow-hidden rounded-[3px] lg:order-2">
                  <Image
                    src="/assets/naren-arulrajah.jpg"
                    alt="Naren Arulrajah"
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="border-y border-line bg-paper py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">The BOA Team</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                The people who <em>make it happen</em>
              </h2>
              <p className="mt-4 text-[16px] text-muted">
                A small, passionate team backed by Ekwa Marketing&apos;s global
                community of experts.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 80} className="h-full">
                <div className="card-frame h-full p-7 text-center">
                  <div className="dark-canvas mx-auto grid h-24 w-24 place-items-center rounded-full">
                    <span className="display text-[26px] italic text-teal">
                      {t.initials}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[17px] font-extrabold text-navy">
                    {t.name}
                  </h3>
                  <div className="mt-1 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-teal-deep">
                    {t.role}
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">
                    {t.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">Our Story</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Milestones <em>along the way</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-14">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 60}>
                <div className="group grid grid-cols-[90px_1fr] gap-6 border-b border-line py-7 transition-colors hover:bg-paper sm:grid-cols-[140px_1fr] sm:gap-10">
                  <div className="display text-[clamp(24px,3vw,36px)] italic text-teal-deep">
                    {t.year}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-extrabold text-navy">
                      {t.title}
                    </h3>
                    <p className="mt-1.5 max-w-[560px] text-[14.5px] leading-relaxed text-muted">
                      {t.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* join */}
      <section className="border-t border-line bg-sand py-20 text-center">
        <div className="mx-auto max-w-[640px] px-5">
          <Reveal>
            <h2 className="display text-[clamp(28px,3.6vw,42px)] text-navy">
              Join the BOA <em>community</em>
            </h2>
            <p className="mt-4 text-[16px] text-muted">
              Connect with thousands of aesthetic practitioners who are growing
              their practices the right way.
            </p>
            <Link href="/contact" className="btn btn-navy mt-8">
              Get in Touch <span className="arr">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
