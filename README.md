# Ayadatak (عيادتك)

Ayadatak is an Arabic-first, multi-tenant SaaS platform that lets clinics and doctors create and manage professional clinic websites from a single shared platform.

> **Verified 2026-10-28:** The foundation, marketing homepage, typed clinic content model, reusable clinic template, two fictional fixtures, slug-based fixture resolver, demo routes, and a browser-local visual website editor prototype are present. P3 is **PENDING REVIEW** for final owner visual/product approval. Authentication, production clinic dashboards, database persistence, tenant routing, publishing, and billing are not implemented.

## Project documentation

- [Approved Implementation Plan v1.1](docs/IMPLEMENTATION_PLAN.md): complete owner-supplied product decisions and roadmap.
- [Product specification](docs/PRODUCT_SPEC.md): detailed V1 requirements synchronized to the approved plan.
- [Task tracker](docs/TASKS.md): current progress, remaining work, and review gates.
- [Architecture](docs/ARCHITECTURE.md): implemented code and planned production design.
- [Decision log](docs/DECISIONS.md): approved choices and open questions.
- [Agent instructions](AGENTS.md): workflow, engineering rules, and Git safety. `CLAUDE.md` delegates to it.

Use the implementation plan for approved decisions, the specification for detailed requirements, and the tracker/architecture for current state. Report unresolved conflicts; do not treat roadmap requirements as working features.

## Planned scope

- Public marketing website for Ayadatak
- Clinic owner authentication and onboarding
- Clinic owner dashboard (content, settings, section visibility)
- One polished clinic website template in V1
- Public clinic websites on default subdomains; custom domains are deferred
- Platform admin dashboard

Appointment booking is **not** part of the initial MVP.

V1 supports Google + email login, multiple authorized clinics per user, and independent per-clinic entitlements. Saving draft changes must not update the public website until an explicit Publish / Publish Changes action. Clinic customization is limited to logo, images, and primary color. Launch starts with a limited free pilot; pricing and commercial billing remain subject to market research. These are approved requirements, not completed integrations.

## Stack

| Area      | Choice                               | Status    |
| --------- | ------------------------------------ | --------- |
| Framework | Next.js (App Router) + React         | ✅ Set up |
| Language  | TypeScript (strict)                  | ✅ Set up |
| Styling   | Tailwind CSS v4                      | ✅ Set up |
| Linting   | ESLint (`eslint-config-next`)        | ✅ Set up |
| Database  | PostgreSQL (Supabase) via Prisma ORM | ⏳ Later  |
| Auth      | Supabase Auth                        | ⏳ Later  |
| Storage   | Supabase Storage                     | ⏳ Later  |
| App hosting direction | Railway                  | ⏳ Planned; not deployed |

The UI is Arabic-first: the root layout uses `lang="ar"` and `dir="rtl"`.

## Getting started

Requirements: Node.js **20.9+** (developed on Node 22) and npm.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Available local routes:

- `/`: marketing homepage (including illustrative device mockups and dashboard concepts).
- `/demo` and `/demo/demo`: fictional Al Noor clinic template preview.
- `/demo/sakeena-demo`: independent fictional Sakeena clinic preview.
- `/dashboard-demo`: visual website editor prototype for a fictional clinic, with edits saved only in this browser.
- `/dashboard-demo?preview=1`: full `ClinicTemplate` preview of the last saved local prototype draft.
- Invalid, reserved, or unknown `/demo/[slug]` values resolve to not-found.

These are public fictional previews with `noindex` metadata and disabled contact/external actions. The resolver is not production tenant authorization. The clinic fixtures now use local illustrative images and graceful fallbacks. The marketing reception asset remains tracked and is reused without changing the marketing homepage.

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the development server       |
| `npm run build`     | Create a production build          |
| `npm run start`     | Serve the production build         |
| `npm run lint`      | Run ESLint                         |
| `npm run typecheck` | Generate route types and run `tsc` |
| `npm test`          | Compile and run 22 fixture and prototype tests |

For the established webpack verification path use `npx next build --webpack` (or `npm run build -- --webpack`). Run typecheck and build sequentially because both manage generated `.next` type files. `next/font` fetches Noto Sans Arabic during a build and can require network access. Run `git diff --check` before handoff. Documentation-only changes normally need documentation validation rather than a production build.

## Project structure

```
src/
  app/          # Next.js App Router (routes, layout, global styles)
  components/
    marketing/  # Marketing homepage sections
    ui/         # Shared presentational primitives
    clinic/     # One reusable ClinicTemplate and rendering helpers
    dashboard/  # Isolated browser-local visual website editor prototype
  data/         # Fictional Al Noor and Sakeena ClinicContent fixtures
  lib/          # Fixture resolver and versioned prototype draft helpers
  types/        # ClinicContent and fixed clinic section order
tests/          # Node foundation tests (not E2E/security tests)
docs/           # Approved plan, specification, architecture, tasks, decisions
```

The marketing homepage, real clinic template, and visual website editor prototype are separate experiences. Dashboard concepts on `/` remain static visuals. The prototype is a public fictional demonstration with localStorage, not a secure account dashboard or production publishing system. PostgreSQL, Prisma, Supabase Auth/Storage, and Railway integration are planned for later phases; there is no final Prisma schema.

Next: complete the final P3 template visual/product review, then P4.1 schema and authorization design. See [TASKS.md](docs/TASKS.md) before starting development. Commits, pushes, deployments, production migrations, and changes to secrets require explicit owner approval.
