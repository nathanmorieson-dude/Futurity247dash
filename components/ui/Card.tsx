import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-5 interactive-border",
        className
      )}
      {...rest}
    />
  );
}

export function CardHeader({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-start justify-between gap-3", className)}
      {...rest}
    />
  );
}

export function CardLabel({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("font-mono-alt text-text-muted", className)}
      {...rest}
    />
  );
}
