"use client";

import { useState } from "react";
import { thumbUrl } from "@/lib/sheet";

/**
 * Sheet-driven headshot with graceful fallbacks.
 *  1. Drive thumbnail at the size we render (fast, small)
 *  2. the original file relayed through /api/drive-image - Google sometimes
 *     never generates a thumbnail for an otherwise fine, public PNG, and
 *     browsers refuse Drive's download URL as an <img> source
 *  3. the person's initials in the same circle (file private or deleted)
 */
function driveOriginalUrl(url: string) {
  const m = url.match(/lh3\.googleusercontent\.com\/d\/([\w-]+)/);
  return m ? `/api/drive-image/${m[1]}` : "";
}

export default function PersonAvatar({
  imageUrl,
  initials,
  alt = "",
  width = 120,
  imgClassName,
  fallbackClassName,
  initialsClassName,
}: {
  imageUrl: string;
  initials: string;
  alt?: string;
  width?: number;
  imgClassName: string;
  fallbackClassName: string;
  initialsClassName?: string;
}) {
  // 0 = thumbnail, 1 = original file, 2 = give up
  const [stage, setStage] = useState(0);
  const src =
    stage === 0 ? thumbUrl(imageUrl, width) : stage === 1 ? driveOriginalUrl(imageUrl) : "";
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={src}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setStage((n) => n + 1)}
        className={imgClassName}
      />
    );
  }
  return (
    <span className={fallbackClassName}>
      {initialsClassName ? (
        <span className={initialsClassName}>{initials}</span>
      ) : (
        initials
      )}
    </span>
  );
}
