"use client";

import { useEffect } from "react";

// Publishes the *actual* visible viewport height as the CSS variable --app-vh.
//
// On iOS Safari, `100dvh` doesn't always repaint the moment the address/toolbar
// slides away, so a full-bleed hero can leave a sliver where the next section
// peeks at the bottom. visualViewport.height is the true visible height and its
// `resize` event fires exactly when the toolbars show/hide, so the hero can
// track it precisely. Falls back to 100dvh in CSS until this runs.
export default function ViewportVar() {
  useEffect(() => {
    const vv = window.visualViewport;
    const set = () => {
      const h = vv?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-vh", `${Math.round(h)}px`);
    };
    set();
    vv?.addEventListener("resize", set);
    window.addEventListener("orientationchange", set);
    window.addEventListener("resize", set);
    return () => {
      vv?.removeEventListener("resize", set);
      window.removeEventListener("orientationchange", set);
      window.removeEventListener("resize", set);
    };
  }, []);

  return null;
}
