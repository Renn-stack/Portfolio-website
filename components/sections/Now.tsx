"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { LineReveal, Reveal, WordReveal } from "@/components/ui/Reveal";
import { CornerMarks, SectionMarker } from "@/components/ui/Marks";
import { useOnScreen } from "@/lib/hooks";

export function Now() {
  return (
    <section id="now" aria-labelledby="now-title" className="relative overflow-hidden bg-black pb-[20vh] pt-[22vh] md:pt-[28vh]">
      <div className="px-gutter mx-auto max-w-[1600px]">
        <div className="mb-14 flex items-start justify-between md:mb-20">
          <SectionMarker index="09" label="Present tense" />
          <p className="meta hidden items-center gap-2 text-dim md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-signal anim-pulse-soft" />
            Live
          </p>
        </div>

        <LineReveal as="h2" id="now-title" lines={["Now"]} className="text-[clamp(5rem,26vw,26rem)] font-medium uppercase leading-[0.78] tracking-[-0.08em] text-fg/90" />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <WordReveal text="What am I building next?" className="display-md text-fg" stagger={0.14} />
            <Reveal delay={0.4}>
              <p className="lede mt-8 max-w-sm text-muted">The next invention is already being explored.</p>
            </Reveal>
            <Reveal delay={0.5}>
              <dl className="meta mt-12 grid max-w-sm grid-cols-2 gap-y-3 border-t border-line pt-6 text-[10px]">
                <dt className="text-dim">Status</dt>
                <dd className="text-soft">In exploration</dd>
                <dt className="text-dim">Domain</dt>
                <dd className="text-soft">
                  <span aria-hidden className="inline-block h-2 w-20 translate-y-[1px] bg-white/10" />
                  <span className="sr-only">Not disclosed</span>
                </dd>
                <dt className="text-dim">Reveal</dt>
                <dd className="text-soft">— — / — — — —</dd>
              </dl>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.2}>
            <HiddenPrototype />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** An intentionally obscured object: the cursor lifts a little of the veil, never all of it. */
function HiddenPrototype() {
  const box = useRef<HTMLDivElement>(null);
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const mask = useMotionTemplate`radial-gradient(circle at ${sx}% ${sy}%, black 0%, black 14%, transparent 34%)`;

  const onMove = (e: React.PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div ref={ref} className={on ? "" : "viz-paused"}>
      <div
        ref={box}
        onPointerMove={onMove}
        onPointerLeave={() => {
          mx.set(50);
          my.set(50);
        }}
        role="img"
        aria-label="A blurred, partially hidden prototype silhouette with a technical schematic. The next project is not yet revealed."
        className="relative aspect-[4/3] overflow-hidden border border-line bg-ink"
      >
        <CornerMarks size={14} />
        <div className="bg-grid absolute inset-0 opacity-50" />

        {/* blurred silhouette */}
        <div aria-hidden className="absolute inset-0 grid place-items-center">
          <div className="anim-float relative h-[46%] w-[38%]">
            <div className="absolute inset-0 rounded-[42%] bg-gradient-to-br from-white/25 via-white/5 to-transparent blur-2xl" />
            <div className="absolute inset-[18%] rounded-full bg-signal/20 blur-3xl" />
            <div className="absolute inset-[30%] rounded-[38%] border border-white/20 blur-[6px]" />
          </div>
        </div>

        {/* schematic, only visible through the cursor's lens */}
        <motion.svg
          aria-hidden
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          style={{ WebkitMaskImage: mask, maskImage: mask }}
        >
          <g fill="none" strokeWidth={1}>
            <ellipse cx={200} cy={150} rx={78} ry={66} className="stroke-signal/80" />
            <ellipse cx={200} cy={150} rx={52} ry={44} className="stroke-white/40" strokeDasharray="3 4" />
            <path d="M122 150 H60 V90 H30 M278 150 H340 V210 H370 M200 84 V40 M200 216 V262" className="stroke-white/40" />
            <circle cx={200} cy={150} r={6} className="stroke-signal" />
            <path d="M150 230 h100" className="stroke-white/40" />
          </g>
          <text x={34} y={82} className="fill-white/50 font-mono" style={{ fontSize: 8, letterSpacing: "0.16em" }}>
            REF —
          </text>
          <text x={300} y={228} className="fill-white/50 font-mono" style={{ fontSize: 8, letterSpacing: "0.16em" }}>
            ████
          </text>
        </motion.svg>

        {/* waveform band */}
        <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-12 h-10 w-full">
          <path
            d={Array.from({ length: 101 })
              .map((_, i) => `${i ? "L" : "M"}${i * 4} ${20 + Math.sin(i * 0.5) * Math.sin(i * 0.07) * 12}`)
              .join(" ")}
            fill="none"
            className="stroke-white/25 anim-dash-slow"
            strokeDasharray="2 3"
            pathLength={100}
          />
        </svg>

        {/* scan line */}
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <div className="anim-sweep-y absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" />
        </div>

        <div className="meta absolute inset-x-4 bottom-3 flex justify-between text-[10px] text-dim">
          <span>Obj — 00X</span>
          <span>Partial render · 12%</span>
        </div>
        <div className="meta absolute left-4 top-3 text-[10px] text-dim">Not yet revealed</div>
      </div>
    </div>
  );
}
