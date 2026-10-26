import { asset } from "@/lib/asset";

/**
 * Fixed promo banner for the BOA Practice System + launch webinar, shown at
 * the top of the homepage above the hero (supplied by product marketing,
 * Oct 2026). Markup and palette follow the supplied banner; it uses the
 * site's own serif/sans fonts instead of loading two extra Google Font
 * families, and Naren's photo is the existing site asset instead of a
 * base64 blob. Styles live in globals.css under `.boa-bn`.
 *
 * To remove the banner later: delete the <PracticeSystemBanner /> line in
 * src/app/page.tsx (and optionally the .boa-bn block in globals.css).
 */
export default function PracticeSystemBanner() {
  return (
    <section className="boa-bn" aria-label="BOA Practice System">
      <div className="boa-bn__in">
        <div>
          <p className="boa-bn__eye">Opening Thursday, November 12</p>
          <h2 className="boa-bn__h">The BOA Practice System</h2>
          <p className="boa-bn__sub">Run your practice on a system, not on you.</p>
          <div className="boa-bn__row">
            <a className="boa-bn__btn" href="/coaching#apply">
              Join the waiting list{" "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <div className="boa-bn__spots">
              <b>Only 10 founding spots</b>
              <span>Free strategy meeting before you decide</span>
            </div>
          </div>
        </div>
        <div className="boa-bn__card">
          <p className="boa-bn__eye">Free live webinar</p>
          <h3 className="boa-bn__t">
            Why Busy Practices Still Lose New Clients <span>(and How to Win Them Back)</span>
          </h3>
          <p className="boa-bn__when">
            Thursday, Nov 5<i>·</i>8:00 PM ET<i>·</i>45 min + Q&amp;A
          </p>
          <div className="boa-bn__foot">
            <div className="boa-bn__host">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/assets/naren-arulrajah.jpg")} alt="Naren Arulrajah" width={70} height={70} />
              <div>
                <small>Hosted by</small>
                <b>Naren Arulrajah</b>
                <span>Cohost, BOA podcast</span>
              </div>
            </div>
            <a className="boa-bn__wbtn" href="/coaching#webinar">
              Register free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
