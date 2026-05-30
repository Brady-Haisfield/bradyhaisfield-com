"use client";

// On (re)load, land at the top of the page. Disables the browser's automatic
// scroll restoration and resets scroll on mount.

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
