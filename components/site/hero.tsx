"use client";

import { motion } from "framer-motion";
import { Plate } from "./plate";

const ease = [0.16, 1, 0.3, 1] as const;

const META = [
  { label: "Location", value: "Yanaka, Tokyo" },
  { label: "Hours", value: "07:00 – 18:00, daily" },
  { label: "Seating", value: "Fourteen, at the counter" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-espresso"
    >
      {/* static photographic ground */}
      <div className="absolute inset-0 z-0">
        <Plate
          variant="interiorWarm"
          src="/images/hero-room.jpg"
          alt="The Kissa coffee room in morning light"
          className="h-full w-full"
          vignette={false}
        />
        {/* cinematic scrim — uniform dim + directional weight under the type */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(108deg, rgba(6,4,2,0.62) 0%, rgba(6,4,2,0.22) 36%, transparent 60%), linear-gradient(to top, rgba(8,5,3,0.92) 0%, rgba(8,5,3,0.6) 26%, rgba(8,5,3,0.2) 48%, transparent 64%), linear-gradient(to bottom, rgba(8,5,3,0.55) 0%, transparent 18%), linear-gradient(180deg, rgba(10,7,4,0.38), rgba(10,7,4,0.38))",
          }}
        />
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-between pb-8 pt-28 sm:pt-32">
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

          <div className="relative max-w-[1200px]">
            <h1 className="display text-cream text-[clamp(2.7rem,8vw,7.2rem)] leading-[0.94] tracking-tightest">
              <Line delay={0.28}>A quiet room</Line>
              <Line delay={0.42}>for slow coffee.</Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.72 }}
              className="mt-7 max-w-[486px] text-pretty text-[15px] leading-[1.72] text-cream-soft sm:text-[16px]"
            >
              Kissa keeps the kissaten tradition — single-origin beans, ground
              and hand-poured to order, served without hurry in a space built
              for stillness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.86 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
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
          className="mt-9"
        >
          <div className="hairline-cream" />
          <div className="flex flex-wrap items-end justify-between gap-y-6 pt-5">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-14">
              {META.map((m) => (
                <div key={m.label} className="flex flex-col gap-1.5">
                  <span className="eyebrow-cream">{m.label}</span>
                  <span className="text-[14px] text-cream">{m.value}</span>
                </div>
              ))}
            </div>

            <span className="jp hidden text-[13px] tracking-wide text-cream-soft/70 sm:block">
              東京 · 谷中
            </span>
          </div>
        </motion.div>
      </div>
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
