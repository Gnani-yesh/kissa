import { cn } from "@/lib/utils";

/**
 * Plate — the photographic surface used across the site.
 *
 * When a real photograph is supplied via `src` it is shown with a tonal
 * wash + grain so it sits inside the warm palette. Until then, each
 * `variant` renders a hand-built cinematic light field — a warm ground,
 * suggested architecture (window light, a counter horizon, a cast shadow)
 * and grain — so every section reads as deliberate art direction.
 */
export type PlateVariant =
  | "interiorWarm"
  | "interiorDark"
  | "counter"
  | "still"
  | "airy";

const FIELDS: Record<PlateVariant, string> = {
  interiorWarm:
    "radial-gradient(72% 56% at 24% 20%, rgba(255,230,184,0.55), transparent 70%), linear-gradient(168deg, #8a6f4f 0%, #5a4530 46%, #34261a 100%)",
  interiorDark:
    "radial-gradient(62% 52% at 74% 20%, rgba(226,190,132,0.4), transparent 72%), linear-gradient(165deg, #4a3826 0%, #2c2014 60%, #1b130c 100%)",
  counter:
    "radial-gradient(82% 72% at 40% 4%, rgba(255,233,193,0.52), transparent 66%), linear-gradient(172deg, #8c7050 0%, #6a4f33 52%, #41301f 100%)",
  still:
    "radial-gradient(48% 46% at 50% 42%, rgba(236,198,138,0.5), transparent 72%), linear-gradient(180deg, #2e2218 0%, #160f08 100%)",
  airy:
    "radial-gradient(66% 64% at 76% 14%, rgba(255,248,231,0.95), transparent 72%), linear-gradient(168deg, #f0e6d0 0%, #d9c7a5 56%, #b89f78 100%)",
};

function Scene({ variant }: { variant: PlateVariant }) {
  switch (variant) {
    case "interiorWarm":
      return (
        <>
          <div
            className="absolute -left-[6%] -top-[16%] h-[92%] w-[40%] rotate-[11deg] blur-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,239,208,0.66), rgba(255,239,208,0.04) 80%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-[33%] h-px"
            style={{ background: "rgba(255,236,200,0.13)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[33%]"
            style={{
              background:
                "linear-gradient(to top, rgba(20,13,8,0.62), transparent)",
            }}
          />
        </>
      );
    case "interiorDark":
      return (
        <>
          <div
            className="absolute right-[16%] top-[7%] h-[70%] w-[13%] blur-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(238,206,150,0.52), rgba(238,206,150,0.02))",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[42%]"
            style={{
              background:
                "linear-gradient(to top, rgba(9,6,3,0.72), transparent)",
            }}
          />
        </>
      );
    case "counter":
      return (
        <>
          <div
            className="absolute inset-x-0 top-0 h-[26%]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(14,9,5,0.5), transparent)",
            }}
          />
          <div
            className="absolute inset-x-0 top-[39%] h-[26%] blur-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,236,198,0.42), rgba(255,236,198,0))",
            }}
          />
          <div
            className="absolute left-1/2 top-[59%] h-[8%] w-[36%] -translate-x-1/2 rounded-[50%] blur-lg"
            style={{ background: "rgba(13,8,4,0.52)" }}
          />
        </>
      );
    case "still":
      return (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-[58%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
            style={{ background: "rgba(244,206,146,0.42)" }}
          />
          <div
            className="absolute left-1/2 top-[28%] h-[54%] w-[15%] -translate-x-1/2 blur-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,7,3,0.74), rgba(11,7,3,0.28))",
              borderRadius: "42% 42% 46% 46%",
            }}
          />
        </>
      );
    case "airy":
      return (
        <>
          <div
            className="absolute right-[8%] top-[5%] h-[82%] w-[44%] blur-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,252,243,0.96), rgba(255,252,243,0.08) 84%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[30%]"
            style={{
              background:
                "linear-gradient(to top, rgba(120,96,64,0.46), transparent)",
            }}
          />
        </>
      );
  }
}

type PlateProps = {
  variant?: PlateVariant;
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  vignette?: boolean;
};

export function Plate({
  variant = "interiorWarm",
  src,
  alt = "",
  className,
  children,
  vignette = true,
}: PlateProps) {
  return (
    <div
      className={cn("plate", className)}
      style={src ? undefined : { backgroundImage: FIELDS[variant] }}
    >
      {src ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,238,212,0.05), rgba(36,25,15,0.2))",
            }}
          />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0">
          <Scene variant={variant} />
        </div>
      )}

      {/* fine grain */}
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-soft-light"
      />

      {/* inner vignette + hairline frame */}
      {vignette ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 90px 8px rgba(15,10,7,0.32), inset 0 1px 0 rgba(255,240,214,0.08)",
          }}
        />
      ) : null}

      {children}
    </div>
  );
}
