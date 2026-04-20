"use client";

import { useState } from "react";
import { Headphones, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BillieDemoDialog } from "@/components/marketing/BillieDemoDialog";

export function HearBillieButton({
  variant = "secondary",
  size = "lg",
  label = "Hear Billie",
  icon = "headphones",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  label?: string;
  icon?: "headphones" | "volume";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const Icon = icon === "volume" ? Volume2 : Headphones;
  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
        className={className}
      >
        <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        {label}
      </Button>
      <BillieDemoDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
