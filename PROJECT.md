# bradyhaisfield.com

**Status**: In Progress  
**Current Milestone**: 1 — Project Foundation  
**Last Updated**: 2026-05-30

---

## Project Summary
Personal portfolio website for Brady Haisfield, a recent college grad entering the real estate tech industry. The site showcases two projects (HouseSwipe, TranchRE), links to LinkedIn, and provides a resume download. Built with Next.js 14, TypeScript, Tailwind CSS, React Bits animations, and Framer Motion. Deployed on Vercel at bradyhaisfield.com.

## Key Decisions
- **Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Animations**: React Bits + Framer Motion
- **Hosting**: Vercel (free tier, auto-deploy from GitHub)
- **Repo**: GitHub — Brady-Haisfield/bradyhaisfield-com
- **Design**: Dark mode, sleek card-based layout, inspired by adamblackman.com and armandgago.com
- **Resume**: PDF hosted in /public, downloadable from site
- **Domain**: bradyhaisfield.com (user owns it, connect via Vercel DNS)

## Content
- **Hero**: Name, title (RE tech / aspiring professional), animated intro
- **About**: Recent grad, interested in RE + tech, joining RE tech startup
- **Projects**: HouseSwipe (thehouseswipe.com), TranchRE (tranchere.com)
- **Resume**: /Users/braden/Desktop/Recruitment/Brady_Haisfield Resume.pdf → /public/resume.pdf
- **LinkedIn**: https://www.linkedin.com/in/bradyhaisfield/
- **Headshot**: Available, used tastefully (likely About or footer area)

## Open Questions / Known Issues
- Where is the domain registered? (Need registrar info to point DNS to Vercel)
- HouseSwipe and TranchRE GitHub repos are private — project cards will link to live URLs only

---

## Milestone Map

### MILESTONE 1: Project Foundation ⏳ IN PROGRESS
Done condition: Next.js app running locally, pushed to GitHub, live on Vercel, domain connected
- [ ] Task 1.1: Initialize Next.js 14 + TypeScript + Tailwind project ← CURRENT
- [ ] Task 1.2: Create GitHub repo and push initial commit
- [ ] Task 1.3: Connect repo to Vercel and deploy
- [ ] Task 1.4: Connect bradyhaisfield.com domain in Vercel

### MILESTONE 2: Design System & Layout Shell ⏳
Done condition: Global styles, fonts, color palette, nav, and page shell ready
- [ ] Task 2.1: Set up design tokens — dark palette, typography, spacing
- [ ] Task 2.2: Install React Bits + Framer Motion
- [ ] Task 2.3: Build navigation component (minimal, fixed top)
- [ ] Task 2.4: Build page shell and scroll structure

### MILESTONE 3: Hero & About Sections ⏳
Done condition: Hero with animated intro and About section live and verified
- [ ] Task 3.1: Build hero — name, title, animated text (React Bits)
- [ ] Task 3.2: Build about section — bio, RE/tech framing, headshot
- [ ] Task 3.3: Scroll-triggered entrance animations on both sections

### MILESTONE 4: Projects Section ⏳
Done condition: HouseSwipe and TranchRE showcased with descriptions and live links
- [ ] Task 4.1: Build project card component with hover effects
- [ ] Task 4.2: Add HouseSwipe card (description, thehouseswipe.com)
- [ ] Task 4.3: Add TranchRE card (description, tranchere.com)

### MILESTONE 5: Resume, Skills & Contact ⏳
Done condition: Resume downloadable, skills visible, LinkedIn + contact in footer
- [ ] Task 5.1: Add resume PDF to project and build download button
- [ ] Task 5.2: Build skills/experience section (RE + tech focus)
- [ ] Task 5.3: Build contact section and footer with LinkedIn link

### MILESTONE 6: Polish & Final Review ⏳
Done condition: Animations cohesive, mobile responsive, site feels premium
- [ ] Task 6.1: Full animation pass — scroll triggers, hover states
- [ ] Task 6.2: Mobile responsiveness audit
- [ ] Task 6.3: Performance check + final review

---

## Resume Point
**Next action**: Task 1.1 — Initialize Next.js 14 + TypeScript + Tailwind project  
**Context**: Project directory created at /Users/braden/bradyhaisfield-com. Starting fresh Next.js setup.
