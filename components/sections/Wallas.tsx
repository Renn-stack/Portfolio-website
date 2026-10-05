"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project, type ProjectId } from "@/lib/content";
import { useDialog } from "@/lib/hooks";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { CornerMarks, SectionMarker } from "@/components/ui/Marks";
import { ProjectViz } from "@/components/viz/WallasViz";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Wallas() {
  const [openId, setOpenId] = useState<ProjectId | null>(null);
  const close = useCallback(() => setOpenId(null), []);

  // Deep-link support: #wallas-stream etc.
  useEffect(() => {
    const fromHash = () => {
      const match = projects.find((p) => `#wallas-${p.id}` === window.location.hash);
      if (match) setOpenId(match.id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <section id="work" aria-labelledby="wallas-title" className="relative bg-ink pb-[18vh] pt-[22vh] md:pt-[28vh]">
      <div className="px-gutter mx-auto max-w-[1600px]">
        <div className="mb-14 flex items-start justify-between md:mb-20">
          <SectionMarker index="06" label="Ecosystem" />
          <p className="meta hidden text-dim md:block">2025 — 2026</p>
        </div>

        <LineReveal as="h2" id="wallas-title" lines={["Wallas"]} className="text-[clamp(4.5rem,22vw,22rem)] font-medium uppercase leading-[0.8] tracking-[-0.07em] text-fg" />

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12">
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.2}>
            <p className="display-md max-w-[18ch] font-light text-soft">
              Technology built around real accessibility problems.
            </p>
          </Reveal>
        </div>

        <div className="mt-[14vh] flex flex-col gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectModule key={p.id} project={p} index={i} onOpen={() => setOpenId(p.id)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openId && (
          <ProjectView key="project-view" id={openId} onClose={close} onNavigate={(id) => setOpenId(id)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModule({ project: p, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <Reveal delay={index * 0.05}>
      <article
        aria-labelledby={`proj-${p.id}`}
        className="group relative grid border border-line bg-graphite/40 transition-colors duration-700 hover:border-line-strong lg:grid-cols-12"
      >
        <CornerMarks size={12} />
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:col-span-5 lg:p-12">
          <div>
            <div className="meta flex items-center justify-between text-dim">
              <span>{p.index}</span>
              <span className="text-signal">{p.year}</span>
            </div>
            <h3 id={`proj-${p.id}`} className="mt-10 text-[clamp(2.25rem,4.4vw,4.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-fg lg:mt-16">
              {p.name.split(" ").map((w) => (
                <span key={w} className="block">
                  {w}
                </span>
              ))}
            </h3>
            <p className="meta mt-6 text-soft">{p.tags.join(" · ")}</p>
          </div>

          <div>
            <p className="max-w-md leading-relaxed text-muted">{p.concept}</p>
            <button
              type="button"
              onClick={onOpen}
              className="meta mt-8 inline-flex items-center gap-4 text-fg after:absolute after:inset-0 after:content-['']"
              aria-haspopup="dialog"
            >
              <span className="relative block h-px w-10 overflow-hidden bg-line-strong">
                <span className="absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              </span>
              Open project view
              <span className="sr-only">: {p.name}</span>
            </button>
          </div>
        </div>

        <motion.div
          layoutId={`viz-${p.id}`}
          className="relative aspect-[4/3] border-t border-line sm:aspect-[16/10] bg-ink/60 lg:col-span-7 lg:aspect-auto lg:min-h-[28rem] lg:border-l lg:border-t-0"
        >
          <div className="bg-dots absolute inset-0 opacity-40" />
          <div className="relative h-full opacity-80 transition-opacity duration-700 group-hover:opacity-100">
            <ProjectViz id={p.id} />
          </div>
          <p className="meta absolute bottom-4 left-5 text-[10px] text-dim">{p.vizLabel}</p>
        </motion.div>
      </article>
    </Reveal>
  );
}

function ProjectView({
  id,
  onClose,
  onNavigate,
}: {
  id: ProjectId;
  onClose: () => void;
  onNavigate: (id: ProjectId) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const i = projects.findIndex((p) => p.id === id);
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  useDialog(ref, true, onClose);

  useEffect(() => {
    const url = `#wallas-${id}`;
    if (window.location.hash !== url) history.replaceState(null, "", url);
    return () => {
      if (window.location.hash.startsWith("#wallas-")) history.replaceState(null, "", "#work");
    };
  }, [id]);

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-view-title"
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-gutter mx-auto flex min-h-full max-w-[1600px] flex-col py-6 md:py-10">
        <div className="meta flex items-center justify-between border-b border-line pb-4 text-dim">
          <span>
            {p.index} / Project view
          </span>
          <button type="button" onClick={onClose} className="meta flex items-center gap-3 text-fg">
            Close
            <span aria-hidden className="relative block h-3 w-3">
              <span className="absolute left-0 top-1/2 h-px w-3 rotate-45 bg-fg" />
              <span className="absolute left-0 top-1/2 h-px w-3 -rotate-45 bg-fg" />
            </span>
          </button>
        </div>

        <div className="grid flex-1 gap-10 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <p className="meta text-signal">{p.year}</p>
            <h2
              id="project-view-title"
              className="mt-6 text-[clamp(2.75rem,5.4vw,5.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-fg"
            >
              {p.name.split(" ").map((w) => (
                <span key={w} className="block">
                  {w}
                </span>
              ))}
            </h2>
            <p className="meta mt-6 text-soft">{p.tags.join(" · ")}</p>

            <dl className="mt-12 space-y-8">
              <div>
                <dt className="meta text-dim">Problem</dt>
                <dd className="lede mt-3 text-soft">{p.problem}</dd>
              </div>
              <div>
                <dt className="meta text-dim">Concept</dt>
                <dd className="lede mt-3 text-fg">{p.concept}</dd>
              </div>
              <div className="grid grid-cols-2 gap-6 border-t border-line pt-6">
                <div>
                  <dt className="meta text-dim">Year</dt>
                  <dd className="mt-2 text-soft">{p.year}</dd>
                </div>
                <div>
                  <dt className="meta text-dim">Ecosystem</dt>
                  <dd className="mt-2 text-soft">Wallas</dd>
                </div>
              </div>
            </dl>
          </motion.div>

          <motion.div
            layoutId={`viz-${p.id}`}
            className="relative min-h-[18rem] border border-line bg-graphite/60 lg:col-span-7 lg:min-h-[32rem]"
            transition={{ duration: 0.9, ease: EASE }}
          >
            <CornerMarks size={14} />
            <div className="bg-grid absolute inset-0 opacity-60" />
            <div className="relative h-full min-h-[18rem] lg:min-h-[32rem]">
              <ProjectViz id={p.id} />
            </div>
            <p className="meta absolute bottom-4 left-5 text-[10px] text-dim">{p.vizLabel}</p>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate(next.id)}
          className="group flex items-end justify-between border-t border-line pt-6 text-left"
        >
          <span>
            <span className="meta block text-dim">Next</span>
            <span className="mt-2 block text-3xl font-medium uppercase tracking-[-0.04em] text-fg md:text-5xl">
              {next.name}
            </span>
          </span>
          <span aria-hidden className="meta text-signal transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}
