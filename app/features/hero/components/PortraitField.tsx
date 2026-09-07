"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStagePointer } from "../lib/StagePointer";

interface PortraitFieldProps {
  name: string;
}

const PortraitField = ({ name }: PortraitFieldProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const parallaxXTo = useRef<((v: number) => void) | null>(null);
  const parallaxYTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    parallaxXTo.current = gsap.quickTo(wrapRef.current, "x", {
      duration: 0.8,
      ease: "power2.out",
    });
    parallaxYTo.current = gsap.quickTo(wrapRef.current, "y", {
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  useStagePointer((nx, ny, px, py) => {
    // Subtle depth (3-8px range) — the portrait should feel like it's set back in space.
    parallaxXTo.current?.(nx * 6);
    parallaxYTo.current?.(ny * 5);

    if (veilRef.current) {
      veilRef.current.style.setProperty("--mx", `${px}px`);
      veilRef.current.style.setProperty("--my", `${py}px`);
    }
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const veil = veilRef.current;
    if (!wrap || !veil) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(veil, { opacity: 0.25 });
        return;
      }
      gsap.set(veil, { opacity: 1 });
      gsap.to(veil, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 70%",
          end: "top 10%",
          scrub: 0.6,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      data-depth="portrait"
      className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[62%]"
    >
      <div className="relative h-full w-full">
        <Image
          src="/my-portfolio/hero.webp"
          alt={`Portrait of ${name}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 62vw"
          className="object-cover"
          style={{ objectPosition: "68% 22%" }}
        />

        {/* Edge scrims — the portrait dissolves into the environment rather than ending in a rectangle.
            Bottom gets the strongest fade: that's a real photographic crop (torso/shirt), not a
            background transition, so it needs the most coverage to disappear convincingly. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--stage-bg) 0%, transparent 34%), linear-gradient(to bottom, var(--stage-bg) 0%, transparent 16%), linear-gradient(to top, var(--stage-bg) 0%, transparent 34%)",
          }}
        />

        {/* Theme-colored light grade — ties the photo's tones to the active theme */}
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-color"
          style={{ background: "var(--stage-beam-faint)" }}
        />

        {/* Cursor-revealed veil — very large, extremely soft feather; scroll fades it away entirely */}
        <div
          ref={veilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 110% at 55% 35%, var(--stage-bg) 0%, var(--stage-bg-deep) 100%)",
            maskImage:
              "radial-gradient(circle 420px at var(--mx, 60%) var(--my, 32%), transparent 0%, transparent 22%, black 90%)",
            WebkitMaskImage:
              "radial-gradient(circle 420px at var(--mx, 60%) var(--my, 32%), transparent 0%, transparent 22%, black 90%)",
          }}
        />
      </div>
    </div>
  );
};

export default PortraitField;
