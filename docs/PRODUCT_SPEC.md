# Ayadatak (عيادتك) — Product Specification

> [!IMPORTANT]
> **This is the detailed V1 product specification for Ayadatak.**
> Synchronized on 2026-10-27 with the owner-supplied [Master Implementation Plan v1.1](IMPLEMENTATION_PLAN.md), which takes precedence for approved product decisions and the roadmap. Requirements here do not imply implemented functionality; see [TASKS.md](TASKS.md) and [ARCHITECTURE.md](ARCHITECTURE.md).
> Items marked as **future**, **optional**, or **not finalized** must not be silently promoted into V1 requirements.
> See [§28 Document Status](#28-document-status) for the full rules.

---

## 1. Product

Ayadatak (عيادتك) is an **Arabic-first SaaS platform for clinics and doctors**.

Its primary purpose is to allow a clinic or doctor to create and manage a professional clinic website **without needing a developer or a separate website project**.

Ayadatak is a **shared multi-tenant SaaS platform**. All clinics use the same application/codebase while maintaining isolated clinic data, configuration, content, and public website identity.

Ayadatak V1 is specifically a **clinic website SaaS**. It is **not** intended to be:

- a hospital management system,
- an electronic medical record system, or
- a full clinic operations platform.

---

## 2. V1 Product Scope

The initial product focuses on:

- Creating a user account using Google OAuth or email.
- Creating/configuring clinics, including multiple authorized clinics per user.
- Managing clinic website content from a dashboard.
- Publishing a professional public clinic website.
- Providing a default Ayadatak subdomain.
- Allowing the clinic owner to control which supported sections appear.
- Providing one polished clinic website template.
- Providing basic platform administration.
- Separating editable draft content from published content.
- Requiring an explicit first Publish action and later Publish Changes actions.
- Providing an independent entitlement for each clinic, with a limited free pilot before commercial subscriptions.

> [!WARNING]
> **Appointment booking is explicitly NOT part of the initial V1.**

---

## 3. Primary User Journey

The intended clinic-owner journey is:

```
Ayadatak marketing website
→ "Get Started"
→ Account creation / login
→ Clinic creation / onboarding
→ Enter clinic information
→ Configure website content
→ Select / configure the available template
→ Preview
→ Publish
→ Receive the clinic's public website
```

The clinic owner can return to the dashboard later, save draft changes, preview them, and explicitly select **Publish Changes**. Saving edits must never update the public website automatically.

Onboarding collects the clinic name, a unique valid non-reserved slug, an initial description, suitable contact information, and an optional logo. Creating a clinic also creates its owner membership and appropriate entitlement consistently. New clinics start unpublished. Full form UX and minimum publishing data remain to be finalized.

### 3.1 Authentication and account access

- Google OAuth and email registration/login are approved.
- Email/password is the provisional direction; the final email mechanism, recovery, and verification details are decided in P5.
- Sessions, logout, account recovery, and protected routes require server-side verification.
- Using multiple sign-in methods must not cause unsafe account linking.
- An existing user can select and switch between clinics they are authorized to manage.

---

## 4. Public Clinic Website

A clinic website should support the following content.

### 4.1 Clinic identity

- Clinic name
- Clinic logo
- Clinic description / about information

### 4.2 Hero

- Multiple clinic images in the content model
- A Hero image presentation whose final slider behavior requires review
- Slider navigation controls; final presentation and automatic versus manual operation remain subject to review, and upload limits remain open

The current template renders only the first slide. Supporting multiple image records is not evidence of a working carousel.

### 4.3 Services

- Clinic services

### 4.4 Doctors

Each doctor can have:

- Name
- Specialty
- Experience / about information
- Photo

### 4.5 Patient Testimonials

The clinic owner **manually manages** patient testimonials.

V1 testimonial fields:

- Patient / display name
- Testimonial text

Constraints for V1:

- **No** public visitor review submission.
- Testimonials are **not** verified public ratings and must not be presented as such.
- A 1–5 star rating system is **not required**.

### 4.6 FAQ

The clinic owner can create, edit, and delete FAQ entries consisting of:

- Question
- Answer

The public template may display these using an accordion UI.

### 4.7 Working Hours

The clinic can configure its working hours.

### 4.8 Contact

Support:

- Phone number
- Email
- WhatsApp (see [§17](#17-whatsapp-contact))
- Quick contact actions/buttons

### 4.9 Location

Support:

- Clinic address / location
- Map / location information
- Action to open the location in a maps service

### 4.10 Social Media

- Clinic social media links

---

## 5. Gallery

There is **no separate Gallery section in V1**.

The Hero Slider initially serves as the primary clinic imagery area.

A dedicated gallery is **future** functionality that can be considered later.

---

## 6. Section Visibility

The clinic owner must be able to enable or disable appropriate website sections/content areas. Examples include:

- About
- Services
- Doctors
- Testimonials
- FAQ
- Contact information, where appropriate
- Social links, where appropriate

Requirements:

- Disabled sections must **not** leave broken layouts or empty visual gaps.
- Not every mandatory structural element needs a visibility toggle.
- Optional sections must be skipped when disabled or empty, and navigation must match visible sections. Hero remains mandatory. Fine-grained editing and validation rules will be finalized during implementation.

---

## 7. Section Ordering

V1 does **not** include drag-and-drop section ordering. V1 uses a deliberate **fixed section order**.

Current intended order:

```
Hero
→ About
→ Services
→ Doctors
→ Testimonials
→ FAQ
→ Location / Working Hours / Contact
```

Disabled sections are skipped cleanly.

The architecture should not unnecessarily prevent configurable ordering in a future version, but configurable ordering is **not implemented in V1**.

---

## 8. Templates

V1 launches with **one** high-quality clinic template.

- Clinic content/data must be kept **separate from template presentation**, so additional templates can be added later without migrating or duplicating clinic data.
- Templates consume a **common clinic data model**.
- Do **not** create multiple templates during initial V1 merely to demonstrate template support.

Future templates may become premium features, but pricing/package decisions are **not finalized**.

---

## 9. Multi-Tenancy

Multi-tenancy is a **core architectural requirement**.

- Each clinic is logically isolated from other clinics.
- A clinic user must **never** gain access to another clinic's private dashboard data or management functionality.
- Tenant isolation must be enforced by **backend/database authorization** and must **not** rely solely on frontend visibility.
- One user may manage multiple authorized clinics in V1. Each clinic has an independent entitlement; commercial subscriptions are per clinic, not one subscription for the whole account.
- Draft content is private to authorized members; public reads use published content only, subject to publication, suspension, and entitlement rules.
- A client-provided clinic ID or slug is not proof of authorization. Verify membership on the server.

The conceptual relationship should allow:

```
User
→ Clinic Membership
→ Clinic
→ Clinic-owned data
```

Do not permanently hard-code the architecture around one user directly owning one clinic; a membership model provides safer future extensibility.

Future versions may support multiple users per clinic with roles such as Owner, Manager, or Staff. **Advanced clinic staff permissions are not required in V1.**

---

## 10. Clinic Locations / Branches

V1 supports **one primary location per clinic**.

Multi-branch clinic support is **not part of V1**. The architecture should avoid making future multi-branch support unnecessarily difficult, but multi-branch functionality must not be built now.

---

## 11. Platform Roles

There are two primary product-level roles in V1.

### 11.1 Clinic User

A clinic owner/user who manages **only** their authorized clinics and can switch between them.

### 11.2 Platform Admin

The Ayadatak platform administrator.

- Platform Admin access is **separate** from clinic-level authorization.
- There is **no public admin registration flow**.

---

## 12. Admin V1

Initial admin functionality remains intentionally small.

V1 admin requirements:

- View a list of clinics.
- View basic clinic details.
- View clinic owner / basic account information, where appropriate.
- View clinic creation date.
- View clinic public URL/subdomain.
- View clinic status.
- Activate / suspend a clinic.
- Basic search/filtering, publication and account/entitlement status, reactivation, and free-pilot clinic oversight.
- Secure assignment and enforcement of platform-admin permissions.

Not in V1:

- Admin impersonation / "login as clinic" is **not implemented in V1**. If impersonation is added later, it must be designed with appropriate security controls and auditability.
- Advanced analytics, full billing administration, maps, sales tools, and similar admin capabilities are **future** functionality. Basic entitlement/pilot status belongs to V1 administration.

---

## 13. Default Clinic URLs

The intended default public clinic URL model is:

```
{clinicSlug}.ayadatak.com
```

Example: `alhayat.ayadatak.com`

This is preferred over path-based URLs such as `ayadatak.com/alhayat`.

The implementation must eventually resolve the hostname to the correct clinic tenant.

This specification intentionally does **not** lock the implementation to a particular Next.js file or routing mechanism (for example, `middleware.ts`). The mechanism should be chosen based on the architecture and framework capabilities at implementation time.

---

## 14. Clinic Slugs / Reserved Subdomains

Clinic subdomain identifiers must be validated. At minimum, they are limited to:

- lowercase Latin letters,
- numbers,
- hyphens, where valid.

Reserved platform identifiers must not be assignable to clinics. The reserved list should include identifiers such as:

```
admin
app
api
dashboard
billing
auth
mail
static
help
www
```

The reserved list must be maintainable and extensible.

Exact validation rules are **not finalized** and will be defined during implementation.

---

## 15. Custom Domains

Custom-domain connection is **deferred to a later phase**, per Implementation Plan v1.1. It is not an initial V1 delivery requirement. The following describes that future direction only.

Example:

```
alhayatclinic.com → the same Ayadatak clinic tenant
```

- A custom domain must **not** require a separate application deployment or a separate copy of the clinic website.
- The shared SaaS application resolves the domain to the correct clinic.
- Provisioning may be manual when the future custom-domain phase is approved.
- If a clinic already owns a domain, it can later be connected through DNS.
- If Ayadatak provides domain purchasing as a service, it may initially be handled manually.
- Automated registrar/domain purchasing APIs are **future** functionality.
- Custom domains may be a paid add-on (commercial model **not finalized**; see [§23](#23-business-model)).

---

## 16. SEO and Social Sharing

Public clinic websites must be built with SEO and social sharing in mind.

V1 production publishing must include clinic-specific metadata such as:

- Page title
- Description
- Open Graph metadata
- Canonical URL and appropriate robots/indexing controls
- Appropriate clinic branding/logo imagery
- Search-engine indexability, where appropriate

When a clinic link is shared through services such as WhatsApp or social platforms, the clinic's identity should be represented appropriately rather than using generic Ayadatak metadata.

Demo and unpublished previews must not be indexed. Published-content caches and metadata must refresh after publishing without leaking drafts. Production SEO is planned for P11; current demo metadata is not the production SEO system.

---

## 17. WhatsApp Contact

WhatsApp is an important clinic contact channel.

The public clinic website should support a WhatsApp call-to-action using the clinic's configured WhatsApp number.

The system may support a pre-filled inquiry message such as:

> مرحباً، أود الاستفسار بخصوص خدمات عيادة {clinic_name}

The message must not be permanently hard-coded in a way that prevents future customization.

---

## 18. Image Handling

Clinic owners may upload large images from phones or cameras. The product must account for:

- File type validation
- File size limits
- Image optimization/compression
- Reasonable website performance
- Efficient storage/bandwidth usage
- Tenant-scoped storage permissions
- Retaining images referenced by the published version even when removed from a draft
- Safe cleanup only after no live published content needs an asset

This specification intentionally does **not** prescribe a specific image-compression library. The implementation approach will be selected later.

---

## 19. Responsive Design and Arabic

Ayadatak is **Arabic-first**. RTL support is a **first-class requirement**, not an afterthought.

Public clinic websites, onboarding, dashboards, and the Ayadatak marketing website must be designed with Arabic/RTL usability in mind.

The public clinic website must work well on:

- Mobile
- Tablet
- Desktop

The current project uses `lang="ar"` and `dir="rtl"`.

The current **Noto Sans Arabic** font is a technical default, **not** a final brand typography decision.

---

## 20. Brand Direction

Current brand direction:

- Arabic-first
- Medical / professional
- Clean
- Modern
- Minimal
- Established marketing visual direction: **calm cyan, navy, and white**

V1 clinic customization is limited to the clinic logo, images, and primary brand color, with safe defaults and accessible contrast. Font selection and alternate layouts are outside V1. The current typed model also contains an optional accent color; this does not approve a separate user-facing accent-color control.

**Not finalized:**

- Logo
- Final brand shades beyond the established direction
- Typography
- Complete design system

Temporary design choices must not be treated as permanent brand decisions.

---

## 21. Ayadatak Marketing Website

Ayadatak will have its own public marketing/landing website targeted primarily at **doctors and clinic owners**. Its purpose is to explain the product and convert clinic owners into users.

Approved marketing order:

1. Header.
2. Hero: text on the right and the existing Ayadatak brand icon on the left on desktop.
3. Separate desktop and mobile clinic website previews.
4. Two dashboard concept previews (not a functioning dashboard).
5. Features.
6. Three-step explanation.
7. Final CTA.
8. Footer.

Hero copy:

- Headline: **كل ما يخص عيادتك، في موقع واحد.**
- Description: **عرّف بعيادتك، اعرض خدماتك، وسهّل على المرضى الوصول إليك.**
- One primary Hero CTA: **استعرض نموذج العيادة**, currently linking to `/demo`.

The current preview-section title is **موقع يعكس هوية عيادتك**. Marketing device mockups are separate from the actual `ClinicTemplate` and must not be presented as additional templates. Keep marketing content concise: no fabricated statistics or testimonials, unapproved pricing, technical explanations for visitors, or claims that unfinished features are ready.

---

## 22. Clinic Dashboard

The clinic dashboard will eventually provide management areas for things such as:

- Clinic information
- Hero images
- Services
- Doctors
- Testimonials
- FAQ
- Working hours
- Contact information
- Location
- Social links
- Section visibility
- Appearance (logo, images, primary color only in V1)
- Site settings and clinic selection
- Account / settings

Billing/plan management can be introduced when the commercial model requires it.

The exact dashboard information architecture is **not finalized** and should be designed incrementally.

The dashboard must distinguish saving a draft from publishing it. Show the active clinic, publication status, public URL, preview action, unpublished-change indicator, and explicit Publish / Publish Changes action. Include useful loading, error, empty, and save states; no fake analytics. Domain management is deferred with custom domains.

---

## 23. Business Model

Ayadatak begins with a **limited free pilot**, then commercial subscriptions after market validation and pricing approval. Payment is not required for the free pilot.

Potential monetization includes:

- Subscription plans
- Premium templates
- Custom domains
- Additional features/services

Each clinic has its own entitlement. When commercial billing is active, each additional clinic requires a separate subscription; one clinic's expiration must not automatically affect the user's other clinics. During the pilot, authorized clinics receive trial entitlements without collecting payments.

Prices, plan names, payment gateway, pilot duration/limits, expiration policy, and exact packaging remain **open**. Speculative prices must not be encoded or published. Premium templates and custom domains remain future possibilities, not V1 requirements.

---

## 24. Explicitly Out of Scope for Initial V1

The following must **not** be built as part of initial V1 unless this specification is intentionally changed:

- Appointment booking
- Patient accounts
- Patient records
- Electronic medical records
- Prescriptions
- Medical management workflows
- Hospital management
- Public visitor review submission
- Independent gallery section
- Drag-and-drop page builder
- Multi-branch clinics
- Advanced clinic staff permissions
- Admin impersonation
- Advanced admin analytics
- Admin geographic client map
- Field-sales / representative management
- Automated domain purchasing
- AI features
- WhatsApp automation / chatbots
- Native mobile application
- Restaurant / gym / barber verticals
- Microservices introduced without a demonstrated need

---

## 25. Future Direction

> [!NOTE]
> This section describes a **future product direction only**. Nothing here is a V1 requirement.

Ayadatak should be engineered cleanly enough that the underlying website-building platform could potentially support other business verticals in the future.

A possible future broader brand is **Manasattak (منصتك)**.

Potential verticals could include:

- Gyms
- Restaurants
- Barbers
- Other service businesses

Guidance:

- Do **not** build generic multi-industry functionality into Ayadatak V1 solely for this possibility.
- Avoid unnecessary clinic-specific coupling where a clean generic technical concept naturally exists, but **prioritize the actual clinic product being built today**.

---

## 26. Current Confirmed Technical Direction

| Area             | Choice              |
| ---------------- | ------------------- |
| Framework        | Next.js             |
| Language         | TypeScript          |
| UI library       | React               |
| Styling          | Tailwind CSS        |
| Database         | PostgreSQL          |
| ORM              | Prisma ORM          |
| Database hosting | Supabase PostgreSQL |
| Authentication   | Supabase Auth       |
| File storage     | Supabase Storage    |
| App hosting direction | Railway       |
| Architecture     | Multi-tenant SaaS   |
| Version control  | Git / GitHub        |

Current scaffold versions:

- Next.js 16.3.8
- React 19.2.8
- Tailwind CSS v4

> [!NOTE]
> PostgreSQL, Prisma, Supabase Auth/Storage, and Railway deployment have **not** been implemented/configured for Ayadatak. Railway + Supabase is the current planned direction, not a deployed fact. The final database schema and draft/published persistence design belong to P4.1. Prisma does not automatically enforce Supabase RLS when using privileged connections; authorization must be explicitly designed and tested.

---

## 27. Development Principles

Future development should follow these principles:

- Build incrementally.
- Keep tasks small and reviewable.
- Avoid speculative abstractions.
- Avoid unnecessary dependencies.
- Do not over-engineer for hypothetical future requirements.
- Preserve tenant isolation and security as first-class concerns.
- Maintain strong Arabic/RTL support.
- Prefer reusable clinic data models over template-specific data duplication.
- Run relevant lint/type/build/tests after implementation tasks.
- Keep Git commits focused and understandable.
- Treat destructive actions, production changes, secrets, deployments, database migrations, and remote Git operations carefully.

---

## 28. Document Status

**This document preserves detailed V1 requirements and is synchronized with the approved [Implementation Plan v1.1](IMPLEMENTATION_PLAN.md).**

- Product decisions in this document are **authoritative until intentionally revised**.
- Items explicitly marked as **future**, **optional**, or **not finalized** must **not** be silently promoted into V1 requirements by an AI agent or developer.
- Implementation details that are not specified here should be chosen **conservatively and incrementally**.
- If an implementation task conflicts with this document, the conflict should be **identified before implementation** rather than silently changing the product scope.
- The implementation plan governs approved product decisions and phase order; this specification adds compatible requirement detail. Report unresolved conflicts instead of silently selecting a version.
- [ARCHITECTURE.md](ARCHITECTURE.md) records actual versus planned design, [TASKS.md](TASKS.md) records verified progress, and [DECISIONS.md](DECISIONS.md) logs decisions and open questions.

---

## 29. Drafts and Explicit Publishing

The product must distinguish Draft (never published), Published, Unpublished, and Suspended. Unpublished edits may be represented by revisions or a change indicator; exact storage/state details are decided in P4.1.

- Clinic creation and saving content do not publish anything.
- Draft edits appear in the authorized owner's preview only.
- First publishing requires preview and an explicit **Publish Website** action.
- Later edits require an explicit **Publish Changes** action.
- The server validates authorization, clinic state, entitlement, and required content before publishing.
- Public reads use a consistent published snapshot/revision or equivalent boundary, never the editable draft.
- If publishing fails, the previous published version remains intact and the owner can retry.
- Publishing refreshes public content, metadata, and relevant caches together.
- Assets referenced by published content remain available while drafts change.
- A full revision-history/rollback UI is not required in V1.

These are approved requirements; persistence, authorized draft previews, and the publishing system are not yet implemented. The current `/demo` routes display public fictional fixtures, not private user drafts.

---

## 30. Remaining Open Decisions

See Implementation Plan §28 and [DECISIONS.md](DECISIONS.md) for the maintained list:

- Monthly/annual prices, payment gateway, and subscription-expiration policy.
- Final email sign-in method and recovery/verification details (P5).
- Pilot duration, limits, and clinic allowance per user.
- Minimum content required to publish; image/service/doctor limits.
- Slug changes after publication and handling old links.
- Automatic versus manual Hero slider behavior.
- Draft/published storage, transaction, and authorization design (P4.1).
- Whether to retain a previous published revision for recovery (not required in V1).
- Future ownership-transfer handling for users with multiple clinics.
