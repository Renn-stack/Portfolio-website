"use client";

import { labModules, type LabModuleId } from "@/lib/content";
import { useOnScreen } from "@/lib/hooks";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { CornerMarks, SectionMarker } from "@/components/ui/Marks";

const layout: Record<LabModuleId, string> = {
  perception: "md:col-span-7 md:aspect-[16/11]",
  audio: "md:col-span-5 md:mt-[18vh] md:aspect-[4/5]",
  ai: "md:col-span-5 md:aspect-[4/5]",
  hardware: "md:col-span-7 md:mt-[12vh] md:aspect-[16/11]",
};

export function Lab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="relative bg-ink pb-[18vh] pt-[22vh] md:pt-[28vh]">
      <div className="px-gutter mx-auto max-w-[1600px]">
        <div className="mb-14 flex items-start justify-between md:mb-20">
          <SectionMarker index="08" label="Restricted" />
          <p className="meta hidden text-dim md:block">Access — partial</p>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <LineReveal as="h2" id="lab-title" lines={["The Lab"]} className="display-xl uppercase text-fg md:col-span-8" />
          <Reveal className="md:col-span-4" delay={0.2}>
            <p className="meta text-signal">Unreleased experiments / Research / Prototypes</p>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">
              Not a portfolio. A glimpse into ideas that are still being explored — deliberately unfinished.
            </p>
          </Reveal>
        </div>

        <div className="mt-[12vh] grid gap-6 md:grid-cols-12 md:gap-8">
          {labModules.map((m, i) => (
            <Reveal key={m.id} className={`${layout[m.id]}`} delay={i * 0.06}>
              <LabCard {...m} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LabCard({
  id,
  code,
  status,
  title,
  body,
  index,
}: (typeof labModules)[number] & { index: number }) {
  const [ref, on] = useOnScreen<HTMLElement>();
  return (
    <article
      ref={ref}
      aria-labelledby={`lab-${id}`}
      className={`group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden border border-dashed border-line-strong bg-graphite/30 p-6 sm:p-8 ${
        on ? "" : "viz-paused"
      }`}
    >
      <CornerMarks size={10} />
      <header className="meta relative z-10 flex items-center justify-between text-[10px]">
        <span className="text-dim">{code}</span>
        <span className="flex items-center gap-2 border border-line px-2 py-1 text-soft">
          <span className="h-1 w-1 rounded-full bg-signal anim-pulse-soft" style={{ animationDelay: `${index * 0.5}s` }} />
          {status}
        </span>
      </header>

      <div
        aria-hidden
        className="anim-float pointer-events-none absolute inset-0 grid place-items-center opacity-70 transition-opacity duration-700 group-hover:opacity-100"
        style={{ animationDelay: `${index * -2.2}s` }}
      >
        <LabVisual id={id} />
      </div>

      <div className="relative z-10">
        <h3 id={`lab-${id}`} className="text-[clamp(2rem,3.6vw,3.5rem)] font-medium uppercase leading-none tracking-[-0.04em] text-fg">
          {title}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{body}</p>
        <p className="meta mt-6 flex items-center gap-3 text-[10px] text-dim">
          <span className="h-px w-6 bg-dim" />
          Notes incomplete
          <span className="inline-block h-2 w-14 bg-white/10" />
        </p>
      </div>
    </article>
  );
}

function LabVisual({ id }: { id: LabModuleId }) {
  if (id === "perception") {
    // A dot field bending around an unseen centre.
    const dots = [];
    for (let y = 0; y < 13; y++) {
      for (let x = 0; x < 21; x++) {
        const px = 20 + x * 18;
        const py = 20 + y * 18;
        const dx = px - 200;
        const dy = py - 128;
        const d = Math.sqrt(dx * dx + dy * dy);
        const k = Math.max(0, 1 - d / 140);
        dots.push(
          <circle
            key={`${x}-${y}`}
            cx={px + dx * k * 0.35}
            cy={py + dy * k * 0.35}
            r={0.8 + k * 1.6}
            className={k > 0.55 ? "fill-signal/80" : "fill-white/35"}
          />,
        );
      }
    }
    return (
      <svg viewBox="0 0 400 256" className="h-[70%] w-[90%]">
        {dots}
        <circle cx={200} cy={128} r={60} fill="none" className="stroke-white/15" strokeDasharray="2 6" />
      </svg>
    );
  }

  if (id === "audio") {
    return (
      <svg viewBox="0 0 300 300" className="h-[60%] w-[80%]">
        {Array.from({ length: 9 }).map((_, i) => {
          const amp = 8 + i * 4;
          let d = `M20 ${70 + i * 20}`;
          for (let x = 20; x <= 280; x += 4) {
            const t = (x - 20) / 260;
            d += ` L${x} ${(70 + i * 20 + Math.sin(t * Math.PI * (3 + i * 0.6)) * amp * Math.sin(Math.PI * t)).toFixed(1)}`;
          }
          return <path key={i} d={d} fill="none" className={i === 4 ? "stroke-signal/90" : "stroke-white/25"} strokeWidth={1} />;
        })}
      </svg>
    );
  }

  if (id === "ai") {
    const nodes = [
      [150, 60], [80, 110], [220, 100], [120, 170], [200, 180], [60, 220], [250, 230], [150, 250],
    ] as const;
    const edges = [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6], [3, 7], [4, 7], [1, 2],
    ];
    return (
      <svg viewBox="0 0 300 300" className="h-[60%] w-[80%]">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            className={i === 4 ? "stroke-signal/80 anim-dash-slow" : "stroke-white/20"}
            strokeDasharray={i === 4 ? "4 4" : undefined}
            pathLength={100}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 3 || i === 4 ? 4 : 2.5} className={i === 3 || i === 4 ? "fill-signal" : "fill-white/60"} />
        ))}
        <circle cx={150} cy={250} r={14} fill="none" className="stroke-white/20" strokeDasharray="2 4" />
      </svg>
    );
  }

  // hardware — isometric board with traces
  return (
    <svg viewBox="0 0 400 256" className="h-[75%] w-[85%]">
      <g transform="translate(200 128) scale(1 0.58) rotate(45)">
        <rect x={-110} y={-110} width={220} height={220} fill="none" className="stroke-white/40" />
        <rect x={-104} y={-104} width={208} height={208} fill="none" className="stroke-white/10" strokeDasharray="3 5" />
        <rect x={-30} y={-30} width={60} height={60} fill="none" className="stroke-signal/80" />
        {[-20, -6, 8, 22].map((o) => (
          <g key={o}>
            <path d={`M${o} -30 V-70 H${o - 30} V-100`} fill="none" className="stroke-white/30" />
            <path d={`M30 ${o} H72 V${o + 26} H100`} fill="none" className="stroke-white/30" />
          </g>
        ))}
        <path d="M-30 0 H-70 V40" fill="none" className="stroke-signal/60 anim-dash-slow" strokeDasharray="4 4" pathLength={100} />
        <circle cx={-70} cy={40} r={4} className="fill-signal" />
        <rect x={-90} y={60} width={30} height={20} fill="none" className="stroke-white/30" />
      </g>
    </svg>
  );
}
