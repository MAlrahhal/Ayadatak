<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Ayadatak agent guide

Ayadatak is an Arabic-first, RTL-first multi-tenant SaaS for creating, managing, previewing, and publishing medical-clinic websites. V1 is not a hospital-management, patient-record, or booking platform.

## Read the relevant documentation

1. [IMPLEMENTATION_PLAN v1.1](docs/IMPLEMENTATION_PLAN.md): approved product decisions and roadmap. Its historical status snapshot is not the live tracker.
2. [PRODUCT_SPEC](docs/PRODUCT_SPEC.md): detailed, compatible V1 requirements.
3. [ARCHITECTURE](docs/ARCHITECTURE.md): actual implementation versus planned production design.
4. [TASKS](docs/TASKS.md): verified progress, review gates, and remaining work.
5. [DECISIONS](docs/DECISIONS.md): approved choices, implications, and open decisions.

Identify conflicts rather than silently choosing a convenient version. Approved requirements are not evidence that a feature exists. Read only the relevant files; avoid redundant searches and repeated reads.

## Engineering and security

- Follow the existing Next.js App Router conventions and installed Next.js documentation above. Prefer Server Components and strict TypeScript.
- Maintain Arabic/RTL, accessibility, responsive behavior, and the cyan/navy/white direction. Reuse existing components.
- Keep `ClinicContent` independent from `ClinicTemplate` presentation and future persistence. Preserve tenant-aware data boundaries.
- Build only the scoped, approved feature. Avoid speculative features, unnecessary dependencies, and abstractions.
- V1 has one clinic template. Clinic customization is logo, images, and primary color; no booking, page builder, font selector, or layout selector.
- Treat tenant isolation as critical. Never use client-provided clinic identifiers as authorization; enforce membership and permissions on the server.
- Never expose secrets. Prisma does not automatically enforce Supabase RLS through privileged connections.
- Drafts and published content must remain separate. Saving edits must not publish them; require explicit Publish / Publish Changes actions.
- Fixture resolution and public `/demo` previews are not production tenant security, private draft previews, or publication logic.
- Google + email authentication, multiple clinics per user, per-clinic entitlements, and a limited free pilot are approved requirements. Auth, persistence, publishing, and billing are not implemented yet; do not claim otherwise.

## Workflow

Before coding, read relevant docs, inspect the affected implementation, check Git status, and confirm scope. Preserve all existing uncommitted work.

After changes, run relevant verification, review the diff, and report modified files, results, and limitations concisely. Update task statuses only when acceptance criteria are met; P3 remains pending final owner visual/product review. For code, use the scripts in [README](README.md); do not run type generation and production build concurrently because they share `.next/types`. For documentation-only work, validate links, consistency, Markdown, and `git diff --check`; a build is normally unnecessary.

## Owner approval and Git safety

Without explicit owner approval, do not commit, push, deploy, rewrite history, force-push, modify remotes, apply production migrations, change production data/infrastructure, modify secrets, or delete unrelated work. Never discard uncommitted changes. Keep changes small and verifiable; do not introduce unapproved product or commercial scope.
