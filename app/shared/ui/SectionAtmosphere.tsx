interface SectionAtmosphereProps {
  variant?: "a" | "b";
}

const DOTS = [
  { left: "12%", top: "20%", size: 2, delay: "0s", duration: "10s" },
  { left: "78%", top: "65%", size: 2.5, delay: "1.5s", duration: "12s" },
  { left: "45%", top: "85%", size: 2, delay: "3s", duration: "9s" },
  { left: "88%", top: "15%", size: 2, delay: "2s", duration: "11s" },
] as const;

const SectionAtmosphere = ({ variant = "a" }: SectionAtmosphereProps) => {
  const primaryPos =
    variant === "a" ? "-top-[10%] -right-[6%]" : "-bottom-[12%] -left-[6%]";
  const secondaryPos =
    variant === "a" ? "-bottom-[15%] -left-[8%]" : "-top-[15%] -right-[8%]";
  const primaryAnim = variant === "a" ? "aurora-drift-a" : "aurora-drift-b";
  const secondaryAnim = variant === "a" ? "aurora-drift-b" : "aurora-drift-a";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute h-[50%] w-[38%] rounded-full blur-3xl opacity-[0.16] ${primaryPos}`}
        style={{
          background: "radial-gradient(circle, var(--primary), transparent 70%)",
          animation: `${primaryAnim} 30s ease-in-out infinite`,
        }}
      />
      <div
        className={`absolute h-[32%] w-[26%] rounded-full blur-3xl opacity-[0.1] ${secondaryPos}`}
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
          animation: `${secondaryAnim} 24s ease-in-out infinite`,
        }}
      />

      {DOTS.map((dot, i) => (
        <span
          key={i}
          className="absolute hidden rounded-full bg-primary sm:block"
          style={
            {
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              animation: `particle-float ${dot.duration} ease-in-out ${dot.delay} infinite`,
              "--particle-opacity": 0.35,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default SectionAtmosphere;
