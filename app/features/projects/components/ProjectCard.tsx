"use client";

import { MouseEvent, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/app/shared/types/Portfolio";

interface ProjectCardProps {
  project: Project;
}

const tiltRange = 3; // degrees — kept subtle, cards are compact now so less room for drama

const statusStyles: Record<string, string> = {
  Live: "border-success/30 bg-success/10 text-success",
  "In Progress": "border-warning/30 bg-warning/10 text-warning",
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(springY, [0, 1], [tiltRange, -tiltRange]);
  const rotateY = useTransform(springX, [0, 1], [-tiltRange, tiltRange]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const hasLiveUrl = Boolean(project.liveUrl);
  const hasGithubUrl = Boolean(project.githubUrl);
  const statusClass = statusStyles[project.status] ?? "border-border bg-surface text-foreground-muted";

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-elevated p-6 transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] ${statusClass}`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-sm italic leading-6 text-foreground-muted/90">
        {project.problem}
      </p>

      <p className="text-sm leading-6 text-foreground-muted">{project.description}</p>

      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 ${
              hovered
                ? "border-primary/40 text-primary"
                : "border-border text-foreground-muted"
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-4 border-t border-border pt-4">
        {hasLiveUrl && (
          <a
            href={project.liveUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Live site →
          </a>
        )}
        {hasGithubUrl && (
          <a
            href={project.githubUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-foreground-muted hover:text-foreground"
          >
            Source code
          </a>
        )}
        {!hasLiveUrl && !hasGithubUrl && (
          <span className="flex items-center gap-1.5 text-sm text-foreground-muted">
            <span aria-hidden="true">🔒</span>
            {project.confidential
              ? "Confidential — client project"
              : project.status === "In Progress"
                ? "In development — not yet public"
                : "Not publicly deployed"}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
