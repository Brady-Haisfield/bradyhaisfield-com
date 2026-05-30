"use client";

// React Bits "Shiny Text" — a constant highlight sweep clipped to the text via
// background-clip. Honors prefers-reduced-motion (renders solid base color).

import { useEffect, useState } from "react";

type ShinyTextProps = {
  text: string;
  className?: string;
  /** the resting text color */
  baseColor?: string;
  /** the moving highlight color */
  shineColor?: string;
  /** seconds per sweep */
  speed?: number;
  /** seconds before this line's sweep starts (used to cascade line→line) */
  delay?: number;
};

export default function ShinyText({
  text,
  className = "",
  baseColor = "#F4ECE4",
  shineColor = "#FFFFFF",
  speed = 3.6,
  delay = 0,
}: ShinyTextProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    );
  }, []);

  if (reduced) {
    return (
      <span className={className} style={{ color: baseColor }}>
        {text}
      </span>
    );
  }

  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%)`,
        backgroundSize: "220% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {text}
    </span>
  );
}
