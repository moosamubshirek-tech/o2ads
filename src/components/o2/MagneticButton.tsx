import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

type Variant = "filled" | "outlined" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] magnetic select-none";

const variants: Record<Variant, string> = {
  filled: "bg-crimson text-foreground hover:bg-blood transition-colors",
  outlined:
    "border border-foreground/40 text-foreground hover:border-crimson hover:text-crimson transition-colors",
  ghost: "text-foreground hover:text-crimson transition-colors",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
}

export const MagneticButton = forwardRef<HTMLButtonElement, CommonProps & ButtonHTMLAttributes<HTMLButtonElement>>(
  function MagneticButton({ variant = "filled", className, children, ...props }, _ref) {
    const ref = useMagnetic<HTMLButtonElement>(0.25);
    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
        {children}
      </button>
    );
  }
);

export function MagneticLink({
  variant = "filled",
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);
  return (
    <a ref={ref} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
