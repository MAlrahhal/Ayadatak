# Ayadatak (عيادتك)

Ayadatak is an Arabic-first, multi-tenant SaaS platform that lets clinics and doctors create and manage professional clinic websites from a single shared platform.

> **Status:** Project foundation only. No product features are implemented yet.

## Planned scope

- Public marketing website for Ayadatak
- Clinic owner authentication and onboarding
- Clinic owner dashboard (content, settings, section visibility)
- Multiple clinic website templates
- Public clinic websites on subdomains / custom domains
- Platform admin dashboard

Appointment booking is **not** part of the initial MVP.

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

The UI is Arabic-first: the root layout uses `lang="ar"` and `dir="rtl"`.

## Getting started

Requirements: Node.js **20.9+** (developed on Node 22) and npm.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the development server       |
| `npm run build`     | Create a production build          |
| `npm run start`     | Serve the production build         |
| `npm run lint`      | Run ESLint                         |
| `npm run typecheck` | Generate route types and run `tsc` |

## Project structure

```
src/
  app/          # Next.js App Router (routes, layouts, global styles)
public/         # Static assets
```

Additional folders will be introduced only when a feature needs them.
