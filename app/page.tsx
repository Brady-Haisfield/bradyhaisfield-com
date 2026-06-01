import Image from "next/image";
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import ProjectCard from "./components/ProjectCard";
import BradyAIChat from "./components/BradyAIChat";
import ScrollToTop from "./components/ScrollToTop";
import SwirlBorder from "./components/SwirlBorder";
import ScrollBlur from "./components/reactbits/ScrollBlur";
import ShimmerName from "./components/reactbits/ShimmerName";

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-14 flex items-baseline gap-4">
      <span className="font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-muted-2">
        {num}
      </span>
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(32px,5vw,54px)] font-semibold leading-none tracking-tight">
        {title}
      </h2>
    </div>
  );
}

const ABOUT_DETAILS = [
  { label: "School", value: "University of Michigan" },
  { label: "Class", value: "’26" },
  { label: "Major", value: "Information Analysis" },
  { label: "Minor", value: "Business" },
  { label: "Focus", value: "Real Estate & Tech" },
];

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main id="top">
        {/* ── Hero ── */}
        <header className="relative flex min-h-screen items-center pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[8%] -z-0 h-[600px] w-[900px] -translate-x-1/2 blur-2xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,122,69,0.22), rgba(255,94,91,0.10) 45%, transparent 75%)",
            }}
          />
          <ScrollBlur className="relative z-10 mx-auto w-full max-w-[var(--maxw)] px-5 text-center sm:px-8">
            <h1
              aria-label="Brady Haisfield"
              className="font-[family-name:var(--font-display)] text-[clamp(56px,11vw,150px)] font-semibold leading-[0.92] tracking-[-0.03em]"
            >
              <ShimmerName
                lines={["Brady", "Haisfield"]}
                baseColor="#FF7A45"
                shineColor="#FFFFFF"
                cycle={7.5}
              />
            </h1>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <SwirlBorder>
                <a
                  href="#work"
                  className="inline-flex items-center rounded-full bg-accent px-6 py-3.5 font-[family-name:var(--font-mono)] text-[13px] font-medium uppercase tracking-wide text-background transition-colors hover:bg-accent-strong"
                >
                  View work →
                </a>
              </SwirlBorder>
              <SwirlBorder>
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center rounded-full bg-background px-6 py-3.5 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-foreground transition-colors hover:text-accent"
                >
                  Resume ↓
                </a>
              </SwirlBorder>
              <SwirlBorder>
                <a
                  href="https://www.linkedin.com/in/bradyhaisfield/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-background px-6 py-3.5 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-foreground transition-colors hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </SwirlBorder>
            </div>
          </ScrollBlur>
          <a
            href="#about"
            aria-label="Scroll to about"
            className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-2 transition-colors hover:text-accent"
          >
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em]">
              Scroll
            </span>
            <span className="scroll-cue text-lg leading-none">↓</span>
          </a>
        </header>

        {/* ── About ── */}
        <section id="about" className="border-t border-border py-[120px]">
          <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8">
            <ScrollBlur>
              <div className="mb-14 text-center">
                <span className="font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-muted-2">
                  01
                </span>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(44px,8vw,76px)] font-semibold leading-none tracking-tight text-accent">
                  BradyAI
                </h2>
              </div>
            </ScrollBlur>
            <ScrollBlur>
              <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                <BradyAIChat />

                <div className="rounded-2xl border border-border bg-surface p-5">
                  <div className="relative mb-5 aspect-[4/5] w-full overflow-hidden rounded-xl border border-border">
                    <Image
                      src="/headshot.jpg"
                      alt="Brady Haisfield"
                      fill
                      sizes="(max-width: 1024px) 100vw, 360px"
                      className="object-cover object-top"
                    />
                  </div>
                  <dl>
                    {ABOUT_DETAILS.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-b-0"
                      >
                        <dt className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-muted-2">
                          {row.label}
                        </dt>
                        <dd className="text-right text-sm text-foreground">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </ScrollBlur>
          </div>
        </section>

        {/* ── Work (cards: M4) ── */}
        <section id="work" className="border-t border-border py-[120px]">
          <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8">
            <ScrollBlur>
              <SectionHead num="02" title="Selected Work" />
            </ScrollBlur>
            <ScrollBlur>
              <div className="grid gap-6 sm:grid-cols-2">
                <ProjectCard href="https://thehouseswipe.com" name="HouseSwipe">
                  <Image
                    src="/houseswipe-logo.png"
                    alt="HouseSwipe logo"
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-2xl"
                  />
                </ProjectCard>
                <ProjectCard href="https://tranchere.com" name="TranchRE">
                  <span className="flex h-28 w-28 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-surface-2 to-background">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="#FF7A45"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M8 41 H40" />
                      <path d="M16 41 V13 H32 V41" />
                      <rect x="19.5" y="18" width="3.2" height="3.2" fill="#FF7A45" stroke="none" />
                      <rect x="25.3" y="18" width="3.2" height="3.2" fill="#FF7A45" stroke="none" />
                      <rect x="19.5" y="25" width="3.2" height="3.2" fill="#FF7A45" stroke="none" />
                      <rect x="25.3" y="25" width="3.2" height="3.2" fill="#FF7A45" stroke="none" />
                      <path d="M21.5 41 V33 H26.5 V41" />
                    </svg>
                  </span>
                </ProjectCard>
              </div>
            </ScrollBlur>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-20">
        <ScrollBlur className="mx-auto flex max-w-[var(--maxw)] flex-wrap items-end justify-between gap-8 px-5 sm:px-8">
          <a href="#top" aria-label="Brady Haisfield — back to top">
            <Logo className="text-[clamp(56px,11vw,104px)] leading-none" />
          </a>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/bradyhaisfield/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              LinkedIn ↗
            </a>
            <a
              href="/resume.pdf"
              className="font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              Resume ↓
            </a>
          </div>
        </ScrollBlur>
        <div className="mx-auto mt-14 flex max-w-[var(--maxw)] flex-wrap justify-between gap-3 px-5 font-[family-name:var(--font-mono)] text-xs text-muted-2 sm:px-8">
          <span>© 2026 Brady Haisfield</span>
          <span>bradyhaisfield.com</span>
        </div>
      </footer>
    </>
  );
}
