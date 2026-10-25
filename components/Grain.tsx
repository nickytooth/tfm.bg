/**
 * Fixed, pointer-events-none cinematic film grain + vignette.
 * Subtle (≈5%); painted once, never on scrolling containers.
 */
export function Grain() {
  const noise =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
    );

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: "var(--z-grain)",
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage: `url("${noise}")`,
          backgroundSize: "160px 160px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: "var(--z-grain)",
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 55%, oklch(0.1 0 0 / 0.55) 100%)",
        }}
      />
    </>
  );
}
