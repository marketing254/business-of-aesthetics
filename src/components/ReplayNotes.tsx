/**
 * Structured replay notes - renders the parsed BOA description doc as a
 * proper meta grid (date, time, category, format...) followed by formatted
 * prose sections, instead of a wall of undifferentiated lines.
 */

import type { StructuredNotes } from "@/lib/sheet";

export default function ReplayNotes({ notes }: { notes: StructuredNotes }) {
  const hasContent =
    notes.meta.length > 0 ||
    notes.sections.some((s) => s.heading || s.paragraphs.length);

  if (!hasContent) {
    return (
      <p className="text-center text-[15px] text-muted">
        Notes for this session are being prepared - the replay above covers
        the full conversation.
      </p>
    );
  }

  return (
    <div>
      {/* meta grid */}
      {notes.meta.length > 0 && (
        <dl className="mx-auto mb-10 grid max-w-[640px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {notes.meta.slice(0, 4).map((m) => (
            <div key={m.label} className="bg-paper px-4 py-4 text-center">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-deep">
                {m.label}
              </dt>
              <dd className="mt-1.5 text-[13px] font-semibold leading-snug text-navy">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* prose sections */}
      <div className="space-y-8">
        {notes.sections.map((s, i) => (
          <div key={s.heading ?? i}>
            {s.heading && (
              <h3 className="display mb-3 text-[19px] text-navy">
                {s.heading}
              </h3>
            )}
            <div className="space-y-4 text-[15px] leading-[1.85] text-muted">
              {s.paragraphs.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
