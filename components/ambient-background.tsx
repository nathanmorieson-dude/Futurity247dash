"use client";

import { useEffect, useRef } from "react";

export function AmbientBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const isTouch = window.matchMedia("(hover: none)").matches;

    if (!isTouch) {
      const onMove = (e: MouseEvent) => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }

    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      el.style.setProperty("--x", `${window.innerWidth / 2}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(34,211,238,0.07), transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(163,230,53,0.05), transparent 60%)",
        }}
      />
      <div
        ref={spotlightRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 30%), rgba(34,211,238,0.10), transparent 60%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
    </div>
  );
}
