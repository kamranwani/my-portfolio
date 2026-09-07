import SlateTag from "./SlateTag";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({
  index,
  eyebrow,
  heading,
  description,
  align = "left",
}: SectionHeadingProps) => {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignClass}`}>
      <SlateTag index={index} label={eyebrow} />

      <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground xl:text-5xl">
        {heading}
      </h2>

      {description && (
        <p className="mt-5 max-w-xl text-lg leading-8 text-foreground-muted">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
