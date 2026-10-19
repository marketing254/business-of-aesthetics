#!/usr/bin/env python3
"""
IndexNow submitter for businessofaesthetics.org
================================================

Pushes URLs to IndexNow (Bing, Yandex, Seznam, Naver share the index) so new
or changed pages are crawled within minutes instead of days. Google does not
use IndexNow - submit the sitemap in Search Console for Google.

Setup (once)
------------
1. The key lives in two places and they must match:
     - boa-next/public/<KEY>.txt   (served at https://www.businessofaesthetics.org/<KEY>.txt)
     - env var INDEXNOW_KEY (Vercel + .env.local), or pass --key
2. Deploy the site so the key file is live.

Usage
-----
  python scripts/indexnow.py                      # submit every URL in the live sitemap
  python scripts/indexnow.py --changed 7          # only URLs whose <lastmod> is within 7 days
  python scripts/indexnow.py https://www.businessofaesthetics.org/blog/some-post ...
  python scripts/indexnow.py --dry-run            # show what would be sent

Run it after every deploy that adds/changes content (or on a weekly schedule).
Needs Python 3.8+, no third-party packages.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from pathlib import Path

SITE = os.environ.get("NEXT_PUBLIC_SITE_URL", "https://www.businessofaesthetics.org").rstrip("/")
HOST = SITE.split("://", 1)[1]
ENDPOINT = "https://api.indexnow.org/IndexNow"
BATCH = 10_000  # API maximum per request
UA = "BOA-IndexNow/1.0 (+https://www.businessofaesthetics.org)"
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def load_env_key() -> str | None:
    key = os.environ.get("INDEXNOW_KEY")
    if key:
        return key.strip()
    # fall back to .env.local next to the repo root
    here = Path(__file__).resolve().parent.parent
    for name in (".env.local", ".env"):
        p = here / name
        if p.exists():
            for line in p.read_text(encoding="utf-8").splitlines():
                if line.startswith("INDEXNOW_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    # last resort: the key file in /public
    for f in (here / "public").glob("*.txt"):
        if len(f.stem) == 32 and f.read_text().strip() == f.stem:
            return f.stem
    return None


def fetch(url: str, timeout: int = 60) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def sitemap_urls(url: str, since: datetime | None) -> list[str]:
    root = ET.fromstring(fetch(url))
    tag = root.tag.split("}")[-1]
    out: list[str] = []
    if tag == "sitemapindex":
        for loc in root.findall("sm:sitemap/sm:loc", NS):
            out += sitemap_urls(loc.text.strip(), since)
        return out
    for u in root.findall("sm:url", NS):
        loc = u.find("sm:loc", NS)
        if loc is None or not loc.text:
            continue
        if since is not None:
            lm = u.find("sm:lastmod", NS)
            if lm is None or not lm.text:
                continue
            try:
                when = datetime.fromisoformat(lm.text.strip().replace("Z", "+00:00"))
                if when.tzinfo is None:
                    when = when.replace(tzinfo=timezone.utc)
            except ValueError:
                continue
            if when < since:
                continue
        out.append(loc.text.strip())
    return out


def verify_key_file(key: str) -> bool:
    url = f"{SITE}/{key}.txt"
    try:
        body = fetch(url, timeout=20).decode("utf-8", "ignore").strip()
    except Exception as e:  # noqa: BLE001
        print(f"!! key file not reachable at {url}: {e}")
        return False
    if body != key:
        print(f"!! key file at {url} contains {body!r}, expected {key!r}")
        return False
    print(f"ok key file verified: {url}")
    return True


def submit(urls: list[str], key: str, dry_run: bool) -> int:
    failures = 0
    for i in range(0, len(urls), BATCH):
        chunk = urls[i : i + BATCH]
        payload = {
            "host": HOST,
            "key": key,
            "keyLocation": f"{SITE}/{key}.txt",
            "urlList": chunk,
        }
        if dry_run:
            print(f"[dry-run] would submit {len(chunk)} URLs:")
            for u in chunk[:20]:
                print("   ", u)
            if len(chunk) > 20:
                print(f"    … and {len(chunk) - 20} more")
            continue
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            ENDPOINT,
            data=data,
            headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": UA},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                code = r.getcode()
        except urllib.error.HTTPError as e:
            code = e.code
            print(f"!! IndexNow responded {code}: {e.read().decode('utf-8', 'ignore')[:300]}")
        except Exception as e:  # noqa: BLE001
            print(f"!! request failed: {e}")
            failures += 1
            continue
        meaning = {
            200: "OK - URLs submitted",
            202: "Accepted - key validation pending",
            400: "Bad request - invalid format",
            403: "Forbidden - key not valid / key file mismatch",
            422: "Unprocessable - URLs don't belong to host or key mismatch",
            429: "Too many requests - slow down",
        }.get(code, "unexpected status")
        print(f"batch {i // BATCH + 1}: {len(chunk)} URLs -> HTTP {code} ({meaning})")
        if code not in (200, 202):
            failures += 1
    return failures


def main() -> int:
    ap = argparse.ArgumentParser(description="Submit URLs to IndexNow (Bing/Yandex).")
    ap.add_argument("urls", nargs="*", help="explicit URLs to submit (default: whole sitemap)")
    ap.add_argument("--key", help="IndexNow key (default: INDEXNOW_KEY env / .env.local / public/*.txt)")
    ap.add_argument("--sitemap", default=f"{SITE}/sitemap.xml", help="sitemap URL to read")
    ap.add_argument("--changed", type=int, metavar="DAYS", help="only URLs with lastmod within N days")
    ap.add_argument("--dry-run", action="store_true", help="print instead of submitting")
    ap.add_argument("--skip-verify", action="store_true", help="don't check the key file first")
    args = ap.parse_args()

    key = (args.key or load_env_key() or "").strip()
    if not key:
        print("!! No IndexNow key. Set INDEXNOW_KEY or pass --key.")
        return 2

    if not args.skip_verify and not args.dry_run and not verify_key_file(key):
        print("   Deploy the site (so /<key>.txt is live) and retry, or use --skip-verify.")
        return 3

    if args.urls:
        urls = [u if u.startswith("http") else f"{SITE}/{u.lstrip('/')}" for u in args.urls]
    else:
        since = (
            datetime.now(timezone.utc) - timedelta(days=args.changed) if args.changed else None
        )
        print(f"reading {args.sitemap} …")
        try:
            urls = sitemap_urls(args.sitemap, since)
        except Exception as e:  # noqa: BLE001
            print(f"!! could not read sitemap: {e}")
            return 4

    urls = sorted({u for u in urls if u.startswith(SITE)})
    if not urls:
        print("nothing to submit")
        return 0
    print(f"{len(urls)} URL(s) to submit for {HOST}")
    failures = submit(urls, key, args.dry_run)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
