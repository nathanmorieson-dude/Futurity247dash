import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-cyan text-[#0a0e14] font-semibold hover:bg-accent-cyan/90 border border-accent-cyan",
  secondary:
    "bg-white/5 text-text-primary border border-white/10 hover:border-accent-cyan/50 hover:bg-white/[0.07]",
  ghost:
    "bg-transparent text-text-muted border border-transparent hover:text-text-primary hover:bg-white/5",
  danger:
    "bg-accent-warn/15 text-accent-warn border border-accent-warn/30 hover:bg-accent-warn/20",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
  }
>(function Button(
  { variant = "secondary", size = "md", className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    />
  );
});
