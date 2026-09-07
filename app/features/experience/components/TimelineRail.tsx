"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TimelineRail = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      gsap.set(fill, { scaleY: 1 });
      return;
    }

    gsap.set(fill, { scaleY: 0 });

    const ctx = gsap.context(() => {
      gsap.to(fill, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 65%",
          scrub: 0.6,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute left-[11px] top-1 bottom-1 w-0.5 bg-border"
      />
      <div
        ref={fillRef}
        aria-hidden="true"
        className="absolute left-[11px] top-1 bottom-1 w-0.5 origin-top bg-primary"
      />
      {children}
    </div>
  );
};

export default TimelineRail;
