import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import SpeakerForm from "@/components/SpeakerForm";
import LiveSpeakers from "@/components/LiveSpeakers";
import { fetchSpeakers } from "@/lib/sheet";

export const metadata: Metadata = {
  title: "Become a Guest Speaker",
  description:
    "Share your expertise with 3,700+ aesthetic practitioners. Apply to be a guest on the Business of Aesthetics Podcast or Expert Panels.",
};

/* Speaker directory reads the Google Sheet live on every request */
export const dynamic = "force-dynamic";

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
      {/* hero */}
      <section className="dark-canvas on-dark relative overflow-hidden">
        <div className="ghost-word right-[-3%] top-[52%] text-[clamp(110px,15vw,230px)]">
          speak
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-24">
          <Reveal>
            <span className="kicker">Become A Guest Speaker</span>
            <h1 className="display mt-6 text-[clamp(36px,4.8vw,62px)] text-white">
              Share your expertise. Reach <em>3,700+ practitioners.</em>
            </h1>
            <p className="mt-6 max-w-[560px] text-[16.5px] leading-relaxed text-white/75">
              The Business of Aesthetics Podcast is the leading voice for
              aesthetic medicine professionals. We&apos;re looking for
              passionate leaders with real stories, bold ideas, and actionable
              insights to share.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#apply" className="btn btn-teal">
                Apply Now — Open Spots Available <span className="arr">→</span>
              </a>
              <Link href="/podcast" className="btn btn-ghost-light">
                Listen First
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="offset-frame tone-img relative mx-auto aspect-[4/5] max-w-[420px] overflow-hidden rounded-[3px]">
              <Image
                src="/assets/naren-arulrajah.jpg"
                alt="Naren Arulrajah — Host, Business of Aesthetics Podcast"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top"
              />
              <span className="chip teal absolute bottom-5 left-5">
                Naren Arulrajah — Founder &amp; Host
              </span>
            </div>
          </Reveal>
        </div>

        {/* proof bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-8 px-5 py-10 lg:grid-cols-4">
            {proof.map((s) => (
              <div key={s.label} className="stat-rule">
                <div className="display text-[34px] text-white">
                  <Counter target={s.n} suffix={s.s} />
                </div>
                <div className="mt-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-teal">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE speaker directory from the Google Sheet */}
      <section className="border-b border-line bg-paper py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-[680px]">
                <span className="kicker">Speaker Directory · Live</span>
                <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                  Meet our <em>featured speakers</em>
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                  The experts joining BOA events and panels. This directory
                  updates automatically the moment our team confirms a new
                  speaker.
                </p>
              </div>
              <span className="chip">
                <span className="live-dot" /> Auto-updating
              </span>
            </div>
          </Reveal>
          <div className="mt-12">
            <LiveSpeakers initial={sheetSpeakers} />
          </div>
        </div>
      </section>

      {/* benefits */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[680px]">
              <span className="kicker">Why Apply</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Why aesthetic leaders <em>love being on the show</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.no} delay={(i % 2) * 80} className="h-full">
                <div className="h-full bg-paper p-9">
                  <span className="display text-[40px] italic text-teal-deep/30">
                    {b.no}
                  </span>
                  <h3 className="display mt-4 text-[22px] text-navy">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {b.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* topics */}
      <section className="border-y border-line bg-sand py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[680px]">
              <span className="kicker">What We Cover</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Episode topics we&apos;re <em>looking for</em>
              </h2>
              <p className="mt-4 text-[15.5px] text-muted">
                We cover the full spectrum of running and growing an aesthetic
                medicine practice.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {topics.map((t, i) => (
              <Reveal key={t} delay={(i % 6) * 40}>
                <span className="chip !py-3 !text-[11px] transition-all hover:border-teal hover:text-teal-deep">
                  {t}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ideal guests */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[680px]">
              <span className="kicker">Who Should Apply</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                We&apos;re looking for <em>these types of guests</em>
              </h2>
              <p className="mt-4 text-[15.5px] text-muted">
                If you fit one of these profiles, we&apos;d love to hear from
                you.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-7 sm:grid-cols-2">
            {idealGuests.map((g, i) => (
              <Reveal key={g.no} delay={(i % 2) * 80} className="h-full">
                <div className="card-frame h-full p-8">
                  <span className="index-no text-[16px]">{g.no}</span>
                  <h3 className="display mt-3 text-[22px] text-navy">
                    {g.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {g.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* application form */}
      <section
        id="apply"
        className="dark-canvas on-dark relative scroll-mt-24 overflow-hidden py-24 lg:py-28"
      >
        <div className="ghost-word bottom-[-3%] right-[-2%] text-[clamp(100px,13vw,200px)]">
          apply
        </div>
        <div className="relative mx-auto max-w-[880px] px-5">
          <Reveal>
            <div className="text-center">
              <h2 className="display text-[clamp(30px,4vw,48px)] text-white">
                Apply to be a <em>Guest Speaker</em>
              </h2>
              <p className="mx-auto mt-4 max-w-[520px] text-[15.5px] text-white/75">
                Fill out the form below and our team will review your
                application within 3 business days.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <SpeakerForm />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready to Share Your Story?"
        copy="Apply to be a guest speaker and share your expertise with the most engaged community of aesthetic practitioners in North America."
        primary={{ href: "#apply", label: "Apply Now" }}
        secondary={{ href: "/podcast", label: "Listen to the Podcast" }}
      />
    </>
  );
}
