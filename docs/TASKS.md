# Ayadatak Task Tracker

Last verified update: **2026-10-27**. Evidence: repository source, package scripts, tests, local Git status/history, and the complete owner-supplied [Implementation Plan v1.1](IMPLEMENTATION_PLAN.md). [ARCHITECTURE.md](ARCHITECTURE.md) describes implemented boundaries.

- Current work: **P3.6 — Dashboard UX/UI Prototype, PENDING REVIEW**. The frontend prototype and scoped verification are complete; owner UX review remains. The P3.5 documentation diff remains uncommitted and is preserved.
- Active product gate: **P3 final visual/product review — PENDING REVIEW**.
- Next: owner review of the P3.6 prototype and final P3 template review, then **P4.1 — schema and authorization design**.
- Major blockers/gates: owner template approval; production schema/authorization design; email sign-in details; pilot limits; commercial pricing/gateway (blocks P13, not the free pilot).
- Git baseline: P3.5 began on clean `main` at HEAD `e42a0b3`; P3 code is recorded in `5a78463`, with marketing revisions through `e42a0b3`. P3.6 began with only the uncommitted P3.5 documentation diff. Neither task committed or pushed.
- Uncommitted work requiring review: P3.5 documentation (`AGENTS.md`, `README.md`, `docs/PRODUCT_SPEC.md`, and new plan/tracker/architecture/decision documents) plus P3.6 prototype route/components/helper, added tests, and tracker/architecture/README updates. No existing P3 template, resolver, fixture, or marketing source was modified.

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
- Remaining: final owner visual/product review of the real template on mobile/tablet/desktop; Hero/imagery, doctors, FAQ, optional/hidden/empty states, and image assets. Hero currently renders only the first slide; final slider behavior is open. Fixtures currently use rejected `example.com` image placeholders and fallbacks.
- Acceptance: owner accepts the template and assets; scoped technical and visual QA is complete; sections/navigation work for both fixtures and optional states. Existing tests are evidence of foundation coverage, not production security.
- Git evidence: P3 source is committed; `public/images/clinic-interior.png` is tracked but belongs to marketing, not the fixture image set. No uncommitted P3 work was found at this task's start.

## P3.5 — Documentation and AI Instructions

- Objective: establish accurate navigation, requirements, architecture, decisions, and progress for future agents.
- Status: **DONE** for documentation preparation; awaiting owner review of the uncommitted diff.
- Completed: full v1.1 source preserved with a historical-status note; detailed product specification reconciled; README and project-specific AGENTS updated; TASKS/ARCHITECTURE/DECISIONS added. Existing Next.js agent block and CLAUDE delegation preserved.
- Remaining: owner review; any commit/push requires a new explicit instruction.
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
- Status: **PENDING REVIEW** after frontend implementation and verification; owner UX and final visual acceptance remain.
- Implemented: `/dashboard-demo` now renders `ClinicTemplate` as the editing canvas. The traditional four-area dashboard UI was removed. Optional editor slots place controls near the clinic identity, Hero, About, collection cards, FAQ, and contact cards. The compact toolbar exposes Save, Preview, section management, and primary-color/approved-image appearance controls.
- Draft behavior: working edits appear immediately but remain separate from the last saved snapshot. The P3.6 versioned localStorage key and runtime validation are reused. Preview at `/dashboard-demo?preview=1` reads only saved content and passes no editor controls. Hidden sections and navigation links disappear while their content is retained; the section manager can restore them. Item add/edit/delete/reorder is available for services, doctors, testimonials, and FAQ. Reset requires confirmation.
- Prototype boundary: one fictional fixture and one browser origin only. There is no login, database, upload service, private production preview, subscription, or publish action. P7–P10 and P13 remain **NOT STARTED**.
- Verification: lint, typecheck, webpack build, Node tests, diff check, and desktop/tablet/mobile browser inspection are required before owner acceptance. Browser inspection includes inline changes, hidden-section recovery, unsaved-preview explanation, and preview control absence.

## P4 — Database Architecture & Integration

- Objective: design and implement persistence without weakening tenant or publication boundaries.
- Status: **NOT STARTED**.
- Completed: approved architectural requirements only; no final schema or integrations.
- Remaining: P4.1 relational schema, memberships, independent entitlements, draft/published storage, transactions, and authorization review; P4.2 development Supabase setup; P4.3 Prisma/schema/migrations after review; P4.4 data access and `ClinicContent` mapping; P4.5 constraint/security/failure tests.
- Acceptance: reviewed schema and permission strategy; consistent operations; no cross-clinic reads/writes; failure-safe publication design. No migration before schema review; production migrations require explicit approval.

## P5 — Authentication

- Objective: secure Google + email accounts and sessions.
- Status: **NOT STARTED**.
- Completed: provider choices approved; Supabase Auth is planned.
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
- Remaining: Supabase Storage, tenant-scoped permissions, allowed types, size/count limits, optimization, safe cleanup and protection of published image references; contrast validation.
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
- Remaining: separate admin authorization, clinic list/search/filter/details, owner/basic account data, dates/slugs/URLs, publication/entitlement status, suspend/reactivate, pilot oversight.
- Acceptance: no public admin registration or impersonation; admin permissions enforced on the server.

## P13 — Commercial Billing

- Objective: independent commercial subscriptions for each clinic after market validation.
- Status: **NOT STARTED**; gated by pricing/gateway approval.
- Completed: per-clinic entitlement decision and free-pilot strategy approved.
- Remaining: market research, price/plan/gateway/expiration choices, then subscription creation/renewal, webhooks, failures, expiration and entitlement enforcement.
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
- Completed: GitHub history only; no Ayadatak Railway/Supabase deployment integration verified or claimed.
- Remaining: Railway, Supabase production, approved migrations, DNS/wildcard SSL, environment setup, monitoring, backups/restore, smoke checks, pilot policy and feedback collection.
- Acceptance: approved secure deployment and operational checks; documented pilot limits; owner-led launch decision. Commercial billing is required only before paid subscriptions launch.

## Verification notes

P3.5 documentation preparation inspected the original nine test cases, scripts, and implementation without rerunning application checks. P3.6 added five focused prototype tests and ran the full 14-test suite plus lint, typecheck, webpack build, `git diff --check`, and browser layout/interaction checks as recorded above. The browser review of the dashboard and saved-draft preview does not constitute final P3 template approval or production security verification. Previous conversation reports are not used as proof of P3 approval.
