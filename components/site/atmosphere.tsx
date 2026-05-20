/**
 * Fixed cinematic overlays — a fine film grain and a soft edge vignette.
 * Both sit above the page content but never intercept pointer events.
 */
export function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[70] opacity-[0.55] mix-blend-soft-light"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[40]"
        style={{
          background:
            "radial-gradient(125% 85% at 50% 32%, transparent 56%, rgba(24,18,14,0.26) 100%)",
        }}
      />
    </>
  );
}
