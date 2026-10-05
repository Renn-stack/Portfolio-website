"use client";

import { useEffect, useState } from "react";
import type { ProjectId } from "@/lib/content";
import { useOnScreen, useReducedMotionSafe } from "@/lib/hooks";

const mono = { fontFamily: "var(--font-mono)", letterSpacing: "0.16em" } as const;

/** Wraps a visual so its CSS loops only run while it is on screen. */
function VizFrame({ children, label }: { children: React.ReactNode; label: string }) {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  return (
    <div ref={ref} className={`relative h-full w-full ${on ? "" : "viz-paused"}`} role="img" aria-label={label}>
      {children}
    </div>
  );
}

/* ——— Wallas Stream: computer → processor ——— */
export function StreamViz() {
  const path = "M178 150 C 260 150, 300 92, 380 110 S 440 160, 470 150";
  return (
    <VizFrame label="Animated signal travelling from a computer to a cochlear implant sound processor">
      <svg viewBox="0 0 640 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* computer */}
        <g className="stroke-white/70" fill="none" strokeWidth={1.2}>
          <rect x={58} y={92} width={120} height={78} rx={4} />
          <path d="M40 182 H196 L186 170 H48 Z" />
        </g>
        <g transform="translate(70 131)">
          {Array.from({ length: 24 }).map((_, i) => {
            const h = 6 + Math.abs(Math.sin(i * 0.9)) * 22;
            return (
              <rect
                key={i}
                x={i * 4}
                y={-h / 2}
                width={2}
                height={h}
                className="fill-signal/80 anim-bar"
                style={{ animationDelay: `${(i % 7) * 0.12}s` }}
              />
            );
          })}
        </g>
        <text x={58} y={212} className="fill-white/40" style={{ ...mono, fontSize: 13 }}>
          COMPUTER / OUT
        </text>

        {/* channel */}
        <path d={path} fill="none" className="stroke-white/15" strokeWidth={1} />
        <path d={path} fill="none" className="stroke-signal anim-dash" strokeWidth={2} pathLength={100} strokeDasharray="6 94" strokeLinecap="round" />
        <path
          d={path}
          fill="none"
          className="stroke-signal/50 anim-dash"
          strokeWidth={2}
          pathLength={100}
          strokeDasharray="3 47"
          strokeLinecap="round"
          style={{ animationDelay: "-1.1s" }}
        />
        <text x={300} y={70} className="fill-white/40" style={{ ...mono, fontSize: 13 }}>
          TRANSMISSION
        </text>

        {/* processor */}
        <g fill="none" strokeWidth={1.2}>
          <path d="M486 196 C 476 150, 486 104, 520 92 C 540 86, 552 98, 548 112 C 538 140, 520 160, 516 200 Z" className="stroke-white/70" />
          <circle cx={572} cy={110} r={22} className="stroke-white/70" />
          <circle cx={572} cy={110} r={6} className="stroke-signal" />
          <path d="M540 104 C 552 100, 556 104, 552 108" className="stroke-white/40" />
          <circle cx={572} cy={110} r={32} className="stroke-signal/50 anim-ring" />
        </g>
        <text x={480} y={232} className="fill-white/40" style={{ ...mono, fontSize: 13 }}>
          PROCESSOR / IN
        </text>
      </svg>
    </VizFrame>
  );
}

/* ——— Wallas Transcribe: waveform → text ——— */
const SAMPLE = "Words appear as they are spoken, so the meaning arrives in real time.";

export function TranscribeViz() {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const reduce = useReducedMotionSafe();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) {
      setN(SAMPLE.length);
      return;
    }
    if (!on) return;
    const id = window.setInterval(() => {
      setN((v) => (v >= SAMPLE.length + 28 ? 0 : v + 1));
    }, 70);
    return () => window.clearInterval(id);
  }, [on, reduce]);

  const shown = SAMPLE.slice(0, Math.min(n, SAMPLE.length));

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Animated speech waveform turning into transcribed text"
      className={`grid h-full w-full content-center items-center gap-6 px-6 sm:grid-cols-[1fr_auto_1.3fr] sm:gap-8 sm:px-10 ${on ? "" : "viz-paused"}`}
    >
      <div className="flex h-16 items-center gap-[3px] sm:h-32">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="block w-[2px] flex-1 rounded-full bg-white/60 anim-bar"
            style={{ height: `${25 + Math.abs(Math.sin(i * 1.3)) * 75}%`, animationDelay: `${(i % 9) * 0.11}s` }}
          />
        ))}
      </div>
      <div className="hidden flex-col items-center gap-2 sm:flex">
        <span className="h-px w-8 bg-signal sm:w-12" />
        <span className="meta text-[9px] text-dim">ASR</span>
      </div>
      <div>
        <p className="meta mb-3 text-[9px] text-dim">Transcript · live</p>
        <p className="min-h-[4.5em] text-sm leading-relaxed text-fg sm:text-base">
          {shown}
          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-signal anim-blink" />
        </p>
      </div>
    </div>
  );
}

/* ——— Wallas On: link held through silence ——— */
export function OnViz() {
  const audio = Array.from({ length: 34 }).map((_, i) => 6 + Math.abs(Math.sin(i * 1.1) * Math.cos(i * 0.4)) * 34);
  return (
    <VizFrame label="Bluetooth link indicator that stays connected through a period of silence">
      <svg viewBox="0 0 640 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* emitter */}
        <g transform="translate(110 112)">
          {[22, 40, 58].map((r, i) => (
            <path
              key={r}
              d={`M${r * 0.7} ${-r * 0.7} A${r} ${r} 0 0 1 ${r * 0.7} ${r * 0.7}`}
              fill="none"
              className="stroke-signal anim-pulse-soft"
              strokeWidth={1.4}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
          <circle r={7} className="fill-signal" />
          <circle r={16} fill="none" className="stroke-signal/40 anim-ring" />
        </g>
        <text x={70} y={196} className="fill-white/40" style={{ ...mono, fontSize: 13 }}>
          LINK
        </text>
        <text x={112} y={196} className="fill-signal" style={{ ...mono, fontSize: 13 }}>
          ● HELD
        </text>

        {/* timeline track */}
        <g transform="translate(220 112)">
          {audio.map((h, i) => (
            <rect key={i} x={i * 6} y={-h / 2} width={2} height={h} className="fill-white/55" />
          ))}
          <line x1={210} x2={380} y1={0} y2={0} className="stroke-white/30" strokeDasharray="2 5" />
          <text x={0} y={-48} className="fill-white/40" style={{ ...mono, fontSize: 13 }}>
            AUDIO
          </text>
          <text x={226} y={-48} className="fill-white/40" style={{ ...mono, fontSize: 13 }}>
            SILENCE
          </text>
          {/* continuous link line */}
          <line x1={0} x2={380} y1={52} y2={52} className="stroke-signal" strokeWidth={1.5} />
          <circle cx={380} cy={52} r={3} className="fill-signal" />
          <text x={0} y={76} className="fill-white/35" style={{ ...mono, fontSize: 12 }}>
            CONNECTION — UNINTERRUPTED
          </text>
          {/* playhead */}
          <g className="anim-playhead" style={{ ["--track" as string]: "380px" }}>
            <line x1={0} x2={0} y1={-36} y2={60} className="stroke-white/70" />
            <circle cx={0} cy={-36} r={2.5} className="fill-white" />
          </g>
        </g>
      </svg>
    </VizFrame>
  );
}

export function ProjectViz({ id }: { id: ProjectId }) {
  if (id === "stream") return <StreamViz />;
  if (id === "transcribe") return <TranscribeViz />;
  return <OnViz />;
}
