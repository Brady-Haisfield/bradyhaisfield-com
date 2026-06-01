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
  direction?: "top" | "bottom";
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

  const hiddenY = direction === "top" ? -44 : 44;
  const hidden = { filter: "blur(8px)", opacity: 0, y: hiddenY };
  const shown = { filter: "blur(0px)", opacity: 1, y: 0 };
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
              // Spring drives the vertical bounce (overshoot + settle);
              // blur + opacity fade in quickly underneath it.
              y: { type: "spring", bounce: 0.5, duration: 0.8, delay: d },
              opacity: { duration: 0.35, ease: "easeOut", delay: d },
              filter: { duration: 0.45, ease: "easeOut", delay: d },
            }
          : { duration: 0.3, ease: "easeIn" }
      }
      style={{ willChange: "transform, filter, opacity" }}
    >
      {children}
    </motion.div>
  );
}
