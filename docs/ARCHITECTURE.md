# Ayadatak Architecture

Verified from repository files on 2026-10-28. [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) defines approved direction; [TASKS.md](TASKS.md) tracks completion. A requirement below is not an implemented integration unless explicitly identified as current.

## Current implementation

One Next.js App Router application using Next.js 16.3.8, React 19.2.8, strict TypeScript, and Tailwind CSS v4. The root layout supplies Arabic `lang`, RTL direction, Noto Sans Arabic through `next/font/google`, and Ayadatak marketing metadata. Marketing and public fixture routes are server-rendered; the isolated dashboard prototype uses Client Components and browser-local data. There is no authenticated backend or server persistence layer.

### Code boundaries

- `src/app/page.tsx`: assembles the marketing homepage.
- `src/components/marketing/`: marketing content, device mockups, and two static dashboard concepts.
- `src/components/ui/`: shared brand/icon, button, container, and section primitives.
- `src/types/clinic.ts`: typed `ClinicContent`, image/identity/branding, Hero slides, services, doctors, testimonials, FAQ, working periods, contact/location/social links, section visibility, and fixed section order.
- `src/data/demo-clinic.ts` and `src/data/sakeena-demo-clinic.ts`: fictional, independent fixture data satisfying `ClinicContent`.
- `src/lib/clinic-resolver.ts`: asynchronous `ClinicResolver.resolveBySlug` interface and fixture-backed implementation.
- `src/components/clinic/`: reusable `ClinicTemplate`, section components, image fallbacks, navigation, rendering, and contact helpers. The template receives data through props, not direct fixture or database imports.
- `src/app/demo/page.tsx`: Al Noor preview using its fixture directly.
- `src/app/demo/[slug]/page.tsx`: fixture lookup, per-fixture demo metadata, static parameters, and not-found handling.
- `tests/clinic-foundation.test.ts`: fixture/resolver and local-prototype Node test cases, compiled by `tsconfig.test.json`.

Some earlier marketing components remain in the directory but are not imported by the current homepage. Follow `src/app/page.tsx`, not filenames alone, to determine the active composition.

### Marketing versus clinic template

The marketing order is Header → Hero → Clinic website previews → Dashboard concepts → Features → How It Works → Final CTA → Footer. Hero text sits on the right and the existing Ayadatak icon on the left on desktop. Its primary CTA opens `/demo`.

`PublicClinicShowcase` is a static marketing representation of a desktop and phone clinic site. It is not `ClinicTemplate` rendered in devices. It uses `public/images/clinic-interior.png`, a tracked marketing asset. `DashboardConcepts` contains illustrative management interfaces, not editable fields, auth, save actions, or real dashboard routes.

### Clinic preview flow

```text
/demo ───────────────────→ Al Noor fixture ────────────────┐
                                                          ↓
/demo/[slug] → normalize/validate → fixture map → clone → ClinicTemplate
                                    ↓ lookup fails
                                  notFound()
```

Normalization trims and lowercases. Valid syntax is 1–63 Latin lowercase letters/numbers/internal hyphens, with alphanumeric boundaries. Reserved names are rejected. Results distinguish `invalid`, `reserved`, and `not-found`; there is no fallback to a different clinic. A successful lookup returns a `structuredClone` so a caller cannot mutate the shared fixture through the returned object. This is content separation, not a security boundary.

Current fixture slugs are `demo` and `sakeena-demo`. `/demo` and `/demo/demo` show the same fictional Al Noor clinic. `/demo/sakeena-demo` shows the second fixture.

### Rendering and preview safety

- Required Hero; fixed optional section sequence: About → Services → Doctors → Testimonials → FAQ → Location/Working Hours/Contact → Footer.
- Visibility flags and non-empty content determine rendered sections and navigation. Services, doctors, testimonials, and FAQ use `displayOrder`.
- Both fixtures have empty testimonials. Sakeena also exercises empty/hidden sections, optional details, and multiple working periods.
- The template derives a contrast-aware button foreground, dark text shade, light tint, and outline from one primary color through `src/lib/clinic-theme.ts`. The legacy optional `accent` data field remains for compatibility but is not an independent V1 setting.
- `ClinicHeroSlider` is a small Client Component inside the otherwise server-renderable public template. It supports 1–5 images, RTL previous/next and keyboard arrows, and pagination; one image has no unnecessary controls.
- Fictional fixtures now use local illustrative clinic images. The original marketing reception asset is reused by Sakeena without modification. `ClinicImageFrame` and `ClinicLogo` handle missing/broken sources with designed fallbacks; external image URLs remain browser-loaded in this prototype.
- `/demo` routes use `previewMode` and `noindex`/`nofollow` metadata. Contact/map/social actions are disabled; in-page navigation remains available. These previews are public fictional data, not authorized private drafts.
- Safe-link helpers and fallback rendering are useful UI defenses, not a complete asset-validation or security policy.

### Existing verification coverage

The original nine tests cover slug syntax, reserved names, independent fixture resolution, clone isolation, explicit lookup failures, fixed section order, hidden/empty sections and navigation, optional data/multiple working periods, and the preview-action helper. Added prototype tests cover fixture isolation, versioned data parsing, visibility states, validation, and item ordering. They do not establish authenticated tenant isolation, database constraints, production draft/published isolation, or publishing failure safety.

### P3.7 visual editor prototype

`/dashboard-demo` is a public, explicitly fictional frontend prototype; it does not represent an authenticated owner account. P3.7 replaced the P3.6 four-area content dashboard with `src/components/dashboard/visual-website-editor.tsx`. The real `ClinicTemplate` is the canvas. Its optional `ClinicEditorSlots` presentation hooks insert contextual controls in editing mode; `/demo` and the saved-draft preview omit the hooks entirely. A compact toolbar and one focused drawer manage editing. This change does not modify the marketing dashboard concepts or the visual design of public clinic sites.

`src/lib/dashboard-prototype.ts` still owns the P3.6 versioned, namespaced localStorage format, runtime shape checking, validation, visibility summaries, and ordering helpers. Existing valid saved drafts are compatible. `src/lib/visual-editor-draft.ts` provides pure collection/visibility operations. The editor holds separate working and saved copies; changes update the working canvas immediately, while Save alone writes localStorage. A before-unload warning covers navigation away with unsaved changes. Browser storage may be unavailable or cleared. Image URL fields demonstrate the approved logo/clinic-image controls; file upload/storage belongs to P9.

`/dashboard-demo?preview=1` reads the last saved local copy in the same browser origin and renders the full real `ClinicTemplate` with `previewMode`, plus a local-prototype notice and noindex metadata. It has no editor slots or editor controls. When working changes are unsaved, the editor explains that Preview displays only the saved copy and offers a save-first choice. Invalid stored data shows an error instead of rendering arbitrary content. Public `/demo` routes continue to use fixture content. This local preview is not a secure private draft preview or production publication.

### P3.8 clinic-site and editor refinement

The public template, editor canvas, and saved-draft preview still share `ClinicTemplate`. P3.8 changes its presentation only: a large image-centered Hero, compact navigation with the clinic logo, quick links to existing sections, a concise image-led About section, tighter service/doctor cards, and clearer contact/hours. The approved fixed content-section order is unchanged. The marketing homepage is not part of this change.

`src/lib/clinic-hero-slides.ts` holds pure 1–5-slide add/remove/move/navigation rules. The editor's Appearance drawer exposes one primary color, a logo reference, and slide thumbnails with add/remove/reorder/select controls; edits update the working canvas immediately, Save persists only the browser-local draft, and Preview reads only saved content. `src/lib/dashboard-prototype.ts` keeps its original storage key/version and selectively migrates only legacy `example.com` demo-image paths while preserving user-edited fields. No production upload, asset authorization, or publication is claimed.

Scripts: `npm run lint`, `npm run typecheck`, `npx next build --webpack`, and `npm test`. Do not run type generation and build concurrently; both write `.next/types`. See [README.md](../README.md) for setup. P3.5 documentation preparation did not rerun application checks; P3.6 and P3.7 ran them after implementation.

## Planned production architecture

None of the following integrations is implemented yet: Supabase PostgreSQL, Prisma, Supabase Auth, Supabase Storage, Railway deployment, production wildcard routing, functional clinic/admin dashboards, publishing, or commercial billing. There is no final Prisma schema, migration set, database access layer, or membership authorization implementation in this repository.

The direction is a modular monolith: one application with separate presentation, content mapping, data access, authentication, authorization, publishing, storage, tenant resolution, and entitlement responsibilities. Railway would host Next.js; Supabase would supply PostgreSQL/Auth/Storage. DNS/wildcard SSL must be configured and verified before production routing. Cloudflare is an optional DNS direction, not a completed integration.

### Approved conceptual data flow

```text
User (Google or email)
  → Clinic Membership (verified on the server)
  → Selected Clinic + independent entitlement
  → Draft Content (private, editable, previewable)
  → Explicit Publish / Publish Changes action
  → Consistent Published Content
  → Public Clinic Website on clinic-slug.ayadatak.com
```

One user may manage multiple clinics. Each clinic's entitlement is independent; pilot entitlements enable authorized free usage, while commercial subscriptions are introduced only after pricing approval. This is a conceptual relationship, not a declaration of database tables or a finalized schema.

### Authorization and publication boundaries

- Authenticate and verify clinic membership/role on the server for each protected operation. Do not trust a clinic ID supplied by a browser.
- Scope data access and storage operations to the authorized clinic. Public reads must use only the allowed published version, never the draft.
- Decide Prisma connection privileges and RLS/application authorization together in P4. Prisma with privileged credentials does not automatically enforce Supabase RLS.
- New clinics are unpublished. Saving updates modifies the draft; first publishing and later changes require distinct explicit actions and validation.
- Choose snapshot/revision storage, transaction semantics, and constraints in P4.1. Failed publishing must preserve the previous public version; never expose partial content.
- Preserve assets still referenced by published content while drafts are edited or images removed. Refresh published caches and metadata after successful publication.
- Respect unpublished/suspended states and entitlement policy. A fixture slug resolver does none of this.
- Production owner previews must be authenticated and separate from the public fictional `/demo` routes.

## Remaining design gates

P3 needs final owner review of the template, imagery/Hero, doctors, FAQ, section states, and mobile experience. Production color-contrast validation and actual image assets remain to be reviewed. The repository's tracked marketing asset does not resolve the fixture imagery review.

P4.1 must decide the relational schema, memberships, per-clinic entitlements, draft/published persistence and publishing transactions, and authorization strategy before migrations. P5 finalizes email auth/recovery; P9 handles storage/branding; P10 implements publishing and hostname routing; P11 completes production SEO/caching. Custom domains remain deferred. See [DECISIONS.md](DECISIONS.md) for all open product choices.
