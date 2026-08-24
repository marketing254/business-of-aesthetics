/**
 * YouCanBook.me scheduler embed.
 *
 * When the booking page URL is ready, set NEXT_PUBLIC_YCBM_URL in .env.local
 * (e.g. NEXT_PUBLIC_YCBM_URL=https://your-page.youcanbook.me) — or replace the
 * fallback below. The iframe renders automatically once a URL is provided.
 */

const YCBM_URL = process.env.NEXT_PUBLIC_YCBM_URL ?? "";

export default function BookingEmbed() {
  if (YCBM_URL) {
    return (
      <div className="card-frame overflow-hidden">
        <iframe
          src={`${YCBM_URL}?noframe=true&skipHeaderFooter=true`}
          title="Book your free Strategy Meeting"
          className="h-[820px] w-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="card-frame relative overflow-hidden p-10 text-center sm:p-14">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal to-teal-deep"
      />
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-soft text-teal-deep">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      </div>
      <h3 className="display mt-6 text-[26px] text-navy">
        Live scheduler coming right up
      </h3>
      <p className="mx-auto mt-3 max-w-[440px] text-[14.5px] leading-relaxed text-muted">
        Our online booking calendar is being connected. In the meantime, reach
        out directly and we&apos;ll find a time that works for you — usually
        within one business day.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a href="mailto:ideas@businessofaesthetics.org" className="btn btn-navy">
          Email Us to Book <span className="arr">→</span>
        </a>
        <a href="tel:+18554664580" className="btn btn-outline">
          Call (855) 466-4580
        </a>
      </div>
      <p className="mt-6 text-[12px] text-muted">
        By booking, you agree to be contacted about your appointment. We never
        share your info.
      </p>
    </div>
  );
}
