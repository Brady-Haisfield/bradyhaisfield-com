# bradyhaisfield.com

**Status**: Complete — all milestones shipped  
**Current Milestone**: 6 — Polish & Final Review ✅  
**Last Updated**: 2026-06-01

---

## Project Summary
Personal portfolio website for Brady Haisfield, a recent college grad entering the real estate tech industry. The site showcases two projects (HouseSwipe, TranchRE), links to LinkedIn, and provides a resume download. Built with Next.js 16, TypeScript, Tailwind CSS v4, and React Bits animated components (with Framer Motion). Deployed on Vercel at bradyhaisfield.com.

## Key Decisions
- **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
  - ⚠️ Next.js 16 has breaking changes vs. older versions — per `AGENTS.md`, read the bundled guides in `node_modules/next/dist/docs/` before writing framework code.
- **Animations**: **React Bits** (reactbits.dev) — animated components installed per-component via CLI, not as a single npm package. Use the **`TS-TW`** variant (TypeScript + Tailwind) to match the stack.
  - shadcn route: `npx shadcn@latest add @react-bits/<Component>-TS-TW`
  - jsrepo route: `npx jsrepo add https://reactbits.dev/<variant>/<Category>/<Component>`
  - Grab the exact copy-ready command from each component's page on reactbits.dev. Components bring their own deps (some use `motion`/Framer Motion, some `gsap`, `three`, or `ogl`). Framer Motion is already installed.
- **Hosting**: Vercel (free tier, auto-deploy from GitHub `main`)
- **Repo**: GitHub — Brady-Haisfield/bradyhaisfield-com (local folder: `~/Desktop/Personal Website`)
- **Design**: Dark mode, sleek card-based layout, inspired by adamblackman.com and armandgago.com
- **Resume**: PDF hosted in `/public/resume.pdf`, downloadable from site
- **Domain**: bradyhaisfield.com — registered on **Cloudflare**; live on Vercel with valid HTTPS. Apex redirects to **www** (canonical primary URL: www.bradyhaisfield.com)

## Content
- **Hero**: Name, title (RE tech / aspiring professional), animated intro
- **About**: University of Michigan grad ('26, Information Analysis major / Business minor). Founded and launched two RE tech products; building at the intersection of real estate + technology. Stats card: School / Class / Major / Minor / Focus. (Future: the About section evolves into an interactive "BradyAI" chatbot — visitors ask questions about Brady and get answers. Built after the core site — see Future milestone.)
- **Projects**: HouseSwipe (thehouseswipe.com), TranchRE (tranchere.com)
- **Resume**: `/public/resume.pdf` (already added)
- **LinkedIn**: https://www.linkedin.com/in/bradyhaisfield/
- **Headshot**: Added at `public/headshot.jpg`, used in the About card via next/image.

## Tooling & Skills
Skills selected because they genuinely move this specific project forward. Each milestone notes which skill assists it (see Milestone Map).

**Core**
- **design-consultation** — researches the design landscape and proposes a complete design system (aesthetic, typography, color, layout, spacing, motion) with font + color previews. Drives Milestone 2.
- **React Bits** — the animated-component source for the site (hero text effects, backgrounds, card/hover animations). Installed per-component via CLI (TS-TW). Used across Milestones 3–5.
- **frontend-design** — for the surrounding composition React Bits doesn't cover (layout, spacing, hierarchy, responsive structure) and to keep it from looking generic. Wraps the React Bits pieces in Milestones 3–5.
- **browse** — fast headless browser to dogfood/QA the running site (localhost + live) and capture screenshots. Used continuously from Milestone 3 on.
- **design-review** — designer's-eye QA pass: visual inconsistency, spacing, hierarchy, slop patterns, slow interactions — then fixes them. Milestone 6.
- **qa** — systematically QA-tests the web app and fixes bugs found. Milestone 6.

**Situational**
- **design-shotgun** — generate multiple AI design variants on a comparison board if the hero/layout direction is undecided (optional, Milestone 2–3).
- **verify** — run the real app and confirm a change actually works before pushing.
- **ship** — clean commit + CHANGELOG + push/PR flow; pushing to `main` auto-triggers the Vercel deploy.

**Considered and deliberately skipped** (kept out to avoid overhead):
- `gsd-*` suite and `pilot` — heavyweight project-management frameworks; this PROJECT.md already serves as the lightweight plan.
- `security-review` / `cso` — static site with no backend, auth, or secrets → low value.
- `benchmark` / `canary` — perf monitoring is overkill for a portfolio; Lighthouse + Vercel analytics suffice.
- `pdf` / `make-pdf` — resume is already a PDF.
- Supabase, Claude API SDK, iOS, docx/pptx/xlsx, mcp-builder — irrelevant to this project.

## Open Questions / Known Issues
- Headshot added (`public/headshot.jpg`, 2.6 MB original; next/image optimizes delivery). Could pre-downscale later if desired.
- HouseSwipe and TranchRE GitHub repos are private — project cards link to live URLs only.

---

## Milestone Map

### MILESTONE 1: Project Foundation ✅ COMPLETE
Done condition: Next.js app running locally, pushed to GitHub, live on Vercel, domain connected
- [x] Task 1.1: Initialize Next.js + TypeScript + Tailwind project
- [x] Task 1.2: Create GitHub repo and push initial commit
- [x] Task 1.3: Connect repo to Vercel and deploy (auto-deploy from GitHub)
- [x] Task 1.4: Connect bradyhaisfield.com domain — Cloudflare DNS live, HTTPS valid, apex → www (canonical)

### MILESTONE 2: Design System & Layout Shell ✅ COMPLETE
Done condition: Global styles, fonts, color palette, nav, and page shell ready
_Assist: design-consultation (system + previews), design-shotgun (optional variants)_
- [x] Task 2.1: Run design-consultation → DESIGN.md locked (warm-dark + sunset orange #FF7A45, Clash Grotesk / Geist / Geist Mono, editorial layout, disciplined motion)
- [x] Task 2.2: Design tokens in `app/globals.css` from DESIGN.md; Clash Grotesk wired via Fontshare + real metadata in `app/layout.tsx`
- [x] Task 2.3: React Bits components under `app/components/reactbits/` — ShimmerName (JS-driven sequenced white shimmer on the hero name: one shared loop, one word at a time, clean hand-off, resets from top on reload via document.fonts.ready), Scroll Blur (bidirectional scroll-linked blur via Framer useScroll), Blur Text (retained, currently unused); adapted for framer-motion + Tailwind v4. Shared `app/components/Logo.tsx` (BH mark, nav + footer) and `app/components/SwirlBorder.tsx` (animated conic border, "Star Border" style). CSS animations in `globals.css` (swirl-spin, scroll-cue), all reduced-motion aware.
- [x] Task 2.4: Nav component (`app/components/Nav.tsx`) — fixed blur nav, BH / About · Work · Resume
- [x] Task 2.5: Page shell (`app/page.tsx`) — hero + anchored About/Work sections + footer, scroll structure. `npm run build` passes.

### MILESTONE 3: Hero & About Sections ✅ COMPLETE
Done condition: Hero with animated intro and About section live and verified
_Assist: React Bits (text/hero animations), frontend-design (composition), browse (verify in browser)_
- [x] Task 3.1: Hero — **centered**; both name lines sunset orange with a white shimmer that sweeps Brady then Haisfield (one word at a time, clean hand-off, constant speed, resets from top on reload) via **ShimmerName**; CTA buttons (View work / Resume / LinkedIn) centered with a swirling orange animated border (**SwirlBorder**). Eyebrow + subtitle removed; animated scroll cue.
- [x] Task 3.2: About section — bio + headshot card (`public/headshot.jpg` via next/image) + detail rows (Focus/Status/Based/Building)
- [x] Task 3.3: Scroll-linked **bidirectional blur** via React Bits–style **Scroll Blur** (`app/components/reactbits/ScrollBlur.tsx`, Framer useScroll) — content blurs in as it enters and out as it leaves, reversing on scroll-up. Honors prefers-reduced-motion. Verified desktop + mobile via browse; `npm run build` passes. (Footer "Let's build" replaced with the BH logo.)

### MILESTONE 4: Projects Section ✅ COMPLETE
Done condition: HouseSwipe and TranchRE showcased as logo cards linking to live sites
_Assist: frontend-design (cards), browse (verify)_
- [x] Task 4.1: `ProjectCard` component (`app/components/ProjectCard.tsx`) — logo tile, hover lift + accent border + cursor-following spotlight, links out (new tab). No descriptions per user.
- [x] Task 4.2: HouseSwipe card → real logo pulled from thehouseswipe.com (`public/houseswipe-logo.png`, 256px), links to thehouseswipe.com
- [x] Task 4.3: TranchRE card → custom sunset-orange real-estate building icon (inline SVG), links to tranchere.com. Cards in a 2-col grid (stacks on mobile), wrapped in Scroll Blur. Verified desktop + mobile; `npm run build` passes.

### MILESTONE 5: Resume & Contact ✅ COMPLETE
Done condition: Resume downloadable, LinkedIn + contact in footer
**Decision (2026-06-01):** Site scope is intentionally **Landing → About → Projects** only. No standalone Skills/Experience section — the user likes the three sections as they are. Resume + LinkedIn are already surfaced in the nav, hero, and footer, so this milestone is satisfied without a new section.
- [x] Task 5.1: Resume download button (PDF in `/public`) — present in nav, hero, footer
- [x] ~~Task 5.2: Skills/experience section~~ — **cut by design** (see decision above)
- [x] Task 5.3: Contact in footer — LinkedIn link present

### MILESTONE 6: Polish & Final Review ✅ COMPLETE
Done condition: Animations cohesive, mobile responsive, site feels premium
_Assist: design-review (visual QA + fixes), qa (functional QA + bug fixes), browse (screenshots)_
- [x] Task 6.1: design-review pass — Design A−, AI-Slop A (no slop patterns). Fixed FINDING-001 (sub-44px nav/footer tap targets → 44px) and FINDING-002 (branded :focus-visible accent ring). Headshot perf concern resolved (next/image serves a 640w/q75 image, not the 2.6MB original).
- [x] Task 6.2: Mobile responsiveness audit (browse across viewports) — audited at 390px & 375px section by section; fixed horizontal overflow (body overflow-x:hidden), aligned hero CTA to "View projects", chat tested functionally on mobile. No layout breaks, no console errors.
- [x] Task 6.3: qa pass + Lighthouse + final review. Functional QA: all links resolve (anchors, resume PDF 200, project/LinkedIn _blank), console clean (no errors/hydration), BradyAI chat verified — guardrails hold (off-topic declines; phone/address refused; contact = email + LinkedIn), input validation returns 400 on empty/blank/over-length/bad-role, send disabled on empty, streaming works. Fixed ISSUE-001 (muted-2 contrast → WCAG AA 4.99:1) and ISSUE-002 (logo link Label-in-Name), added Fontshare preconnect. Lighthouse desktop: Perf 95 / A11y 100 / Best-Practices 100 / SEO 100. Mobile: Perf 88-89 / A11y 100 / BP 100 / SEO 100 (CLS 0, TBT 10ms; LCP ~3s on simulated slow-4G is font-fallback paint).

### MILESTONE: BradyAI Chatbot ✅ COMPLETE (pulled forward ahead of polish)
Done condition: About section becomes an interactive AI chat where visitors ask questions about Brady and get answers.
_Assist: @anthropic-ai/sdk (Haiku 4.5, streaming), frontend-design (chat UI), browse (verify)_
- [x] Chat experience: replaced the About bio with a "BradyAI" chat panel (left column); kept the headshot+stats card (right). Starter-question chips, greeting, streaming answers, plain-text rendering. Matches DESIGN.md tokens; reduced-motion aware.
- [x] Backend: streaming Next 16 Route Handler `app/api/chat/route.ts` → Claude `claude-haiku-4-5-20251001`. System prompt + knowledge base in `app/api/chat/brady-context.ts`.
- [x] Chat UI + streaming: `app/components/BradyAIChat.tsx` (fetch + ReadableStream reader, appends text deltas live).
- [x] Guardrails: scope-to-Brady system prompt + off-topic decline; server-side limits (≤1000 chars/msg, ≤12 msgs, max_tokens 512); per-IP in-memory rate limit (10/min); contact policy shares only brady@bradyhaisfield.com + LinkedIn, refuses phone/address. Verified live via curl + browse.
- **Key:** `ANTHROPIC_API_KEY` in `.env.local` (gitignored) for local; **must be set in Vercel env vars** for production.
- **Future upgrades (optional):** distributed rate limiting (@upstash/ratelimit), prompt caching on the system prompt, persistent chat history.

---

## Resume Point
**Next action**: None — all 6 milestones + the BradyAI chatbot are complete and live at www.bradyhaisfield.com. Site scope is **Landing → About/BradyAI → Projects** (Skills cut by design). Final scores: Lighthouse desktop 95/100/100/100, mobile 88-89/100/100/100. Future-optional only: distributed rate limiting + prompt caching for the chat, more knowledge-base answers, pre-downscaling the headshot source.  
**Context**: Local folder `~/Desktop/Personal Website`. Milestones 1–5 complete. Live at www.bradyhaisfield.com. Hero (ShimmerName) + About (headshot) + Work (HouseSwipe + TranchRE logo cards) done with scroll-blur reveals. Resume + LinkedIn in nav/hero/footer. Reload always lands at top (ScrollToTop strips hash). React Bits + cards in `app/components/`. `npm run build` passes.
