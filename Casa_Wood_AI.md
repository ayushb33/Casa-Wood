# AI.md

# Casa Wood — AI Engineering & Design Instructions

> Read this file and `CONTEXT.md` before making any project changes.

---

# 1. Repository

## Canonical Repository

`https://github.com/ayushb33/Casa-Wood.git`

This repository is the single source of truth for the project.

The repository starts empty. Initialize the project cleanly rather than assuming an existing architecture.

### Recommended Initial Workflow

```bash
git clone https://github.com/ayushb33/Casa-Wood.git
cd Casa-Wood
```

Initialize the application inside this repository.

Do not create an unnecessary nested application directory such as:

```text
Casa-Wood/
└── casa-wood/
```

unless there is a deliberate architectural reason.

---

# 2. Project Identity

## Brand
**Casa Wood**

A premium, modern furniture brand used as the showcase implementation of a larger Furniture Business Digitalization Platform.

## Core Business Flow

```text
Discover
↓
Browse
↓
Show Interest
↓
Capture Enquiry
↓
Lead CRM
↓
Follow-up
↓
Quotation
↓
Sale
```

The project is not primarily a checkout-focused e-commerce store.

---

# 3. Brand Assets

Two finalized assets exist:

- `CASA WOOD.png` — symbolic/compact mark
- `CASA WOOD-full.png` — full logo

After obtaining the assets, place them in:

```text
public/
└── brand/
    ├── casa-wood-symbol.png
    └── casa-wood-logo.png
```

## Usage

### Full Logo
Use for:
- Main navigation/header
- Footer
- Authentication
- Formal brand areas

### Symbol
Use for:
- Favicon
- App icon
- Compact sidebar
- Small screens where appropriate
- Loading mark

Never:
- Stretch
- Distort
- Recreate the logo in CSS
- Add arbitrary backgrounds behind transparent assets

---

# 4. Recommended Technology Stack

## Frontend
- Next.js (latest stable)
- App Router
- TypeScript

Use Server Components by default.

Use Client Components only when interaction requires them.

## Styling
- Tailwind CSS

## UI
- shadcn/ui for useful accessible primitives
- Custom components for Casa Wood's unique visual identity

Do not let default component-library styling make the public website generic.

## Database
- PostgreSQL
- Prisma recommended

## Validation
- Zod

## Authentication
Use a mature solution when authentication phase begins:
- Better Auth
- Auth.js
- Clerk

Do not hand-build authentication unnecessarily.

## File Storage
Use production storage such as:
- Cloudinary
- AWS S3
- Supabase Storage

---

# 5. Initial Project Structure

Recommended direction:

```text
src/
├── app/
│   ├── (public)/
│   ├── dashboard/
│   └── api/
├── components/
│   ├── ui/
│   ├── shared/
│   ├── public/
│   └── dashboard/
├── features/
│   ├── products/
│   ├── leads/
│   ├── customers/
│   ├── quotations/
│   └── orders/
├── lib/
├── services/
├── repositories/
├── hooks/
└── types/

public/
├── brand/
└── images/
```

This is guidance, not a requirement to over-engineer folders before features exist.

---

# 6. CASA WOOD PUBLIC WEBSITE — HIGHEST DESIGN PRIORITY

The public website must be visually distinctive.

The standard is:

> A real furniture showroom owner should be impressed enough to want a similar website.

## Desired Personality

- Premium
- Modern
- Warm
- Editorial
- Architectural
- Aspirational
- Natural
- Elegant

## Avoid

- Generic SaaS landing pages
- Purple AI gradients
- Corporate blue UI
- Bootstrap appearance
- Excessive glassmorphism
- Repetitive rounded cards
- Identical section layouts
- Random decorative icons
- Excessive animation
- Generic template appearance

---

# 7. Color System

Use a restrained, material-inspired palette.

Semantic direction:

- Warm Ivory/Bone → main background
- Deep Walnut/Espresso → primary dark
- Sand/Taupe/Stone → surfaces
- Muted Olive/Forest → natural accent
- Muted Gold/Terracotta → restrained highlight

Before implementing many pages:

1. Choose exact HEX values.
2. Define centralized design tokens.
3. Use semantic names.
4. Avoid hardcoding random colors throughout components.

Example:

```css
--background
--surface
--foreground
--muted
--border
--primary
--accent
```

---

# 8. Typography

Typography is a major part of the brand.

## Recommended Pairing

### Display
Elegant editorial serif.

Use selectively for:
- Hero
- Collection titles
- Brand storytelling

Candidates:
- Cormorant Garamond
- DM Serif Display
- Playfair Display

### Body/UI
Clean modern sans-serif.

Candidates:
- Manrope
- DM Sans
- Plus Jakarta Sans
- Inter

Use serif strategically. Do not use decorative typography everywhere.

---

# 9. Public Website Composition

Avoid predictable structures.

Do not make every section:

```text
Heading
Paragraph
Three cards
```

Instead use:
- Asymmetric layouts
- Full-bleed photography
- Editorial image/text composition
- Portrait and landscape image rhythm
- Large whitespace
- Overlapping visual elements where tasteful
- Alternating section density

The website should feel designed, not generated from a template.

---

# 10. Homepage Architecture

## Header
- Full Casa Wood logo
- Collections
- About
- Custom Furniture
- Visit Showroom
- Search/Wishlist actions where appropriate
- Responsive navigation

## Hero
Must create immediate impact.

Prefer:
- Large lifestyle imagery
- Split layouts
- Editorial typography
- Strong composition

Avoid a plain centered heading over a gradient.

## Categories
Use visual category discovery.

## Editorial Collection
Feature a curated collection with storytelling.

## Featured Products
Image-first product presentation.

## Craftsmanship
Tell a visual story around:
- Wood
- Materials
- Details
- Design

## Custom Furniture
Create an emotional CTA.

Concept direction:

> Made for your space.

## Inspiration/Lookbook
Use rich editorial composition, not another plain grid.

## Showroom
Promote physical showroom visits.

## Footer
Spacious and premium.

---

# 11. Image Guidelines

Furniture is a visual category.

Prioritize:
- High quality
- Large presentation
- Editorial cropping
- Interior context
- Product detail shots
- Varied aspect ratios

Use a mix of:
- Full-width images
- Portraits
- Landscapes
- Detail crops
- Occasional collages

Optimize images for performance.

---

# 12. Motion Guidelines

Motion should be refined.

Good:
- Gentle fades
- Image reveals
- Subtle hover zoom
- Smooth transitions

Avoid:
- Bouncy animations
- Constant motion
- Heavy parallax
- Distracting effects

---

# 13. Product Card Rules

Product cards should prioritize imagery.

Useful information:
- Product name
- Category/material
- Price or "Price on request"
- Wishlist action

Avoid clutter.

Hover states can reveal secondary information.

---

# 14. Product Page Rules

A product page should clearly answer:

- What is it?
- How does it look?
- What is it made of?
- What are the dimensions?
- Is it customizable?
- How can the customer enquire?

Include:
- Immersive gallery
- Specifications
- Materials
- Dimensions
- Finishes
- Wishlist
- WhatsApp enquiry
- Quotation request
- Similar products

Do not over-focus on checkout during MVP.

---

# 15. Dashboard Design

The internal dashboard should be different from the public editorial website.

Dashboard characteristics:
- Efficient
- Structured
- Professional
- Data-oriented
- Easy to scan

Use:
- Tables
- Filters
- Search
- Status badges
- Clear actions
- Useful empty states

---

# 16. Architecture Principles

## Feature-Based Organization
Prefer grouping complex logic by feature.

## Separation of Concerns
Avoid putting UI, database queries, validation and business logic inside one huge component.

Preferred flow when needed:

```text
UI
↓
Action/Route
↓
Validation
↓
Service
↓
Repository/Database
```

Do not create unnecessary abstraction layers for trivial features.

---

# 17. TypeScript & Coding Rules

Use strict TypeScript.

Avoid `any`.

Use descriptive names:

```ts
createLead()
updateLeadStatus()
generateQuotation()
```

Booleans:

```ts
isLoading
isSubmitting
hasPermission
canEdit
```

Do not use vague variables when a descriptive name is possible.

---

# 18. Validation & Security

Validate external input with Zod.

Never trust only client validation.

For sensitive operations verify:

1. Authentication
2. Authorization
3. Business/resource ownership

Never expose:
- Secrets
- Tokens
- Database internals
- Stack traces

Maintain `.env.example`.

Never commit credentials.

---

# 19. Database Guidance

Conceptual entities:

- Business
- User
- Product
- ProductImage
- Category
- Customer
- Lead
- LeadProductInterest
- Activity
- FollowUp
- Wishlist
- WishlistItem
- CustomRequest
- Quotation
- QuotationItem
- Order

Use migrations.

Avoid N+1 queries.

Do not over-engineer multi-tenancy, but keep future `businessId` ownership in mind.

---

# 20. WhatsApp Strategy

## MVP
Use click-to-chat with contextual messages.

Example:

> Hello, I am interested in [Product Name]. Please share more details.

## Later
Business API integration may support:
- Automated messages
- Templates
- Follow-ups
- Order updates

Do not block MVP on advanced automation.

---

# 21. QR Strategy

Each product QR should point to a stable public URL.

Requirements:
- Unique
- Printable
- Regenerable
- Stable

Avoid temporary/internal-only destinations.

---

# 22. Definition of Done

A task is complete only when applicable:

- [ ] Feature works
- [ ] Inputs validated
- [ ] Loading state exists
- [ ] Empty state exists
- [ ] Error handling considered
- [ ] Responsive behavior checked
- [ ] Authorization checked
- [ ] Type safety maintained
- [ ] Lint/checks pass
- [ ] No obvious console errors
- [ ] CONTEXT.md updated

---

# 23. MANDATORY CONTEXT UPDATE

After every meaningful work session update `CONTEXT.md`:

1. Current Phase
2. Completed tasks
3. In-progress tasks
4. Files changed
5. Database changes
6. Important decisions
7. Known issues
8. Exact next immediate task

Add a session handover entry.

This is mandatory because the project may move between AI models and accounts.

---

# 24. AI Working Protocol

## Before Coding
1. Read `AI.md`.
2. Read `CONTEXT.md`.
3. Inspect repository.
4. Identify current phase.
5. Understand existing architecture.

## While Coding
- Work sequentially.
- Do not rewrite unrelated code.
- Do not add dependencies without reason.
- Reuse existing patterns.
- Keep implementation simple and scalable.

## Before Ending
1. Verify meaningful work.
2. Update `CONTEXT.md`.
3. Add handover entry.
4. State exact next task.

---

# 25. Final Guiding Questions

For the public website:

> Would this feel memorable and premium to a furniture customer?

For the business platform:

> Does this help showcase products, capture interest, manage enquiries, and close sales?

If the answer is no, reconsider the implementation.
