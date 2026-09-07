import SlateTag from "@/app/shared/ui/SlateTag";
import MagneticButton from "@/app/shared/ui/MagneticButton";

interface HeroTitleProps {
  name: string;
  role: string;
  tagline: string;
  onContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onProjectsClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Word-by-word kinetic reveal driven directly by the real tagline, instead of a
// hardcoded line-break array that goes stale the moment the copy changes.
// "software" (if present) is emphasized in the theme accent — everything else
// wraps naturally so this survives future copy edits without code changes.
const renderKineticWords = (tagline: string) => {
  const words = tagline.split(" ");
  return words.map((word, i) => {
    const isEmphasized = /software/i.test(word);
    return (
      <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-top">
        <span
          data-anim="word"
          className={`inline-block ${isEmphasized ? "text-[var(--stage-beam)]" : ""}`}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      </span>
    );
  });
};

const HeroTitle = ({
  name,
  role,
  tagline,
  onContactClick,
  onProjectsClick,
}: HeroTitleProps) => {
  return (
    <div
      data-depth="title"
      className="flex flex-col items-start justify-center gap-8 py-14 sm:py-16 lg:min-h-[560px] lg:py-0"
    >
      <span data-anim="tag" className="flex flex-col gap-2.5">
        <SlateTag index="01" label={role} tone="stage" />
        <span className="font-mono text-[0.7rem] tracking-[0.22em] text-[var(--stage-text-muted)]">
          {name.toUpperCase()}
        </span>
      </span>

      <h1 className="max-w-xl text-[clamp(2.25rem,5.4vw,4rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--stage-text)]">
        {renderKineticWords(tagline)}
      </h1>

      <div data-anim="ctas" className="flex flex-wrap items-center gap-4">
        <MagneticButton href="#contact" onClick={onContactClick} variant="primary">
          Let&apos;s talk
        </MagneticButton>
        <MagneticButton
          href="#projects"
          onClick={onProjectsClick}
          variant="secondary"
          className="!border-[var(--stage-line)] !bg-transparent !text-[var(--stage-text)] hover:!bg-white/5"
        >
          View work
        </MagneticButton>
      </div>
    </div>
  );
};

export default HeroTitle;
