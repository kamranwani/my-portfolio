"use client";

import { useCallback } from "react";
import { useLenis } from "../providers/SmoothScrollProvider";

export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const target = document.querySelector(id);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -88 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis],
  );
}
