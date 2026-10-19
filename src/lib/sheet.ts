/**
 * Live Google Sheets integration.
 *
 * The spreadsheet is the source of truth for podcasts, events, panel replays,
 * and speaker profiles. Each fetch uses the public CSV export with no cache so
 * content updates appear on refresh without a deploy.
 */

/**
 * The spreadsheet is shared publicly (that is how the CSV export is
 * readable), and everything in it is displayed on the site — so its ID
 * is not a secret. A BOA_SHEET_ID env var still overrides it, e.g. to
 * point a fork at a different sheet.
 */
const DEFAULT_SHEET_ID = "1RUbqWwqnIacOiUmuXpnV_hK88LEgMNORBIyb80tSRas";
const SHEET_ID = process.env.BOA_SHEET_ID || DEFAULT_SHEET_ID;

/** Static-export builds bake sheet data in at build time. */
const STATIC_BUILD = process.env.STATIC_EXPORT === "1";


export const SHEET_GIDS = {
  podcasts: "466360483",
  events: "1881150164",
  eventReplays: "1663508458",
  eventPanels: "159718304",
  panelReplays: "805556650",
  speakers: "603031698",
} as const;

type SheetRow = Record<string, string>;

export interface SheetPerson {
  name: string;
  imageUrl: string;
  initials: string;
}

export interface SheetPodcast {
  episode: number;
  datePublished: string;
  title: string;
  guestName: string;
  guestPhotoUrl: string;
  category: string;
  description: string;
  contactInfo: string;
  posterImage: string;
  audioSource: string;
  transcriptUrl: string;
  episodeUrl: string;
  slug: string;
  initials: string;
}

export interface SheetEvent {
  kind: "event" | "event-panel";
  slug: string;
  dateIso: string;
  dateLabel: string;
  day: string;
  monthYear: string;
  year: number | null;
  time: string;
  title: string;
  description: string;
  registerUrl: string;
  panelists: SheetPerson[];
  rawImageUrls: string;
}

export interface SheetReplay {
  kind: "event-replay" | "panel-replay";
  slug: string;
  date: string;
  duration: string;
  category: string;
  title: string;
  videoUrl: string;
  imageUrl: string;
  summary: string;
  description: string;
  transcript: string;
  descriptionIsLink: boolean;
}

export interface SheetSpeaker {
  name: string;
  title: string;
  company: string;
  bio: string;
  event: string;
  imageUrl: string;
  linkedin: string;
  website: string;
  initials: string;
}

function csvUrl(gid: string) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
}

/** RFC-4180-ish CSV parser that handles quoted fields with commas/newlines. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }

  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  return rows;
}

function keyOf(header: string): string {
  return header
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function value(row: SheetRow, ...keys: string[]) {
  for (const key of keys) {
    const found = row[keyOf(key)];
    if (found !== undefined) return found.trim();
  }
  return "";
}

function compact(text: string) {
  return (
    (text || "")
      .replace(/\r\n/g, "\n")
      .replace(/\u00a0/g, " ")
      // editors paste \u2705/\u2714 bullets into sheet cells \u2014 strip them so the
      // site renders its own refined list markers instead of emoji
      .replace(/[\u2705\u2714\u2611\u2713\u2610\u25b6\u25cf\u{1F539}\u{1F538}]/gu, "")
      .replace(/[\ufe0f\u200b]/g, "")
      .split("\n")
      .map((line) => line.replace(/^\s*[\u2022\u25aa\u25e6\u2219\u00b7*]+\s*/, "").trimEnd())
      .join("\n")
      .trim()
  );
}

function firstLine(text: string) {
  return (
    compact(text)
      .split(/\n+/)
      .map((line) => line.trim())
      .find(Boolean) ?? ""
  );
}

function oneLine(text: string) {
  return compact(text).replace(/\s+/g, " ");
}

export function slugify(text: string) {
  return oneLine(text)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function safeYear(...values: string[]) {
  const joined = values.join(" ");
  const match = joined.match(/\b(20\d{2})\b/);
  return match ? Number(match[1]) : null;
}

function isExternalLink(value: string) {
  return /^https?:\/\//i.test(value.trim());
}

function splitLines(value: string) {
  return compact(value)
    .split(/\n+/)
    .map((line) => oneLine(line))
    .filter(Boolean);
}

function mediaImageUrl(url: string, width = 1200) {
  const trimmed = localizeLegacyMedia(url);
  if (!trimmed || /drive\.google\.com\/drive\/folders/i.test(trimmed)) return "";
  return driveImageUrl(trimmed, width);
}

function normalizePersonKey(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function imageMap(raw: string) {
  const map = new Map<string, string>();
  for (const line of splitLines(raw)) {
    const match = line.match(/^(.+?)\s*:\s*(https?:\/\/\S+)/i);
    if (match) map.set(normalizePersonKey(match[1]), mediaImageUrl(match[2]));
  }
  return map;
}

function parsePeople(names: string, images: string): SheetPerson[] {
  const imagesByName = imageMap(images);
  return splitLines(names).map((name) => ({
    name,
    imageUrl: imagesByName.get(normalizePersonKey(name)) ?? "",
    initials: initialsOf(name),
  }));
}

function replayTitle(text: string) {
  return firstLine(text).replace(/\s+by Business of Aesthetics.*$/i, "").trim();
}

/**
 * Turn a Google Drive share link into a directly embeddable image URL.
 * Rendering also requires referrerPolicy="no-referrer" on the img tag.
 */
export function driveImageUrl(url: string, width = 1200): string {
  const trimmed = (url || "").trim();
  if (!trimmed) return "";
  const m =
    trimmed.match(/\/d\/([\w-]{20,})/) || trimmed.match(/[?&]id=([\w-]{20,})/);
  if (m) return `https://lh3.googleusercontent.com/d/${m[1]}=w${width}`;
  return trimmed;
}

/**
 * Request a smaller rendition of a Drive-hosted image (lh3 URLs accept a
 * =wNNN size suffix). Cards and avatars should never download the 1200 px
 * original - a 64 px avatar at w1200 is ~50 KB per speaker.
 */
export function thumbUrl(url: string, width: number): string {
  const u = localizeLegacyMedia(url);
  if (!u) return "";
  // already an optimizer URL (thumbed upstream) - never double-wrap
  if (u.startsWith("/_next/image")) return u;
  // Drive thumbnailer: ask for the size we render
  if (/lh3\.googleusercontent\.com\/d\//.test(u)) return u.replace(/=w\d+$/, "=w" + width);
  // mirrored WordPress uploads (see scripts/mirror-legacy-media.mjs) and any
  // other local file: run through the Next image optimizer (resize + WebP)
  if (u.startsWith("/")) {
    const allowed = [64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200];
    const w = allowed.find((a) => a >= width) ?? 1200;
    return "/_next/image?url=" + encodeURIComponent(u) + "&w=" + w + "&q=75";
  }
  return u;
}

/** Old-host image URLs (still in the sheet) -> same path, served locally. */
export function localizeLegacyMedia(url: string): string {
  return (url || "")
    .trim()
    .replace(/^https?:\/\/(?:www\.)?businessofaesthetics\.org(\/wp-content\/uploads\/)/i, "$1");
}

/**
 * Convert a YouTube or Vimeo link — in any common form — into a player
 * embed URL. Accepts watch, youtu.be, embed, live, and shorts YouTube
 * links, plus vimeo.com/<id> and player.vimeo.com/video/<id>.
 * Returns "" if the URL isn't a recognizable video link.
 */
export function videoEmbedUrl(url: string): string {
  const trimmed = (url || "").trim();
  if (!trimmed) return "";

  const yt =
    trimmed.match(/youtu\.be\/([\w-]{6,})/i) ||
    trimmed.match(/[?&]v=([\w-]{6,})/i) ||
    trimmed.match(/youtube\.com\/(?:embed|live|shorts)\/([\w-]{6,})/i);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return "";
}

export interface TranscriptBlock {
  time?: string;
  /** section heading, e.g. "Introduction & Diagnosing the Operator Trap" */
  heading?: string;
  /** speaker name for dialogue turns */
  speaker?: string;
  text: string;
}

/**
 * Pull a podcast transcript straight from its Google Doc so it renders
 * inline on the episode page. Uses the doc's plain-text export (works for
 * any link-shared doc) and splits it into timestamped blocks. Cached for
 * an hour - transcripts don't change once published.
 */
export async function fetchTranscript(url: string): Promise<TranscriptBlock[]> {
  const m = (url || "").match(/docs\.google\.com\/document\/d\/([\w-]+)/i);
  if (!m) return [];
  try {
    const res = await fetch(
      `https://docs.google.com/document/d/${m[1]}/export?format=txt`,
      STATIC_BUILD ? { cache: "force-cache" } : { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const text = await res.text();
    if (text.trimStart().startsWith("<")) return [];

    const blocks: TranscriptBlock[] = [];
    let current: TranscriptBlock | null = null;
    const timeRe = /^\d{1,2}:\d{2}(?::\d{2})?$/;
    const headingRe = /^(\d{1,2}:\d{2}(?::\d{2})?)\s*[\u2013\u2014-]+\s*(.+)$/;
    const speakerRe = /^([A-Za-z][A-Za-z.'\u2019 -]{1,28}?):\s*(.*)$/;
    // a bare name on its own line ("Ashton Rogers") starts a speaker turn
    const nameOnlyRe =
      /^[A-Z][A-Za-z.'\u2019-]+(?:\s+[A-Z][A-Za-z.'\u2019-]+){1,3}$/;

    for (const raw of text.replace(/^\uFEFF/, '').split(/\r?\n/)) {
      // strip doc-export bullet markers ("* ", "\u2022 ") and inline separators
      let line = raw
        .trim()
        .replace(/^[\u2022\u25AA\u25E6\u2219\u00B7*-]+\s*/, "")
        .replace(/\s+\*\s+/g, " ")
        .trim();
      if (!line) continue;

      const heading = line.match(headingRe);
      if (heading) {
        blocks.push({ time: heading[1], heading: heading[2].trim(), text: '' });
        current = null;
        continue;
      }
      if (timeRe.test(line)) {
        current = { time: line, text: '' };
        blocks.push(current);
        continue;
      }
      const turn = line.match(speakerRe);
      if (turn && turn[1].trim().split(/\s+/).length <= 4) {
        current = { speaker: turn[1].trim(), text: turn[2].trim() };
        blocks.push(current);
        continue;
      }
      if (nameOnlyRe.test(line) && line.length <= 34) {
        // exports sometimes double the label ("Jane Doe Jane Doe")
        const words = line.split(/\s+/);
        if (
          words.length % 2 === 0 &&
          words.slice(0, words.length / 2).join(" ") ===
            words.slice(words.length / 2).join(" ")
        ) {
          line = words.slice(0, words.length / 2).join(" ");
        }
        current = { speaker: line, text: '' };
        blocks.push(current);
        continue;
      }
      if (!current) {
        current = { text: '' };
        blocks.push(current);
      }
      current.text += (current.text ? '\n' : '') + line;
    }
    return blocks.filter((b) => b.text.trim().length > 0 || b.heading);
  } catch {
    return [];
  }
}

/**
 * Fetch a link-shared Google Doc as plain paragraphs so its content renders
 * on the page itself (notes, descriptions) instead of linking out.
 */
export async function fetchDocText(url: string): Promise<string[]> {
  const m = (url || "").match(/docs\.google\.com\/document\/d\/([\w-]+)/i);
  if (!m) return [];
  try {
    const res = await fetch(
      `https://docs.google.com/document/d/${m[1]}/export?format=txt`,
      STATIC_BUILD ? { cache: "force-cache" } : { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const text = await res.text();
    if (text.trimStart().startsWith("<")) return [];
    return compact(text.replace(/^﻿/, ""))
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

/** Extract a Drive file id from any drive.google.com link form. */
export function driveFileId(url: string): string {
  const trimmed = (url || "").trim();
  const m =
    trimmed.match(/drive\.google\.com\/file\/d\/([\w-]{20,})/i) ||
    trimmed.match(/[?&]id=([\w-]{20,})/i);
  return m ? m[1] : "";
}

function vttTime(h: string, m: string, s: string): string {
  const hours = Number(h);
  return hours > 0 ? `${hours}:${m}:${s}` : `${Number(m)}:${s}`;
}

/**
 * Turn WebVTT captions (the format BOA's replay transcripts are stored in on
 * Drive) into readable transcript paragraphs - tiny caption fragments are
 * merged into ~45-second blocks, each stamped with its start time.
 */
function parseVtt(text: string): TranscriptBlock[] {
  interface Cue {
    seconds: number;
    label: string;
    text: string;
  }
  const cues: Cue[] = [];
  let pending: Cue | null = null;
  const cueRe = /^(\d{2}):(\d{2}):(\d{2})[.,]\d+\s+-->/;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    const m = line.match(cueRe);
    if (m) {
      pending = {
        seconds: Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]),
        label: vttTime(m[1], m[2], m[3]),
        text: "",
      };
      cues.push(pending);
      continue;
    }
    if (!line || /^\d+$/.test(line) || /^WEBVTT/i.test(line)) continue;
    if (pending) pending.text += (pending.text ? " " : "") + line;
  }

  const blocks: TranscriptBlock[] = [];
  let current: TranscriptBlock | null = null;
  let blockStart = -1;
  for (const cue of cues) {
    if (!cue.text) continue;
    if (!current || cue.seconds - blockStart >= 45) {
      current = { time: cue.label, text: cue.text };
      blockStart = cue.seconds;
      blocks.push(current);
    } else {
      current.text += " " + cue.text;
    }
  }
  return blocks.map((b) => ({ ...b, text: b.text.replace(/\s+/g, " ").trim() }));
}

/**
 * Pull a transcript stored as a Drive FILE (WebVTT captions or plain text)
 * and shape it into transcript blocks. Google Doc links should go through
 * fetchTranscript instead.
 */
export async function fetchDriveTranscript(
  url: string
): Promise<TranscriptBlock[]> {
  const id = driveFileId(url);
  if (!id) return [];
  try {
    const res = await fetch(
      `https://drive.google.com/uc?export=download&id=${id}`,
      STATIC_BUILD
        ? { cache: "force-cache", redirect: "follow" }
        : { next: { revalidate: 3600 }, redirect: "follow" }
    );
    if (!res.ok) return [];
    const text = await res.text();
    const head = text.trimStart();
    if (head.startsWith("<")) return []; // permission / confirm page
    if (/^WEBVTT/i.test(head)) return parseVtt(text);
    return compact(text)
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({ text: line }));
  } catch {
    return [];
  }
}

export interface NotesSection {
  heading?: string;
  paragraphs: string[];
}

export interface StructuredNotes {
  meta: { label: string; value: string }[];
  sections: NotesSection[];
}

const NOTE_META_LABELS = new Set([
  "DATE",
  "TIME",
  "CATEGORY",
  "FORMAT",
  "LOCATION",
  "DURATION",
  "HOST",
  "MODERATOR",
  "PANELISTS",
  "SPEAKERS",
]);

const NOTE_HEADING_RE =
  /^(event description|key discussion points|key takeaways|discussion points|session overview|about (the|this) (panel|session|event|webinar)|who should attend|panelists?|speakers?|moderators?|conclusion|summary|highlights|what you('| wi)ll learn)\b/i;

function titleCaseLabel(label: string): string {
  return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
}

/**
 * BOA replay description docs follow a template: brand line, title, a block
 * of LABEL / value pairs (DATE, TIME, CATEGORY, FORMAT...), then prose
 * sections with headings. Structure those plain lines so the page can render
 * a proper meta grid + formatted sections instead of a wall of text.
 */
export function structureNotes(lines: string[]): StructuredNotes {
  const meta: StructuredNotes["meta"] = [];
  const sections: NotesSection[] = [];
  let current: NotesSection | null = null;

  let i = 0;
  // drop the brand line and, when a meta label follows, the doc's own title
  // (the page header already shows both)
  while (i < lines.length && /^business of aesthetics$/i.test(lines[i].trim()))
    i++;
  if (
    i + 1 < lines.length &&
    NOTE_META_LABELS.has(lines[i + 1].trim().toUpperCase())
  )
    i++;

  for (; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    // doc boilerplate footer, e.g. "Business of Aesthetics | Expert Panel Replay Description"
    if (/^business of aesthetics\b.*description\s*$/i.test(line)) continue;
    const upper = line.toUpperCase();

    if (NOTE_META_LABELS.has(upper) && i + 1 < lines.length) {
      meta.push({ label: titleCaseLabel(line), value: lines[++i].trim() });
      continue;
    }

    const isHeading =
      NOTE_HEADING_RE.test(line) ||
      (line === upper && line.length <= 48 && /[A-Z]/.test(line));
    if (isHeading) {
      current = { heading: line, paragraphs: [] };
      sections.push(current);
      continue;
    }

    if (!current) {
      current = { paragraphs: [] };
      sections.push(current);
    }
    current.paragraphs.push(line);
  }

  return { meta, sections };
}

async function fetchSheetRows(gid: string): Promise<SheetRow[]> {
  if (!SHEET_ID) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[sheet] BOA_SHEET_ID is not set — sheet-driven sections will be empty. Copy .env.example to .env.local and fill it in."
      );
    }
    return [];
  }
  try {
    const res = await fetch(csvUrl(gid), {
      // per-request on servers; cached into the build for static export
      // 60-second ISR cache: edits appear within a minute, but visitors no
      // longer wait on 1-6 round-trips to Google Sheets for every page view
      ...(STATIC_BUILD ? { cache: "force-cache" as const } : { next: { revalidate: 60 } }),
      redirect: "follow",
    });
    if (!res.ok) return [];

    const text = await res.text();
    if (text.trimStart().startsWith("<")) return [];

    const rows = parseCsv(text);
    if (rows.length < 2) return [];

    const header = rows[0].map(keyOf);
    return rows
      .slice(1)
      .map((row) =>
        Object.fromEntries(
          header.map((key, index) => [key, compact(row[index] ?? "")])
        )
      )
      .filter((row) => Object.values(row).some((cell) => cell.trim() !== ""));
  } catch {
    return [];
  }
}

export async function fetchPodcasts(): Promise<SheetPodcast[]> {
  const rows = await fetchSheetRows(SHEET_GIDS.podcasts);
  return rows
    .map((row) => {
      const episode = Number(value(row, "episode")) || 0;
      const title = oneLine(value(row, "title"));
      const guestName = oneLine(value(row, "guest_name"));

      return {
        episode,
        datePublished: oneLine(value(row, "date_published")),
        title,
        guestName,
        guestPhotoUrl: mediaImageUrl(value(row, "guest_photo_url")),
        category: oneLine(value(row, "category")) || "Podcast",
        description: compact(value(row, "description")),
        contactInfo: compact(value(row, "contact_info")),
        posterImage: mediaImageUrl(value(row, "poster_image")),
        audioSource: value(row, "audio_source"),
        transcriptUrl: value(row, "transcript_url"),
        episodeUrl: value(row, "episode_url"),
        slug: `${String(episode).padStart(3, "0")}-${slugify(title)}`,
        initials: initialsOf(guestName),
      };
    })
    .filter(
      // only episodes published with full details go on the site
      (episode) =>
        episode.episode > 0 &&
        episode.title &&
        episode.description &&
        episode.audioSource
    )
    .sort((a, b) => b.episode - a.episode);
}

/** True while the event's date is today or later (past sessions are hidden). */
export function isUpcoming(event: SheetEvent): boolean {
  if (!event.dateIso) return true;
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return event.dateIso >= today;
}

export async function fetchEvents(): Promise<SheetEvent[]> {
  const rows = await fetchSheetRows(SHEET_GIDS.events);
  return rows
    .map((row) => mapEventRow(row, "event"))
    .filter((event) => event.title);
}

export async function fetchEventPanels(): Promise<SheetEvent[]> {
  const rows = await fetchSheetRows(SHEET_GIDS.eventPanels);
  return rows
    .map((row) => mapEventRow(row, "event-panel"))
    .filter((event) => event.title);
}

function mapEventRow(row: SheetRow, kind: SheetEvent["kind"]): SheetEvent {
  const title = firstLine(value(row, "title"));
  const dateIso = oneLine(value(row, "date_iso", "date"));
  const monthYear = oneLine(value(row, "month_year"));
  const time = oneLine(value(row, "time"));
  const dateLabel = dateIso || monthYear;
  const registerUrl = value(row, "register_url");
  const rawImageUrls = value(row, "image_urls", "image_url");

  return {
    kind,
    slug: `${kind}-${slugify(`${dateLabel} ${title}`)}`,
    dateIso,
    dateLabel,
    day: oneLine(value(row, "day")),
    monthYear,
    year: safeYear(dateIso, monthYear),
    time,
    title,
    description: compact(value(row, "description")),
    registerUrl,
    panelists: parsePeople(value(row, "panelists"), rawImageUrls),
    rawImageUrls,
  };
}

export async function fetchEventReplays(): Promise<SheetReplay[]> {
  const rows = await fetchSheetRows(SHEET_GIDS.eventReplays);
  return rows
    .map((row) => mapReplayRow(row, "event-replay"))
    .filter((replay) => replay.title)
    .reverse();
}

export async function fetchPanelReplays(): Promise<SheetReplay[]> {
  const rows = await fetchSheetRows(SHEET_GIDS.panelReplays);
  return rows
    .map((row) => mapReplayRow(row, "panel-replay"))
    .filter((replay) => replay.title)
    .reverse();
}

function mapReplayRow(row: SheetRow, kind: SheetReplay["kind"]): SheetReplay {
  const title = replayTitle(value(row, "title"));
  const date = oneLine(value(row, "date"));
  const description = compact(value(row, "description"));

  return {
    kind,
    slug: `${kind}-${slugify(`${date} ${title}`)}`,
    date,
    duration: oneLine(value(row, "duration")),
    category: oneLine(value(row, "category")) || "Replay",
    title,
    videoUrl: value(row, "vimeo_url", "video_url", "youtube_url"),
    imageUrl: mediaImageUrl(value(row, "image_url")),
    summary: compact(value(row, "summary")),
    description,
    transcript: value(row, "transcript", "transcript_url"),
    descriptionIsLink: isExternalLink(description),
  };
}

export async function fetchSpeakers(): Promise<SheetSpeaker[]> {
  // the live sheet leads; the carried-over website archive fills in behind it
  const { archiveSpeakers } = await import("./speakers-archive");
  const rows = await fetchSheetRows(SHEET_GIDS.speakers);
  const fromSheet = rows
    .map((row) => {
      const name = oneLine(value(row, "name"));
      return {
        name,
        title: oneLine(value(row, "title")),
        company: oneLine(value(row, "company")),
        bio: compact(value(row, "bio")),
        event: oneLine(value(row, "panel_event", "panel/ Event", "event")),
        imageUrl: mediaImageUrl(value(row, "image_url", "image")),
        linkedin: value(row, "linkedin"),
        website: value(row, "website"),
        initials: initialsOf(name),
      };
    })
    .filter((speaker) => speaker.name.length > 0);

  const seen = new Set(fromSheet.map((s) => s.name.trim().toLowerCase()));
  return [
    ...fromSheet,
    ...archiveSpeakers.filter((s) => !seen.has(s.name.trim().toLowerCase())),
  ];
}

/** Group speakers by the event/panel they belong to (sheet order preserved). */
export function groupByEvent(
  speakers: SheetSpeaker[]
): { event: string; speakers: SheetSpeaker[] }[] {
  const groups = new Map<string, SheetSpeaker[]>();
  for (const s of speakers) {
    const key = s.event || "BOA Community";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(s);
  }
  return Array.from(groups.entries()).map(([event, speakers]) => ({
    event,
    speakers,
  }));
}
