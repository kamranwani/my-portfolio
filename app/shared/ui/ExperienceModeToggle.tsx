"use client";

import { motion } from "framer-motion";
import { useExperienceMode } from "@/app/shared/providers/ExperienceModeProvider";

const BARS = [0, 1, 2, 3];

const ExperienceModeToggle = () => {
  const { active, toggle } = useExperienceMode();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? "Pause ambient experience" : "Play ambient experience"}
      title={active ? "Pause ambient experience" : "Play ambient experience"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground-muted transition-colors duration-300 hover:text-foreground"
    >
      <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
        {BARS.map((i) => (
          <motion.span
            key={i}
            className="w-[2.5px] rounded-full bg-current"
            initial={false}
            animate={
              active
                ? { height: ["30%", "100%", "45%", "85%", "30%"] }
                : { height: "28%" }
            }
            transition={
              active
                ? {
                    duration: 1.1 + i * 0.16,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.25 }
            }
          />
        ))}
      </span>
    </button>
  );
};

export default ExperienceModeToggle;
