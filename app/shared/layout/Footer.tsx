"use client";

import { motion } from "framer-motion";
import Container from "@/app/shared/ui/Container";
import SocialIcon from "@/app/shared/ui/SocialIcon";
import { getPortfolioData } from "@/lib/portfolio";

const Footer = () => {
  const { personal, footer } = getPortfolioData();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container addClass="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-sm text-foreground-muted">
          © {year} {personal.name}. {footer.note}
        </p>

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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors duration-300 hover:border-primary/50 hover:text-primary"
            >
              <SocialIcon icon={link.icon} />
            </motion.a>
          ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
