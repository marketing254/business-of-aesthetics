import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import Link from "next/link";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import NewsletterBand from "@/components/NewsletterBand";
import ContinueListening from "@/components/ContinueListening";
import EpisodeAudio from "@/components/EpisodeAudio";
import EpisodeExplorer from "@/components/EpisodeExplorer";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import { hosts, platforms } from "@/lib/data";
import { fetchPodcasts } from "@/lib/sheet";

export const metadata: Metadata = {
  title: "Podcast - Business Lessons for Aesthetic Practices",
  description:
    "Weekly conversations with the leading minds in dermatology, plastic surgery and aesthetics - the complete Business of Aesthetics podcast archive.",
};

const reviews = [
  {
    quote:
      "I'm a fan of the podcast. I've seen a bunch of episodes already, and I learned something from each one. What you guys are doing is so important for the whole community.",
    name: "Dr. Daniel Kaufman",
  },
  {
    quote:
      "This has been the most honest source of info and opinions about the aesthetic industry. I appreciate everyone's candid responses and sharing.",
    name: "Dr. Christine Lee",
  },
  {
    quote:
      "A multi-specialty, multi-disciplinary platform. I get on it every morning, when I check my texts and emails, I hop on Business of Aesthetics.",
    name: "Dr. WM. Philip Werschler",
  },
];

export default async function PodcastPage() {
  const podcasts = await fetchPodcasts();
  const latest = podcasts[0];
  const categories = Array.from(
    new Set(podcasts.map((episode) => episode.category))
  );

  return (
    <>
      <PageHero
        kicker="The Business of Aesthetics Podcast"
        title={
          <>
            A living archive of <em>practice decisions.</em>
          </>
        }
        lede="Weekly conversations with the operators, surgeons, and growth experts shaping aesthetic medicine - every episode with full audio, notes, and transcript."
      >
        <a href="#episodes" className="btn btn-navy">
          Explore Episodes <span className="arr">→</span>
        </a>
        <Link href="/speakers" className="btn btn-outline">
          Apply to be a Guest
        </Link>
      </PageHero>

      {/* latest episode + continue listening */}
      <section className="border-b border-line bg-paper py-14 lg:py-16">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            <span>
              <span className="text-teal-deep">{podcasts.length}</span> Episodes
              &amp; Counting
            </span>
            <span className="text-line">·</span>
            <span>
              <span className="text-teal-deep">{categories.length}</span> Topic
              Tracks
            </span>
            <span className="text-line">·</span>
            <span>
              New <span className="text-teal-deep">Weekly</span>
            </span>
          </div>

          {latest && (
            <FadeUp delay={0.08}>
              <div className="card-frame mx-auto mt-10 max-w-[720px] p-6 !shadow-none sm:p-8">
                <div className="flex items-center justify-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal-deep">
                  <span className="live-dot" /> Latest Episode
                </div>
                <div className="mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line bg-sand">
                    {latest.guestPhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={latest.guestPhotoUrl}
                        alt={latest.guestName}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="dark-canvas grid h-full w-full place-items-center">
                        <span className="display text-[18px] text-teal">
                          {latest.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-muted">
                      Episode {latest.episode} · {latest.datePublished}
                    </div>
                    <h2 className="mt-1 text-[17px] font-semibold leading-snug text-navy">
                      {latest.title}
                    </h2>
                  </div>
                </div>
                {latest.audioSource && (
                  <div className="mt-5">
                    <EpisodeAudio
                      src={latest.audioSource}
                      slug={latest.slug}
                      title={latest.title}
                      href={`/podcast/${latest.slug}`}
                    />
                  </div>
                )}
                <div className="mt-5 text-center">
                  <Link
                    href={`/podcast/${latest.slug}`}
                    className="linkline"
                  >
                    Open the episode page <span className="arr">→</span>
                  </Link>
                </div>
              </div>
            </FadeUp>
          )}

          <ContinueListening />

          {/* platforms */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-line pt-8">
            <span className="mr-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted">
              Follow the show
            </span>
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener"
                className="chip !py-2.5 !text-[11px] transition-all hover:border-teal hover:text-teal-deep"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* archive */}
      <section id="episodes" className="scroll-mt-24 py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="The Archive"
            title={
              <>
                Search the <em>whole catalog.</em>
              </>
            }
            lede="Filter by category, search by episode number or guest, then open an individual page with audio, transcript, and notes."
          />
          <div className="mt-10">
            <EpisodeExplorer episodes={podcasts} />
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="border-y border-line bg-paper py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="What Listeners Say"
            title={
              <>
                Trusted by the <em>aesthetics community</em>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {reviews.map((r, i) => (
              <StaggerItem
                key={r.name}
                className={`h-full ${i > 0 ? "md:border-l md:border-line md:pl-10" : ""}`}
              >
                <figure className="flex h-full flex-col text-center md:text-left">
                  <blockquote className="flex-1 text-[14.5px] italic leading-relaxed text-ink/85">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4 text-[13.5px] font-semibold text-navy">
                    {r.name}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* hosts */}
      <section id="hosts" className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionHead
            kicker="The Voices"
            title={
              <>
                Hosted by <em>industry leaders</em>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {hosts.map((h) => (
              <StaggerItem key={h.name} className="h-full">
                <div className="h-full border-t border-line pt-6 text-center">
                  {h.image ? (
                    <div className="tone-img relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-line">
                      <Image
                        src={asset(h.image)}
                        alt={h.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="dark-canvas mx-auto grid h-20 w-20 place-items-center rounded-full">
                      <span className="display text-[20px] text-teal">
                        {h.name
                          .split(" ")
                          .filter((w) => !w.includes("."))
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    </div>
                  )}
                  <h3 className="mt-4 text-[15.5px] font-semibold text-navy">
                    {h.name}
                  </h3>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-deep">
                    {h.role}
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">
                    {h.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <NewsletterBand />

      <CtaBand
        eyebrow="Your Move"
        title={
          <>
            Listen, learn, then <em>put it to work.</em>
          </>
        }
        copy="Use the archive for the ideas. Book a strategy meeting when you want a plan for your own practice."
        primary={{ href: "/marketing#book", label: "Book a Free Strategy Meeting" }}
        secondary={{ href: "/podcast#episodes", label: "Browse Episodes" }}
      />
    </>
  );
}
