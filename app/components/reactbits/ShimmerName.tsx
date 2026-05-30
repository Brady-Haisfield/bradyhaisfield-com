"use client";

// Sequenced shimmer for the hero name (React Bits "Shiny Text" idea, JS-driven).
// One shared loop drives every line: line i is "active" during [i/N, (i+1)/N).
// During its window a white band sweeps fully across the word; outside its
// window the band is parked completely off-screen, so the word is uniform base
// color (no residual). Lines hand off instantly at the window boundary — word 1
// is fully normal at the exact moment word 2 begins. The loop starts at 0 on
// mount, after the web font is ready, so every reload begins from the top.
// Honors prefers-reduced-motion.
//
// Technique: a 3-stop gradient (base / white / base) clipped to the text, where
// the white stop's center `x%` is animated across the glyphs. Background-size is
// the default 100%, so x is literally "percent across the text" — the band fully
// clears once x passes the edges by the band half-width (BAND).

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTime,
  useTransform,
  type MotionValue,
} from "framer-motion";

const BAND = 22; // white band half-width, in % of text
const ENTER = -30; // shine center fully off the left (uniform)
const EXIT = 130; // shine center fully off the right (uniform)
const OFF = -30; // parked off-screen when this line isn't active

type ShimmerNameProps = {
  lines: string[];
  baseColor?: string;
  shineColor?: string;
  /** total loop length in seconds (all lines share it) */
  cycle?: number;
};

export default function ShimmerName({
  lines,
  baseColor = "#FF7A45",
  shineColor = "#FFFFFF",
  cycle = 10,
}: ShimmerNameProps) {
  const time = useTime();
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);
  const startRef = useRef(0);

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

  const period = cycle * 1000;
  const progress = useTransform(time, (t) =>
    started ? (((t - startRef.current) % period) / period + 1) % 1 : 0,
  );

  return (
    <>
      {lines.map((text, i) => (
        <span key={text} className="block">
          <ShimmerLine
            text={text}
            index={i}
            total={lines.length}
            progress={progress}
            baseColor={baseColor}
            shineColor={shineColor}
            active={started && !reduced}
          />
        </span>
      ))}
    </>
  );
}

function ShimmerLine({
  text,
  index,
  total,
  progress,
  baseColor,
  shineColor,
  active,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  baseColor: string;
  shineColor: string;
  active: boolean;
}) {
  // Shine center position, in % across the text. Off-screen (uniform) outside
  // this line's window; sweeps ENTER -> EXIT during its window.
  const x = useTransform(progress, (p) => {
    const start = index / total;
    const end = (index + 1) / total;
    if (p < start || p >= end) return OFF;
    const local = (p - start) / (end - start);
    return ENTER + (EXIT - ENTER) * local;
  });
  const xMin = useTransform(x, (v) => v - BAND);
  const xMax = useTransform(x, (v) => v + BAND);
  const backgroundImage = useMotionTemplate`linear-gradient(100deg, ${baseColor} ${xMin}%, ${shineColor} ${x}%, ${baseColor} ${xMax}%)`;

  // Uniform base color before the loop starts and for reduced-motion users.
  if (!active) {
    return <span style={{ color: baseColor }}>{text}</span>;
  }

  return (
    <motion.span
      style={{
        display: "inline-block",
        backgroundImage,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {text}
    </motion.span>
  );
}
