"use client";

// Repeating scroll reveal (React Bits "Blur Text" style, block-level): blurs +
// rises + fades its children into view every time they enter the viewport, and
// resets when they leave so the reveal replays on the next pass. Honors
// prefers-reduced-motion. Use `delay` to stagger siblings.

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "top",
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  /** ms before this element begins its reveal (for staggering) */
  delay?: number;
  direction?: "top" | "bottom" | "left" | "right";
  threshold?: number;
}) {
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  if (reduced) return <div className={className}>{children}</div>;

  const horizontal = direction === "left" || direction === "right";
  const offset = direction === "top" || direction === "left" ? -44 : 44;
  const hidden = {
    filter: "blur(8px)",
    opacity: 0,
    x: horizontal ? offset : 0,
    y: horizontal ? 0 : offset,
  };
  const shown = { filter: "blur(0px)", opacity: 1, x: 0, y: 0 };
  const d = delay / 1000;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={
        inView
          ? {
              // Spring drives the bounce (overshoot + settle) on whichever axis
              // is offset; blur + opacity fade in quickly underneath it.
              x: { type: "spring", bounce: 0.5, duration: 1.25, delay: d },
              y: { type: "spring", bounce: 0.5, duration: 1.25, delay: d },
              opacity: { duration: 0.4, ease: "easeOut", delay: d },
              filter: { duration: 0.5, ease: "easeOut", delay: d },
            }
          : { duration: 0.3, ease: "easeIn" }
      }
      style={{ willChange: "transform, filter, opacity" }}
    >
      {children}
    </motion.div>
  );
}
