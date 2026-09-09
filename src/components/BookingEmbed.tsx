/**
 * YouCanBook.me scheduler embed.
 *
 * The YCBM widget always renders on white, so the frame is pinned to a white
 * panel in both themes - no dark void around the calendar. NEXT_PUBLIC_YCBM_URL
 * overrides the default booking page.
 */

const YCBM_URL =
  process.env.NEXT_PUBLIC_YCBM_URL ||
  "https://ekwasales-withoutceo-boa.youcanbook.me";

export default function BookingEmbed() {
  return (
    <div
      className="card-frame mx-auto max-w-[840px] overflow-hidden p-2 sm:p-3"
      style={{ background: "#ffffff", borderColor: "#e4ebe9" }}
    >
      <iframe
        src={`${YCBM_URL}?noframe=true&skipHeaderFooter=true`}
        title="Book your free Strategy Meeting"
        className="h-[760px] w-full rounded-xl border-0"
        style={{ background: "#ffffff" }}
        loading="lazy"
      />
    </div>
  );
}
