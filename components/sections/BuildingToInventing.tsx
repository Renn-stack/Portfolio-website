"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";
import { SectionMarker } from "@/components/ui/Marks";

const A = "I stopped asking what technology could do.";
const B = "I started asking what technology should exist.";

/**
 * Native sticky scroll (no hijacking): the first statement dissolves into the second
 * as the visitor scrolls through a tall track.
 */
export function BuildingToInventing() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const aOpacity = useTransform(scrollYProgress, [0.05, 0.38, 0.5], [1, 1, 0]);
  const aBlur = useTransform(scrollYProgress, [0.38, 0.5], ["blur(0px)", "blur(14px)"]);
  const aY = useTransform(scrollYProgress, [0.3, 0.5], [0, -40]);
  const bOpacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const bBlur = useTransform(scrollYProgress, [0.5, 0.62], ["blur(14px)", "blur(0px)"]);
  const bY = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduce) {
    return (
      <section ref={ref} aria-labelledby="evolution-title" className="relative px-gutter bg-black py-[24vh]">
        <SectionMarker index="07" label="From building to inventing" className="mb-16" />
        <h2 id="evolution-title" className="sr-only">
          From building to inventing
        </h2>
        <p className="display-lg max-w-[18ch] text-dim">{A}</p>
        <p className="display-lg mt-16 max-w-[18ch] text-fg">{B}</p>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="evolution-title" className="relative h-[280vh] bg-black">
      <h2 id="evolution-title" className="sr-only">
        From building to inventing
      </h2>
      <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden px-gutter py-24 md:py-28">
        <div className="flex items-center justify-between">
          <SectionMarker index="07" label="From building to inventing" />
          <div className="meta hidden items-center gap-3 text-dim md:flex">
            <span>Developer</span>
            <span className="relative block h-px w-24 bg-line-strong">
              <motion.span className="absolute inset-0 origin-left bg-signal" style={{ scaleX: bar }} />
            </span>
            <span className="text-fg">Inventor</span>
          </div>
        </div>

        <div className="relative">
          <motion.p
            className="display-lg max-w-[18ch] text-fg"
            style={{ opacity: aOpacity, filter: aBlur, y: aY }}
          >
            {A}
          </motion.p>
          <motion.p
            aria-hidden
            className="display-lg absolute inset-x-0 top-0 max-w-[18ch] text-fg"
            style={{ opacity: bOpacity, filter: bBlur, y: bY }}
          >
            {B.split(" ").map((w, i) => (
              <span key={i} className={w === "should" ? "text-signal" : undefined}>
                {w}{" "}
              </span>
            ))}
          </motion.p>
          <span className="sr-only">{B}</span>
        </div>

        <p className="meta text-dim">Observe → Question → Experiment → Build → Invent</p>
      </div>
    </section>
  );
}
