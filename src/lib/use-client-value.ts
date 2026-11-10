"use client";

/**
 * Read a browser-only value (localStorage, navigator, document attributes)
 * without calling setState inside an effect. On the server and during
 * hydration the `serverValue` is used, then React re-renders once with the
 * real value - exactly what the old useEffect + setState pattern did, but
 * without the cascading-render lint error.
 *
 * `read` must return a primitive (string / number / boolean / null) so that
 * React's Object.is snapshot comparison stays stable. Derive objects from it
 * with useMemo in the component.
 */

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useClientValue<T extends string | number | boolean | null>(
  read: () => T,
  serverValue: T
): T {
  return useSyncExternalStore(subscribe, read, () => serverValue);
}

/** Raw localStorage string (or "" when missing / blocked). */
export function useLocalStorageRaw(key: string): string {
  return useClientValue(() => {
    try {
      return localStorage.getItem(key) ?? "";
    } catch {
      return "";
    }
  }, "");
}
