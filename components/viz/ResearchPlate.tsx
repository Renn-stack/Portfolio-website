"use client";

import { motion, type Variants } from "framer-motion";
import { CornerMarks } from "@/components/ui/Marks";

const EASE = [0.16, 1, 0.3, 1] as const;

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.6, ease: EASE, delay: 0.25 + i * 0.12 }, opacity: { duration: 0.3, delay: 0.25 + i * 0.12 } },
  }),
};

const appear: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({ opacity: 1, transition: { duration: 0.9, delay: 0.6 + i * 0.12 } }),
};

/** Isometric ring (an ellipse) used to build the exploded stack. */
function layer(cx: number, cy: number, rx: number, ry: number) {
  return `M${cx - rx} ${cy} A${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
}

const layers = [
  { y: 120, rx: 150, ry: 46, label: "Layer A", note: "Outer form" },
  { y: 215, rx: 132, ry: 40, label: "Layer B", note: "Signal" },
  { y: 300, rx: 118, ry: 36, label: "Layer C", note: "Interface" },
  { y: 385, rx: 92, ry: 28, label: "Layer D", note: "Contact" },
];

/**
 * An editorial research plate for Gummy Hear: grid, exploded view, annotations.
 * Elements assemble progressively as the plate enters the viewport.
 */
export function ResearchPlate() {
  const cx = 300;
  return (
    <figure className="relative border border-line bg-graphite/60">
      <CornerMarks size={14} />
      <div className="meta flex items-center justify-between border-b border-line px-4 py-3 text-[10px] text-dim">
        <span>RA—2025—02 / Gummy Hear</span>
        <span className="hidden sm:inline">Tecnológico de Monterrey · IEEE</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal anim-pulse-soft" />
          Archived
        </span>
      </div>

      <div className="bg-grid relative">
        <motion.svg
          viewBox="0 0 600 520"
          className="block h-auto w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          aria-hidden
        >
          {/* central axis */}
          <motion.path d={`M${cx} 40 V480`} className="stroke-white/20" strokeDasharray="3 6" fill="none" variants={draw} custom={0} vectorEffect="non-scaling-stroke" />

          {layers.map((l, i) => (
            <g key={l.label}>
              {/* depth side of each layer */}
              <motion.path
                d={`M${cx - l.rx} ${l.y} V${l.y + 14} A${l.rx} ${l.ry} 0 0 0 ${cx + l.rx} ${l.y + 14} V${l.y}`}
                className="stroke-white/25"
                fill="none"
                variants={draw}
                custom={i + 1}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={layer(cx, l.y, l.rx, l.ry)}
                className={i === 1 ? "stroke-signal/90" : "stroke-white/70"}
                fill="rgba(12,14,17,0.85)"
                strokeWidth={1.2}
                variants={draw}
                custom={i + 1}
                vectorEffect="non-scaling-stroke"
              />
              {/* inner detail */}
              <motion.path
                d={layer(cx, l.y, l.rx * 0.55, l.ry * 0.55)}
                className="stroke-white/25"
                fill="none"
                strokeDasharray={i % 2 ? "2 4" : undefined}
                variants={draw}
                custom={i + 1.5}
                vectorEffect="non-scaling-stroke"
              />
              {/* annotation leader */}
              <motion.path
                d={`M${cx + l.rx + 8} ${l.y} H${cx + l.rx + 40} L${530} ${l.y - 26}`}
                className="stroke-white/35"
                fill="none"
                variants={draw}
                custom={i + 2}
                vectorEffect="non-scaling-stroke"
              />
              <motion.g variants={appear} custom={i + 2}>
                <text x={530} y={l.y - 34} textAnchor="end" className="fill-white/70 font-mono" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
                  {l.label.toUpperCase()}
                </text>
                <text x={530} y={l.y - 12} textAnchor="end" className="fill-white/35 font-mono" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
                  {l.note.toUpperCase()}
                </text>
              </motion.g>
            </g>
          ))}

          {/* dimension line */}
          <motion.path d="M150 470 H450 M150 462 V478 M450 462 V478" className="stroke-white/40" fill="none" variants={draw} custom={6} vectorEffect="non-scaling-stroke" />
          <motion.text x={300} y={498} textAnchor="middle" className="fill-white/40 font-mono" style={{ fontSize: 10, letterSpacing: "0.16em" }} variants={appear} custom={6}>
            Ø — NOT TO SCALE
          </motion.text>

          {/* signal path through the stack */}
          <motion.path
            d={`M60 215 C120 215 130 300 ${cx - 118} 300`}
            className="stroke-signal/80"
            fill="none"
            strokeWidth={1.2}
            variants={draw}
            custom={5}
            vectorEffect="non-scaling-stroke"
          />
          <motion.g variants={appear} custom={5}>
            <circle cx={60} cy={215} r={3} className="fill-signal" />
            <text x={60} y={198} className="fill-signal font-mono" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
              INPUT
            </text>
          </motion.g>

          {/* side ruler */}
          <motion.g variants={appear} custom={1}>
            {Array.from({ length: 23 }).map((_, i) => (
              <line key={i} x1={24} x2={i % 5 === 0 ? 36 : 30} y1={40 + i * 20} y2={40 + i * 20} className="stroke-white/25" vectorEffect="non-scaling-stroke" />
            ))}
          </motion.g>
        </motion.svg>
      </div>

      <figcaption className="meta flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3 text-[10px] text-dim">
        <span>Fig. 01 — Concept study, exploded view</span>
        <span>Illustrative · not a technical specification</span>
      </figcaption>
    </figure>
  );
}
