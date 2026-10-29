# Ayadatak Task Tracker

Last verified update: **2026-10-29**. Evidence: repository source, local Prisma 7.10.1 SQL-diff output, offline checks, Git status, and the complete owner-supplied [Implementation Plan v1.1](IMPLEMENTATION_PLAN.md). [ARCHITECTURE.md](ARCHITECTURE.md) describes implemented boundaries.

- Current work: **P4.6 — Railway staging deployment prepared locally; deployment awaits owner review and authorization**. P4.5 remains an unexposed internal foundation. The P4.4 initial migration remains applied only to `ayadatak-dev` / Neon branch `production` (development-only project) / `neondb` / `public`.
- Separate active product gate: **P3/P3.8 final visual/product review — PENDING REVIEW**; implementation and local verification are complete, but owner acceptance remains.
- Next: owner review of the P4.6 staging plan and dirty-tree commit strategy; no Git push or Railway action without approval. P5 must add verified sessions before private routes. P3.8 visual/product review remains separate.
- Major blockers/gates: owner template approval; authentication and tenant authorization implementation; email sign-in details; pilot limits; commercial pricing/gateway (blocks P13, not the free pilot).
- Git baseline: P3.5/P3.6/P3.7 documentation and editor work was committed and pushed as `a2f035f` on `main`. P3.8 started from that clean commit; the owner subsequently authorized committing and pushing the verified redesign. Product approval remains a separate pending review gate.

Statuses: **DONE**, **IN PROGRESS**, **PENDING REVIEW**, **NOT STARTED**, **BLOCKED**. Passing a build alone does not complete a product phase.

## P1 — Project Foundation

- Objective: establish the Arabic/RTL application and reusable UI foundation.
- Status: **DONE**.
- Completed: Next.js App Router, React, strict TypeScript, Tailwind v4, root Arabic/RTL layout, font, design tokens, shared UI, lint/type/build scripts.
- Remaining: maintain the foundation during later phases; no new foundation integration required here.
- Acceptance: existing scaffold and primitives verified from source; no production services implied.

## P2 — Marketing Website

- Objective: explain the product clearly and link to a real clinic demo.
- Status: **DONE** for the current scoped marketing implementation.
- Completed: header, exact approved Hero copy and `/demo` CTA, existing brand icon beside copy on desktop, separate laptop/phone mockups, two dashboard concepts, concise features, three steps, final CTA, footer, responsive styles. Preview title: «موقع يعكس هوية عيادتك».
- Remaining: ordinary owner refinements if requested; concepts must remain identified as concepts until functional dashboard work exists.
- Acceptance: verified current homepage component order and destination. Marketing completion does not approve the real clinic template or deliver auth/dashboard features.

## P3 — Clinic Content Model, Public Template, Resolver, QA

- Objective: one data-driven clinic template with independently resolved fictional previews.
- Status: **PENDING REVIEW**; not fully complete.
- Completed P3.1: `ClinicContent` types and Al Noor fixture, including optional fields, arrays, visibility, and fixed section order.
- Completed P3.2: prop-driven `ClinicTemplate`, sections/navigation, image fallbacks, clinic brand-color variables, `/demo` preview safety/noindex.
- Completed P3.3 foundation: async fixture resolver, normalized/reserved slugs and failure reasons, cloned lookup results, second Sakeena fixture, `/demo/[slug]`, and nine automated foundation test cases.
- Remaining: final owner visual/product review of the real template on mobile/tablet/desktop; P3.8 Hero/imagery, doctors, FAQ, optional/hidden/empty states, and assets require review after implementation.
- Acceptance: owner accepts the template and assets; scoped technical and visual QA is complete; sections/navigation work for both fixtures and optional states. Existing tests are evidence of foundation coverage, not production security.
- Git evidence: P3 source is committed; `public/images/clinic-interior.png` is tracked but belongs to marketing, not the fixture image set. No uncommitted P3 work was found at this task's start.

## P3.5 — Documentation and AI Instructions

- Objective: establish accurate navigation, requirements, architecture, decisions, and progress for future agents.
- Status: **DONE** for documentation preparation; changes were included in `a2f035f`.
- Completed: full v1.1 source preserved with a historical-status note; detailed product specification reconciled; README and project-specific AGENTS updated; TASKS/ARCHITECTURE/DECISIONS added. Existing Next.js agent block and CLAUDE delegation preserved.
- Remaining: keep documentation synchronized with accepted product and implementation changes.
- Acceptance: complete source reviewed; approved choices consistently documented; links/Markdown/diff checked; only documentation changed. No application build or test run required for this documentation-only task.

## P3.6 — Dashboard UX/UI Prototype

- Objective: validate a simple Arabic owner workflow before building authenticated P7–P10 systems: edit website content → save a local draft → preview the real clinic template.
- Status: **SUPERSEDED BY P3.7** for the content-editing interface; the browser-local draft format and preview route remain in use.
- Implemented frontend: isolated `/dashboard-demo` route with four primary areas (الرئيسية، محتوى الموقع، المظهر، الإعدادات), compact section list, field editors mapped to `ClinicContent`, optional-section visibility, item add/delete/reorder, working periods, save feedback, unsaved-change warning, and reset confirmation. `/dashboard-demo?preview=1` loads the saved local draft into `ClinicTemplate` in `previewMode`.
- Simulation boundary: versioned browser `localStorage` for one fictional fixture only. No account, tenant authorization, database, upload service, public publication, subscription, or production private preview is implemented. `/demo` fixtures stay independent.
- Verified: saved name and hidden Doctors section appeared correctly in the full `ClinicTemplate` preview; its navigation omitted Doctors, while public `/demo` retained the original name and Doctors. The link to the preview and return link worked. Desktop and 320/390px screenshots were inspected; 820/1024/1440px layout widths were measured without horizontal overflow. Lint, typecheck, webpack build, 14 Node tests, and `git diff --check` passed. Reset confirmation was implemented but not exercised in the browser QA session. The existing public template still shows only its first Hero image.
- Acceptance: edits and visibility changes survive Save, appear in the full saved-draft preview, leave public demo routes unchanged, and reset to the original fixture; no misleading publish action. P7 and P10 remain **NOT STARTED**.

## P3.7 — Visual Website Editor Prototype

- Objective: edit the real `ClinicTemplate` directly with contextual controls, a focused drawer, explicit browser-local Save, and a saved-draft full-site Preview.
- Status: **PENDING REVIEW** after frontend implementation and verification; owner UX and final visual acceptance remain. The work was committed in `a2f035f`.
- Implemented: `/dashboard-demo` now renders `ClinicTemplate` as the editing canvas. The traditional four-area dashboard UI was removed. Optional editor slots place controls near the clinic identity, Hero, About, collection cards, FAQ, and contact cards. The compact toolbar exposes Save, Preview, section management, and primary-color/approved-image appearance controls.
- Draft behavior: working edits appear immediately but remain separate from the last saved snapshot. The P3.6 versioned localStorage key and runtime validation are reused. Preview at `/dashboard-demo?preview=1` reads only saved content and passes no editor controls. Hidden sections and navigation links disappear while their content is retained; the section manager can restore them. Item add/edit/delete/reorder is available for services, doctors, testimonials, and FAQ. Reset requires confirmation.
- Prototype boundary: one fictional fixture and one browser origin only. There is no login, database, upload service, private production preview, subscription, or publish action. P7–P10 and P13 remain **NOT STARTED**.
- Verification: lint, typecheck, webpack build, Node tests, diff check, and desktop/tablet/mobile browser inspection are required before owner acceptance. Browser inspection includes inline changes, hidden-section recovery, unsaved-preview explanation, and preview control absence.

## P3.8 — Clinic Website & Visual Editor Design Polish

- Objective: bring the shared public `ClinicTemplate` and visual editing layer closer to the owner reference, with a real 1–5-image Hero slider, local illustrative imagery, refined sections, a compact editor toolbar, and approved single-color appearance controls.
- Status: **PENDING REVIEW** after implementation and local verification; owner visual/product acceptance remains.
- Implemented direction: one shared clinic template; no marketing redesign, booking, new templates, authentication, production storage, or publishing. The approved fixed section order remains Hero → About → Services → Doctors → Testimonials → FAQ → Location/Contact; quick links within Hero do not reorder content sections.
- Prototype boundary: local illustrations and browser-local drafts only. Legacy demo image placeholders in saved drafts are migrated in memory without discarding edited text; uploaded image storage remains P9.
- Verification: lint, typecheck, webpack build, 22 Node tests, and `git diff --check` pass. Browser inspection covered 320/390/820/1024/1440px without horizontal overflow, desktop/tablet/mobile visual composition, image-slider selection/wrap, and unsaved appearance edits. Owner review is still required.
- Acceptance: slider and appearance controls work on desktop/mobile; no broken image gaps or inaccessible edit controls; saved-draft preview uses the real template without editor UI; both public demo routes remain independent; lint/type/build/tests/diff and responsive visual checks pass. Owner approval is still required before closing P3.

## P4 — Database Architecture & Integration

- Objective: design and implement persistence without weakening tenant or publication boundaries.
- Status: **IN PROGRESS**. P4.1 general direction and seven-day grace policy are **DONE/OWNER-APPROVED**; the P4.4 initial migration is **DONE for the development database only**. P4.5 internal data-access/validation foundation exists locally; production authentication, public tenant routing, and publication security are not implemented.
- Completed: [P4.1 design proposal](DATABASE_DESIGN.md) documents relational entities, clinic-specific membership/entitlement, validated `ClinicContent` draft/current-public separation, transaction and authorization boundaries, media/slug/cost considerations, and a non-runtime Prisma sketch. Documentation only; no database/project/schema/migration/integration created.
- P4.2: owner created the development-only Neon project and stored pooled/direct URLs in ignored `.env.local`; both passed read-only `SELECT 1` checks. No production integration.
- P4.3: pinned Prisma/Client/Neon adapter 7.10.1; configured direct CLI and pooled server-only runtime client; implemented all nine core entities in `prisma/schema.prisma`. The [final security/schema review](P4_3_SECURITY_REVIEW.md) changed privileged-grantor FKs to `Restrict`, identified migration SQL/server invariants, and updated vulnerable Next.js 16.3.8 → 16.4.1 plus transitive Zod 4.6.5 → 4.6.6. Final format/validate/generate/lint/typecheck/22 tests/build passed; `npm audit` reports 0 vulnerabilities. The build required a network-enabled retry to fetch the existing Google font. No migration, table, seed, or database write.
- P4.4 preparation: generated the [initial nine-table migration SQL](../prisma/migrations/20261029000000_initial_schema/migration.sql) with Prisma's offline `--from-empty --to-schema` diff; added PostgreSQL checks for normalized slug, term/extension dates, positive versions and media size, and object-root JSONB. The SQL uses `public` explicitly and contains no destructive operation. Expanded reserved-slug tests to the full list. The P4.4 section of [DATABASE_DESIGN.md](DATABASE_DESIGN.md) records the exact constraints, tenant boundaries and development-target preflight. No database write occurred during the preparation stage.
- P4.4 offline preparation checks: Prisma schema validation and client generation, lint, TypeScript check, all 22 Node tests, and `git diff --check` passed. Static SQL inspection counted 9 tables/primary keys, 5 enums, 4 unique indexes, 4 other indexes, 14 foreign keys, 10 `CHECK` constraints and no `DROP`/`DELETE`/`TRUNCATE`/`UPDATE` statement. These offline checks alone did not establish PostgreSQL execution or tenant security.
- P4.4 execution (2026-10-29): owner confirmed the `ayadatak-dev` development-only project and its Neon-default `production` branch. Immediate read-only preflight found the direct Neon connection at `neondb/public`, empty of relations/types/routines/extensions and migration history. `npx prisma migrate deploy --config prisma.config.ts --schema prisma/schema.prisma` applied only `20261029000000_initial_schema` successfully. Read-only verification found exactly nine application tables plus `_prisma_migrations`, five enums, nine primary keys, 14 foreign keys, four unique and four other non-primary indexes, ten named custom `CHECK` constraints, one finished migration-history row, and zero application rows. Prisma migration status reported the database up to date. Only the `public` non-system schema and expected objects were observed; no seed, reset, or other database write was performed. Prisma validation/generation, lint, typecheck, 22 tests, webpack build, and final diff check passed.
- P4.5 local foundation: server-only Prisma adapter; owner-only clinic authorization with a default-deny verified-actor boundary; exact-shape runtime `ClinicContent` draft/publish validation; clinic identity and owned-media checks; versioned complete-draft save with atomic compare-and-swap and updater/timestamp tracking; published-only reads subject to publication, suspension, media readiness, and a pure UTC seven-day grace/extension evaluator. Isolated mock-store tests cover tenant denial, invalid content, conflicts, no published mutation, schema versions, and access boundaries. No new route, migration, seed, Neon application row, authentication, publication transaction, or production upload was added.
- P4.5 verification: Prisma validation/client generation, lint, typecheck, all 28 isolated/regression tests, webpack production build, `npm audit` (0 vulnerabilities), and `git diff --check` passed. The first build attempt encountered a transient Windows `EPERM` while creating a `.next` prerender directory; an unchanged retry completed successfully. No database-backed integration test was run and no Neon application data was changed.
- P4.6 staging preparation: the public route inventory and [Railway setup guide](RAILWAY_STAGING_SETUP.md) are documented; `/dashboard-demo` and its saved-draft preview are disabled in production builds (404); `/health` is a liveness-only handler; `npm run build` generates Prisma Client without migrations. Lint, typecheck, 28 tests, webpack production build, local production-route smoke checks (public 200, unknown demo/editor 404, health 200), `npm audit` (0 vulnerabilities), and diff check passed. No service, GitHub branch, database secret, Railway domain, deployment, commit, or push has been created. Owner review/authorization and live staging smoke checks remain pending. P5/P9/P10/P15 are incomplete.
- Remaining: P5 must verify provider sessions and map them to internal `AppUser` before enabling protected operations; P6 onboarding must create consistent clinic/membership/entitlement/draft records. P10 still needs an explicit owner-authorized atomic publication transaction, saved-version and media checks, failure preservation, and post-commit cache invalidation. Public tenant routing and production migration remain separate phases and approvals. Neon Auth/Object Storage remain candidates for P5/P9, not adopted services.
- Acceptance: reviewed schema and permission strategy; consistent operations; no cross-clinic reads/writes; failure-safe publication design. No migration before schema review; production migrations require explicit approval.

## P5 — Authentication

- Objective: secure Google + email accounts and sessions.
- Status: **NOT STARTED**.
- Completed: Google + email methods approved; Neon Managed Better Auth is a provisional candidate, not implemented or finalized.
- Remaining: finalize email mechanism/recovery/verification; implement login/logout, sessions, safe identity linking, protected routes, server verification and membership lookup.
- Acceptance: both methods work; no unauthorized account linking; private routes enforce identity and permissions.

## P6 — Clinic Onboarding

- Objective: create clinics and associate authorized owners safely.
- Status: **NOT STARTED**.
- Completed: local slug-syntax/reserved-name helpers exist; they are not a persistent onboarding workflow.
- Remaining: clinic form, unique slug enforcement, owner membership, clinic entitlement, initial unpublished draft, routing to dashboard; decide pilot clinic limits.
- Acceptance: clinic/membership/entitlement creation is consistent; no automatic publication; reserved/duplicate/invalid names rejected server-side.

## P7 — Clinic Dashboard Foundation

- Objective: manage the selected authorized clinic from a clear Arabic dashboard.
- Status: **NOT STARTED**.
- Completed: static marketing concepts only.
- Remaining: authenticated shell, clinic switcher, navigation, publication state, public URL, preview and clear save/publish controls.
- Acceptance: one user can switch between authorized clinics without data mixing; useful loading/error/empty states; no fake analytics.

## P8 — Clinic Content Management

- Objective: edit the supported website content as private drafts.
- Status: **NOT STARTED**.
- Completed: presentation types/fixtures only.
- Remaining: clinic information, services, doctors, optional testimonials, FAQ, working periods, contact/location/social links, visibility, and internal item ordering; validation and save feedback.
- Acceptance: draft CRUD works within the selected clinic; empty/hidden sections render cleanly; saving does not alter the public website.

## P9 — Image Storage & Branding

- Objective: manage clinic logo/images/primary color safely.
- Status: **NOT STARTED** for storage and editing.
- Completed: template consumes optional images/colors with defaults and fallbacks.
- Remaining: validate Neon Object Storage as a provisional candidate, then implement tenant-scoped permissions, allowed types, size/count limits, optimization, safe cleanup and protection of published image references; contrast validation.
- Acceptance: no cross-clinic asset changes; published images survive draft removal; no font/layout selector introduced.

## P10 — Publishing & Tenant Routing

- Objective: expose only approved published content on the correct clinic subdomain.
- Status: **NOT STARTED**.
- Completed: local fixture lookup interface only.
- Remaining: authenticated private previews, first Publish, Publish Changes, publication/suspension states, draft isolation, entitlement checks, consistent published version, cache invalidation, hostname validation and wildcard routing.
- Acceptance: draft edits remain private until publishing; failed publishing preserves the old version; unpublished/suspended clinics are not public; the correct clinic is resolved. Custom domains are deferred.

## P11 — SEO & Sharing

- Objective: clinic-specific public identity and correct indexing/cache behavior.
- Status: **NOT STARTED** for production SEO.
- Completed: marketing metadata, fixture-specific demo title/description, noindex/nofollow previews.
- Remaining: published clinic canonical/title/description/Open Graph/sharing image, robots/indexing policy and publish-time cache refresh.
- Acceptance: public links share the clinic identity; drafts/previews are not indexed; latest published metadata is shown.

## P12 — Platform Admin

- Objective: secure central oversight of clinics and the free pilot.
- Status: **NOT STARTED**.
- Completed: approved scope only.
- Remaining: separate admin authorization, clinic/user/owner/membership and publication/entitlement oversight, suspend/reactivate, validated manual extensions, pilot grants, meaningful operational health and authorized owner support. Audit privileged changes; no automatic draft access or unrestricted impersonation.
- Acceptance: no public admin registration or impersonation; admin permissions enforced on the server.

## P13 — Commercial Billing

- Objective: independent commercial subscriptions for each clinic after market validation.
- Status: **NOT STARTED**; gated by pricing/gateway approval.
- Completed: per-clinic entitlement decision and free-pilot strategy approved.
- Remaining: market research, price/plan/gateway choices, then subscription creation/renewal, webhooks, failures, approved 7-day grace and 7/1-day reminder implementation with duplicate-send protection, and entitlement enforcement.
- Acceptance: clinic subscriptions are independent and server-validated. This phase is not required for a safe free pilot.

## P14 — Security & Production QA

- Objective: verify real identity, tenant, publication, storage, and production behavior.
- Status: **NOT STARTED**.
- Completed: nine fixture/helper test cases only; no production isolation assurance.
- Remaining: account/membership and multi-clinic security, cross-tenant attempts, draft/publication/failure tests, suspension, assets, E2E, performance and security reviews.
- Acceptance: production boundaries tested end-to-end; build success alone is insufficient.

## P15 — Deployment & Pilot Launch

- Objective: launch a limited free pilot with real clinics.
- Status: **NOT STARTED**.
- Completed: GitHub history only; no Ayadatak Railway/hosted PostgreSQL deployment integration verified or claimed.
- Remaining: Railway, approved production PostgreSQL provider (Neon preferred provisionally), approved migrations, DNS/wildcard SSL, environment setup, monitoring, backups/restore, smoke checks, pilot policy and feedback collection.
- Acceptance: approved secure deployment and operational checks; documented pilot limits; owner-led launch decision. Commercial billing is required only before paid subscriptions launch.

## Verification notes

P3.5 documentation preparation inspected the original nine test cases, scripts, and implementation without rerunning application checks. P3.6 added five focused prototype tests and ran the full 14-test suite plus lint, typecheck, webpack build, `git diff --check`, and browser layout/interaction checks as recorded above. The browser review of the dashboard and saved-draft preview does not constitute final P3 template approval or production security verification. Previous conversation reports are not used as proof of P3 approval.
