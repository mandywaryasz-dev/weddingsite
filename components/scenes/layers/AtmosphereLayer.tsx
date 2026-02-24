type AtmosphereLayerProps = {
  animatedGradient?: boolean;
};

export function AtmosphereLayer({ animatedGradient = true }: AtmosphereLayerProps) {
  return (
    <>
      <div
        aria-hidden
        className="scene-grain pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-soft-light animate-grain"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(199,164,93,0.3),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(110,47,53,0.35),transparent_50%)] ${
          animatedGradient ? "animate-glow" : ""
        }`}
      />
    </>
  );
}
