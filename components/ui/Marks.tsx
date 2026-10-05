/** Section index marker, e.g. "02 — The Origin". */
export function SectionMarker({ index, label, className = "" }: { index: string; label: string; className?: string }) {
  return (
    <div className={`meta flex items-center gap-3 text-muted ${className}`}>
      <span className="text-signal">{index}</span>
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span>{label}</span>
    </div>
  );
}

/** Thin corner crop marks for technical framing. */
export function CornerMarks({ className = "", size = 10 }: { className?: string; size?: number }) {
  const s = `${size}px`;
  const base = "pointer-events-none absolute border-line-strong";
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${base} left-0 top-0 border-l border-t`} style={{ width: s, height: s }} />
      <span className={`${base} right-0 top-0 border-r border-t`} style={{ width: s, height: s }} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} style={{ width: s, height: s }} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} style={{ width: s, height: s }} />
    </span>
  );
}

/** Key/value metadata row used across research artifacts. */
export function MetaRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-3 sm:grid-cols-[9rem_1fr]">
      <dt className="meta text-dim">{k}</dt>
      <dd className="text-sm text-soft">{v}</dd>
    </div>
  );
}
