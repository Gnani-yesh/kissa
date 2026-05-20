"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
};

/** Slow, cinematic fade-up triggered when the element enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 1.15,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Reveals each child in sequence — for lists and stacked lines. */
export function RevealGroup({
  children,
  className,
  stagger = 0.085,
  delay = 0,
  y = 24,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.05, ease },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
