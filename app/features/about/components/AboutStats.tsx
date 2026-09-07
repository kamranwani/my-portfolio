"use client";

import { useState } from "react";
import { motion, animate } from "framer-motion";
import { Stat } from "@/app/shared/types/Portfolio";

interface AboutStatsProps {
  stats: Stat[];
}

const parseStat = (value: string) => {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { number: parseInt(match[1], 10), suffix: match[2] };
};

const StatCard = ({ stat }: { stat: Stat }) => {
  const parsed = parseStat(stat.value);
  const [display, setDisplay] = useState(stat.value);

  const handleHoverStart = () => {
    if (!parsed) return;
    animate(0, parsed.number, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v) + parsed.suffix),
    });
  };

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="rounded-2xl border border-border bg-surface p-6 transition-[background-color,box-shadow] duration-300 hover:bg-surface-elevated hover:shadow-[0_12px_30px_-14px_var(--stage-beam-soft)]"
    >
      <p className="text-3xl font-bold tracking-[-0.02em] text-primary tabular-nums">
        {display}
      </p>
      <p className="mt-1 text-sm text-foreground-muted">{stat.label}</p>
    </motion.div>
  );
};

const AboutStats = ({ stats }: AboutStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
};

export default AboutStats;
