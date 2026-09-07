"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useExperienceMode } from "@/app/shared/providers/ExperienceModeProvider";
import { useStagePointer } from "../lib/StagePointer";

const PARTICLES = [
  { left: "8%", top: "70%", size: 3, delay: "0s", duration: "9s", hide: false },
  { left: "18%", top: "30%", size: 2, delay: "1.2s", duration: "11s", hide: true },
  { left: "28%", top: "55%", size: 2.5, delay: "2.4s", duration: "8s", hide: false },
  { left: "40%", top: "20%", size: 2, delay: "0.6s", duration: "10s", hide: true },
  { left: "55%", top: "65%", size: 3, delay: "3s", duration: "12s", hide: false },
  { left: "62%", top: "15%", size: 2, delay: "1.8s", duration: "9.5s", hide: true },
  { left: "72%", top: "45%", size: 2.5, delay: "0.3s", duration: "10.5s", hide: false },
  { left: "83%", top: "72%", size: 2, delay: "2.1s", duration: "8.5s", hide: true },
  { left: "90%", top: "25%", size: 3, delay: "1.5s", duration: "11.5s", hide: false },
  { left: "48%", top: "80%", size: 2, delay: "3.6s", duration: "9s", hide: true },
  { left: "15%", top: "88%", size: 2.5, delay: "0.9s", duration: "10s", hide: false },
  { left: "68%", top: "88%", size: 2, delay: "2.7s", duration: "8.8s", hide: true },
] as const;

const DepthBackground = () => {
  const { active } = useExperienceMode();
  const bgSlowRef = useRef<HTMLDivElement>(null);
  const bgMidRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const wasActive = useRef(false);
  const quickSettersRef = useRef<{
    slowX?: (v: number) => void;
    slowY?: (v: number) => void;
    midX?: (v: number) => void;
    midY?: (v: number) => void;
    partX?: (v: number) => void;
    partY?: (v: number) => void;
  }>({});

  // Cursor parallax — background barely moves, particles move the most.
  useEffect(() => {
    if (!bgSlowRef.current || !bgMidRef.current || !particlesRef.current) return;

    const slowX = gsap.quickTo(bgSlowRef.current, "x", { duration: 1.1, ease: "power2.out" });
    const slowY = gsap.quickTo(bgSlowRef.current, "y", { duration: 1.1, ease: "power2.out" });
    const midX = gsap.quickTo(bgMidRef.current, "x", { duration: 0.9, ease: "power2.out" });
    const midY = gsap.quickTo(bgMidRef.current, "y", { duration: 0.9, ease: "power2.out" });
    const partX = gsap.quickTo(particlesRef.current, "x", { duration: 0.6, ease: "power2.out" });
    const partY = gsap.quickTo(particlesRef.current, "y", { duration: 0.6, ease: "power2.out" });

    quickSettersRef.current = { slowX, slowY, midX, midY, partX, partY };
  }, []);

  useStagePointer((nx, ny) => {
    const s = quickSettersRef.current;
    s.slowX?.(nx * 3);
    s.slowY?.(ny * 2);
    s.midX?.(nx * 9);
    s.midY?.(ny * 7);
    s.partX?.(nx * 18);
    s.partY?.(ny * 14);
  });

  // A single soft pulse when Experience Mode switches on — not a loop, just a "coming alive" beat.
  useEffect(() => {
    if (pulseRef.current) {
      gsap.set(pulseRef.current, { xPercent: -50, yPercent: -50 });
    }
  }, []);

  useEffect(() => {
    if (active && !wasActive.current && pulseRef.current) {
      gsap.fromTo(
        pulseRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1.15, duration: 0.9, ease: "power2.out", yoyo: true, repeat: 1 },
      );
    }
    wasActive.current = active;
  }, [active]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Background layer — slowest, faintest */}
      <div ref={bgSlowRef} data-depth="bg-slow" className="absolute inset-0">
        <div
          className="absolute -top-[15%] -left-[10%] h-[55%] w-[42%] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--stage-beam-faint), transparent 70%)",
            animation: `aurora-drift-a ${active ? "18s" : "26s"} ease-in-out infinite`,
            opacity: active ? 0.55 : 0.26,
            transition: "opacity 1.4s ease",
          }}
        />
        <div
          className="absolute -right-[20%] -bottom-[20%] h-[75%] w-[60%] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--stage-beam-faint), transparent 70%)",
            animation: `aurora-drift-b ${active ? "20s" : "30s"} ease-in-out infinite`,
            opacity: active ? 0.75 : 0.35,
            transition: "opacity 1.4s ease",
          }}
        />
      </div>

      {/* Midground layer — medium orbs, more visible */}
      <div ref={bgMidRef} data-depth="bg-mid" className="absolute inset-0">
        <div
          className="absolute top-[10%] right-[8%] h-[42%] w-[32%] rounded-full blur-2xl"
          style={{
            background: "radial-gradient(circle, var(--stage-beam-soft), transparent 72%)",
            animation: `aurora-drift-b ${active ? "13s" : "19s"} ease-in-out infinite`,
            opacity: active ? 0.85 : 0.55,
            transition: "opacity 1.2s ease",
          }}
        />
        <div
          className="absolute bottom-[2%] left-[1%] h-[24%] w-[20%] rounded-full blur-2xl"
          style={{
            background: "radial-gradient(circle, var(--stage-beam-soft), transparent 72%)",
            animation: `aurora-drift-a ${active ? "15s" : "21s"} ease-in-out infinite`,
            opacity: active ? 0.5 : 0.28,
            transition: "opacity 1.2s ease",
          }}
        />
        <div
          ref={pulseRef}
          className="absolute top-1/2 left-1/2 h-[50%] w-[40%] rounded-full blur-3xl opacity-0"
          style={{ background: "radial-gradient(circle, var(--stage-beam-soft), transparent 70%)" }}
        />

        {/* Wireframe ring — a single quiet geometric form behind the portrait, not a graphics demo */}
        <svg
          className="absolute right-[4%] top-[8%] h-[70%] w-[46%] opacity-[0.14]"
          style={{ animation: "spin-slow 90s linear infinite" }}
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="92" stroke="var(--stage-beam)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" stroke="var(--stage-beam)" strokeWidth="0.5" strokeDasharray="2 6" />
        </svg>
      </div>

      {/* Foreground dust particles — fastest, most reactive */}
      <div ref={particlesRef} data-depth="particles" className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full bg-[var(--stage-beam)] ${p.hide ? "hidden sm:block" : ""}`}
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animation: `particle-float ${p.duration} ease-in-out ${p.delay} infinite`,
                "--particle-opacity": active ? 0.75 : 0.3,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DepthBackground;
