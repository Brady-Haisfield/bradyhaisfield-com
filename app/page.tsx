import Nav from "./components/Nav";

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

export default function Home() {
  return (
    <>
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
          <div className="relative z-10 mx-auto w-full max-w-[var(--maxw)] px-5 sm:px-8">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
              <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-accent">
                Real Estate × Technology
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(56px,11vw,150px)] font-semibold leading-[0.92] tracking-[-0.03em]">
              Brady
              <br />
              <span className="text-accent">Haisfield</span>
            </h1>
            <p className="mt-7 max-w-[540px] text-[19px] leading-relaxed text-muted">
              Recent grad building at the intersection of{" "}
              <b className="font-medium text-foreground">real estate</b> and{" "}
              <b className="font-medium text-foreground">technology</b>. Shipping
              products that make the industry move faster.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="rounded-full bg-accent px-6 py-3.5 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide font-medium text-background transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
              >
                View work →
              </a>
              <a
                href="/resume.pdf"
                className="rounded-full border border-border px-6 py-3.5 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Download resume ↓
              </a>
            </div>
          </div>
          <span className="absolute bottom-9 left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-muted-2">
            Scroll ↓
          </span>
        </header>

        {/* ── About (content: M3) ── */}
        <section id="about" className="border-t border-border py-[120px]">
          <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8">
            <SectionHead num="01" title="About" />
            <p className="max-w-[640px] text-[20px] leading-[1.7] text-muted">
              I&apos;m a recent college graduate entering the{" "}
              <b className="font-medium text-foreground">
                real estate technology
              </b>{" "}
              industry — drawn to the high-stakes problems where software changes
              how deals get done.
            </p>
          </div>
        </section>

        {/* ── Work (cards: M4) ── */}
        <section id="work" className="border-t border-border py-[120px]">
          <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8">
            <SectionHead num="02" title="Selected Work" />
            <p className="max-w-[640px] text-[20px] leading-[1.7] text-muted">
              Two products at the intersection of real estate and software.
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer (contact: M5) ── */}
      <footer className="border-t border-border py-20">
        <div className="mx-auto flex max-w-[var(--maxw)] flex-wrap items-end justify-between gap-8 px-5 sm:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(36px,6vw,72px)] font-semibold leading-none tracking-tight">
            Let&apos;s
            <br />
            <span className="text-accent">build.</span>
          </h2>
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
        </div>
        <div className="mx-auto mt-14 flex max-w-[var(--maxw)] flex-wrap justify-between gap-3 px-5 font-[family-name:var(--font-mono)] text-xs text-muted-2 sm:px-8">
          <span>© 2026 Brady Haisfield</span>
          <span>bradyhaisfield.com</span>
        </div>
      </footer>
    </>
  );
}
