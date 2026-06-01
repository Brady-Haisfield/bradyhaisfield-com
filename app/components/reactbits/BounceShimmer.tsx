"use client";

// Per-letter bounce-in + continuous single-band shimmer.
//
// Each letter drops in with a spring bounce, staggered left-to-right (leftmost
// letter first, the rest follow in order). The reveal replays whenever the text
// re-enters the viewport. On top of that, a single white band sweeps across the
// whole word as ONE continuous highlight — each letter maps the shared shine
// position into its own measured box, so the band stays unified instead of the
// uneven per-letter gradient. Honors prefers-reduced-motion (static letters).

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useTime,
  useTransform,
  type MotionValue,
} from "framer-motion";

type Props = {
  lines: string[];
  baseColor?: string;
  shineColor?: string;
  /** shimmer loop length in seconds (shared across lines) */
  cycle?: number;
  /** ms between each letter's bounce */
  stagger?: number;
};

type Metric = { left: number; width: number };

export default function BounceShimmer({
  lines,
  baseColor = "#FF7A45",
  shineColor = "#FFFFFF",
  cycle = 4,
  stagger = 60,
}: Props) {
  const time = useTime();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const startRef = useRef(0);
  const [metrics, setMetrics] = useState<Metric[][]>([]);
  const [lineWidths, setLineWidths] = useState<number[]>([]);
  const linesKey = lines.join("|");

  // Replay the bounce every time the text enters/leaves the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Start the shimmer loop once the web font is ready (so it begins clean).
  useEffect(() => {
    let cancelled = false;
    const begin = () => {
      if (cancelled) return;
      startRef.current = time.get();
      setStarted(true);
    };
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(begin);
    } else {
      begin();
    }
    return () => {
      cancelled = true;
    };
  }, [time]);

  // Measure each letter's position within its line (and on resize) so the
  // shared shine can be mapped into every letter's local box.
  useLayoutEffect(() => {
    if (!started) return;
    const measure = () => {
      const m: Metric[][] = [];
      const lw: number[] = [];
      letterRefs.current.forEach((line) => {
        const row: Metric[] = [];
        line.forEach((el) =>
          row.push(
            el ? { left: el.offsetLeft, width: el.offsetWidth } : { left: 0, width: 0 },
          ),
        );
        m.push(row);
        const last = line[line.length - 1];
        lw.push(last ? last.offsetLeft + last.offsetWidth : 0);
      });
      setMetrics(m);
      setLineWidths(lw);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [started, linesKey]);

  const period = cycle * 1000;
  const progress = useTransform(time, (t) =>
    started ? (((t - startRef.current) % period) / period + 1) % 1 : 0,
  );

  const measured = metrics.length === lines.length;
  // Cumulative letter count before each line → global stagger order.
  const lineOffsets = lines.map(
    (_, i) => lines.slice(0, i).reduce((sum, l) => sum + l.length, 0),
  );

  return (
    <span
      ref={wrapRef}
      aria-hidden
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {lines.map((text, li) => (
        <span
          key={li}
          style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}
        >
          {text.split("").map((ch, ci) => (
            <BounceLetter
              key={ci}
              ch={ch}
              refCb={(el) => {
                if (!letterRefs.current[li]) letterRefs.current[li] = [];
                letterRefs.current[li][ci] = el;
              }}
              globalIndex={lineOffsets[li] + ci}
              stagger={stagger}
              inView={inView}
              reduced={!!reduced}
              baseColor={baseColor}
              shineColor={shineColor}
              progress={progress}
              lineIndex={li}
              totalLines={lines.length}
              metric={measured ? metrics[li][ci] : null}
              lineWidth={measured ? lineWidths[li] : 0}
              active={started && !reduced && measured}
            />
          ))}
        </span>
      ))}
    </span>
  );
}

function BounceLetter({
  ch,
  refCb,
  globalIndex,
  stagger,
  inView,
  reduced,
  baseColor,
  shineColor,
  progress,
  lineIndex,
  totalLines,
  metric,
  lineWidth,
  active,
}: {
  ch: string;
  refCb: (el: HTMLSpanElement | null) => void;
  globalIndex: number;
  stagger: number;
  inView: boolean;
  reduced: boolean;
  baseColor: string;
  shineColor: string;
  progress: MotionValue<number>;
  lineIndex: number;
  totalLines: number;
  metric: Metric | null;
  lineWidth: number;
  active: boolean;
}) {
  // Map the shared shine position into this letter's local box so the band reads
  // as one continuous sweep across the whole word.
  const backgroundImage = useTransform(progress, (p) => {
    if (!active || !metric || lineWidth <= 0 || metric.width <= 0) return "none";
    const band = lineWidth * 0.16;
    const start = lineIndex / totalLines;
    const end = (lineIndex + 1) / totalLines;
    let sx: number;
    if (p < start || p >= end) sx = -1e6; // off-screen → uniform base
    else {
      const local = (p - start) / (end - start);
      sx = -band + (lineWidth + 2 * band) * local;
    }
    const c = ((sx - metric.left) / metric.width) * 100;
    const mn = ((sx - band - metric.left) / metric.width) * 100;
    const mx = ((sx + band - metric.left) / metric.width) * 100;
    return `linear-gradient(100deg, ${baseColor} ${mn}%, ${shineColor} ${c}%, ${baseColor} ${mx}%)`;
  });

  if (reduced) {
    return (
      <span ref={refCb} style={{ display: "inline-block", color: baseColor }}>
        {ch}
      </span>
    );
  }

  const usesShimmer = active && metric != null && lineWidth > 0;
  const delay = (globalIndex * stagger) / 1000;

  return (
    <motion.span
      ref={refCb}
      initial={{ y: -26, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: -26, opacity: 0 }}
      transition={
        inView
          ? {
              y: { type: "spring", bounce: 0.45, duration: 0.85, delay },
              opacity: { duration: 0.25, ease: "easeOut", delay },
            }
          : { duration: 0.2, ease: "easeIn" }
      }
      style={{
        display: "inline-block",
        willChange: "transform, opacity",
        ...(usesShimmer
          ? {
              backgroundImage,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }
          : { color: baseColor }),
      }}
    >
      {ch}
    </motion.span>
  );
}
