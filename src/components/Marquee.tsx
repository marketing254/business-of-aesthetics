import { marqueeTopics } from "@/lib/data";

export default function Marquee({
  items = marqueeTopics,
  dark = false,
}: {
  items?: string[];
  dark?: boolean;
}) {
  const row = (
    <span className="flex items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center whitespace-nowrap">
          <span
            className={`px-8 font-display italic text-[17px] font-medium tracking-wide ${
              dark ? "text-white/85" : "text-navy"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t}
          </span>
          <span className={dark ? "text-teal" : "text-teal-deep"} aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      aria-hidden
      className={`overflow-hidden border-y py-4 ${
        dark
          ? "border-white/10 bg-navy-ink"
          : "border-line bg-sand"
      }`}
    >
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
