"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

const springConfig = { stiffness: 200, damping: 15, mass: 0.4 };

const textOut = {
  initial: { y: "0%" },
  hover: { y: "-100%" },
};

const textIn = {
  initial: { y: "100%" },
  hover: { y: "0%" },
};

const MagneticButton = ({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  target,
  rel,
}: MagneticButtonProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center overflow-hidden rounded-xl px-7 py-3.5 font-semibold transition-colors duration-300";
  const variantClass =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-lg"
      : "border border-border bg-surface text-foreground hover:bg-surface-elevated";

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="initial"
      whileHover="hover"
      style={{ x: springX, y: springY }}
      className={`${base} ${variantClass} ${className}`}
    >
      <span className="relative block overflow-hidden">
        <motion.span
          variants={textOut}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          className="block"
        >
          {children}
        </motion.span>
        <motion.span
          variants={textIn}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0 block"
          aria-hidden="true"
        >
          {children}
        </motion.span>
      </span>
    </motion.a>
  );
};

export default MagneticButton;
