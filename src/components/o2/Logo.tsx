export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-2xl font-extrabold tracking-tight ${className}`}>
      <span className="text-crimson">C2</span>
      <span className="text-foreground">.</span>
    </span>
  );
}
