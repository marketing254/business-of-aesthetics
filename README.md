# Business of Aesthetics — Next.js Website

A full rebuild of the BOA static site on **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, with a new "editorial atelier" UI and a live Google Sheets speaker database.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Deploy to a Node host (Vercel, Netlify, etc.). Do **not** use static export —
> the speakers/events pages are server-rendered per request to stay in sync
> with the Google Sheet.

## Pushing to GitHub & showing the team

The repo is push-ready (secrets live only in the gitignored `.env.local`;
CI is set up in `.github/workflows/ci.yml`). To publish:

```bash
git add -A
git commit -m "BOA site: Next.js rebuild with live Sheet data and dual themes"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### Hosting on GitHub Pages

`.github/workflows/pages.yml` builds a static export and deploys it to
GitHub Pages on every push (plus every 6 hours so sheet edits get picked up).
After pushing, do two things once in the repo settings:

1. Settings -> Pages -> Source: **GitHub Actions**
2. Settings -> Secrets and variables -> Actions -> add secret
   `BOA_SHEET_ID` (the long ID from the spreadsheet URL)

The site then lives at `https://<username>.github.io/<repo-name>/`.
Note: on Pages the sheet data is baked in at build time — edits appear on
the next rebuild (push/schedule/manual run), not instantly. For instant
updates, import the repo on Vercel (free) with the same `BOA_SHEET_ID` env.

## Configuration (.env.local)

Copy `.env.example` to `.env.local` and fill in:

- `BOA_SHEET_ID` — the ID of the Google Sheet that powers the site content
  (the long string in the spreadsheet's URL). Server-only; it is never
  exposed to the browser. Without it, sheet-driven sections render empty.
- `NEXT_PUBLIC_YCBM_URL` — the YouCanBook.me booking page URL for `/msm`
  (optional; a styled placeholder shows until it's set).

`.env.local` is gitignored — set the same variables in your host's
environment settings (e.g. Vercel project env vars) when deploying.

## Google Sheets integration (live content database)

- Source of truth: the shared spreadsheet (tabs for podcasts, events, event
  replays, event panels, panel replays, and speakers — tab gids are mapped in
  `src/lib/sheet.ts`).
- `src/lib/sheet.ts` reads each tab's public CSV export with
  `cache: "no-store"`, so **every page load re-reads the sheet** — edits appear
  on the site immediately on refresh.
- Open tabs also refresh themselves: the speaker directory polls
  `/api/speakers` every 45 seconds.
- Image cells accept plain Google Drive share links (`.../file/d/<id>/view`).
  They are converted to direct image URLs automatically. The images (and the
  sheet) must be shared as "Anyone with the link can view."
- Adding content = adding a row in the sheet. Nothing to deploy.

## YouCanBook.me scheduler (/msm page)

The booking page shows a styled placeholder until `NEXT_PUBLIC_YCBM_URL` is
set — then the iframe embed renders automatically
(see `src/components/BookingEmbed.tsx`).

## Structure

- `src/app/*` — one folder per page (all 14 pages of the old site)
- `src/components/*` — navbar (mega menu + mobile overlay), footer, CTA band,
  reveal/counter animations, episode & panel explorers, forms, live speakers
- `src/lib/data.ts` — all static content carried over verbatim from the old site
- `src/lib/sheet.ts` — Google Sheets fetching/parsing
- `public/assets` — images copied from the old site; `public/assets/panels/`
  holds the panel posters extracted from the old `panels.html` (they were
  embedded as base64 there)

## Notes carried over from the old site

- Contact/speaker/newsletter forms are front-end only (same as the old site) —
  wire them to a backend or form service when ready.
- Event replay links point to businessofaesthetics.org; podcast platform links
  are generic homepages, same as before.
