"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
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
      { k: "Roast", v: "Light — filter" },
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

  const cupScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.07]);
  const cupY = useTransform(scrollYProgress, [0, 1], [20, -22]);
  const cupRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="coffee" className="relative bg-paper">
      {/* ---------- desktop: pinned cinematic scroll ---------- */}
      <div ref={ref} className="relative hidden h-[340vh] lg:block">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
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
            <DesktopChapter
              key={c.no}
              i={i}
              data={c}
              progress={scrollYProgress}
            />
          ))}

          {/* top bar */}
          <div className="shell pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between pt-8">
            <div className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-ink/30" />
              <span className="eyebrow">Featured — 喫茶 No.1</span>
            </div>
            <span className="index-mark">A single coffee, in three parts</span>
          </div>

          {/* progress rail */}
          <div className="absolute inset-x-0 bottom-0 z-40 h-px bg-ink/10">
            <motion.div
              style={{ scaleX: barScaleX }}
              className="h-full origin-left bg-bean"
            />
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
  const lead = 0.055;

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

  const wordYVals =
    i === 0 ? [0, 0, -120] : i === 2 ? [130, 0, 0, 0] : [130, 0, 0, -120];

  const opacity = useTransform(progress, opStops, opVals);
  const y = useTransform(progress, yStops, yVals);
  const wordY = useTransform(progress, yStops, wordYVals);

  const style = reduce ? { opacity } : { opacity, y };
  const wordStyle = reduce ? { opacity } : { opacity, y: wordY };

  return (
    <>
      {/* oversized chapter word — bleeds full width, behind the cup */}
      <motion.div
        aria-hidden
        style={wordStyle}
        className="absolute left-1/2 top-1/2 z-0 w-screen -translate-x-1/2 -translate-y-1/2 select-none text-center"
      >
        <span className="block text-[clamp(5rem,15.5vw,15rem)] font-bold uppercase leading-[0.82] tracking-tightest text-bean/[0.16]">
          {data.word[0]}
        </span>
        <span className="block text-[clamp(5rem,15.5vw,15rem)] font-bold uppercase leading-[0.82] tracking-tightest text-bean/[0.16]">
          {data.word[1]}
        </span>
      </motion.div>

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
    <div className="relative w-[clamp(258px,31vw,408px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/featured-cup.jpg"
        alt="A cup of single-origin filter coffee, hand poured"
        className="aspect-square w-full object-cover shadow-[0_55px_95px_-42px_rgba(20,13,8,0.62)]"
      />
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-soft-light"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-ink/10"
      />
      <span className="absolute right-4 top-4 jp text-[12px] text-cream/75">
        珈琲
      </span>
    </div>
  );
}
