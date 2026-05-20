"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const TIMES = [
  "07:30",
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
];

const DETAILS = [
  { label: "Address", lines: ["No. 4, Yanaka", "Taitō, Tokyo"] },
  { label: "Hours", lines: ["Daily — 07:00 to 18:00", "Last pour at 17:30"] },
  {
    label: "Getting here",
    lines: ["Three minutes on foot", "from Nippori station"],
  },
  { label: "Contact", lines: ["hello@kissa.coffee", "+81 3 0000 0000"] },
];

export function Reservation() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="visit"
      className="relative overflow-hidden bg-coffee py-[clamp(6.5rem,13vw,12.5rem)]"
    >
      <span
        aria-hidden
        className="jp pointer-events-none absolute -left-[2vw] bottom-[-6%] select-none text-[40vw] leading-none text-cream/[0.035] lg:text-[22vw]"
      >
        予約
      </span>

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* invitation + details */}
          <div className="lg:col-span-5">
            <Reveal className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-cream/35" />
              <span className="eyebrow-cream">Visit — 予約</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-7 text-display-lg text-cream">
                Reserve a place
                <br />
                at the counter.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-[400px] text-[14.5px] leading-[1.78] text-cream-soft">
                Fourteen seats face the counter, and a few are held each day for
                those who simply walk in. To be certain of a place — especially
                in the slow morning hours — leave us a note below.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9">
              {DETAILS.map((d, i) => (
                <Reveal key={d.label} delay={0.1 + i * 0.06}>
                  <div className="border-t border-cream/15 pt-4">
                    <span className="eyebrow-cream">{d.label}</span>
                    <div className="mt-2.5 flex flex-col gap-0.5">
                      {d.lines.map((l) => (
                        <span key={l} className="text-[13.5px] text-cream">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <div className="relative border border-cream/15 bg-espresso/40 p-7 backdrop-blur-sm sm:p-10">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease }}
                      className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    >
                      <span className="jp text-[44px] leading-none text-cream">
                        承
                      </span>
                      <h3 className="display mt-6 text-[24px] text-cream">
                        Your request is in.
                      </h3>
                      <p className="mt-3 max-w-[320px] text-[13.5px] leading-relaxed text-cream-soft">
                        We will confirm your seat by email shortly. The kettle
                        will be on.
                      </p>
                      <button
                        onClick={() => setSent(false)}
                        className="link-underline mt-7 text-[13px] text-cream"
                      >
                        Make another request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                      className="flex flex-col gap-7"
                    >
                      <Field label="Name">
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          className="res-input"
                        />
                      </Field>
                      <Field label="Email">
                        <input
                          required
                          type="email"
                          placeholder="you@example.com"
                          className="res-input"
                        />
                      </Field>
                      <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
                        <Field label="Date">
                          <input
                            required
                            type="date"
                            className="res-input"
                          />
                        </Field>
                        <Field label="Time">
                          <select required className="res-input" defaultValue="">
                            <option value="" disabled>
                              Select
                            </option>
                            {TIMES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Guests">
                          <select required className="res-input" defaultValue="2">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <Field label="A note (optional)">
                        <input
                          type="text"
                          placeholder="Anything we should know"
                          className="res-input"
                        />
                      </Field>

                      <button
                        type="submit"
                        className="btn-cream mt-2 justify-center"
                      >
                        <span>Request a seat</span>
                      </button>
                      <p className="text-center text-[11.5px] text-cream-soft/80">
                        A reply usually reaches you within the day.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="eyebrow-cream">{label}</span>
      {children}
    </label>
  );
}
