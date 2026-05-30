import Image from "next/image";
import Nav from "./components/Nav";
import BlurText from "./components/reactbits/BlurText";
import FadeContent from "./components/reactbits/FadeContent";

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
  { label: "Focus", value: "RE Tech" },
  { label: "Status", value: "Joining a startup" },
  { label: "Based", value: "United States" },
  { label: "Building", value: "2 products" },
];

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
            <FadeContent>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-accent">
                  Real Estate × Technology
                </span>
              </div>
            </FadeContent>
            <h1
              aria-label="Brady Haisfield"
              className="font-[family-name:var(--font-display)] text-[clamp(56px,11vw,150px)] font-semibold leading-[0.92] tracking-[-0.03em]"
            >
              <span className="block">
                <BlurText text="Brady" initialDelay={100} />
              </span>
              <span className="block text-accent">
                <BlurText text="Haisfield" initialDelay={260} />
              </span>
            </h1>
            <FadeContent delay={520}>
              <p className="mt-7 max-w-[540px] text-[19px] leading-relaxed text-muted">
                Recent grad building at the intersection of{" "}
                <b className="font-medium text-foreground">real estate</b> and{" "}
                <b className="font-medium text-foreground">technology</b>.
                Shipping products that make the industry move faster.
              </p>
            </FadeContent>
            <FadeContent delay={660}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="rounded-full bg-accent px-6 py-3.5 font-[family-name:var(--font-mono)] text-[13px] font-medium uppercase tracking-wide text-background transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
                >
                  View work →
                </a>
                <a
                  href="/resume.pdf"
                  className="rounded-full border border-border px-6 py-3.5 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Resume ↓
                </a>
                <a
                  href="https://www.linkedin.com/in/bradyhaisfield/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-6 py-3.5 font-[family-name:var(--font-mono)] text-[13px] uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </div>
            </FadeContent>
          </div>
          <span className="absolute bottom-9 left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-muted-2">
            Scroll ↓
          </span>
        </header>

        {/* ── About ── */}
        <section id="about" className="border-t border-border py-[120px]">
          <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8">
            <FadeContent>
              <SectionHead num="01" title="About" />
            </FadeContent>
            <FadeContent delay={120} blur>
              <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                <div>
                  <p className="mb-5 text-[20px] leading-[1.7] text-muted">
                    I&apos;m a recent college graduate entering the{" "}
                    <b className="font-medium text-foreground">
                      real estate technology
                    </b>{" "}
                    industry — drawn to the messy, high-stakes problems where
                    software can actually change how deals get done.
                  </p>
                  <p className="mb-5 text-[20px] leading-[1.7] text-muted">
                    I&apos;ve built and shipped two products in the space, and
                    I&apos;m joining a RE tech startup to keep doing exactly
                    that: turning hard industry problems into{" "}
                    <b className="font-medium text-foreground">
                      products people use
                    </b>
                    .
                  </p>
                  <p className="text-[20px] leading-[1.7] text-muted">
                    I care about craft, speed, and getting the details right.
                  </p>
                </div>

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
                        className="flex items-center justify-between border-b border-border py-2.5 last:border-b-0"
                      >
                        <dt className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-muted-2">
                          {row.label}
                        </dt>
                        <dd className="text-sm text-foreground">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </FadeContent>
          </div>
        </section>

        {/* ── Work (cards: M4) ── */}
        <section id="work" className="border-t border-border py-[120px]">
          <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8">
            <FadeContent>
              <SectionHead num="02" title="Selected Work" />
            </FadeContent>
            <FadeContent delay={120}>
              <p className="max-w-[640px] text-[20px] leading-[1.7] text-muted">
                Two products at the intersection of real estate and software.
              </p>
            </FadeContent>
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
