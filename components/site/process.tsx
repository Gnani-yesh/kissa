"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Plate } from "./plate";
import { Reveal } from "./reveal";

type Step = {
  no: string;
  jp: string;
  name: string;
  title: string;
  body: string;
  img: string;
};

const STEPS: Step[] = [
  {
    no: "01",
    jp: "一",
    name: "Source",
    title: "Single origin, never blended",
    body: "Every coffee on the counter traces back to one farm, one washing station, one harvest. Nothing is hidden inside a blend, so nothing needs to be.",
    img: "/images/brew-1-source.jpg",
  },
  {
    no: "02",
    jp: "二",
    name: "Grind",
    title: "Ground the moment you order",
    body: "Beans are weighed to the gram and ground seconds before brewing — the aromatics reach the water before they have a chance to reach the air.",
    img: "/images/brew-2-grind.jpg",
  },
  {
    no: "03",
    jp: "三",
    name: "Bloom",
    title: "A first pour, then a pause",
    body: "Just enough water to wet the grounds, then thirty still seconds while the coffee releases its gas and quietly opens.",
    img: "/images/brew-3-bloom.jpg",
  },
  {
    no: "04",
    jp: "四",
    name: "Pour",
    title: "Slow circles, a steady thread",
    body: "Water at ninety-two degrees, poured in unhurried concentric circles. This is the part of the ritual we refuse, on principle, to rush.",
    img: "/images/brew-4-pour.jpg",
  },
];

export function Process() {
  return (
    <section
      id="brewing"
      className="relative bg-paper py-[clamp(6.5rem,13vw,12.5rem)]"
    >
      <div className="shell">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-ink/30" />
              <span className="eyebrow">The brewing — 淹れ方</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-7 text-display-lg text-ink">
                Four unhurried
                <br />
                steps to a cup.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-[330px] text-[14px] leading-[1.74] text-ink-soft">
              Nothing about the pour-over is complicated. It is only deliberate
              — each step given the time it asks for, and no less.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col">
          {STEPS.map((step, i) => (
            <StepRow key={step.no} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepRow({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "11%"]);
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 items-center gap-x-12 gap-y-8 border-t border-ink/12 py-12 lg:grid-cols-12 lg:py-16"
    >
      {/* text */}
      <div
        className={`lg:col-span-5 ${
          flipped ? "lg:order-2 lg:col-start-8" : "lg:order-1"
        }`}
      >
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="text-[clamp(2.6rem,5vw,4rem)] font-bold leading-none tracking-tightest text-ink/12">
              {step.no}
            </span>
            <span className="jp text-[20px] text-bean">{step.jp}</span>
            <span className="eyebrow">{step.name}</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="display mt-6 text-display-md text-ink">
            {step.title}
          </h3>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-5 max-w-[400px] text-[14.5px] leading-[1.76] text-ink-soft">
            {step.body}
          </p>
        </Reveal>
      </div>

      {/* image */}
      <div
        className={`lg:col-span-6 ${
          flipped ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7"
        }`}
      >
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/11] overflow-hidden">
            <motion.div
              style={reduce ? undefined : { y: imageY }}
              className="absolute inset-0 scale-[1.18]"
            >
              <Plate
                src={step.img}
                alt={step.title}
                className="h-full w-full"
              />
            </motion.div>
            <span className="absolute right-5 top-5 jp text-[13px] text-cream/80">
              {step.jp}
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
