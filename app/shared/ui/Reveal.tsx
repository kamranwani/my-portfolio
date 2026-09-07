"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children with a stagger instead of the container as one block. */
  stagger?: boolean;
  as?: "div" | "section";
  /** up: fade + rise (default). left: fade + slide in from the left. scale: fade + scale up. */
  variant?: "up" | "left" | "scale";
}

type AnimVars = {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
};

const VARIANTS: Record<
  NonNullable<RevealProps["variant"]>,
  { from: AnimVars; to: AnimVars }
> = {
  up: { from: { opacity: 0, y: 28 }, to: { opacity: 1, y: 0 } },
  left: { from: { opacity: 0, x: -32 }, to: { opacity: 1, x: 0 } },
  scale: {
    from: { opacity: 0, scale: 0.94 },
    to: { opacity: 1, scale: 1 },
  },
};

const Reveal = ({
  children,
  className,
  stagger = false,
  as = "div",
  variant = "up",
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const targets = stagger ? Array.from(el.children) : el;
    const { from, to } = VARIANTS[variant];

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, from, {
        ...to,
        duration: 0.8,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [stagger, variant]);

  const Comp = as;
  return (
    <Comp ref={ref as never} className={className}>
      {children}
    </Comp>
  );
};

export default Reveal;
