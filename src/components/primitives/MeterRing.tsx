export function MeterRing({ value = 85, size = 128 }: { value?: number; size?: number }) {
  const angle = Math.min(100, Math.max(0, value)) * 3.6;
  return (
    <div
      style={{
        width: size,
        height: size,
        background: `conic-gradient(#3AE08D ${angle}deg, #223041 ${angle}deg 360deg)`,
      }}
      className="rounded-full grid place-items-center relative"
      aria-label={`Progress ${value}%`}
    >
      <div className="absolute inset-[10%] rounded-full bg-bg/90 border border-border/40 grid place-items-center">
        <span className="font-mono text-xl text-text-primary">{value}%</span>
      </div>
    </div>
  );
}
