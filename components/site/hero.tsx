"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Plate } from "./plate";

const ease = [0.16, 1, 0.3, 1] as const;

const META = [
  { label: "Location", value: "Yanaka, Tokyo" },
  { label: "Hours", value: "07:00 – 18:00, daily" },
  { label: "Seating", value: "Fourteen, at the counter" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.62], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-espresso"
    >
      {/* parallax photographic ground */}
      <motion.div
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <Plate
          variant="interiorWarm"
          src="/images/hero-room.jpg"
          alt="The Kissa coffee room in morning light"
          className="h-full w-full"
          vignette={false}
        />
        {/* cinematic scrim — keeps the cream type legible without crushing the photo */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(14,9,6,0.82) 0%, rgba(14,9,6,0.4) 26%, rgba(14,9,6,0.06) 46%, transparent 60%), linear-gradient(to bottom, rgba(11,7,4,0.42) 0%, transparent 16%)",
          }}
        />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: fade }}
        className="shell relative z-10 flex min-h-[100svh] flex-col justify-between pb-10 pt-32 sm:pt-36"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="flex items-center gap-3.5"
        >
          <span className="h-px w-9 bg-cream/40" />
          <span className="eyebrow-cream">Specialty coffee — since 2019</span>
        </motion.div>

        {/* headline block */}
        <div className="relative flex flex-1 items-end">
          {/* faint kanji watermark */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease, delay: 0.6 }}
            className="jp pointer-events-none absolute -top-[6%] right-0 select-none text-[34vw] leading-none text-cream/[0.09] sm:text-[24vw] lg:text-[18vw]"
          >
            珈琲
          </motion.span>

          {/* vertical decorative line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 1 }}
            className="absolute bottom-2 right-0 hidden items-center gap-4 md:flex"
          >
            <span className="vrl text-[13px] text-cream-soft/80">
              ゆっくり淹れる
            </span>
            <span className="h-28 w-px bg-cream/25" />
          </motion.div>

          <div className="relative max-w-[1040px]">
            <h1 className="display text-display-2xl text-cream">
              <Line delay={0.28}>A quiet room</Line>
              <Line delay={0.42}>
                for{" "}
                <span className="font-light tracking-tight-display text-cream-soft">
                  slow
                </span>{" "}
                coffee.
              </Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.72 }}
              className="mt-8 max-w-[486px] text-pretty text-[15px] leading-[1.72] text-cream-soft sm:text-[16px]"
            >
              Kissa keeps the kissaten tradition — single-origin beans, ground
              and hand-poured to order, served without hurry in a space built
              for stillness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.86 }}
              className="mt-10 flex flex-wrap items-center gap-3.5"
            >
              <a href="#visit" className="btn-solid">
                <span>Reserve a seat</span>
              </a>
              <a href="#coffee" className="btn-line-cream">
                Explore the coffee
              </a>
            </motion.div>
          </div>
        </div>

        {/* base meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: 1.1 }}
          className="mt-14"
        >
          <div className="hairline-cream" />
          <div className="flex flex-wrap items-end justify-between gap-y-7 pt-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-14">
              {META.map((m) => (
                <div key={m.label} className="flex flex-col gap-1.5">
                  <span className="eyebrow-cream">{m.label}</span>
                  <span className="text-[14px] text-cream">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10.5px] uppercase tracking-widest2 text-cream-soft">
                Scroll
              </span>
              <span className="relative block h-12 w-px overflow-hidden bg-cream/20">
                <span className="absolute left-0 top-0 h-3 w-px animate-scroll-cue bg-cream" />
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.25, ease, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
