# Master Website Copy Deck — Benjamin Zhang

> Final copy used on the site. The code reads the same text from `src/content/site.ts`; keep the two in sync.
> Checks: 0 banned words · Block A bio = 3 sentences · Block B ≈ 210 words (150–250 required).

---

## Block A — Hero (Required)

**Headline:** Benjamin Zhang
**Subheadline:** Student Developer | Computer Science & AI
**Kicker:** Portfolio · Class of 2028

**3-Sentence Bio:**
I'm a high school student who enjoys turning ideas into working software. I spend much of my free time coding, experimenting with AI, and building games in Unity and JavaScript. Outside of programming, I tutor math on Schoolhouse.world and co-founded my school's Key Club.

**CTA Buttons:** View My Projects · Explore My GitHub

*Changes from the handout version:* named the game engines, Schoolhouse.world, and Key Club instead of "student-led community projects".

---

## Block B — About Me (Required)

I got interested in computer science because I liked the idea of making something from scratch and seeing it actually work. What started as small coding experiments gradually turned into larger projects involving websites, AI tools, and games.

One thing I enjoy most about programming is solving problems. Sometimes a feature doesn't work as expected, or an application becomes difficult to maintain as it grows. I like figuring out what went wrong, testing different solutions, and improving the design instead of just adding more code.

Recently, I've been exploring AI-assisted development and building web applications. I'm especially interested in how AI can help people learn, automate repetitive tasks, and make software easier to use. That's why I started APForge, an AP question generator that checks AI-written questions before accepting them.

Outside of coding, I co-founded a Key Club at my school, which now has about 20 members, and I tutor Pre-Algebra and AP Precalculus through Schoolhouse.world. Teaching has helped me improve how I explain complicated ideas, while organizing a club has given me experience working with other people.

I plan to study computer science in college, with a focus on AI and software engineering. For now, I want to keep building projects, learning from mistakes, and exploring new ideas.

*Changes:* added games, the APForge name and what it does, the member count, and the two courses tutored.

---

## Block C — Projects (Modular Choice 1)

### 01 — MagicField (法域棋局) · Live
MagicField is a board-based strategy game I'm building as my main project, with 11 characters across different elements and 176 skills. I also built a wiki that generates its character, skill, and rules pages directly from the game data, in both Chinese and English.
**Skills:** Game Design · JavaScript · Python
**Links:** Play the Game → magic-field-game.vercel.app · Read the Wiki → magicfield.vercel.app

### 02 — APForge (AP Question Generator) · In progress
I'm developing an open-source tool that uses AI to generate AP-style practice questions. Instead of trusting the first answer, it runs each question through validators and an evaluation step, then accepts, repairs, or rejects it.
**Skills:** Python · LLM Evaluation · React
**Link:** View on GitHub → github.com/S1lkrain/APForge

### 03 — Key Club Website (Pioneer Academy) · Live
I built a website for our school's Key Club using React, TypeScript, and Tailwind CSS. It introduces the club, explains its activities, and provides information for students interested in joining.
**Skills:** React · TypeScript · Tailwind CSS
**Links:** Visit Website → key-club-web.vercel.app · Source → github.com/S1lkrain/KeyClubWeb

### 04 — Project: Magic (Shelved game prototype) · Shelved
An earlier game I spent about 200 hours developing before I stopped because the gameplay did not feel strong enough. Letting it go was hard, but it taught me to test whether a game is fun early, before building every system around it.
**Skills:** Game Design · Prototyping · Debugging

---

## Block D — Community Action & Leadership (Modular Choice 2)

### Column 1 — Finalized Master Prompt (Socratic + RTCC)

**Role:** Act as a college portfolio writing assistant and interviewer.
**Task:** First, ask me one question at a time to collect real facts about my leadership and community activities. Then write the Leadership section of my personal website.
**Context:** I am Benjamin Zhang, Class of 2028. I tutor math on Schoolhouse.world and co-founded the Key Club at Pioneer Academy. I also built the Key Club's website.
**Constraints:**
- Ask ONE question at a time; do not move on until I answer.
- Use only the facts I give you. Do not invent numbers, awards, or events.
- For each organization, give: organization, role, dates, and exactly 2 bullet points.
- Every bullet must include a concrete number, tool, or link.
- Write in natural, first-person-implied résumé style.
- Do not use: passionate, delve, tapestry, transformative, beacon, testament, nestled, vibrant, fostered, seamless, realm, embark.

**Interview log (facts collected):**
- Schoolhouse.world: member since October 2025; 5 tutoring hours; 3 sessions hosted; 2 countries; 10 learners; top courses Pre-Algebra and AP Precalculus; 9 positive ratings; 7 "Super Helpful".
- Key Club: founded this year (2026); about 20 members; no events held yet.
- Key Club website: key-club-web.vercel.app (React, TypeScript).

### Column 2 — Raw AI Output

**Schoolhouse.world — Volunteer Math Tutor (Oct 2025 – Present)**
- Dedicated to helping students succeed in math by providing engaging and supportive tutoring sessions to learners around the world.
- Tutored 10 learners across 2 countries in Pre-Algebra and AP Precalculus, earning outstanding feedback.

**Key Club, Pioneer Academy — Co-founder (2026 – Present)**
- Played a key role in establishing a vibrant new service club that brings students together to make a difference in the community.
- Grew the club to around 20 members and developed a website to increase engagement.

### Column 3 — Final Copy Deck Text (Edited) ★

**Schoolhouse.world — Peer Math Tutor · Oct 2025 – Present**
- Hosted 3 sessions (5 tutoring hours) for 10 learners in 2 countries, covering Pre-Algebra and AP Precalculus.
- Received 9 positive ratings from learners, including 7 "Super Helpful" ratings.

**Key Club, Pioneer Academy — Co-founder · 2026 – Present**
- Co-founded the club in 2026; it now has about 20 members in its first year.
- Built the club's website with React and TypeScript to share meeting times and help new students join.

*Edits made from Column 2:* removed "vibrant" (banned) and vague phrases ("dedicated to helping", "make a difference", "outstanding feedback"); replaced them with the real counts. Removed "grew the club" because no growth data was given.

---

## Big-Number Strip (site only)

| Number | Label |
|---|---|
| 176 | skills designed for MagicField |
| ~200 | hours spent on Project: Magic |
| 10 | learners tutored on Schoolhouse.world |
| ~20 | Key Club members in year one |

## Contact

**Heading:** Want to talk about a project?
**Sub:** Reach out by email, or take a look at my code on GitHub.
**Emails:** benjaminzhang1207@gmail.com · yanchen.zhang@pioneeracademy.org
**GitHub:** github.com/S1lkrain
