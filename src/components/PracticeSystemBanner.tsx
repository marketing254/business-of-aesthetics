/**
 * BOA Practice System banner (waiting list only), shown at the top of the
 * homepage above the hero. Markup and copy follow the banner supplied by
 * product marketing (Nov 2026, "New BOA website banner for waiting list");
 * it uses the site's brand fonts, 1320px container and standard button
 * styles. Styles live in globals.css under `.boa-bn`.
 *
 * To remove: delete the <PracticeSystemBanner /> line in src/app/page.tsx.
 */

const transforms = [
  ["Every decision waits for you", "Clear roles your team can follow"],
  ["Guessing why a month was quiet", "A plan built from your own numbers"],
  ["Numbers nobody watches", "Every number has someone responsible for it"],
  ["Firefighting every week", "One clear thing to fix next, every month"],
];

const areas = [
  ["01", "New clients", "Calls, reviews and referrals"],
  ["02", "Consultations", "Visits that end in a decision"],
  ["03", "Pricing and profit", "What each treatment earns"],
  ["04", "Providers and team", "Pay, growth and retention"],
  ["05", "Repeat visits", "Memberships and rebooking"],
  ["06", "Running the practice", "Runs without you in it"],
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function PracticeSystemBanner() {
  return (
    <section className="boa-bn" aria-label="BOA Practice System">
      <div className="boa-bn__in">
        <div className="boa-bn__l">
          <p className="boa-bn__eye">Opening Thursday, November 12</p>
          <h2 className="boa-bn__h">The BOA Practice System</h2>
          <p className="boa-bn__sub">Run your practice on a system, not on you.</p>
          <ul className="boa-bn__tf">
            {transforms.map(([from, to]) => (
              <li key={from}>
                <span className="f">{from}</span>
                <Arrow />
                <span className="t">{to}</span>
              </li>
            ))}
          </ul>
          <div className="boa-bn__row">
            <a className="btn btn-teal" href="/coaching">
              Learn More <span className="arr">→</span>
            </a>
          </div>
        </div>

        <div className="boa-bn__sys">
          <p className="boa-bn__eye">Built on 18 systems</p>
          <h3 className="boa-bn__st">Six areas of your practice, one system</h3>
          <div className="boa-bn__grid">
            {areas.map(([n, title, copy]) => (
              <div className="boa-bn__ar" key={n}>
                <small>{n}</small>
                <b>{title}</b>
                <span>{copy}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
