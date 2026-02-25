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
        className={`pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(240,222,176,0.2),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(121,40,46,0.32),transparent_54%)] ${
          animatedGradient ? "animate-glow" : ""
        }`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/bg-texture.png')] bg-cover bg-center opacity-[0.18] mix-blend-overlay"
      />
    </>
  );
}
