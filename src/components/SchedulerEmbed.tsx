/**
 * YouCanBook.me scheduler embed, styled to the site.
 * Reused wherever a booking calendar lives (marketing MSM scheduler now).
 * Pinned to a white panel in both themes - the YCBM widget is always white.
 */

export default function SchedulerEmbed({
  src,
  title,
  minHeight = 720,
}: {
  src: string;
  title: string;
  minHeight?: number;
}) {
  return (
    <div
      className="card-frame mx-auto max-w-[840px] overflow-hidden p-2 sm:p-3"
      style={{ background: "#ffffff", borderColor: "#e4ebe9" }}
    >
      <iframe
        src={src}
        title={title}
        allow="payment"
        className="w-full rounded-xl border-0"
        style={{ minHeight, background: "#ffffff" }}
      />
    </div>
  );
}
