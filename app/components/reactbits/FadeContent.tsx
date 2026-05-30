"use client";

// Adapted from React Bits "Fade Content" (TS-TW variant) — reactbits.dev
// Intersection Observer based (no GSAP / no extra deps). Adds a small upward
// rise to match DESIGN.md ("fade + slight rise"). Honors prefers-reduced-motion.

import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeContentProps = {
  children: ReactNode;
  blur?: boolean;
  /** transition duration in ms */
  duration?: number;
  easing?: string;
  /** ms before the animation starts after entering view */
  delay?: number;
  threshold?: number;
  /** px of upward travel on enter */
  yOffset?: number;
  className?: string;
};

export default function FadeContent({
  children,
  blur = false,
  duration = 700,
  easing = "ease-out",
  delay = 0,
  threshold = 0.15,
  yOffset = 18,
  className = "",
}: FadeContentProps) {
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          const id = window.setTimeout(() => setInView(true), delay);
          return () => window.clearTimeout(id);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${yOffset}px)`,
        filter: blur ? (inView ? "blur(0px)" : "blur(8px)") : undefined,
        transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
