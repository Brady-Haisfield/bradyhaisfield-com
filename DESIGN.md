# Design System — bradyhaisfield.com

## Product Context
- **What this is:** Personal portfolio site for Brady Haisfield, a recent college grad entering the real estate technology industry.
- **Who it's for:** Recruiters, founders, and investors in RE tech. First impression to land a role / build credibility.
- **Space/industry:** Real estate technology; developer/builder portfolios.
- **Project type:** Single-page marketing/portfolio site (Next.js 16 + TypeScript + Tailwind v4).
- **Memorable thing:** "Sharp builder with taste." Visitor should leave thinking *this person ships and has design sense.*

## Aesthetic Direction
- **Direction:** Brutally minimal, editorial structure.
- **Decoration level:** Intentional — type and whitespace do the work; one faint sunset glow behind the hero; subtle card hover-spotlight. No gradients-as-CTA, no icon grids, no centered-everything.
- **Mood:** Warm-dark, precise, confident, premium. Distinctive without being loud.
- **Reference feel:** adamblackman.com, linear.app (discipline) — warmed up with a sunset palette nobody else in the dev-portfolio space uses.

## Typography
- **Display/Hero:** Clash Grotesk (600) — sharp, contemporary grotesk. The "taste" signal. Oversized hero + headings.
- **Body:** Geist — clean, dev-credible, legible. (Already loaded in scaffold via `next/font`.)
- **UI/Labels:** Geist (same as body) for nav and buttons.
- **Data/Mono:** Geist Mono — uppercase spec-sheet labels, section numbers (`01 — ABOUT`), tags, dates. The "builder" signal. (Already loaded.)
- **Code:** Geist Mono.
- **Loading:** Clash Grotesk via Fontshare CDN (`https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap`). Geist + Geist Mono via `next/font/google` (already wired in `app/layout.tsx`).
- **Scale (clamp, fluid):**
  - Hero H1: `clamp(56px, 11vw, 150px)`, line-height 0.92, letter-spacing -0.03em
  - Section H2: `clamp(32px, 5vw, 54px)`, letter-spacing -0.02em
  - Project H3: 30px
  - Body: 19–20px, line-height 1.6–1.7
  - Mono label: 11–13px, letter-spacing 0.06–0.18em, uppercase

## Color
- **Approach:** Restrained. Near-monochrome warm-dark + one signature accent. Color is rare and meaningful.
- **Background:** `#0C0A09` — warm near-black (espresso), warmer than a cold blue-black so the orange feels at home.
- **Surface:** `#17120F` · **Surface-2:** `#1F1813` — elevated cards/panels.
- **Border:** `#2C231C` — hairline dividers, card edges.
- **Text (primary):** `#F4ECE4` — warm off-white.
- **Muted:** `#A89C90` · **Muted-2:** `#6E635A` — secondary text, mono section numbers.
- **Accent (signature):** `#FF7A45` — sunset orange. Used sparingly: name/key headline words, links, active states, primary CTA.
- **Accent-strong:** `#FF6326` — hover/pressed state of the accent.
- **Hero glow:** radial `rgba(255,122,69,0.22)` → `rgba(255,94,91,0.10)` → transparent, blurred, low-opacity. The only "gradient," and it's atmospheric, not a button.
- **Semantic:** success `#4ADE80`, warning `#F5B544`, error `#F26A6A`, info `#5EA9FF` (use only if a form/state needs them).
- **Light mode:** none — site is dark-only by design.

## Spacing
- **Base unit:** 8px.
- **Density:** Spacious — generous negative space is part of the aesthetic.
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(96) 5xl(120). Section vertical padding ≈ 120px.

## Layout
- **Approach:** Editorial grid. Asymmetric hero; disciplined cards for Work.
- **Grid:** single-column flow with editorial breaks; About is 1.4fr / 1fr (copy / detail card); Work is full-width stacked cards.
- **Max content width:** 1140px, horizontal padding 32px (mobile 20–24px).
- **Section anchor:** mono section number (`01`, `02`, `SYS`) sits left of each H2.
- **Border radius:** sm 10px, md 12px, lg 16–18px (cards), full 9999px (buttons, pills, dot).

## Motion
- **Approach:** Intentional, disciplined (matches brutally-minimal). Implemented with **React Bits** components (TS-TW variant) over Framer Motion.
  - Hero: text reveal on load (React Bits Split Text / Blur Text).
  - Sections: scroll-triggered fade + slight rise on enter.
  - Project cards: hover lift (`translateY(-4px)`) + radial spotlight following the cursor + accent border.
  - Nav: blur backdrop, links color-shift to accent on hover.
- **Easing:** enter `ease-out`, exit `ease-in`, move `ease-in-out`.
- **Duration:** micro 50–100ms, short 150–250ms, medium 250–400ms.
- **Reduced motion:** honor `prefers-reduced-motion` — disable transforms/reveals, keep instant states.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-30 | Initial design system created | /design-consultation. Aesthetic "sharp builder with taste"; warm-dark base chosen to support a sunset-orange signature accent (user-directed); Clash Grotesk + Geist + Geist Mono; editorial layout with mono spec-sheet labels. |
| 2026-05-30 | Accent = sunset orange #FF7A45 on warm-dark #0C0A09 | User wanted warm/sunset orange; warmed the near-black so orange reads premium, not jarring. Distinctive vs. the cool-accent norm in dev portfolios. |
