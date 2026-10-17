# Benjamin Zhang Personal Website: Execution Plan

- **Based on**: [PRD.md](PRD.md) (module IDs M1–M9 and section numbers refer to the PRD)
- **Last updated**: 2026-10-17
- **Legend**: 👤 = you do it / decide · 🤖 = Claude does it · ✅ = done-when check

> 💡 Every line is editable. Delete or reorder tasks freely; check boxes off as you go.

---

## Phase Overview

- **Phase 0** — Key decisions
- **Phase 1** — Project setup
- **Phase 2** — Content collection (Socratic interview)
- **Phase 3** — Copy finalization & anti-slop audit
- **Phase 4** — Visual direction exploration
- **Phase 5** — Design system & wireframes
- **Phase 6** — Art assets
- **Phase 7** — Foundation code (tokens, theme, layout, content file)
- **Phase 8** — Build modules M1–M3 (Nav, Hero, About)
- **Phase 9** — Build modules M4–M6 (Projects, Leadership, Contact)
- **Phase 10** — Global behavior & motion (M9)
- **Phase 11** — Responsive & accessibility pass
- **Phase 12** — SEO & performance
- **Phase 13** — Final QA against the rubric
- **Phase 14** — Deploy
- **Phase 15** — Submit the assignment
- **Phase 16** — v2 / v3 extensions (optional)

---

## Phase 0 — Key Decisions
*PRD §11, §15*

- [x] 👤 Tech stack: **React + TS + Tailwind + Vercel**
- [x] 👤 Second modular block: **Block D** (Key Club + Schoolhouse.world)
- [x] 👤 Personal photo: **not for now**
- [x] 👤 Domain: **default Vercel URL**
- [ ] 👤 Which email is OK to show publicly *(ask in Phase 2)*
- ✅ All five answered (4/5 — email pending)

## Phase 1 — Project Setup
*PRD §9 Maintainability, §11*

- [x] 🤖 Re-initialize git in `~/Documents/personal-website`
- [x] 🤖 Remove the old HTML scaffold
- [x] 🤖 Scaffold Vite + React + TypeScript
- [x] 🤖 Install and configure Tailwind CSS (v4)
- [x] 🤖 Set up folder structure:
  - `src/components/` — one file per module (Nav, Hero, About, Projects, Leadership, Contact)
  - `src/content/` — all site text in one data file
  - `src/styles/` — design tokens
  - `public/` — images, favicon, OG image
  - `docs/` — PRD, PLAN, copy deck
- [x] 🤖 Add linting (oxlint, from the Vite template) + Prettier
- [x] 🤖 Recreate the local preview config for the browser pane
- [x] 🤖 Write `.gitignore` and a short README (how to run)
- [x] 🤖 First commit
- ✅ `npm run dev` shows a blank page in the preview

## Phase 2 — Content Collection (Socratic Interview)
*PRD §8, §12 · Handout: Socratic prompting*

- [ ] 🤖👤 One question at a time — **Schoolhouse.world**: start date, sessions/hours, number of students, subjects
- [ ] 🤖👤 **Key Club**: founding date, your role, member count, events held, volunteer hours
- [ ] 🤖👤 **AP Question Generator**: AP subjects covered, how it works, status (live / in progress), tech used
- [ ] 🤖👤 **Key Club Website**: pages, live URL, launch date
- [ ] 🤖👤 **Game projects**: how many, engine/language, one standout game
- [ ] 👤 Collect links: GitHub profile, each project URL/repo, LinkedIn (optional)
- [ ] 🤖 Save the interview log (it's evidence for the "Socratic" part of the rubric)
- ✅ Every ❌ item in PRD §12 is filled with a real fact

## Phase 3 — Copy Finalization & Anti-Slop Audit
*PRD §8 · Handout: Column 1/2/3 format*

- [ ] 🤖 Write Block D Column 1 (Socratic/RTCC prompt)
- [ ] 🤖 Generate Block D Column 2 (raw AI output)
- [ ] 👤🤖 Edit Block D Column 3 in your voice, with 2 metric bullets per entry
- [ ] 🤖👤 Add metrics into Block A bio (name Key Club & Schoolhouse.world)
- [ ] 🤖👤 Add metrics into Block B About (keep 150–250 words)
- [ ] 🤖👤 Revise Block C: game project specifics, real link labels, mark "In progress" where needed
- [ ] 🤖 Remove stray `[` characters and other formatting leftovers
- [ ] 🤖 Write the full copy deck to `docs/copy-deck.md`
- [ ] 🤖 Banned-word search → 0 hits
- [ ] 👤 Read everything aloud once — does it sound like you?
- ✅ Blocks A–D final, no placeholders, 0 banned words, word counts in range

## Phase 4 — Visual Direction Exploration
*PRD §10.3–10.5*

- [ ] 🤖 Build one preview page showing your real Hero copy in all 6 directions (A–F)
- [ ] 👤 Shortlist 1–2 directions (or a mix, e.g. A + B)
- [ ] 🤖 Show the 5 Hero layouts (H1–H5) in the chosen direction
- [ ] 👤 Pick a Hero layout
- [ ] 🤖 Show the 5 project card styles (P1–P5) with real project data
- [ ] 👤 Pick a card style
- [ ] 👤 Optional: share 1–3 reference sites you like
- ✅ Direction, Hero layout, and card style all chosen

## Phase 5 — Design System & Wireframes
*PRD §10.1*

- [ ] 🤖 Define color tokens (light + dark) for the chosen direction
- [ ] 🤖 Pick fonts and set the type scale (h1 / h2 / h3 / body / caption)
- [ ] 🤖 Set the spacing scale, border radius, shadows, and max content width
- [ ] 🤖 Check contrast for every text/background pair (WCAG AA)
- [ ] 🤖 Wireframe each section at mobile (375px) and desktop (1280px)
- [ ] 👤 Approve the wireframes
- ✅ Token sheet + approved wireframes saved in `docs/`

## Phase 6 — Art Assets
*PRD §10.2*

- [ ] 👤 Photo or avatar (if chosen in Phase 0)
- [ ] 👤 Project screenshots: AP Question Generator, Key Club Website, a game
- [ ] 🤖 Crop screenshots to 16:9 and convert to WebP
- [ ] 🤖 Design the "BZ" favicon (SVG + PNG sizes)
- [ ] 🤖 Design the social share image (1200×630)
- [ ] 🤖 Choose icon set (Lucide / Simple Icons) and the tech-stack icons
- ✅ All assets in `public/`, each image under ~200 KB

## Phase 7 — Foundation Code
*PRD M9, §10.1*

- [ ] 🤖 Put design tokens into Tailwind config / CSS variables
- [ ] 🤖 Load fonts (self-hosted or Google Fonts)
- [ ] 🤖 Build the content data file with TypeScript types (hero, about, projects, leadership, contact)
- [ ] 🤖 Build the page layout shell: container, `Section` wrapper, headings
- [ ] 🤖 Build shared components: `Button`, `Tag/Badge`, `Card`, `ExternalLink`
- [ ] 🤖 Light/dark theme: follow system, manual toggle, remember choice
- ✅ Empty sections render in both themes using real tokens

## Phase 8 — Build M1–M3
*PRD M1, M2, M3*

- [ ] 🤖 **M1 Nav**: logo, anchor links, theme toggle, sticky + blur
- [ ] 🤖 **M1 Nav (mobile)**: hamburger menu or compact row
- [ ] 🤖 **M2 Hero**: name (h1), subheadline, 3-sentence bio, two CTAs
- [ ] 🤖 **M2 Hero optional**: photo, "Currently building" tag, social icons
- [ ] 🤖 **M3 About**: 5 paragraphs, readable line length
- [ ] 🤖 **M3 About optional**: Quick Facts card, tech-stack icon wall
- [ ] 👤 Review in preview, list changes
- ✅ Nav, Hero, About match wireframes on mobile and desktop

## Phase 9 — Build M4–M6
*PRD M4, M5, M6*

- [ ] 🤖 **M4 Projects**: 3 numbered cards, descriptions, badges, links
- [ ] 🤖 **M4 Projects**: "Live / In progress" status, new-tab links
- [ ] 🤖 **M4 optional**: screenshots, separate repo/demo links
- [ ] 🤖 **M5 Leadership**: Key Club + Schoolhouse.world with role, dates, metric bullets
- [ ] 🤖 **M5 optional**: timeline style, big-number stats strip
- [ ] 🤖 **M6 Contact**: invite line, email, GitHub, LinkedIn
- [ ] 🤖 **M6 Footer**: auto year, optional "Built with" + source link, copy-email button
- [ ] 👤 Review in preview, list changes
- ✅ All v1 sections present with real content

## Phase 10 — Global Behavior & Motion
*PRD M9, §10.1 Motion*

- [ ] 🤖 Smooth scrolling for anchor links
- [ ] 🤖 Active-section highlight in the nav
- [ ] 🤖 Hover states for buttons, cards, links (150–300ms)
- [ ] 🤖 Subtle fade-in when sections enter the screen
- [ ] 🤖 Direction-specific motion (e.g. typewriter for Terminal) if chosen
- [ ] 🤖 Disable all motion under "reduce motion"
- ✅ Interactions feel smooth; nothing moves with reduced motion on

## Phase 11 — Responsive & Accessibility Pass
*PRD §9*

- [ ] 🤖 Test at 375 / 768 / 1024 / 1440px — no horizontal scroll
- [ ] 🤖 Keyboard-only walkthrough: every link and button reachable, visible focus
- [ ] 🤖 Semantic landmarks: header / nav / main / section / footer
- [ ] 🤖 Alt text on every image; labels on icon-only buttons
- [ ] 🤖 Contrast check in both themes
- [ ] 👤 Check on your own phone
- ✅ Lighthouse Accessibility ≥ 90

## Phase 12 — SEO & Performance
*PRD §9*

- [ ] 🤖 Page title + meta description
- [ ] 🤖 Open Graph + Twitter card tags with the share image
- [ ] 🤖 Favicon set + theme color
- [ ] 🤖 Lazy-load images below the fold
- [ ] 🤖 Check bundle size; remove unused dependencies
- ✅ Lighthouse Performance ≥ 90 and SEO ≥ 90

## Phase 13 — Final QA Against the Rubric
*PRD §5, §8 · Handout checklist*

- [ ] 🤖 Banned-word search across the whole site → 0
- [ ] 🤖 Every project and leadership entry has ≥ 1 metric or link
- [ ] 🤖 Click every link — all work
- [ ] 🤖 Site text matches `docs/copy-deck.md` exactly
- [ ] 👤 Final read-through in your own voice
- [ ] 👤 Optional: ask a friend or teacher to look for 30 seconds — can they say who you are?
- ✅ Every item in PRD §5 met

## Phase 14 — Deploy
*PRD §9 Hosting*

- [ ] 👤 Approve creating the GitHub repo (public or private)
- [ ] 🤖 Push code to GitHub
- [ ] 👤 Connect the repo to Vercel (sign in with your account)
- [ ] 🤖 Verify the production build and live URL
- [ ] 🤖 Re-run Lighthouse on the live URL
- ✅ Site is live over HTTPS; auto-deploys on every push

## Phase 15 — Submit the Assignment
*Handout Section 3–4*

- [ ] 👤 Paste Block D (Columns 1–3) into the handout
- [ ] 👤 Update Columns 3 of Blocks A–C with the final metric-backed copy
- [ ] 👤 Add the live URL to the handout
- [ ] 👤 Tick the pre-submission checklist
- [ ] 👤 Add the URL to your résumé, GitHub profile, and application materials
- ✅ Handout submitted with a working link

## Phase 16 — v2 / v3 Extensions (Optional)
*PRD §13, M7, M8*

- [ ] **v2** — M7 Academics: AP courses taken and planned
- [ ] **v2** — Project screenshots or demo videos
- [ ] **v2** — Planned summer projects / internships section
- [ ] **v3** — M8 Journey / Blog: dev logs, CS journey posts
- ✅ Each extension passes Phase 11–13 checks again before deploy
