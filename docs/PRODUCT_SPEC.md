# Ayadatak (عيادتك) — Product Specification

> [!IMPORTANT]
> **This is the canonical V1 product specification for Ayadatak.**
> Product decisions in this document are authoritative until intentionally revised.
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

- Creating a clinic account.
- Creating/configuring one clinic.
- Managing clinic website content from a dashboard.
- Publishing a professional public clinic website.
- Providing a default Ayadatak subdomain.
- Allowing the clinic owner to control which supported sections appear.
- Providing one polished clinic website template.
- Providing basic platform administration.

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

The clinic owner can return to the dashboard later and update the website.

Detailed onboarding steps are **not defined yet** beyond this product-level flow.

---

## 4. Public Clinic Website

A clinic website should support the following content.

### 4.1 Clinic identity

- Clinic name
- Clinic logo
- Clinic description / about information

### 4.2 Hero

- Hero image slider
- Approximately 3–5 clinic images
- Slider navigation controls

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
- Exact visibility rules are **not finalized** and will be defined during implementation.

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

A clinic owner/user who manages **only** their authorized clinic.

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

Not in V1:

- Admin impersonation / "login as clinic" is **not implemented in V1**. If impersonation is added later, it must be designed with appropriate security controls and auditability.
- Advanced analytics, subscription management, maps, sales tools, and similar admin capabilities are **future** functionality.

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

Custom domains are part of the product direction but do **not** need to be fully automated in initial V1.

Example:

```
alhayatclinic.com → the same Ayadatak clinic tenant
```

- A custom domain must **not** require a separate application deployment or a separate copy of the clinic website.
- The shared SaaS application resolves the domain to the correct clinic.
- Early custom-domain provisioning may be manual.
- If a clinic already owns a domain, it can later be connected through DNS.
- If Ayadatak provides domain purchasing as a service, it may initially be handled manually.
- Automated registrar/domain purchasing APIs are **future** functionality.
- Custom domains may be a paid add-on (commercial model **not finalized**; see [§23](#23-business-model)).

---

## 16. SEO and Social Sharing

Public clinic websites must be built with SEO and social sharing in mind.

Support should eventually include dynamic, clinic-specific metadata such as:

- Page title
- Description
- Open Graph metadata
- Appropriate clinic branding/logo imagery
- Search-engine indexability, where appropriate

When a clinic link is shared through services such as WhatsApp or social platforms, the clinic's identity should be represented appropriately rather than using generic Ayadatak metadata.

Exact SEO implementation will be defined during development.

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
- Primary brand direction: **blue and white**

**Not finalized:**

- Logo
- Exact blue shades
- Typography
- Complete design system

Temporary design choices must not be treated as permanent brand decisions.

---

## 21. Ayadatak Marketing Website

Ayadatak will have its own public marketing/landing website targeted primarily at **doctors and clinic owners**. Its purpose is to explain the product and convert clinic owners into users.

Expected high-level content may include:

- Navigation
- Hero
- Primary CTA ("ابدأ الآن")
- Product / clinic-site preview
- Features
- Template presentation
- How it works
- Final CTA
- Footer

Exact copy and visual design are **not finalized**.

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
- Template / design
- Domain
- Account / settings

Billing/plan management can be introduced when the commercial model requires it.

The exact dashboard information architecture is **not finalized** and should be designed incrementally.

---

## 23. Business Model

Ayadatak is intended to become a **paid SaaS product**.

Potential monetization includes:

- Subscription plans
- Premium templates
- Custom domains
- Additional features/services

Pricing, plan names, plan limits, trials, and exact packaging are **not finalized**. Speculative pricing must not be encoded into the product.

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
| Architecture     | Multi-tenant SaaS   |
| Version control  | Git / GitHub        |

Current scaffold versions:

- Next.js 16.3.8
- React 19.2.8
- Tailwind CSS v4

> [!NOTE]
> Supabase and Prisma have **not** been configured yet.

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

**This document is the canonical V1 product specification for Ayadatak (عيادتك).**

- Product decisions in this document are **authoritative until intentionally revised**.
- Items explicitly marked as **future**, **optional**, or **not finalized** must **not** be silently promoted into V1 requirements by an AI agent or developer.
- Implementation details that are not specified here should be chosen **conservatively and incrementally**.
- If an implementation task conflicts with this document, the conflict should be **identified before implementation** rather than silently changing the product scope.
