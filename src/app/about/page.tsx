import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import Link from "next/link";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Business of Aesthetics - founded by Naren Arulrajah and Jeffrey Richmond to help aesthetic practitioners grow successful, fulfilling practices.",
};

const values = [
  {
    no: "01",
    title: "Honesty First",
    copy: "Real opinions, real lessons. No spin and no sugar-coating - just the kind of conversations that move practices forward.",
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
    copy: "Our community crosses 3,000 aesthetic practitioners - and keeps growing.",
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

const founders = [
  {
    name: "Jeffrey Richmond",
    role: "Co-Founder · Industry Expert",
    image: "/assets/jeffrey-richmond.jpg",
    paragraphs: [
      "An award-winning expert in the aesthetic industry, Jeffrey specializes in cutting-edge research, light- and laser-based dermatological therapies, and radiofrequency technologies for cosmetic surgery practices.",
      "Over the past 19 years, he has brought best-in-class technologies from West Coast Laser to physicians throughout the northwestern United States, generating over $50 million in sales.",
    ],
  },
  {
    name: "Naren Arulrajah",
    role: "Co-Founder · Founder & CEO of Ekwa Marketing",
    image: "/assets/naren-arulrajah.jpg",
    paragraphs: [
      'A self-described "serial entrepreneur," Naren finds his purpose in serving others - helping medical practice owners, doctors and spa owners in dermatology, plastic surgery and aesthetics find success and personal fulfillment.',
      "As founder and CEO of Ekwa Marketing, he leads a global team of digital marketing experts supporting roughly 200 practices worldwide - from start-ups to growing businesses going through mergers and acquisitions.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title={
          <>
            Built by practitioners, <em>for practitioners.</em>
          </>
        }
        lede="A modern community for leaders in Dermatology, Plastic Surgery and Aesthetics - built around honest conversations, real expertise, and shared success."
      >
        <Link href="/marketing#book" className="btn btn-navy">
          Book Strategy Meeting <span className="arr">→</span>
        </Link>
        <Link href="/podcast" className="btn btn-outline">
          Listen to the Podcast
        </Link>
      </PageHero>

      {/* quick numbers */}
      <section className="border-b border-line bg-paper py-12">
        <Stagger className="mx-auto grid max-w-[880px] grid-cols-2 gap-x-6 gap-y-8 px-5 text-center sm:grid-cols-4">
          {[
            { v: "2019", label: "Founded" },
            { v: "3,700+", label: "Practitioners" },
            { v: "200+", label: "Practices Served" },
            { v: "0", label: "Gatekeeping" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="display text-[clamp(26px,3vw,36px)] leading-none text-navy">
                {s.v}
              </div>
              <div className="mt-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* mission */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Our Mission"
            title={
              <>
                A platform where success is <em>shared, not hoarded.</em>
              </>
            }
            lede="The Business of Aesthetics was founded on a simple belief - that aesthetic medicine professionals deserve a candid, modern space to learn from each other. No politics. No gatekeeping. Just real conversations about what works."
          />
          <Stagger className="mx-auto mt-14 grid max-w-[980px] gap-6 md:grid-cols-2">
            <StaggerItem className="h-full">
              <div className="card-frame h-full p-9 text-center">
                <span className="kicker center justify-center">Our Vision</span>
                <h3 className="display mt-4 text-[23px] text-navy">
                  A more connected, more confident aesthetic industry.
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                  We see a future where every aesthetic practitioner has the
                  peers, mentors, and tools they need to grow a practice they
                  love - without sacrificing clinical excellence or personal
                  wellbeing.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full">
              <div className="dark-canvas on-dark h-full rounded-2xl p-9 text-center">
                <span className="kicker center justify-center">
                  Why We Exist
                </span>
                <h3 className="display mt-4 text-[23px] text-white">
                  Because the old way of doing business is broken.
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/75">
                  For too long, aesthetic medicine has felt isolating and
                  competitive. BOA exists to replace that with a candid, modern
                  community where success is a team sport.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* values */}
      <section className="border-y border-line bg-sand py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="What We Stand For"
            title={
              <>
                Our <em>values</em>
              </>
            }
            lede="Three principles that guide everything we build for the BOA community."
          />
          <Stagger className="mx-auto mt-12 grid max-w-[1020px] gap-6 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.no} className="h-full">
                <div className="card-frame h-full p-8 text-center">
                  <span className="index-no text-[16px]">{v.no}</span>
                  <h3 className="display mt-4 text-[20px] text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {v.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* founders */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Meet The Founders"
            title={
              <>
                The people <em>behind BOA</em>
              </>
            }
          />
          <div className="mx-auto mt-14 flex max-w-[860px] flex-col gap-14 sm:gap-16">
            {founders.map((f) => (
              <FadeUp key={f.name}>
                <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
                  <div className="w-[170px] shrink-0 sm:w-[180px]">
                    <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-sand shadow-lg">
                      <Image
                        src={asset(f.image)}
                        alt={f.name}
                        fill
                        sizes="180px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="max-w-[62ch]">
                    <h3 className="display text-[clamp(24px,2.8vw,32px)] text-navy">
                      {f.name}
                    </h3>
                    <div className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                      {f.role}
                    </div>
                    {f.paragraphs.map((p) => (
                      <p
                        key={p.slice(0, 24)}
                        className="mt-4 text-[15px] leading-relaxed text-muted first-of-type:mt-5"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* team */}
      <section className="border-y border-line bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="The BOA Team"
            title={
              <>
                The people who <em>make it happen</em>
              </>
            }
            lede="A small, passionate team backed by Ekwa Marketing's global community of experts."
          />
          <Stagger className="mx-auto mt-12 grid max-w-[980px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((t) => (
              <StaggerItem key={t.name} className="h-full">
                <div className="card-frame h-full p-7 text-center">
                  <div className="dark-canvas mx-auto grid h-24 w-24 place-items-center rounded-full">
                    <span className="display text-[26px] text-teal">
                      {t.initials}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[16.5px] font-semibold text-navy">
                    {t.name}
                  </h3>
                  <div className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                    {t.role}
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">
                    {t.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* timeline */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[860px] px-5">
          <SectionHead
            kicker="Our Story"
            title={
              <>
                Milestones <em>along the way</em>
              </>
            }
          />
          <div className="relative mt-14">
            <span
              aria-hidden
              className="absolute left-[70px] top-0 hidden h-full w-px bg-teal/30 sm:block sm:left-[86px]"
            />
            {timeline.map((t, i) => (
              <FadeUp key={t.year} delay={i * 0.04} distance={20}>
                <div className="relative grid grid-cols-[70px_1fr] gap-6 border-b border-line py-7 last:border-b-0 sm:grid-cols-[110px_1fr] sm:gap-10">
                  <div className="display text-[clamp(22px,2.6vw,30px)] text-teal-deep">
                    {t.year}
                  </div>
                  <div>
                    <h3 className="text-[16.5px] font-semibold text-navy">
                      {t.title}
                    </h3>
                    <p className="mt-1.5 max-w-[560px] text-[14px] leading-relaxed text-muted">
                      {t.copy}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* join */}
      <section className="border-t border-line bg-sand py-18 text-center lg:py-20">
        <div className="mx-auto max-w-[640px] px-5">
          <FadeUp>
            <h2 className="display text-[clamp(24px,3vw,32px)] text-navy">
              Join the BOA <em>community</em>
            </h2>
            <p className="lede mx-auto mt-4 max-w-[520px]">
              Connect with thousands of aesthetic practitioners who are growing
              their practices the right way.
            </p>
            <Link href="/contact" className="btn btn-navy mt-8">
              Get in Touch <span className="arr">→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
