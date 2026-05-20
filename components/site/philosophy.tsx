"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Plate } from "./plate";
import { Reveal } from "./reveal";

const PRINCIPLES = [
  {
    jp: "間",
    romaji: "Ma",
    name: "The pause",
    body: "Space and silence treated as ingredients — not as absence, but as part of the cup.",
  },
  {
    jp: "丁寧",
    romaji: "Teinei",
    name: "The care",
    body: "Every step done deliberately and by hand. We would rather be slow than be careless.",
  },
  {
    jp: "一期一会",
    romaji: "Ichi-go ichi-e",
    name: "The once",
    body: "Each cup met as a meeting that will not return — this coffee, this light, this once.",
  },
];

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "9%"]);
  const kanjiY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative overflow-hidden bg-coffee py-[clamp(6.5rem,13vw,12.5rem)]"
    >
      {/* faint kanji watermark */}
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: kanjiY }}
        className="jp pointer-events-none absolute -right-[3vw] top-[6%] select-none text-[42vw] leading-none text-cream/[0.035] sm:text-[30vw] lg:text-[24vw]"
      >
        間
      </motion.span>

      <div className="shell relative">
        <Reveal className="flex items-center gap-3.5">
          <span className="h-px w-9 bg-cream/35" />
          <span className="eyebrow-cream">Our philosophy</span>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
          {/* statement */}
          <div className="lg:col-span-7 lg:pt-6">
            <Reveal>
              <h2 className="display text-display-lg text-cream">
                A slower hour,
                <br />
                kept{" "}
                <span className="font-light text-cream-soft">on purpose.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-9 max-w-[460px]">
              <p className="text-[15.5px] leading-[1.78] text-cream-soft">
                Kissa borrows its name from the <span className="jp">喫茶店</span>{" "}
                — the old Tokyo coffee house, where an afternoon could be spent
                over a single cup and no one thought to hurry you.
              </p>
              <p className="mt-5 text-[15.5px] leading-[1.78] text-cream-soft">
                We have kept that idea intact. The room is quiet on purpose. The
                coffee is made in front of you, at the speed it asks for. Time,
                here, is something we give back.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-10">
              <span className="vrl hidden text-[12px] text-cream-soft/70 lg:inline-block">
                急がない、それがすべて
              </span>
            </Reveal>
          </div>

          {/* layered image */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="relative">
                <div className="absolute -inset-3 border border-cream/10" />
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div
                    style={reduce ? undefined : { y: imageY }}
                    className="absolute inset-0 scale-[1.16]"
                  >
                    <Plate
                      variant="interiorDark"
                      src="/images/philosophy-counter.jpg"
                      alt="The counter, mid-morning"
                      className="h-full w-full"
                    />
                  </motion.div>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(18,12,8,0.8), transparent)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
                    <span className="text-[11px] uppercase tracking-wider2 text-cream/80">
                      The counter, mid-morning
                    </span>
                    <span className="jp text-[13px] text-cream/70">静</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* principles */}
        <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.romaji}
              delay={i * 0.1}
              className="border-t border-cream/15 pt-7 sm:pr-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="jp text-[30px] leading-none text-cream">
                  {p.jp}
                </span>
                <span className="text-[11px] uppercase tracking-wider2 text-cream-soft">
                  {p.romaji}
                </span>
              </div>
              <h3 className="mt-5 text-[16px] font-medium text-cream">
                {p.name}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-[1.72] text-cream-soft">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
