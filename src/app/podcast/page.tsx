import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import EpisodeExplorer from "@/components/EpisodeExplorer";
import { hosts, platforms } from "@/lib/data";
import { fetchPodcasts } from "@/lib/sheet";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Podcast - Business Lessons for Aesthetic Practices",
  description:
    "The Business of Aesthetics podcast archive, powered by the live BOA database.",
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
        <div className="ghost-word right-[-3%] top-[52%] text-[clamp(120px,16vw,250px)]">
          fieldnotes
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-end gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-24">
          <Reveal>
            <span className="kicker">The Business of Aesthetics Podcast</span>
            <h1 className="display mt-6 text-[clamp(38px,5.2vw,72px)] text-white">
              A living archive of <em>practice decisions</em>.
            </h1>
            <p className="mt-6 max-w-[590px] text-[17px] leading-relaxed text-white/75">
              Every episode is pulled from the BOA database: title, guest,
              audio, transcript, category, and original episode link. No stale
              cards, no dummy media.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#episodes" className="btn btn-teal">
                Explore Episodes <span className="arr">-&gt;</span>
              </a>
              <Link href="/speakers" className="btn btn-ghost-light">
                Apply to be a Guest
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {latest ? (
              <article className="signal-panel relative border border-white/12 bg-white/[0.04] p-6 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-teal">
                      <span className="live-dot" /> Latest from the Sheet
                    </div>
                    <div className="mt-2 text-[12px] font-bold text-white/55">
                      Episode {latest.episode} - {latest.datePublished}
                    </div>
                  </div>
                  <span className="chip teal">{latest.category}</span>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-[128px_1fr]">
                  <div className="relative aspect-square overflow-hidden border border-white/15 bg-navy-ink">
                    {latest.posterImage || latest.guestPhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={latest.posterImage || latest.guestPhotoUrl}
                        alt={latest.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <span className="display text-[38px] italic text-teal">
                          {latest.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="display text-[clamp(22px,2.5vw,32px)] leading-tight text-white">
                      {latest.title}
                    </h2>
                    <div className="mt-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-white/60">
                      {latest.guestName}
                    </div>
                  </div>
                </div>

                {latest.audioSource && (
                  <audio
                    controls
                    src={latest.audioSource}
                    className="mt-6 w-full"
                  />
                )}

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href={`/podcast/${latest.slug}`} className="linkline !text-teal">
                    Episode page <span className="arr">-&gt;</span>
                  </Link>
                  {latest.transcriptUrl && (
                    <a
                      href={latest.transcriptUrl}
                      target="_blank"
                      rel="noopener"
                      className="linkline !text-teal"
                    >
                      Transcript <span className="arr">-&gt;</span>
                    </a>
                  )}
                </div>
              </article>
            ) : (
              <div className="signal-panel border border-white/12 bg-white/[0.04] p-8 text-white/70">
                Podcast data is syncing from Google Sheets.
              </div>
            )}
          </Reveal>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-8 px-5 py-10 lg:grid-cols-4">
            {[
              { value: podcasts.length || "294", label: "Database Episodes" },
              { value: categories.length || "Live", label: "Topic Tracks" },
              { value: "Weekly", label: "Release Cadence" },
              { value: "Audio + Notes", label: "Detail Pages" },
            ].map((s) => (
              <div key={s.label} className="stat-rule">
                <div className="display text-[34px] text-white">{s.value}</div>
                <div className="mt-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-teal">
                  {s.label}
                </div>
              </div>
            ))}
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
              Platform links stay lightweight; each internal episode page holds
              the actual audio and transcript from the Sheet.
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
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.62fr_1fr]">
              <div>
                <span className="kicker">The Archive</span>
                <h2 className="display mt-4 text-[clamp(30px,4vw,52px)] text-navy">
                  Search the <em>whole catalog</em>.
                </h2>
              </div>
              <p className="max-w-[680px] text-[15.5px] leading-relaxed text-muted lg:pt-9">
                Filter by category, search by episode number or guest, then
                open an individual page with audio, transcript, notes, and the
                original BOA link.
              </p>
            </div>
          </Reveal>
          <div className="mt-10">
            <EpisodeExplorer episodes={podcasts} />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="mx-auto max-w-[680px] text-center">
              <span className="kicker center justify-center">
                What Listeners Say
              </span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Trusted by the <em>aesthetics community</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 90} className="h-full">
                <figure className="card-frame flex h-full flex-col p-8">
                  <blockquote className="mt-1 flex-1 text-[14.5px] italic leading-relaxed text-ink/85">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4 text-[13.5px] font-extrabold text-navy">
                    {r.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="hosts" className="py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-5">
          <Reveal>
            <div className="max-w-[640px]">
              <span className="kicker">The Voices</span>
              <h2 className="display mt-5 text-[clamp(30px,4vw,48px)] text-navy">
                Hosted by <em>industry leaders</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
            {hosts.map((h, i) => (
              <Reveal key={h.name} delay={i * 70} className="h-full">
                <div className="card-frame h-full p-6 text-center">
                  {h.image ? (
                    <div className="tone-img relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-line">
                      <Image
                        src={h.image}
                        alt={h.name}
                        fill
                        sizes="96px"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="dark-canvas mx-auto grid h-24 w-24 place-items-center rounded-full">
                      <span className="display text-[24px] italic text-teal">
                        {h.name
                          .split(" ")
                          .filter((w) => !w.includes("."))
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    </div>
                  )}
                  <h3 className="mt-4 text-[15.5px] font-extrabold text-navy">
                    {h.name}
                  </h3>
                  <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-teal-deep">
                    {h.role}
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">
                    {h.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
