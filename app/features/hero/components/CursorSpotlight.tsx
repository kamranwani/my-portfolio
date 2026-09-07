"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStagePointer } from "../lib/StagePointer";

const CursorSpotlight = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    gsap.set(glow, { xPercent: -50, yPercent: -50 });
    xTo.current = gsap.quickTo(glow, "x", { duration: 0.7, ease: "power3.out" });
    yTo.current = gsap.quickTo(glow, "y", { duration: 0.7, ease: "power3.out" });
  }, []);

  useStagePointer((_nx, _ny, px, py) => {
    if (glowRef.current && glowRef.current.style.opacity !== "1") {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.4 });
    }
    xTo.current?.(px);
    yTo.current?.(py);
  });

  useEffect(() => {
    const glow = glowRef.current;
    const stage = glow?.closest<HTMLElement>("[data-stage]");
    if (!glow || !stage) return;

    const handleLeave = () => gsap.to(glow, { opacity: 0, duration: 0.5 });
    stage.addEventListener("pointerleave", handleLeave);
    return () => stage.removeEventListener("pointerleave", handleLeave);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] rounded-full opacity-0"
      style={{
        background:
          "radial-gradient(circle, var(--stage-beam-soft) 0%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default CursorSpotlight;
