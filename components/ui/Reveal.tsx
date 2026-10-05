"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "span" | "li";
};

/** Fades content up once when it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

type LinesProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h2" | "h3" | "p" | "div";
  id?: string;
};

/** Cinematic masked line reveal: each line slides up from behind a mask. */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  as = "div",
  id,
}: LinesProps) {
  const Comp = motion[as];
  return (
    <Comp
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1.4, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

type WordsProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h2" | "h3" | "p" | "div";
  /** Words (exact match) rendered in the signal accent. */
  accent?: string[];
  id?: string;
};

/** Word-by-word reveal with a soft focus pull. */
export function WordReveal({ text, className, delay = 0, stagger = 0.09, as = "p", accent = [], id }: WordsProps) {
  const reduce = useReducedMotionSafe();
  const Comp = motion[as];
  const words = text.split(" ");
  return (
    <Comp
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block whitespace-pre ${accent.includes(w) ? "text-signal" : ""}`}
          variants={{
            hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.25em", filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: EASE },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Comp>
  );
}
