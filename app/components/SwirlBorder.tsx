import type { ReactNode } from "react";

// Animated swirling border (React Bits "Star Border" style): a rotating
// conic-gradient arc that orbits the perimeter. The child supplies its own
// background to mask the center. Animation + clipping live in globals.css
// (.swirl-border) and honor prefers-reduced-motion.

export default function SwirlBorder({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`swirl-border ${className}`}>{children}</span>;
}
