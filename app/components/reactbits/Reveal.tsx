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

  const y = direction === "top" ? -30 : 30;
  const overshoot = direction === "top" ? 6 : -6;
  const hidden = { filter: "blur(8px)", opacity: 0, y };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={
        inView
          ? {
              // Bounce-in: rise, slightly overshoot past the resting point, settle.
              filter: ["blur(8px)", "blur(3px)", "blur(0px)"],
              opacity: [0, 0.6, 1],
              y: [y, overshoot, 0],
            }
          : hidden
      }
      transition={
        inView
          ? {
              duration: 0.62,
              times: [0, 0.6, 1],
              ease: "easeOut",
              delay: delay / 1000,
            }
          : { duration: 0.3, ease: "easeIn" }
      }
      style={{ willChange: "transform, filter, opacity" }}
    >
      {children}
    </motion.div>
  );
}
