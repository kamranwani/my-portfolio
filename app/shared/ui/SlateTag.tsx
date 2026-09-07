interface SlateTagProps {
  index: string;
  label: string;
  tone?: "default" | "stage";
}

const SlateTag = ({ index, label, tone = "default" }: SlateTagProps) => {
  const textColor =
    tone === "stage" ? "text-[var(--stage-text-muted)]" : "text-foreground-muted";
  const lineColor = tone === "stage" ? "bg-[var(--stage-beam-soft)]" : "bg-primary";

  return (
    <div className={`flex items-center gap-3 font-mono text-xs tracking-[0.18em] ${textColor}`}>
      <span className={`h-px w-6 ${lineColor}`} />
      <span>
        {index} <span className="opacity-50">/</span> {label.toUpperCase()}
      </span>
    </div>
  );
};

export default SlateTag;
