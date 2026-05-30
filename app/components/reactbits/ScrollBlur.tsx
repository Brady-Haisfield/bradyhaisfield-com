"use client";

// Scroll-linked blur (React Bits "Scroll Reveal" pattern, on Framer Motion).
// Content blurs IN as it enters the viewport and blurs OUT as it leaves —
// bidirectional: scrubbing reverses when you scroll back up. Honors
// prefers-reduced-motion (renders sharp + fully visible).

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollBlurProps = {
  children: ReactNode;
  className?: string;
  /** max blur in px applied at the top/bottom edges of the scroll range */
  maxBlur?: number;
};

export default function ScrollBlur({
  children,
  className = "",
  maxBlur = 8,
}: ScrollBlurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Sharp through a wide middle band; blurs in at the bottom edge (entering)
  // and out only at the very top edge (almost fully scrolled off). The late
  // blur-out keeps the last sections sharp when parked at the page bottom —
  // they never reach the high-progress zone, so nothing rests blurry.
  const blur = useTransform(
    scrollYProgress,
    [0, 0.12, 0.92, 1],
    [maxBlur, 0, 0, maxBlur],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.94, 1],
    [0, 1, 1, 0],
  );
  const filter = useMotionTemplate`blur(${blur}px)`;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ filter, opacity, willChange: "filter, opacity" }}
    >
      {children}
    </motion.div>
  );
}
