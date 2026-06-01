"use client";

import type { ReactNode } from "react";
import posthog from "posthog-js";

// A logo tile for the Work section: links out to the live product, lifts on
// hover with an accent border and a cursor-following spotlight. No description —
// just the logo and the product name.

export default function ProjectCard({
  href,
  name,
  children,
}: {
  href: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="glow-card group h-full transition-transform duration-300 hover:-translate-y-1">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => posthog.capture("project_clicked", { project_name: name, href })}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="relative flex h-full flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl bg-surface p-10"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx) var(--my), rgba(255,122,69,0.10), transparent 45%)",
          }}
        />
        <div className="relative flex h-28 items-center justify-center">
          {children}
        </div>
        <div className="relative flex items-center gap-2">
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
            {name}
          </span>
          <span className="text-muted-2 transition-colors group-hover:text-accent">
            ↗
          </span>
        </div>
      </a>
    </div>
  );
}
