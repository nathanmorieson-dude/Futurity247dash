"use client";

import { useEffect, useMemo, useState } from "react";

type SpotlightPosition = {
  x: number;
  y: number;
};

export function AmbientBackground() {
  const [spotlight, setSpotlight] = useState<SpotlightPosition>({ x: 50, y: 20 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    const updateFromMouse = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setSpotlight({ x, y });
    };

    const updateFromScroll = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setSpotlight({ x: 50, y: 20 + progress * 60 });
    };

    if (isTouchDevice) {
      window.addEventListener("scroll", updateFromScroll, { passive: true });
      updateFromScroll();
      return () => window.removeEventListener("scroll", updateFromScroll);
    }

    window.addEventListener("mousemove", updateFromMouse);
    return () => window.removeEventListener("mousemove", updateFromMouse);
  }, []);

  const backgroundStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(34, 211, 238, 0.18), transparent 38%), linear-gradient(180deg, rgba(10,14,20,0.96), rgba(10,14,20,0.98))`,
    }),
    [spotlight.x, spotlight.y],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0" style={backgroundStyle} />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
    </div>
  );
}
