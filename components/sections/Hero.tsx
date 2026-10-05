"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_ALT =
  "Renata Ponce in profile in a dark audio lab, wearing a cochlear implant sound processor and holding a phone that asks “How do you want to listen?”";

function useHeroImage() {
  const common = { alt: HERO_ALT, quality: 82, sizes: "(orientation: portrait) 60vh, 100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, width: 2688, height: 1520, src: "/images/hero-desktop.webp" });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, width: 1520, height: 2688, src: "/images/hero-mobile.webp" });
  // With an unoptimized (static) build there is no srcSet, so fall back to the originals.
  return {
    desktop: desktop ?? "/images/hero-desktop.webp",
    mobile: mobile ?? "/images/hero-mobile.webp",
    rest,
  };
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { desktop, mobile, rest } = useHeroImage();

  // Pointer position normalised to -1..1, smoothed.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 50, damping: 20, mass: 0.6 });

  const imgX = useTransform(sx, (v) => v * -7);
  const imgY = useTransform(sy, (v) => v * -5);
  const fuiX = useTransform(sx, (v) => v * 9);
  const fuiY = useTransform(sy, (v) => v * 7);
  const readX = useTransform(sx, (v) => ((v + 1) / 2).toFixed(3));
  const readY = useTransform(sy, (v) => ((v + 1) / 2).toFixed(3));

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        px.set((e.clientX / window.innerWidth) * 2 - 1);
        py.set((e.clientY / window.innerHeight) * 2 - 1);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, px, py]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative h-svh min-h-[560px] overflow-hidden bg-ink"
    >
      {/* Image + FUI share one cover box so overlays stay locked to the subject */}
      <motion.div className="absolute inset-0" style={{ y: scrollY }}>
        <div className="cover-box">
          <motion.div className="absolute inset-0 scale-[1.03]" style={{ x: imgX, y: imgY }}>
            <picture>
              <source media="(orientation: portrait)" srcSet={mobile} />
              <source media="(orientation: landscape)" srcSet={desktop} />
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img {...rest} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            </picture>
          </motion.div>

          <motion.div className="absolute inset-0" style={{ x: fuiX, y: fuiY }} aria-hidden>
            <FuiLandscape />
            <FuiPortrait />
          </motion.div>
        </div>
      </motion.div>

      {/* Tonal shaping for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,8,0.85)_0%,rgba(6,7,8,0.35)_38%,rgba(6,7,8,0)_60%)] portrait:bg-[linear-gradient(180deg,rgba(6,7,8,0.8)_0%,rgba(6,7,8,0.1)_32%,rgba(6,7,8,0)_55%,rgba(6,7,8,0.75)_82%,rgba(6,7,8,0.95)_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />

      {/* Intro veil — keeps the image painted for LCP while easing it in */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-ink"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }}
      />

      {/* Screen-space frame: rulers + live readout */}
      <ScreenFrame readX={readX} readY={readY} />

      {/* Typography */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="px-gutter relative z-10 flex h-full flex-col justify-between pb-10 pt-24 md:pb-12 md:pt-32 portrait:pt-20"
      >
        <div className="max-w-[44vw] portrait:max-w-none">
          <motion.p
            className="meta mb-6 flex items-center gap-3 text-muted md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.2 }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal anim-pulse-soft" />
            Independent Inventor — Mexico
          </motion.p>

          <h1 id="hero-title" className="sr-only">
            Renata Ponce, Inventor
          </h1>
          <div aria-hidden className="font-medium tracking-[-0.06em] text-fg leading-[0.84] text-[clamp(3.6rem,min(9vw,17vh),11rem)] portrait:text-[clamp(3.6rem,19vw,9rem)]">
            {["Renata", "Ponce"].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block uppercase"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.6, ease: EASE, delay: 0.35 + i * 0.12 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.div
            className="mt-6 flex items-center gap-4 md:mt-8"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
          >
            <span aria-hidden className="h-px w-10 bg-signal md:w-16" />
            <span className="text-[clamp(1.25rem,2.4vw,2.25rem)] font-light uppercase tracking-[0.42em] text-fg">
              Inventor
            </span>
          </motion.div>

          <motion.p
            className="meta mt-5 flex flex-col gap-y-1 text-soft sm:flex-row sm:flex-wrap sm:gap-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.2 }}
          >
            <span className="whitespace-nowrap">
              Technology <span className="text-dim">·</span> AI
              <span aria-hidden className="hidden text-dim sm:inline">
                {" "}
                ·
              </span>
            </span>
            <span className="whitespace-nowrap">
              Accessibility <span className="text-dim">·</span> Perception
            </span>
          </motion.p>
        </div>

        <div className="flex items-end justify-between gap-8">
          <motion.blockquote
            className="max-w-[34rem] portrait:max-w-[22rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: EASE, delay: 1.4 }}
          >
            <p className="text-[clamp(1.15rem,1.9vw,1.75rem)] font-light leading-[1.3] tracking-[-0.02em] text-fg">
              “I don’t want to adapt existing technology.
              <br />
              <span className="text-soft">I want to invent what comes next.”</span>
            </p>
          </motion.blockquote>

          <motion.a
            href="#origin"
            className="group hidden shrink-0 flex-col items-center gap-3 text-muted transition-colors hover:text-fg sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span className="meta [writing-mode:vertical-rl]">Scroll</span>
            <span aria-hidden className="relative block h-16 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-0 bg-signal anim-scroll-cue" />
            </span>
            <span className="sr-only">to The Origin</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ———————————————————————————————————————————————— */

function ScreenFrame({ readX, readY }: { readX: MotionValue<string>; readY: MotionValue<string> }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1.6 }}
    >
      {/* top ruler */}
      <div className="px-gutter absolute inset-x-0 top-[4.5rem] flex justify-between">
        {Array.from({ length: 41 }).map((_, i) => (
          <span key={i} className={`w-px bg-white/15 ${i % 10 === 0 ? "h-2.5" : "h-1"}`} />
        ))}
      </div>
      {/* right edge readout */}
      <div className="meta absolute left-1/2 top-[5.6rem] flex gap-6 text-[10px] text-dim">
        <span>RP—LAB / 001</span>
        <span>
          X <motion.span className="text-soft tabular-nums">{readX}</motion.span>
        </span>
        <span>
          Y <motion.span className="text-soft tabular-nums">{readY}</motion.span>
        </span>
      </div>
      {/* vertical scan line */}
      <div className="absolute inset-y-0 right-[22%] w-px">
        <div className="h-1/3 w-px bg-gradient-to-b from-transparent via-signal/50 to-transparent anim-scan" />
      </div>
    </motion.div>
  );
}

function Draw({
  d,
  delay = 0,
  className = "stroke-white/45",
  width = 1.5,
  dash,
}: {
  d: string;
  delay?: number;
  className?: string;
  width?: number;
  dash?: string;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      className={className}
      strokeWidth={width}
      strokeDasharray={dash}
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease: EASE, delay }}
    />
  );
}

function Label({
  x,
  y,
  children,
  delay = 0,
  anchor = "start",
  size = 18,
  className = "fill-white/60",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  delay?: number;
  anchor?: "start" | "end" | "middle";
  size?: number;
  className?: string;
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`${className} font-mono uppercase`}
      style={{ fontSize: size, letterSpacing: "0.16em" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay }}
    >
      {children}
    </motion.text>
  );
}

function wave(x0: number, x1: number, y: number, amp: number, steps = 60, seed = 1) {
  let d = `M${x0} ${y}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const env = Math.sin(Math.PI * t);
    const v = Math.sin(t * 38 * seed) * 0.6 + Math.sin(t * 91 * seed) * 0.4;
    d += ` L${(x0 + (x1 - x0) * t).toFixed(1)} ${(y + v * amp * env).toFixed(1)}`;
  }
  return d;
}

function Reticle({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        className="stroke-signal/80"
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay }}
      />
      <g className="anim-sweep" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle
          cx={cx}
          cy={cy}
          r={r * 1.38}
          fill="none"
          className="stroke-white/25"
          strokeWidth={1}
          strokeDasharray="2 10"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <circle cx={cx} cy={cy} r={r * 0.6} fill="none" className="stroke-signal anim-ring" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * r * 1.1;
        const y1 = cy + Math.sin(rad) * r * 1.1;
        const x2 = cx + Math.cos(rad) * r * 1.6;
        const y2 = cy + Math.sin(rad) * r * 1.6;
        return <Draw key={a} d={`M${x1} ${y1} L${x2} ${y2}`} delay={delay + 0.3} className="stroke-white/50" width={1} />;
      })}
      <circle cx={cx} cy={cy} r={3} className="fill-signal" />
    </g>
  );
}

/** Overlay for the landscape photograph (2688 × 1520). */
function FuiLandscape() {
  const coil = { x: 2345, y: 338 };
  const phone = { x0: 1160, y0: 555, x1: 1372, y1: 985 };
  const b = 26;
  return (
    <svg
      viewBox="0 0 2688 1520"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full portrait:hidden"
    >
      {/* Processor reticle */}
      <Reticle cx={coil.x} cy={coil.y} r={62} delay={1.2} />
      <Draw d={`M${coil.x + 70} ${coil.y - 55} L${coil.x + 130} ${coil.y - 150} L${coil.x + 300} ${coil.y - 150}`} delay={1.6} />
      <Label x={coil.x + 140} y={coil.y - 168} delay={2}>
        PROC—01
      </Label>
      <Label x={coil.x + 140} y={coil.y - 122} delay={2.15} className="fill-white/35" size={15}>
        X 2345 · Y 0338
      </Label>

      {/* Phone bracket */}
      {[
        `M${phone.x0} ${phone.y0 + b} V${phone.y0} H${phone.x0 + b}`,
        `M${phone.x1 - b} ${phone.y0} H${phone.x1} V${phone.y0 + b}`,
        `M${phone.x0} ${phone.y1 - b} V${phone.y1} H${phone.x0 + b}`,
        `M${phone.x1 - b} ${phone.y1} H${phone.x1} V${phone.y1 - b}`,
      ].map((d, i) => (
        <Draw key={i} d={d} delay={1.4 + i * 0.08} className="stroke-white/60" />
      ))}
      <Draw d={`M${phone.x0 + 106} ${phone.y0 - 12} V${phone.y0 - 70} H${phone.x0 + 260}`} delay={1.8} />
      <Label x={phone.x0 + 112} y={phone.y0 - 84} delay={2.1}>
        Source / Audio
      </Label>

      {/* Waveform fragment travelling toward the listener */}
      <Draw d={wave(1410, 1745, 640, 34, 90, 1)} delay={2} className="stroke-signal/80" width={1.25} />
      <path
        d="M1410 640 L1745 640"
        className="stroke-white/20 anim-dash"
        strokeWidth={1}
        strokeDasharray="4 6"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <Label x={1410} y={700} delay={2.3} className="fill-white/35" size={15}>
        CH 01 — STREAM
      </Label>

      {/* Spectrum micro-visual on the shoulder plane */}
      <g transform="translate(2290 1170)">
        {Array.from({ length: 18 }).map((_, i) => {
          const h = 14 + Math.abs(Math.sin(i * 1.7)) * 70;
          return (
            <motion.rect
              key={i}
              x={i * 14}
              y={-h}
              width={3}
              height={h}
              className="fill-white/30"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: `${i * 14}px 0px` }}
              transition={{ duration: 1.2, ease: EASE, delay: 2.2 + i * 0.03 }}
            />
          );
        })}
        <Label x={0} y={34} delay={2.4} className="fill-white/35" size={15}>
          Spectrum · Live
        </Label>
      </g>

      {/* Horizon line through eye level */}
      <Draw d="M1500 520 L1760 520" delay={2.4} className="stroke-white/20" width={1} dash="2 8" />
    </svg>
  );
}

/** Overlay for the portrait photograph (1520 × 2688). */
function FuiPortrait() {
  const coil = { x: 1185, y: 1158 };
  return (
    <svg
      viewBox="0 0 1520 2688"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 hidden h-full w-full portrait:block"
    >
      <Reticle cx={coil.x} cy={coil.y} r={58} delay={1.2} />
      <Draw d={`M${coil.x + 50} ${coil.y + 50} L${coil.x + 80} ${coil.y + 110} H${coil.x + 160}`} delay={1.6} />
      <Label x={coil.x + 40} y={coil.y + 145} delay={2} size={20}>
        PROC—01
      </Label>
      <Draw d={wave(340, 610, 1520, 34, 80, 1.2)} delay={2} className="stroke-signal/80" width={1.25} />
      <Label x={340} y={1595} delay={2.3} className="fill-white/40" size={22}>
        CH 01 — STREAM
      </Label>
    </svg>
  );
}
