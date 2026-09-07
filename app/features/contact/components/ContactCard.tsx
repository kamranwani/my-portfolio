"use client";

import { motion } from "framer-motion";
import SocialIcon from "@/app/shared/ui/SocialIcon";
import MagneticButton from "@/app/shared/ui/MagneticButton";
import { getPortfolioData } from "@/lib/portfolio";

const ContactCard = () => {
  const { personal, contact } = getPortfolioData();

  return (
    <div className="relative flex w-full max-w-xl flex-col items-center gap-8 rounded-3xl border border-border bg-surface p-10 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-primary/15 blur-3xl"
      />

      <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-xs font-medium text-success">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        {personal.availability}
      </span>

      <MagneticButton href={`mailto:${personal.email}`} variant="primary">
        {contact.ctaLabel} — {personal.email}
      </MagneticButton>

      <div className="flex items-center gap-3">
        {personal.social.map((link) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground-muted transition-colors duration-300 hover:border-primary/50 hover:text-primary"
          >
            <SocialIcon icon={link.icon} />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;
