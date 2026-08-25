import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import EpisodeExplorer from "@/components/EpisodeExplorer";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Animate";
import WordReveal from "@/components/motion/WordReveal";
import Aurora from "@/components/motion/Aurora";
import { hosts, platforms } from "@/lib/data";
import { fetchPodcasts } from "@/lib/sheet";

export const metadata: Metadata = {
  title: "Podcast - Business Lessons for Aesthetic Practices",
  description:
    "Weekly conversations with the leading minds in dermatology, plastic surgery and aesthetics — the complete Business of Aesthetics podcast archive.",
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
  const categories = Array.from(new Set(podcasts.map((episode) => episode.category)));

  return (
    <>
      <section className="dark-canvas on-dark relative overflow-hidden">
        <Aurora intensity={0.45} />
        <div className="ghost-word right-[-3%] top-[52%] text-[clamp(120px,16vw,250px)]">
          fieldnotes
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-16 lg:pb-20 lg:pt-24">
          <FadeUp>
            <span className="kicker">The Business of Aesthetics Podcast</span>
            <WordReveal
              text="A living archive of *practice decisions*."
              className="display mt-6 max-w-[820px] text-[clamp(32px,4.3vw,52px)] text-white"
            />
            <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-white/75">
              Weekly conversations with the operators, surgeons, and growth
              experts shaping aesthetic medicine — every episode with full
              audio, notes, and transcript.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a href="#episodes" className="btn btn-teal">
                Explore Episodes <span className="arr">-&gt;</span>
              </a>
              <Link href="/speakers" className="linkline !text-teal">
                Apply to be a Guest <span className="arr">-&gt;</span>
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            {latest ? (
              <div className="mt-14 max-w-[620px] border border-white/12 bg-white/[0.03] p-6 sm:p-7">
                <div className="flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-teal">
                  <span className="live-dot" /> Latest Episode
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/15 bg-navy-ink">
                    {latest.guestPhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={latest.guestPhotoUrl}
                        alt={latest.guestName}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center">
                        <span className="display text-[16px] text-teal">
                          {latest.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11.5px] font-bold text-white/55">
                      Episode {latest.episode} · {latest.datePublished}
                    </div>
                    <h2 className="display mt-1 text-[19px] leading-snug text-white">
                      {latest.title}
                    </h2>
                  </div>
                </div>

                {latest.audioSource && (
                  <audio
                    controls
                    src={latest.audioSource}
                    className="mt-5 w-full"
                  />
                )}

                <Link
                  href={`/podcast/${latest.slug}`}
                  className="linkline !text-teal mt-5 inline-flex"
                >
                  Episode page <span className="arr">-&gt;</span>
                </Link>
              </div>
            ) : (
              <div className="mt-14 max-w-[620px] border border-white/12 bg-white/[0.03] p-8 text-white/70">
                Podcast data is syncing from Google Sheets.
              </div>
            )}
          </FadeUp>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-8 gap-y-2 px-5 py-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            <span>
              <span className="text-teal">{podcasts.length || "294"}</span>{" "}
              Episodes &amp; Counting
            </span>
            <span className="text-white/25">·</span>
            <span>
              <span className="text-teal">{categories.length || "12+"}</span>{" "}
              Topic Tracks
            </span>
            <span className="text-white/25">·</span>
            <span>
              New <span className="text-teal">Weekly</span>
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper py-12">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 px-5">
          <div>
            <h3 className="display text-[22px] text-navy">
              Follow the show
            </h3>
            <p className="mt-1 text-[13.5px] text-muted">
              Every episode page here also carries the full audio, notes, and
              transcript.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener"
                className="chip !py-3 !text-[11px] transition-all hover:border-teal hover:text-teal-deep"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="episodes" className="scroll-mt-24 py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1fr]">
              <div>
                <span className="kicker">The Archive</span>
                <h2 className="display mt-4 text-[clamp(26px,3.3vw,40px)] text-navy">
                  Search the <em>whole catalog</em>.
                </h2>
              </div>
              <p className="max-w-[680px] text-[15.5px] leading-relaxed text-muted lg:pt-9">
                Filter by category, search by episode number or guest, then
                open an individual page with audio, transcript, notes, and the
                original BOA link.
              </p>
            </div>
          </FadeUp>
          <div className="mt-10">
            <EpisodeExplorer episodes={podcasts} />
          </div>
        </div>
      </section>

      <section className="border-y border-line py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="mx-auto max-w-[680px] text-center">
              <span className="kicker center justify-center">
                What Listeners Say
              </span>
              <h2 className="display mt-5 text-[clamp(26px,3.3vw,36px)] text-navy">
                Trusted by the <em>aesthetics community</em>
              </h2>
            </div>
          </FadeUp>
          <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {reviews.map((r, i) => (
              <StaggerItem
                key={r.name}
                className={`h-full ${i > 0 ? "md:border-l md:border-line md:pl-10" : ""}`}
              >
                <figure className="flex h-full flex-col">
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

      <section id="hosts" className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <FadeUp>
            <div className="max-w-[640px]">
              <span className="kicker">The Voices</span>
              <h2 className="display mt-5 text-[clamp(26px,3.3vw,36px)] text-navy">
                Hosted by <em>industry leaders</em>
              </h2>
            </div>
          </FadeUp>
          <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {hosts.map((h) => (
              <StaggerItem key={h.name} className="h-full">
                <div className="h-full border-t border-line pt-6 text-center">
                  {h.image ? (
                    <div className="tone-img relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-line">
                      <Image
                        src={h.image}
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

      <CtaBand
        eyebrow="Your Move"
        title={
          <>
            Listen, learn, then <em>put it to work.</em>
          </>
        }
        copy="Use the archive for the ideas. Book a strategy meeting when you want a plan for your own practice."
        primary={{ href: "/msm", label: "Book a Free Strategy Meeting" }}
        secondary={{ href: "#episodes", label: "Browse Episodes" }}
      />
    </>
  );
}
