"use client";

import { motion } from "framer-motion";
import { Exploring as ExploringData } from "@/app/shared/types/Portfolio";

interface StatusCardProps {
  data: ExploringData;
}

const StatusCard = ({ data }: StatusCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface-elevated px-6 py-5 sm:flex-row sm:items-center sm:gap-6"
    >
      {/* Moving signal line along the top edge */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-border">
        <div
          className="h-full w-1/3 bg-primary"
          style={{ animation: "signal-sweep 3.5s ease-in-out infinite" }}
        />
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
          {data.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
        <span className="text-base font-semibold text-foreground">
          {data.technology}
        </span>
        <span className="text-sm text-foreground-muted transition-opacity duration-300 sm:opacity-80 sm:group-hover:opacity-100">
          {data.description}
        </span>
      </div>
    </motion.div>
  );
};

export default StatusCard;
