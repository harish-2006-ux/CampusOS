# CampusOS — AI Career Operating System

CampusOS turns a student's college journey into an evolving Career Twin — an AI-modeled profile of career readiness that generates personalized missions, simulates interviews and placements, and shows recruiters/placement cells campus-wide readiness signals.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/campus-os/src/App.tsx` — shell: sidebar/nav, header, hero, and the CodeLab mini-app (unchanged from before).
- `artifacts/campus-os/src/components/career-twin/CareerTwin.tsx` — the Career Twin mini-app (Dashboard, Skill Gap Map, Missions, Interview Arena, Company Fit + Placement Simulator). Rendered when the "Career Twin" nav item (module id `overview`) is active.
- `artifacts/campus-os/src/components/career-twin/CampusIntelligence.tsx` — placement-cell/admin dashboard. Rendered for the "Campus Intelligence" nav item (roles: officer, recruiter).
- `artifacts/campus-os/src/components/career-twin/career-twin.css` — scoped cinematic dark theme (`.twin-app`) for the above two, isolated from the base light theme in `index.css` so nothing else changes visually.
- `artifacts/campus-os/src/lib/career-twin-data.ts` — all Career Twin mock/sample data (readiness score, Career DNA categories, target-role skill requirements, missions, interview modes/reports, company fit targets, placement simulator stages, timeline, campus intelligence stats).
- `artifacts/campus-os/src/lib/campusos.ts` — nav module registry; `overview` relabeled to "Career Twin", new `campus-intelligence` module added. No existing module ids removed.

## Architecture decisions

- The Career Twin and Campus Intelligence views use a self-contained dark "cinematic" theme (CSS custom properties prefixed `--twin-*`, scoped under `.twin-app`) rather than changing the global light theme, so CodeLab and the other placeholder modules are untouched.
- Career Twin is structured as tabs (Dashboard / Skill Gap / Missions / Interview Arena / Company Fit) mirroring the existing CodeLab tab pattern (`CodelabTabs`) for UX consistency, with Placement Simulator nested inside Company Fit rather than as its own top-level nav item.
- All Career Twin data is currently static/mock (`lib/career-twin-data.ts`) — there's no backend wiring yet for readiness scoring, mission generation, or interview analysis. Swapping in real data means replacing that file's exports with API-backed hooks; component code doesn't need to change shape.

## Product

- **Career Twin** — a student's living career-readiness profile: overall Career Readiness Score, Career DNA (14 scored categories), coding/communication/interview readiness, placement probability, and a career progress timeline.
- **Skill Gap Map** — compares a selected target role's required skills against the student's current skills, flags strong/moderate/missing/critical gaps, and surfaces a recommended mission for the critical gap.
- **AI Career Missions** — small, scoped missions (difficulty, time estimate, XP, readiness boost) generated from weaknesses instead of full courses.
- **Interview Arena** — six interview modes (Technical, HR, Behavioral, Managerial, Group Discussion, Company-specific); each mode returns a mock post-interview report (confidence, communication, technical knowledge, clarity, problem solving, filler words, answer structure, strengths/weaknesses, next mission).
- **Company Fit Simulator** — target company + role fit breakdown (skill/coding/project/resume/communication/interview match), missing skills, and predicted fit after completing missions.
- **Placement Simulator** — a 5-stage virtual placement season (resume screening → aptitude → coding → technical → HR) with pass/at-risk/pending status and reasoning.
- **Campus Intelligence** — placement-cell dashboard: cohort totals, readiness/risk counts, department comparison, skill demand vs. campus supply, placement funnel, and auto-generated pattern insights (e.g. "183 students are technically ready but have weak interview performance").
- Everything that existed before (CodeLab's Dashboard/Explore/Progress/Companies/Mentor, and the Placements/Assessments/Resume/Skills/Analytics/Leaderboard/AI Mentor placeholders) is preserved unchanged.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `pnpm --filter @workspace/campus-os run typecheck` and a full `vite build` both pass clean as of this change.
- The hero wordmark now renders a two-line phrase ("Your career. Engineered.") instead of the single "CampusOS" logotype; it uses a new `.hero-wordmark-phrase` size override in `index.css` so it doesn't overflow at the old logotype's larger clamp size.

## User preferences
