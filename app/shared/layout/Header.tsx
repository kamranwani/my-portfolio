"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Theme, THEME_LABELS } from "../types/Theme";
import { useTheme } from "../hooks/theme";
import { useScrollTo } from "../hooks/useScrollTo";
import ExperienceModeToggle from "../ui/ExperienceModeToggle";
import { getPortfolioData } from "@/lib/portfolio";

const navLinks: { label: string; href: string; id: string }[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const themeColors: Record<Theme, string> = {
  [Theme.IvoryGold]: "#c9a44c",
  [Theme.MidnightAmethyst]: "#a970ff",
  [Theme.GraphiteCyan]: "#4fd8e0",
  [Theme.PearlEmerald]: "#3f9d78",
};

const Header = () => {
  const arrTheme: readonly Theme[] = Object.values(Theme);
  const { theme, setTheme } = useTheme();
  const { personal } = getPortfolioData();
  const scrollTo = useScrollTo();

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTheme = (newtheme: Theme) => {
    setTheme(newtheme);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <motion.div
        animate={{
          y: scrolled ? 10 : 22,
          scale: scrolled ? 0.97 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border px-5 py-3 shadow-[0_8px_30px_var(--shadow-color)] transition-[backdrop-filter,background-color] duration-500"
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--glass-bg) 130%, var(--surface-elevated) 15%)"
            : "var(--glass-bg)",
          borderColor: "var(--glass-border)",
          backdropFilter: scrolled ? "blur(22px)" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "blur(22px)" : "blur(12px)",
          transformOrigin: "top center",
        }}
      >
        <motion.div whileHover={{ scale: 1.08, rotate: -4 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <Link
            href="/"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground"
            aria-label={personal.name}
          >
            KW
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground-muted transition-colors duration-300 hover:text-foreground"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/12 shadow-[0_0_16px_var(--stage-beam-soft)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 ${isActive ? "text-primary" : ""}`}
                >
                  {link.label}
                </span>
              </motion.a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <ExperienceModeToggle />

          <div className="flex items-center gap-2 rounded-full border border-border/70 px-2.5 py-1.5">
            {arrTheme.map((newtheme) => (
              <motion.button
                key={newtheme}
                aria-label={`Switch to ${THEME_LABELS[newtheme]} theme`}
                aria-pressed={theme === newtheme}
                title={THEME_LABELS[newtheme]}
                onClick={() => handleTheme(newtheme)}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="h-3.5 w-3.5 cursor-pointer rounded-full border"
                style={{
                  backgroundColor: themeColors[newtheme],
                  borderColor:
                    theme === newtheme ? "var(--foreground)" : "var(--border)",
                  boxShadow:
                    theme === newtheme
                      ? `0 0 0 3px color-mix(in srgb, ${themeColors[newtheme]} 30%, transparent)`
                      : "none",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
