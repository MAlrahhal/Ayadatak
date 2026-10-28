# Ayadatak Decision Log

Recorded/reconciled **2026-10-27** against the owner-supplied [Implementation Plan v1.1](IMPLEMENTATION_PLAN.md), dated 2026-10-27. Original individual approval dates are not established by that source; the dates below identify the source version, not invented approval events. [TASKS.md](TASKS.md) records implementation progress separately.

## Approved product decisions

### D01 — Arabic-first / RTL-first

- Date/source: v1.1, 2026-10-27, §§1–3, 6.
- Choice: Arabic/RTL is primary throughout marketing, clinic sites, and management.
- Reason: serve Arabic-speaking clinic owners and visitors, as stated by the product audience/goals.
- Impact: preserve RTL, Arabic typography, accessibility, and responsive usability.
- Status: **APPROVED product requirement**; root Arabic/RTL implementation exists.

### D02 — One V1 clinic template

- Date/source: v1.1, 2026-10-27, §§4, 9.
- Choice: one polished prop-driven template consuming independent clinic content.
- Reason: source establishes a focused V1 scope; no separate rationale for the template count is recorded.
- Impact: no extra templates or layouts to demonstrate future capability; keep content independent of presentation.
- Status: **APPROVED product requirement**; current template awaits final visual/product review.

### D03 — Fixed section order

- Date/source: v1.1, 2026-10-27, §9.
- Choice: Hero → About → Services → Doctors → Testimonials → FAQ → Location/Working Hours/Contact → Footer; skip optional hidden/empty sections. Internal item order is manageable.
- Reason: source defines fixed V1 ordering; no additional rationale recorded.
- Impact: navigation follows visible sections; no drag-and-drop section/page builder.
- Status: **APPROVED product requirement**; section-order/rendering foundation exists.

### D04 — No appointment booking or patient records

- Date/source: v1.1, 2026-10-27, §§4, 30.
- Choice: V1 creates and manages clinic websites, not booking, EMR, prescriptions, patient management, or medical billing.
- Reason: product focuses on a simple clinic website and publishing workflow.
- Impact: exclude these features and avoid unsupported marketing claims.
- Status: **APPROVED scope exclusion**.

### D05 — Google + email authentication

- Date/source: v1.1, 2026-10-27, §§5, 7, 19, 28.
- Choice: Google OAuth and email sign-in; email/password is provisional, not final.
- Reason: these methods are explicitly approved; no further method-selection rationale recorded.
- Impact: P5 finalizes email/recovery/verification and safe account linking; server-side identity/session checks required.
- Status: **APPROVED product requirement**, not implemented; email mechanism remains open.

### D06 — Multiple clinics per user

- Date/source: v1.1, 2026-10-27, §§5, 7, 15.
- Choice: a user may manage multiple authorized clinics through ClinicMembership.
- Reason: explicitly approved account capability.
- Impact: selected-clinic UX, server membership checks, and no hard-coded one-user/one-clinic ownership model.
- Status: **APPROVED product requirement**, not implemented.

### D07 — Independent per-clinic entitlements

- Date/source: v1.1, 2026-10-27, §§5, 13, 22.
- Choice: each clinic has an independent entitlement; additional commercial clinics require independent subscriptions.
- Reason: source specifies clinic-level commercial access, with no account-wide subscription covering all clinics.
- Impact: expiration of one clinic must not automatically affect others; free-pilot entitlements do not collect payment.
- Status: **APPROVED product requirement**, persistence/billing not implemented.

### D08 — Pricing after market research

- Date/source: v1.1, 2026-10-27, §§5, 22, 28.
- Choice: no approved monthly/annual price, plan limits, or gateway yet.
- Reason: research competitors, costs, willingness to pay, support load, and product value first.
- Impact: do not publish invented prices or implement financial flows before commercial decisions.
- Status: **APPROVED decision to defer**; specific prices/gateway remain open.

### D09 — Explicit first publication

- Date/source: v1.1, 2026-10-27, §§5, 8, 11.
- Choice: clinic creation starts unpublished; first public version requires preview and an explicit Publish action.
- Reason: owners prepare and review content before making it public.
- Impact: validate membership, content, entitlement, and clinic state on the server before publishing.
- Status: **APPROVED product requirement**, not implemented.

### D10 — Explicit publishing of later changes

- Date/source: v1.1, 2026-10-27, §§5, 11.
- Choice: saving edits changes a draft; only Publish Changes updates the public version.
- Reason: prevent unapproved edits from appearing publicly.
- Impact: separate save/preview/publish UX; preserve the old published version on failure; refresh public caches/metadata on success.
- Status: **APPROVED product requirement**, not implemented.

### D11 — Draft and published isolation

- Date/source: v1.1, 2026-10-27, §§11, 18–21.
- Choice: public reads never directly expose editable drafts; use a consistent published representation and retain its referenced assets.
- Reason: prevent draft leakage, partial publication, and broken published images.
- Impact: P4.1 chooses snapshots/revisions or equivalent storage/transaction design; full history UI is not mandatory.
- Status: **APPROVED boundary requirement**; exact schema/implementation is **OPEN**, not an approved table design.

### D12 — Limited V1 branding customization

- Date/source: v1.1, 2026-10-27, §§5, 9, 20.
- Choice: clinic logo, images, and primary color only; no font or layout selector.
- Reason: source defines simple V1 customization; no further rationale recorded.
- Impact: safe defaults, contrast, upload validation, tenant-scoped assets. Existing optional accent data is not approval for an extra UI control.
- Status: **APPROVED product requirement**; presentation consumes images/colors, editing/storage are not implemented.

### D13 — Free pilot before commercial launch

- Date/source: v1.1, 2026-10-27, §§5, 13, 22, 29.
- Choice: initial limited free pilot; paid commercial launch follows validation and approved billing.
- Reason: evaluate quality, discover issues, and learn real clinic needs before charging.
- Impact: safe per-clinic pilot entitlements; decide pilot duration/limits; P13 payment is not a prerequisite for the free pilot.
- Status: **APPROVED launch strategy**, not launched.

### D14 — Custom domains deferred

- Date/source: v1.1, 2026-10-27, §16.
- Choice: default clinic subdomains in V1; custom-domain connection is deferred to a later phase.
- Reason: source explicitly defers it; no additional rationale recorded.
- Impact: older specification text suggesting initial manual connection is superseded; do not build domain purchasing/automation now.
- Status: **APPROVED deferral**; production subdomain routing is also not implemented yet.

### D15 — Small Platform Admin without impersonation

- Date/source: v1.1, 2026-10-27, §14.
- Choice: secure clinic/account/entitlement oversight and suspend/reactivate controls; no public admin signup, impersonation, advanced analytics, sales CRM, or client map.
- Reason: source defines a limited V1 administration scope; no separate impersonation rationale recorded.
- Impact: enforce separate admin authorization; pilot oversight is allowed while advanced tools remain deferred.
- Status: **APPROVED product requirement/exclusions**, not implemented.

### D16 — Concise marketing composition

- Date/source: v1.1, 2026-10-27, §6; current repository at `e42a0b3` verifies subsequent approved copy refinements.
- Choice: text-right/icon-left Hero; separate clinic device previews; dashboard concepts; features; three steps; final CTA; footer. Exact Hero copy and `/demo` CTA are in [PRODUCT_SPEC §21](PRODUCT_SPEC.md#21-ayadatak-marketing-website).
- Reason: explain the product quickly with minimal filler.
- Impact: no fake numbers/testimonials, premature pricing, or presenting concepts as functioning dashboards. Current preview heading is «موقع يعكس هوية عيادتك».
- Status: **APPROVED product presentation**, current marketing composition implemented.

## Technical direction, not deployed facts

### T01 — Railway + Supabase / Prisma

- Date/source: v1.1, 2026-10-27, §§17–19, 24.
- Choice: current direction is Next.js on Railway; Supabase PostgreSQL/Auth/Storage with Prisma data access; optional Cloudflare DNS; modular monolith.
- Reason: source presents this as an initial operational recommendation, not an irrevocable hosting commitment.
- Impact: P4 designs schema and actual permissions before integration/migrations. Prisma does not automatically enforce RLS through privileged connections. Keep `ClinicTemplate` independent of Prisma.
- Status: **PLANNED technical direction**, not configured/deployed. No final Prisma schema is approved here.

## Open questions

All remain open as of the source date; do not silently decide them while implementing another phase.

- Monthly/annual prices, payment gateway, and subscription-expiration policy (commercial research/P13).
- Final email/password versus email-link mechanism, recovery, verification, and safe identity linking (P5).
- Pilot duration, usage limits, and number of clinics per user (pilot planning).
- Minimum clinic data needed to publish; allowed image/service/doctor counts (relevant implementation phases).
- Slug-change policy after publication and handling old URLs (routing design).
- Automatic versus manual Hero slider behavior (P3 review and subsequent approval).
- Draft/published storage, membership constraints, transactions and actual data authorization strategy (P4.1).
- Retaining a previous published revision for recovery, which is not mandatory in V1.
- Future ownership-transfer handling when a user manages multiple clinics.

The original approval dates and any rationale not stated by the supplied plan remain unspecified. The master plan is complete and available; no missing source blocks documentation synchronization. Final P3 template visual/product approval remains a separate review gate.
