const LightBeam = () => {
  return (
    <div
      data-anim="beam"
      aria-hidden="true"
      className="pointer-events-none absolute -top-[15%] right-[4%] h-[130%] w-[42%] sm:right-[8%] sm:w-[34%]"
      style={{
        background:
          "linear-gradient(180deg, var(--stage-beam-soft) 0%, color-mix(in srgb, var(--stage-beam-warm) 45%, transparent) 45%, transparent 75%)",
        filter: "blur(48px)",
        animation: "beam-drift 11s ease-in-out infinite",
      }}
    />
  );
};

export default LightBeam;
