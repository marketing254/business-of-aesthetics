/**
 * Renders a JSON-LD <script> block. Server component - the markup is in the
 * initial HTML, so Google, Bing and AI crawlers see it without executing JS.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/-->/g, "--\\u003e");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
