"use client";

import { motion } from "framer-motion";
import { SkillGroup } from "@/app/shared/types/Portfolio";

interface SkillGroupCardProps {
  group: SkillGroup;
}

const SkillGroupCard = ({ group }: SkillGroupCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6"
    >
      {/* Accent line that draws in on hover */}
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
        {group.category}
      </h3>

      <ul className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillGroupCard;
