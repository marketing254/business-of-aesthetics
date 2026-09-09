import type { Metadata } from "next";
import Link from "next/link";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import SpeakerForm from "@/components/SpeakerForm";
import LiveSpeakers from "@/components/LiveSpeakers";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import { fetchSpeakers } from "@/lib/sheet";

export const metadata: Metadata = {
  title: "Become a Guest Speaker",
  description:
    "Share your expertise with 3,700+ aesthetic practitioners. Apply to be a guest on the Business of Aesthetics Podcast or Expert Panels.",
};

const proof = [
  { n: 3700, s: "+", label: "Monthly Listeners" },
  { n: 284, s: "+", label: "Published Episodes" },
  { n: 15, s: "K+", label: "Social Media Followers" },
  { n: 50, s: "+", label: "Expert Panels Hosted" },
];

const benefits = [
  {
    no: "01",
    title: "3,700+ Engaged Listeners",
    copy: "Reach aesthetic practitioners across North America who are actively looking to learn, grow, and implement new ideas in their practices.",
  },
  {
    no: "02",
    title: "Build Your Authority",
    copy: "Position yourself as a recognized thought leader in the aesthetic medicine space. Our platform amplifies your expertise to the people who matter most.",
  },
  {
    no: "03",
    title: "Access Our Network",
    copy: "Tap into a community of 200+ aesthetic practices including dermatologists, plastic surgeons, and med spa owners who are leaders in their markets.",
  },
  {
    no: "04",
    title: "Multi-Platform Distribution",
    copy: "Your episode goes live on Spotify, Apple Podcasts, YouTube, and across 15,000+ social media followers. Plus, it lives on as evergreen content for years.",
  },
];

const topics = [
  "Practice Growth & Scaling",
  "Marketing & Patient Acquisition",
  "AI & Technology in Aesthetics",
  "Team Building & Culture",
  "Revenue & Financial Strategy",
  "Patient Experience & Retention",
  "Clinical Innovation & Trends",
  "Operations & Workflow",
  "Compliance & Risk Management",
  "Personal Branding & Reputation",
  "Mindset & Leadership",
  "Med Spa vs. Clinical Practice",
];

const idealGuests = [
  {
    no: "01",
    title: "Practice Owners & Physicians",
    copy: "Dermatologists, plastic surgeons, or med spa owners with compelling growth stories, honest lessons learned, or innovative approaches to running their practice.",
  },
  {
    no: "02",
    title: "Marketing & Growth Experts",
    copy: "Professionals with tactical, proven knowledge about patient acquisition, SEO, social media, reputation management, or digital strategy for aesthetic practices.",
  },
  {
    no: "03",
    title: "Aesthetic Tech Founders & Innovators",
    copy: "Founders of aesthetic technology companies, device innovators, or software builders creating tools that help practices run smarter and treat patients better.",
  },
  {
    no: "04",
    title: "Coaches, Consultants & Educators",
    copy: "Business coaches, practice management consultants, or clinical educators who serve the aesthetic medicine community and have a proven track record of results.",
  },
];

export default async function SpeakersPage() {
  const sheetSpeakers = await fetchSpeakers();

  return (
    <>
      <PageHero
        kicker="Become A Guest Speaker"
        title={
          <>
            Share your expertise. Reach <em>3,700+ practitioners.</em>
          </>
        }
        lede="The Business of Aesthetics Podcast is the leading voice for aesthetic medicine professionals. We're looking for passionate leaders with real stories, bold ideas, and actionable insights to share."
      >
        <a href="#apply" className="btn btn-navy">
          Apply Now <span className="arr">→</span>
        </a>
        <Link href="/podcast" className="btn btn-outline">
          Listen First
        </Link>
      </PageHero>

      {/* proof bar */}
      <section className="dark-canvas on-dark py-12">
        <Stagger className="mx-auto grid max-w-[980px] grid-cols-2 gap-y-8 px-5 text-center lg:grid-cols-4">
          {proof.map((s) => (
            <StaggerItem key={s.label}>
              <div className="display text-[clamp(28px,3.2vw,38px)] leading-none text-white">
                <Counter target={s.n} suffix={s.s} />
              </div>
              <div className="mt-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* LIVE speaker directory from the Google Sheet */}
      <section className="border-b border-line bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Speaker Directory · Live"
            title={
              <>
                Meet our <em>featured speakers</em>
              </>
            }
            lede="The experts joining BOA events and panels. This directory updates automatically the moment our team confirms a new speaker."
          />
          <div className="mt-12">
            <LiveSpeakers initial={sheetSpeakers} />
          </div>
        </div>
      </section>

      {/* benefits */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Why Apply"
            title={
              <>
                Why aesthetic leaders <em>love being on the show</em>
              </>
            }
          />
          <Stagger className="mx-auto mt-12 grid max-w-[980px] gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {benefits.map((b) => (
              <StaggerItem key={b.no} className="h-full">
                <div className="h-full bg-paper p-9">
                  <span className="display text-[28px] text-teal-deep/30">
                    {b.no}
                  </span>
                  <h3 className="display mt-4 text-[20px] text-navy">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {b.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* topics */}
      <section className="border-y border-line bg-sand py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="What We Cover"
            title={
              <>
                Episode topics we&apos;re <em>looking for</em>
              </>
            }
            lede="We cover the full spectrum of running and growing an aesthetic medicine practice."
          />
          <Stagger className="mx-auto mt-10 flex max-w-[880px] flex-wrap justify-center gap-3">
            {topics.map((t) => (
              <StaggerItem key={t}>
                <span className="chip !py-3 !text-[11px] transition-all hover:border-teal hover:text-teal-deep">
                  {t}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ideal guests */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="Who Should Apply"
            title={
              <>
                We&apos;re looking for <em>these types of guests</em>
              </>
            }
            lede="If you fit one of these profiles, we'd love to hear from you."
          />
          <Stagger className="mx-auto mt-12 grid max-w-[980px] gap-6 sm:grid-cols-2">
            {idealGuests.map((g) => (
              <StaggerItem key={g.no} className="h-full">
                <div className="card-frame h-full p-8">
                  <span className="index-no text-[16px]">{g.no}</span>
                  <h3 className="display mt-3 text-[20px] text-navy">
                    {g.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {g.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* application form */}
      <section
        id="apply"
        className="dark-canvas on-dark scroll-mt-24 py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[880px] px-5">
          <SectionHead
            dark
            kicker="Applications Open"
            title={
              <>
                Apply to be a <em>Guest Speaker</em>
              </>
            }
            lede="Fill out the form below and our team will review your application within 3 business days."
          />
          <FadeUp delay={0.1}>
            <div className="mt-12">
              <SpeakerForm />
            </div>
          </FadeUp>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready to Share Your Story?"
        copy="Apply to be a guest speaker and share your expertise with the most engaged community of aesthetic practitioners in North America."
        primary={{ href: "/speakers#apply", label: "Apply Now" }}
        secondary={{ href: "/podcast", label: "Listen to the Podcast" }}
      />
    </>
  );
}
