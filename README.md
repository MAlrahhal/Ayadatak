# Ayadatak (عيادتك)

Ayadatak is an Arabic-first, multi-tenant SaaS platform that lets clinics and doctors create and manage professional clinic websites from a single shared platform.

> **Verified 2026-10-29:** The marketing site, clinic demos, and browser-local editor prototype are present. P3 remains **PENDING REVIEW**. The initial schema is migrated on the Ayadatak development Neon database and P4.5 internal data-access foundations exist, but authentication, HTTP database integration, tenant routing, publishing, and billing are not implemented. P4.6 Railway staging is prepared, not deployed.

## Project documentation

- [Approved Implementation Plan v1.1](docs/IMPLEMENTATION_PLAN.md): complete owner-supplied product decisions and roadmap.
- [Product specification](docs/PRODUCT_SPEC.md): detailed V1 requirements synchronized to the approved plan.
- [Task tracker](docs/TASKS.md): current progress, remaining work, and review gates.
- [Architecture](docs/ARCHITECTURE.md): implemented code and planned production design.
- [Decision log](docs/DECISIONS.md): approved choices and open questions.
- [Database design](docs/DATABASE_DESIGN.md): owner-approved P4.1 direction, expiration rules, and unvalidated schema proposal.
- [Neon development setup](docs/NEON_DEV_SETUP.md): P4.2 manual Free-project and local connection-string steps.
- [Railway staging setup](docs/RAILWAY_STAGING_SETUP.md): P4.6 deployment preparation, safety controls, and owner approval gate.
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
| Database  | Neon development schema migrated; Prisma 7.10.1 internal DAL | 🧪 Development only |
| Auth      | Neon Managed Better Auth candidate  | ⏳ Later  |
| Storage   | Neon Object Storage candidate       | ⏳ Later  |
| App hosting direction | Railway                  | ⏳ Planned; not deployed |

The UI is Arabic-first: the root layout uses `lang="ar"` and `dir="rtl"`.

## Getting started

Requirements: Node.js **20.19+**, **22.12+**, or **24+** (developed on Node 22) and npm.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Available local routes:

- `/`: marketing homepage (including illustrative device mockups and dashboard concepts).
- `/demo` and `/demo/demo`: fictional Al Noor clinic template preview.
- `/demo/sakeena-demo`: independent fictional Sakeena clinic preview.
- `/dashboard-demo`: visual website editor prototype for a fictional clinic, with edits saved only in this browser; available only with `next dev`.
- `/dashboard-demo?preview=1`: full `ClinicTemplate` preview of the last saved local prototype draft; also disabled in production builds.
- `/health`: database-independent liveness endpoint for staging deployment healthchecks.
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
| `npm test`          | Compile and run 28 fixture, prototype, and P4.5 foundation tests |

`npm run build` generates Prisma Client, then runs the established webpack production build. It does not migrate or connect to Neon. Run typecheck and build sequentially because both manage generated `.next` type files. `next/font` fetches Noto Sans Arabic during a build and can require network access. Run `git diff --check` before handoff. Documentation-only changes normally need documentation validation rather than a production build.

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

The marketing homepage, real clinic template, and visual website editor prototype are separate experiences. Dashboard concepts on `/` remain static visuals. The prototype uses localStorage and is disabled in production builds; it is not a secure account dashboard or publishing system. P4.4 migrated the development Neon schema; P4.5 added an unexposed server-only data-access foundation. Authentication, object storage, and Railway deployment remain incomplete; Neon Auth/Storage candidates are provisional. See the [database design](docs/DATABASE_DESIGN.md).

Next: review [Railway staging preparation](docs/RAILWAY_STAGING_SETUP.md) and the P3 template; then implement P5 trusted sessions before exposing private functionality. The read-only development check is `npm run db:check`; regenerate the local client with `npm run db:generate` after schema edits. See [TASKS.md](docs/TASKS.md). Commits, pushes, deployments, production migrations, and changes to secrets require explicit owner approval.
