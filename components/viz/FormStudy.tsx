/**
 * Lightweight 3D wireframe "form study" built from CSS-transformed rings.
 * No WebGL: the GPU composites it and it costs almost nothing.
 */
export function FormStudy({ className = "" }: { className?: string }) {
  const meridians = [0, 30, 60, 90, 120, 150];
  const parallels = [-0.6, -0.3, 0, 0.3, 0.6];
  return (
    <div aria-hidden className={`absolute inset-0 grid place-items-center [perspective:700px] ${className}`}>
      <div className="relative h-[58%] w-[58%] [transform-style:preserve-3d] [transform:rotateX(-18deg)_scaleY(0.82)]">
        <div className="absolute inset-0 [transform-style:preserve-3d] motion-safe:animate-[spin3d_18s_linear_infinite]">
          {meridians.map((deg) => (
            <span
              key={deg}
              className={`absolute inset-0 rounded-full border ${deg === 0 ? "border-signal/70" : "border-white/25"}`}
              style={{ transform: `rotateY(${deg}deg)` }}
            />
          ))}
          {parallels.map((p) => {
            const scale = Math.sqrt(1 - p * p);
            return (
              <span
                key={p}
                className="absolute inset-0 rounded-full border border-white/15"
                style={{ transform: `translateY(${p * 50}%) rotateX(90deg) scale(${scale})` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
