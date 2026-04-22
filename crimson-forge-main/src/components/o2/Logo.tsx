export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans text-2xl font-extrabold tracking-tight ${className}`}>
      <span className="text-crimson">O</span>
      <span className="text-foreground">2.</span>
    </span>
  );
}
