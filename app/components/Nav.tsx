"use client";

import Logo from "./Logo";
import TrackedLink from "./TrackedLink";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
];

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          aria-label="BH — Brady Haisfield, home"
          className="inline-flex min-h-[44px] items-center"
        >
          <Logo className="text-xl" />
        </a>
        <div className="flex items-center gap-6 sm:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden min-h-[44px] items-center font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-muted transition-colors hover:text-foreground sm:inline-flex"
            >
              {link.label}
            </a>
          ))}
          <TrackedLink
            href="/resume.pdf"
            eventName="resume_clicked"
            eventProperties={{ location: "nav" }}
            className="inline-flex min-h-[44px] items-center rounded-full border border-border px-4 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Resume ↓
          </TrackedLink>
        </div>
      </div>
    </nav>
  );
}
