"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollTo } from "@/app/shared/hooks/useScrollTo";
import { getPortfolioData } from "@/lib/portfolio";
import { StagePointerProvider, useRegisterStage } from "./lib/StagePointer";
import DepthBackground from "./components/DepthBackground";
import LightBeam from "./components/LightBeam";
import HeroTitle from "./components/HeroTitle";
import PortraitField from "./components/PortraitField";
import CursorSpotlight from "./components/CursorSpotlight";

const HeroInner = () => {
  const { personal } = getPortfolioData();
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const registerStage = useRegisterStage();
  const scrollTo = useScrollTo();

  // Entrance timeline — slate tag, kinetic headline lines, tagline, CTAs, portrait fade-in.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const q = (selector: string) => el.querySelectorAll(selector);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(q("[data-anim]"), { clearProps: "all" });
      gsap.set(q('[data-depth="portrait"]'), { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(q('[data-anim="word"]'), { yPercent: 110, opacity: 0 });
      gsap.set(q('[data-anim="tag"], [data-anim="ctas"]'), {
        opacity: 0,
        y: 16,
      });
      gsap.set(q('[data-depth="portrait"]'), { opacity: 0 });
      gsap.set(q('[data-anim="beam"]'), { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(q('[data-anim="tag"]'), { opacity: 1, y: 0, duration: 0.6 })
        .to(q('[data-anim="beam"]'), { opacity: 1, duration: 1.3 }, "-=0.3")
        .to(
          q('[data-anim="word"]'),
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05 },
          "-=0.9",
        )
        .to(q('[data-anim="ctas"]'), { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(q('[data-depth="portrait"]'), { opacity: 1, duration: 1.3 }, "-=1.0");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven cinematic exit — layered parallax, not a flat fade.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const q = (selector: string) => el.querySelectorAll(selector);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      tl.fromTo(
        q('[data-depth="portrait"]'),
        { yPercent: 0 },
        { yPercent: 10, duration: 1, ease: "none" },
        0,
      )
        .fromTo(
          q('[data-depth="title"]'),
          { yPercent: 0 },
          { yPercent: -10, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          q('[data-depth="bg-slow"]'),
          { yPercent: 0 },
          { yPercent: -3, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          q('[data-depth="bg-mid"]'),
          { yPercent: 0 },
          { yPercent: -7, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          contentRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 0.3, ease: "none" },
          0.7,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo("#contact");
  };

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo("#projects");
  };

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        registerStage(el);
      }}
      id="hero"
      data-stage=""
      className="grain relative min-h-[100svh] overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 78% 0%, var(--stage-hotspot) 0%, var(--stage-bg) 45%, var(--stage-bg-deep) 100%)",
      }}
    >
      <DepthBackground />
      <CursorSpotlight />
      <LightBeam />
      <PortraitField name={personal.name} />

      <div ref={contentRef} className="relative z-10 flex min-h-[100svh] items-center">
        <div className="w-full max-w-3xl px-6 sm:px-10 lg:px-20 xl:px-24">
          <HeroTitle
            name={personal.name}
            role={personal.role}
            tagline={personal.tagline}
            onContactClick={handleContactClick}
            onProjectsClick={handleProjectsClick}
          />
        </div>
      </div>
    </section>
  );
};

const Hero = () => (
  <StagePointerProvider>
    <HeroInner />
  </StagePointerProvider>
);

export default Hero;
