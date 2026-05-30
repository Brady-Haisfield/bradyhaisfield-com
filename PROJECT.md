# bradyhaisfield.com

**Status**: In Progress  
**Current Milestone**: 2 — Design System & Layout Shell  
**Last Updated**: 2026-05-30

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
- **About**: Recent grad, interested in RE + tech, joining RE tech startup
- **Projects**: HouseSwipe (thehouseswipe.com), TranchRE (tranchere.com)
- **Resume**: `/public/resume.pdf` (already added)
- **LinkedIn**: https://www.linkedin.com/in/bradyhaisfield/
- **Headshot**: Available, used tastefully (likely About or footer area) — not yet added to `/public`

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
- Headshot image not yet in `/public` — need the file before building the About section visual.
- HouseSwipe and TranchRE GitHub repos are private — project cards link to live URLs only.

---

## Milestone Map

### MILESTONE 1: Project Foundation ✅ COMPLETE
Done condition: Next.js app running locally, pushed to GitHub, live on Vercel, domain connected
- [x] Task 1.1: Initialize Next.js + TypeScript + Tailwind project
- [x] Task 1.2: Create GitHub repo and push initial commit
- [x] Task 1.3: Connect repo to Vercel and deploy (auto-deploy from GitHub)
- [x] Task 1.4: Connect bradyhaisfield.com domain — Cloudflare DNS live, HTTPS valid, apex → www (canonical)

### MILESTONE 2: Design System & Layout Shell ⏳ IN PROGRESS
Done condition: Global styles, fonts, color palette, nav, and page shell ready
_Assist: design-consultation (system + previews), design-shotgun (optional variants)_
- [x] Task 2.1: Run design-consultation → DESIGN.md locked (warm-dark + sunset orange #FF7A45, Clash Grotesk / Geist / Geist Mono, editorial layout, disciplined motion)
- [ ] Task 2.2: Set up design tokens in `globals.css` from DESIGN.md ← CURRENT
- [~] Task 2.3: Add React Bits components per-section via CLI (TS-TW variant) as needed; Framer Motion already installed
- [ ] Task 2.4: Build navigation component (minimal, fixed top)
- [ ] Task 2.5: Build page shell and scroll structure

### MILESTONE 3: Hero & About Sections ⏳
Done condition: Hero with animated intro and About section live and verified
_Assist: React Bits (text/hero animations), frontend-design (composition), browse (verify in browser)_
- [ ] Task 3.1: Build hero — name, title, animated text (React Bits text animation)
- [ ] Task 3.2: Build about section — bio, RE/tech framing, headshot
- [ ] Task 3.3: Scroll-triggered entrance animations on both sections

### MILESTONE 4: Projects Section ⏳
Done condition: HouseSwipe and TranchRE showcased with descriptions and live links
_Assist: frontend-design (cards), browse (verify)_
- [ ] Task 4.1: Build project card component with hover effects
- [ ] Task 4.2: Add HouseSwipe card (description, thehouseswipe.com)
- [ ] Task 4.3: Add TranchRE card (description, tranchere.com)

### MILESTONE 5: Resume, Skills & Contact ⏳
Done condition: Resume downloadable, skills visible, LinkedIn + contact in footer
_Assist: frontend-design (sections), browse (verify)_
- [ ] Task 5.1: Build resume download button (PDF already in `/public`)
- [ ] Task 5.2: Build skills/experience section (RE + tech focus)
- [ ] Task 5.3: Build contact section and footer with LinkedIn link

### MILESTONE 6: Polish & Final Review ⏳
Done condition: Animations cohesive, mobile responsive, site feels premium
_Assist: design-review (visual QA + fixes), qa (functional QA + bug fixes), browse (screenshots)_
- [ ] Task 6.1: design-review pass — animation cohesion, hover states, slop cleanup
- [ ] Task 6.2: Mobile responsiveness audit (browse across viewports)
- [ ] Task 6.3: qa pass + performance check (Lighthouse) + final review

---

## Resume Point
**Next action**: Task 2.2 — Write design tokens from DESIGN.md into `app/globals.css` (warm-dark palette, type vars, spacing, radius), wire Clash Grotesk via Fontshare in `app/layout.tsx`, set real metadata. Then build nav (2.4) and page shell (2.5).  
**Context**: Local folder `~/Desktop/Personal Website`. Milestone 1 complete (live at www.bradyhaisfield.com). DESIGN.md locked via design-consultation. HTML preview approved at `~/.gstack/projects/Brady-Haisfield-bradyhaisfield-com/designs/design-system-20260530/preview.html`. Deps installed; Framer Motion added; `npm run build` passes. Scaffold pages still hold default create-next-app content.
