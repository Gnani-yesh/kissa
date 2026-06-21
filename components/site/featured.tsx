"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "./reveal";

const ease = [0.16, 1, 0.3, 1] as const;

type Spec = { k: string; v: string };
type Chapter = {
  no: string;
  jp: string;
  word: [string, string];
  kicker: string;
  title: string;
  body: string;
  specsTitle: string;
  specs: Spec[];
};

const CHAPTERS: Chapter[] = [
  {
    no: "01",
    jp: "一",
    word: ["House", "Pour"],
    kicker: "The signature",
    title: "Yoake — the cup the day begins with.",
    body: "Before the room opens, one coffee is dialled in and tasted until it is right. Bright, floral and unmistakably clean — we want it to be the first thing the morning tastes of.",
    specsTitle: "At a glance",
    specs: [
      { k: "Origin", v: "Yirgacheffe, Ethiopia" },
      { k: "Producer", v: "Idido washing station" },
      { k: "Roast", v: "Light — filter" },
      { k: "Cupping", v: "88 / 100" },
    ],
  },
  {
    no: "02",
    jp: "二",
    word: ["Single", "Origin"],
    kicker: "The bean",
    title: "Grown high, picked ripe, washed clean.",
    body: "Drawn from one washing station at the head of the valley, where thin mountain air slows each cherry and gathers its sweetness inward before harvest.",
    specsTitle: "Provenance",
    specs: [
      { k: "Altitude", v: "2,050 m" },
      { k: "Process", v: "Fully washed" },
      { k: "Varietal", v: "Heirloom" },
      { k: "Harvest", v: "November — January" },
    ],
  },
  {
    no: "03",
    jp: "三",
    word: ["In the", "Cup"],
    kicker: "The tasting",
    title: "Jasmine, white peach, a trace of honey.",
    body: "Poured at a measured ratio in slow concentric circles, then left to settle. The cup arrives delicate and layered — quietly rewarding a little patience.",
    specsTitle: "The pour",
    specs: [
      { k: "Ratio", v: "1 : 16" },
      { k: "Water", v: "92°C, just off the boil" },
      { k: "Total time", v: "2 min 45 sec" },
      { k: "Served", v: "Black, in warmed ceramic" },
    ],
  },
];

export function FeaturedCoffee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // spring-smoothed progress — eases every scroll-linked value so the
  // chapters glide between states instead of snapping with the wheel
  const progress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 22,
    mass: 0.7,
    restDelta: 0.0004,
  });

  const cupScale = useTransform(progress, [0, 1], [0.84, 1.18]);
  const cupY = useTransform(progress, [0, 0.5, 1], [48, -6, -58]);
  const cupRotate = useTransform(progress, [0, 1], [-2.6, 2.6]);
  const glowOpacity = useTransform(progress, [0, 0.5, 1], [0.28, 0.66, 0.34]);
  const glowScale = useTransform(progress, [0, 0.5, 1], [0.82, 1.2, 0.96]);
  const barScaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="coffee" className="relative bg-paper">
      {/* ---------- desktop: pinned cinematic scroll ---------- */}
      <div ref={ref} className="relative hidden h-[500vh] lg:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* breathing amber glow behind the cup */}
          <motion.div
            aria-hidden
            style={reduce ? { opacity: glowOpacity } : { opacity: glowOpacity, scale: glowScale }}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="h-[78vh] w-[78vh] rounded-full bg-[radial-gradient(circle,rgba(190,150,95,0.5),rgba(190,150,95,0.12)_42%,transparent_68%)] blur-[6px]" />
          </motion.div>

          {/* shared pinned cup */}
          <motion.div
            aria-hidden
            style={
              reduce
                ? undefined
                : { y: cupY, scale: cupScale, rotate: cupRotate }
            }
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <FeaturedCup />
          </motion.div>

          {/* chapters */}
          {CHAPTERS.map((c, i) => (
            <DesktopChapter key={c.no} i={i} data={c} progress={progress} />
          ))}

          {/* top bar */}
          <div className="shell pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between pt-8">
            <div className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-ink/30" />
              <span className="eyebrow">Featured — 喫茶 No.1</span>
            </div>
            <span className="index-mark">A single coffee, in three parts</span>
          </div>

          {/* progress rail with chapter ticks */}
          <div className="absolute inset-x-0 bottom-0 z-40 h-px bg-ink/10">
            <motion.div
              style={{ scaleX: barScaleX }}
              className="h-full origin-left bg-bean"
            />
            {[1 / 3, 2 / 3].map((p) => (
              <span
                key={p}
                aria-hidden
                style={{ left: `${p * 100}%` }}
                className="absolute bottom-0 h-2 w-px -translate-x-1/2 bg-ink/20"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- mobile: calm stacked version ---------- */}
      <div className="lg:hidden">
        <div className="shell py-20">
          <div className="flex items-center gap-3.5">
            <span className="h-px w-9 bg-ink/30" />
            <span className="eyebrow">Featured — 喫茶 No.1</span>
          </div>
          <Reveal className="mt-7">
            <h2 className="display text-display-md text-ink">
              A single coffee,
              <br />
              in three parts.
            </h2>
          </Reveal>
          <div className="mt-12 flex justify-center">
            <FeaturedCup />
          </div>
          <div className="mt-8 flex flex-col gap-px">
            {CHAPTERS.map((c) => (
              <Reveal key={c.no} className="border-t border-ink/12 py-9">
                <MobilePanel data={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function DesktopChapter({
  i,
  data,
  progress,
}: {
  i: number;
  data: Chapter;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const seg = 1 / 3;
  const s = i * seg;
  const e = s + seg;
  const lead = 0.13;

  const opStops =
    i === 0
      ? [0, e - lead, e]
      : [s, s + lead, e - lead, e];
  const opVals =
    i === 0 ? [1, 1, 0] : i === 2 ? [0, 1, 1, 1] : [0, 1, 1, 0];

  const yStops =
    i === 0 ? [0, e - lead, e] : [s, s + lead, e - lead, e];
  const yVals =
    i === 0 ? [0, 0, -54] : i === 2 ? [56, 0, 0, 0] : [56, 0, 0, -54];

  const opacity = useTransform(progress, opStops, opVals);
  const y = useTransform(progress, yStops, yVals);
  // text settles into focus — blur clears as the chapter arrives
  const blur = useTransform(opacity, [0, 1], ["blur(10px)", "blur(0px)"]);

  const style = reduce ? { opacity } : { opacity, y, filter: blur };

  return (
    <>
      {/* editorial text — left */}
      <motion.div
        style={style}
        className="shell pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2"
      >
        <div className="max-w-[336px]">
          <div className="flex items-center gap-3">
            <span className="jp text-[15px] text-bean">{data.jp}</span>
            <span className="index-mark">
              {data.no} — {data.kicker}
            </span>
          </div>
          <h3 className="display mt-5 text-[26px] leading-[1.16] text-ink">
            {data.title}
          </h3>
          <p className="mt-5 text-[14px] leading-[1.74] text-ink-soft">
            {data.body}
          </p>
        </div>
      </motion.div>

      {/* spec panel — right */}
      <motion.div
        style={style}
        className="shell pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2"
      >
        <div className="ml-auto w-[300px]">
          <SpecPanel data={data} />
        </div>
      </motion.div>
    </>
  );
}

function SpecPanel({ data }: { data: Chapter }) {
  return (
    <div className="border border-ink/15 bg-paper-soft/60 p-7 backdrop-blur-sm">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">{data.specsTitle}</span>
        <span className="jp text-[13px] text-ink-mute">珈琲</span>
      </div>
      <div className="mt-6 flex flex-col">
        {data.specs.map((s) => (
          <div
            key={s.k}
            className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-3 first:border-t-0"
          >
            <span className="text-[11px] uppercase tracking-wider2 text-ink-mute">
              {s.k}
            </span>
            <span className="text-right text-[13.5px] text-ink">{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobilePanel({ data }: { data: Chapter }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="jp text-[15px] text-bean">{data.jp}</span>
        <span className="index-mark">
          {data.no} — {data.kicker}
        </span>
      </div>
      <h3 className="display mt-4 text-[23px] leading-[1.2] text-ink">
        {data.title}
      </h3>
      <p className="mt-4 text-[14px] leading-[1.74] text-ink-soft">
        {data.body}
      </p>
      <div className="mt-6">
        <SpecPanel data={data} />
      </div>
    </div>
  );
}

function FeaturedCup() {
  return (
    <div className="relative w-[clamp(258px,31vw,440px)]">
      {/* rising steam — wisps off the crema */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] flex justify-center gap-7"
      >
        <span className="steam-a h-28 w-2 rounded-full bg-gradient-to-t from-transparent via-white/55 to-transparent blur-[4px]" />
        <span className="steam-b h-28 w-2 rounded-full bg-gradient-to-t from-transparent via-white/45 to-transparent blur-[5px]" />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/latte-cup.png"
        alt="A latte with hand-poured latte art"
        className="relative w-full object-contain [filter:drop-shadow(0_30px_55px_rgba(20,13,8,0.3))]"
      />
    </div>
  );
}
