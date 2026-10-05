"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { CornerMarks, MetaRow, SectionMarker } from "@/components/ui/Marks";
import { ResearchPlate } from "@/components/viz/ResearchPlate";
import { FormStudy } from "@/components/viz/FormStudy";

/**
 * Sections 03 + 04 share a single timeline spine that draws itself on scroll
 * and continues into "The idea stayed".
 */
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });
  const headTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative bg-ink">
      {/* Spine */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--gutter)] w-px md:left-[calc(var(--gutter)+4vw)]">
        <div className="absolute inset-0 bg-line" />
        <motion.div className="absolute inset-0 origin-top bg-gradient-to-b from-signal/70 via-white/40 to-white/40" style={{ scaleY: progress }} />
        <motion.div className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-signal shadow-[0_0_16px_2px_rgba(111,211,255,0.6)]" style={{ top: headTop }} />
      </div>

      <Cochlear />
      <GummyHear />
    </div>
  );
}

function Node({ code }: { code: string }) {
  return (
    <div aria-hidden className="absolute left-[var(--gutter)] top-2 -translate-x-1/2 md:left-[calc(var(--gutter)+4vw)]">
      <motion.span
        className="block h-3 w-3 rounded-full border border-signal bg-ink"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -30% 0px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="meta absolute left-5 top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[10px] text-dim md:block">{code}</span>
    </div>
  );
}

function Cochlear() {
  return (
    <section data-chapter="2024" aria-labelledby="cochlear-title" className="relative py-[16vh] md:py-[22vh]">
      <div className="relative">
        <Node code="T—01" />
        <div className="pl-[calc(var(--gutter)+2rem)] pr-[var(--gutter)] md:pl-[calc(var(--gutter)+4vw+5rem)]">
          <SectionMarker index="03" label="Journey" className="mb-12 md:mb-16" />

          <LineReveal
            lines={["06 / 2024"]}
            className="display-xl font-light tabular-nums tracking-[-0.06em] text-fg"
          />

          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
            <div className="md:col-span-6">
              <Reveal>
                <h2 id="cochlear-title" className="display-md uppercase text-fg">
                  Cochlear
                  <br />
                  Volunteer
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="meta mt-6 text-signal">Community · Accessibility · Hearing Technology</p>
              </Reveal>
            </div>
            <Reveal className="md:col-span-5 md:col-start-8 md:pt-3" delay={0.25}>
              <p className="lede text-soft">
                Renata began volunteering with Cochlear in June 2024, gaining direct experience with the community
                surrounding cochlear implants and hearing technology.
              </p>
              <p className="meta mt-8 text-dim">Entry 01 — First point on the timeline</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function GummyHear() {
  return (
    <section data-chapter="2025" aria-labelledby="gummy-title" className="relative pb-[18vh] pt-[8vh] md:pb-[22vh]">
      <div className="relative">
        <Node code="T—02" />
        <div className="pl-[calc(var(--gutter)+2rem)] pr-[var(--gutter)] md:pl-[calc(var(--gutter)+4vw+5rem)]">
          <SectionMarker index="04" label="Research artifact" className="mb-12 md:mb-16" />

          <LineReveal
            lines={["02 / 2025"]}
            className="display-xl font-light tabular-nums tracking-[-0.06em] text-fg"
          />

          <div className="mt-12 md:mt-16">
            <LineReveal as="h2" id="gummy-title" lines={["Gummy Hear"]} className="display-lg uppercase text-fg" delay={0.1} />
            <Reveal delay={0.2}>
              <p className="meta mt-6 text-signal">Assistive Technology · Research · Cochlear Implants</p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="lede text-soft">
                  During her time at Tecnológico de Monterrey, Renata explored an assistive hearing device designed
                  around the needs of cochlear implant users.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <dl className="mt-10 border-b border-line">
                  <MetaRow k="Institution" v="Tecnológico de Monterrey" />
                  <MetaRow k="Publication" v="IEEE Conference Publication" />
                  <MetaRow k="Type" v="Academic Research" />
                  <MetaRow k="Collaboration" v="Debbie Crystal Hernández Zárate" />
                </dl>
              </Reveal>

              <Reveal delay={0.25} className="relative mt-10 hidden aspect-square max-w-[16rem] lg:block">
                <CornerMarks />
                <FormStudy />
                <p className="meta absolute bottom-3 left-3 text-[10px] text-dim">Fig. 02 — Form study</p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ResearchPlate />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
