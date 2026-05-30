"use client";

// React Bits "Shiny Text" — a highlight sweep clipped to the text via
// background-clip. Lines are sequenced into ONE shared loop: pass the same
// `cycle` to every line and an increasing `step` (1, 2, ...). Step 1 sweeps in
// the first half of the loop, step 2 in the second half, so the highlight runs
// through one line then the next at a constant speed, then repeats. Honors
// prefers-reduced-motion (renders solid base color).

import { useEffect, useState } from "react";

type ShinyTextProps = {
  text: string;
  className?: string;
  /** the resting text color */
  baseColor?: string;
  /** the moving highlight color */
  shineColor?: string;
  /** order in the sequence: 1 sweeps first, 2 sweeps second */
  step?: 1 | 2;
  /** total loop length in seconds — keep identical across all lines */
  cycle?: number;
};

export default function ShinyText({
  text,
  className = "",
  baseColor = "#F4ECE4",
  shineColor = "#FFFFFF",
  step = 1,
  cycle = 10,
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
      className={`shiny-text shiny-step-${step} ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%)`,
        backgroundSize: "220% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        animationDuration: `${cycle}s`,
      }}
    >
      {text}
    </span>
  );
}
