/**
 * Live Google Sheets integration.
 *
 * The spreadsheet is the source of truth for podcasts, events, panel replays,
 * and speaker profiles. Each fetch uses the public CSV export with no cache so
 * content updates appear on refresh without a deploy.
 */

/**
 * Server-only configuration. Set BOA_SHEET_ID in .env.local (see .env.example).
 * Deliberately NOT prefixed with NEXT_PUBLIC_ so the spreadsheet ID never
 * reaches the client bundle.
 */
const SHEET_ID = process.env.BOA_SHEET_ID ?? "";

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
  const trimmed = (url || "").trim();
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
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const text = await res.text();
    if (text.trimStart().startsWith("<")) return [];

    const blocks: TranscriptBlock[] = [];
    let current: TranscriptBlock | null = null;
    const timeRe = /^\d{1,2}:\d{2}(?::\d{2})?$/;
    const headingRe = /^(\d{1,2}:\d{2}(?::\d{2})?)\s*[\u2013\u2014-]+\s*(.+)$/;
    const speakerRe = /^([A-Za-z][A-Za-z.'\u2019 -]{1,28}?):\s*(.*)$/;

    for (const raw of text.replace(/^\uFEFF/, '').split(/\r?\n/)) {
      const line = raw.trim();
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
      cache: "no-store",
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
    .filter((episode) => episode.episode > 0 && episode.title)
    .sort((a, b) => b.episode - a.episode);
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
  const rows = await fetchSheetRows(SHEET_GIDS.speakers);
  return rows
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
