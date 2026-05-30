"use client";

// On (re)load, always land at the very top of the page — even if the URL has a
// section hash (e.g. #work from clicking a nav link) or the browser tries to
// restore the previous scroll position.

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Drop any #section hash so the browser doesn't jump to it on reload.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }

    // Force the top instantly (overrides CSS smooth-scroll and any late hash
    // jump that already happened during initial parse).
    const toTop = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    toTop();
    requestAnimationFrame(toTop);
  }, []);

  return null;
}
