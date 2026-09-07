import { ExperienceItem } from "@/app/shared/types/Portfolio";

interface ExperienceItemCardProps {
  item: ExperienceItem;
}

const ExperienceItemCard = ({ item }: ExperienceItemCardProps) => {
  return (
    <div className="group relative grid grid-cols-[24px_1fr] gap-6 pb-14 last:pb-0">
      <span
        aria-hidden="true"
        className="relative top-1.5 h-3 w-3 justify-self-center rounded-full border-2 border-primary bg-background transition-transform duration-300 group-hover:scale-125"
      />

      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {item.role} · {item.company}
          </h3>
          <span className="text-sm font-medium text-foreground-muted">
            {item.duration}
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-foreground-muted leading-7">
          {item.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceItemCard;
