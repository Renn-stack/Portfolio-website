"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const marks = ["2024", "2025", "2026", "lab", "now"] as const;
const labels: Record<(typeof marks)[number], string> = {
  "2024": "2024",
  "2025": "2025",
  "2026": "2026",
  lab: "Lab",
  now: "Now",
};

/** Fixed rail in the right gutter that tracks where the visitor is in Renata's chronology. */
export function ChronoRail() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.chapter ?? null);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const visible = active !== null && active !== "none";
  const current = marks.find((m) => m === active);

  return (
    <motion.aside
      aria-hidden
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-5"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="meta h-14 text-[10px] text-fg [writing-mode:vertical-rl]">{current ? labels[current] : ""}</span>
      <ol className="flex flex-col items-center gap-2.5">
        {marks.map((m) => (
          <li
            key={m}
            className={`block w-px transition-all duration-700 ${m === active ? "h-6 bg-signal" : "h-2 bg-white/25"}`}
          />
        ))}
      </ol>
    </motion.aside>
  );
}
