"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Plate } from "./plate";
import { Reveal } from "./reveal";

type Shot = {
  img: string;
  label: string;
  jp: string;
  ratio: string;
};

const LEFT: Shot[] = [
  {
    img: "/images/room-1-window.jpg",
    label: "The long window",
    jp: "窓",
    ratio: "aspect-[5/4]",
  },
  {
    img: "/images/room-2-morning.jpg",
    label: "Seven in the morning",
    jp: "朝",
    ratio: "aspect-[4/3]",
  },
];

const RIGHT: Shot[] = [
  {
    img: "/images/room-3-counter.jpg",
    label: "The oak counter",
    jp: "檜",
    ratio: "aspect-[4/3]",
  },
  {
    img: "/images/room-4-seats.jpg",
    label: "Fourteen seats, no more",
    jp: "席",
    ratio: "aspect-[5/4]",
  },
];

export function Gallery() {
  return (
    <section
      id="room"
      className="relative overflow-hidden bg-espresso py-[clamp(6.5rem,13vw,12.5rem)]"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-cream/35" />
              <span className="eyebrow-cream">The room — 室</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-7 text-display-lg text-cream">
                A space designed
                <br />
                to be{" "}
                <span className="font-light text-cream-soft">unremarkable.</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end lg:col-span-5 lg:justify-end">
            <Reveal delay={0.14}>
              <p className="max-w-[340px] text-[14px] leading-[1.76] text-cream-soft">
                Pale timber, raw plaster, a long window facing east. Nothing in
                the room asks for attention — which is exactly how it gives the
                coffee, and the quiet, room to be noticed.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
          <div className="flex flex-col gap-7 sm:gap-8">
            {LEFT.map((s, i) => (
              <GalleryFrame key={s.label} shot={s} speed={i === 0 ? 15 : 10} />
            ))}
          </div>
          <div className="flex flex-col gap-7 sm:gap-8 sm:pt-[5.5rem]">
            {RIGHT.map((s, i) => (
              <GalleryFrame key={s.label} shot={s} speed={i === 0 ? 12 : 16} />
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex items-center justify-between border-t border-cream/15 pt-6">
            <span className="text-[12.5px] text-cream-soft">
              No. 4, Yanaka — a corner room on a quiet lane
            </span>
            <span className="vrl hidden text-[11px] text-cream-soft/70 sm:inline-block">
              静かな部屋
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryFrame({ shot, speed }: { shot: Shot; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <Reveal>
      <div className={`relative overflow-hidden ${shot.ratio}`}>
        <motion.div
          style={reduce ? undefined : { y }}
          className="absolute inset-0 scale-[1.22]"
        >
          <Plate src={shot.img} alt={shot.label} className="h-full w-full" />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background:
              "linear-gradient(to top, rgba(18,12,8,0.82), transparent)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
          <span className="text-[11px] uppercase tracking-wider2 text-cream/90">
            {shot.label}
          </span>
          <span className="jp text-[15px] text-cream/75">{shot.jp}</span>
        </div>
      </div>
    </Reveal>
  );
}
