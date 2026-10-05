"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";
import { LineReveal, Reveal, WordReveal } from "@/components/ui/Reveal";
import { SectionMarker } from "@/components/ui/Marks";

const EASE = [0.16, 1, 0.3, 1] as const;
const STEPS = ["Computer", "Audio", "Transmission", "Processor"] as const;

export function IdeaStayed() {
  return (
    <section aria-labelledby="idea-title" className="relative overflow-hidden bg-black">
      {/* The timeline spine enters from above */}
      <div aria-hidden className="absolute left-[var(--gutter)] top-0 h-[22vh] w-px bg-gradient-to-b from-white/40 to-transparent md:left-[calc(var(--gutter)+4vw)]" />

      <div className="px-gutter mx-auto max-w-[1600px] pb-[16vh] pt-[30vh] md:pt-[38vh]">
        <SectionMarker index="05" label="The idea stayed" className="mb-14 md:mb-20" />

        <WordReveal
          as="h2"
          id="idea-title"
          text="But the idea didn’t end there."
          className="display-lg max-w-[16ch] text-fg"
          stagger={0.16}
        />

        <div className="mt-[22vh] md:mt-[30vh]">
          <p className="meta mb-8 text-dim">Q—01</p>
          <WordReveal
            text="How could I transmit audio from a computer to a cochlear implant processor?"
            className="display-md max-w-[22ch] font-light text-soft"
            stagger={0.22}
            accent={["transmit", "audio"]}
          />
        </div>

        <SignalFlow />

        <Introducing />
      </div>
    </section>
  );
}

function SignalFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotionSafe();
  const stepDur = 0.9;

  return (
    <div ref={ref} className="relative mx-auto my-[20vh] max-w-md md:my-[26vh]">
      <ol aria-label="Signal path" className="relative flex flex-col items-center">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-col items-center">
            <motion.div
              className="relative flex w-64 items-center justify-between border border-line px-5 py-4 md:w-80"
              initial={{ opacity: 0.25 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * stepDur }}
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 border border-signal"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 1, 0.35] } : {}}
                transition={{ duration: 1.2, delay: i * stepDur, times: [0, 0.3, 1] }}
              />
              <span className="meta text-dim">0{i + 1}</span>
              <span className="text-lg font-medium uppercase tracking-[0.18em] text-fg md:text-xl">{s}</span>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal/70" />
            </motion.div>

            {i < STEPS.length - 1 && (
              <div aria-hidden className="relative h-20 w-px bg-line md:h-24">
                <motion.span
                  className="absolute inset-x-0 top-0 h-full origin-top bg-signal/60"
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: stepDur * 0.8, ease: EASE, delay: i * stepDur + 0.2 }}
                />
                {/* travelling packet */}
                {!reduce && <motion.span
                  className="absolute -left-[2px] h-3 w-[5px] rounded-full bg-signal shadow-[0_0_14px_rgba(111,211,255,0.9)]"
                  initial={{ top: "-10%", opacity: 0 }}
                  animate={inView ? { top: ["-10%", "100%"], opacity: [0, 1, 0] } : {}}
                  transition={{
                    duration: 1.4,
                    ease: "easeInOut",
                    delay: STEPS.length * stepDur + i * 0.45,
                    repeat: Infinity,
                    repeatDelay: 2.4,
                  }}
                />}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Introducing() {
  return (
    <div className="grid gap-14 border-t border-line pt-14 md:grid-cols-12 md:pt-20">
      <div className="md:col-span-6">
        <Reveal>
          <p className="meta text-signal">February 2025</p>
        </Reveal>
        <LineReveal as="h3" lines={["Wallas", "Stream"]} className="display-lg mt-6 uppercase text-fg" delay={0.1} />
        <Reveal delay={0.2}>
          <p className="meta mt-6 text-soft">Independent Invention · Audio · Accessibility</p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="meta mt-10 flex items-center gap-3 text-dim">
            <span>Academic exploration</span>
            <span aria-hidden className="h-px w-10 bg-signal" />
            <span className="text-fg">Independent invention</span>
          </p>
        </Reveal>
      </div>

      <div className="md:col-span-5 md:col-start-8 md:pt-12">
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ staggerChildren: 0.5 }}
          className="space-y-3 text-[clamp(1.5rem,2.6vw,2.5rem)] font-light leading-[1.15] tracking-[-0.025em]"
        >
          {["I had no team.", "I had no previous experience building this kind of system."].map((t) => (
            <motion.p
              key={t}
              className="text-soft"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } } }}
            >
              {t}
            </motion.p>
          ))}
          <motion.p
            className="pt-4 font-normal text-fg"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: EASE } } }}
          >
            I built it anyway.
          </motion.p>
        </motion.blockquote>
      </div>
    </div>
  );
}
