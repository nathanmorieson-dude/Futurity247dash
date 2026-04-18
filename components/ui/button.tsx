import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium",
        variant === "default"
          ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]"
          : "border-[var(--border)] text-[var(--text-primary)]",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
