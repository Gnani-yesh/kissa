"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Coffee", href: "#coffee", jp: "一" },
  { label: "Philosophy", href: "#philosophy", jp: "二" },
  { label: "Brewing", href: "#brewing", jp: "三" },
  { label: "The Room", href: "#room", jp: "四" },
  { label: "Menu", href: "#menu", jp: "五" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 56);
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[600ms] ease-cinematic",
          scrolled
            ? "border-b border-ink/10 bg-paper-soft/82 py-3.5 backdrop-blur-xl"
            : "border-b border-transparent py-6"
        )}
      >
        <div className="shell flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-2.5">
            <span
              className={cn(
                "text-[20px] font-bold tracking-tight-display transition-colors duration-500",
                scrolled ? "text-ink" : "text-cream"
              )}
            >
              Kissa
            </span>
            <span
              className={cn(
                "jp text-[13px] transition-colors duration-500",
                scrolled ? "text-ink-mute" : "text-cream-soft"
              )}
            >
              喫茶
            </span>
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "link-underline text-[13.5px] transition-colors duration-500",
                  scrolled
                    ? "text-ink-soft hover:text-ink"
                    : "text-cream-soft hover:text-cream"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#visit"
              className={cn(
                "hidden items-center rounded-full px-5 py-2.5 text-[12.5px] font-medium transition-all duration-500 ease-cinematic sm:inline-flex",
                scrolled
                  ? "bg-espresso text-paper hover:bg-bean"
                  : "border border-cream/35 text-cream hover:border-cream/70 hover:bg-cream/[0.06]"
              )}
            >
              Reserve a seat
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span
                  className={cn(
                    "h-px w-5 transition-colors duration-500",
                    scrolled ? "bg-ink" : "bg-cream"
                  )}
                />
                <span
                  className={cn(
                    "h-px w-5 transition-colors duration-500",
                    scrolled ? "bg-ink" : "bg-cream"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-[80] bg-paper-soft"
          >
            <div className="grain pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-soft-light" />
            <div className="shell relative flex items-center justify-between py-6">
              <span className="flex items-baseline gap-2.5">
                <span className="text-[20px] font-bold tracking-tight-display text-ink">
                  Kissa
                </span>
                <span className="jp text-[13px] text-ink-mute">喫茶</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center"
              >
                <span className="relative h-4 w-4">
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 rotate-45 bg-ink" />
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 -rotate-45 bg-ink" />
                </span>
              </button>
            </div>

            <nav className="shell relative mt-6 flex flex-col">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.08 + i * 0.06 }}
                  className="group flex items-baseline gap-5 border-b border-ink/10 py-5"
                >
                  <span className="jp text-[15px] text-ink-mute">{l.jp}</span>
                  <span className="text-[8vw] font-medium leading-none tracking-tight-display text-ink transition-colors duration-300 group-hover:text-bean sm:text-[42px]">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="shell relative mt-10 flex flex-col gap-6">
              <a
                href="#visit"
                onClick={() => setOpen(false)}
                className="btn-solid w-full justify-center"
              >
                <span>Reserve a seat</span>
              </a>
              <p className="text-[12.5px] leading-relaxed text-ink-mute">
                No. 4, Yanaka — open daily, 07:00 to 18:00
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
