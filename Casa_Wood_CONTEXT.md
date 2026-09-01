# CONTEXT.md

# Casa Wood — Persistent Project Context

> This file is the persistent memory and handover document for this project.
> Every AI agent must read `AI.md` and `CONTEXT.md` before working.
> Work strictly phase-by-phase and update this file after every meaningful session.

---

## Repository

**GitHub Repository:** `https://github.com/ayushb33/Casa-Wood.git`

### Repository Status at Project Start
The repository is currently empty and will be the canonical repository for the entire project.

### Important Rule
All project code, documentation, assets, migrations, and configuration should be developed inside this repository.

---

# 1. Project Identity

## Showcase Brand
**Casa Wood**

Casa Wood is a premium furniture brand created as the showcase implementation of a larger **Furniture Business Digitalization Platform**.

The public website must be visually impressive enough to demonstrate to real furniture retailers and showroom owners what their digital presence could look like.

## Final Logo Assets

Two finalized logo assets exist:

- `CASA WOOD.png` — symbolic/compact logo
- `CASA WOOD-full.png` — full Casa Wood logo

### Required Asset Placement

When initializing the repository, place assets as:

```text
public/
└── brand/
    ├── casa-wood-symbol.png
    └── casa-wood-logo.png
```

Use:
- Full logo → Header, authentication, footer, major branding
- Symbol → Favicon, compact navigation, app icon, loading mark

Do not distort, redraw, or artificially add backgrounds to the logos.

---

# 2. Product Vision

Build a modern digital system for:

- Furniture retailers
- Furniture showrooms
- Furniture manufacturers
- Custom furniture businesses

This is **not merely a furniture website**.

The core business flow is:

```text
Customer discovers Casa Wood
        ↓
Browses furniture collection
        ↓
Shows interest in a product
        ↓
Enquiry is captured
        ↓
Lead enters CRM
        ↓
Salesperson follows up
        ↓
Quotation is generated
        ↓
Order is confirmed
```

## Core Value Proposition

> Turn showroom visitors and online enquiries into trackable customers.

---

# 3. Major Modules

## Public Digital Showroom
- Premium homepage
- Collections
- Categories
- Product catalogue
- Search and filtering
- Product pages
- Wishlist
- WhatsApp enquiry
- Request quotation
- Custom furniture
- Showroom information

## Product Management
- Products
- Categories
- Images
- Specifications
- Featured products

## Lead CRM
- Customer enquiries
- Lead source
- Product interest
- Assignment
- Sales pipeline
- Notes
- Activities
- Follow-ups

## QR Showroom Experience
- Product-specific QR codes
- Scan to product page
- Wishlist/shortlist

## Custom Requests
- Dimensions
- Materials
- Finishes
- Budget
- Reference images

## Quotations
- Product line items
- Custom items
- Discounts
- Tax
- PDF

## Orders
- Confirmation
- Production status
- Delivery
- Payment

---

# 4. Sequential Development Phases

The AI MUST complete phases in sequence unless a dependency requires otherwise.

## Phase 0 — Repository & Project Setup
## Phase 1 — Architecture & Design System
## Phase 2 — Authentication & Roles
## Phase 3 — Public Casa Wood Website
## Phase 4 — Product Management
## Phase 5 — Lead Management CRM
## Phase 6 — Follow-ups & Activities
## Phase 7 — Wishlist & QR Experience
## Phase 8 — Custom Furniture Requests
## Phase 9 — Quotation Management
## Phase 10 — Dashboard & Analytics
## Phase 11 — Order Management
## Phase 12 — Notifications & Automation
## Phase 13 — Testing & Production Readiness

---

# 5. PHASE 0 — REPOSITORY & PROJECT SETUP

## Objective
Initialize the empty Casa Wood GitHub repository as a production-quality modern web application.

## Tasks

### Repository
- [ ] Clone/use the repository `https://github.com/ayushb33/Casa-Wood.git`
- [ ] Initialize application
- [ ] Ensure Git is configured correctly
- [ ] Create initial project documentation
- [ ] Add `.gitignore`
- [ ] Add `.env.example`

### Technology
- [ ] Next.js latest stable
- [ ] TypeScript
- [ ] Tailwind CSS
- [ ] ESLint
- [ ] Formatting conventions
- [ ] Configure path aliases if appropriate

### Assets
- [ ] Create `public/brand/`
- [ ] Add symbolic Casa Wood logo
- [ ] Add full Casa Wood logo
- [ ] Verify transparent logo rendering

### Verification
- [ ] Application starts locally
- [ ] Type checking works
- [ ] Linting works
- [ ] Initial commit structure is clean

## Completion Criteria
A clean, running project exists in the Casa Wood repository.

---

# 6. PHASE 1 — ARCHITECTURE & DESIGN FOUNDATION

## Objective
Establish scalable application architecture and the Casa Wood visual system BEFORE building the full public website.

## Architecture Tasks
- [ ] Establish folder structure
- [ ] Separate public site and dashboard architecture
- [ ] Define reusable component conventions
- [ ] Define validation patterns
- [ ] Define service/data boundaries
- [ ] Define error handling conventions

## Design System Tasks
- [ ] Finalize color tokens
- [ ] Finalize display font
- [ ] Finalize body/UI font
- [ ] Typography scale
- [ ] Spacing scale
- [ ] Container widths
- [ ] Button variants
- [ ] Form components
- [ ] Cards
- [ ] Status badges
- [ ] Dialog patterns
- [ ] Loading states
- [ ] Empty states

---

# 7. CASA WOOD VISUAL DIRECTION

## Overall Feel

The public website must feel:

- Premium
- Contemporary
- Warm
- Editorial
- Architectural
- Aspirational
- Natural
- Distinctive

The desired impression is closer to a premium furniture lookbook or interior design publication than a generic e-commerce template.

## Strictly Avoid

- Generic SaaS aesthetics
- Purple/blue AI gradients
- Bootstrap-looking sections
- Excessive glassmorphism
- Repeated identical card grids
- Cartoonish illustrations
- Excessive border radius
- Too many colors
- Excessive animations
- Generic "Heading + paragraph + 3 cards" layouts everywhere

---

## Color Direction

Use natural, furniture-inspired colors.

Suggested direction:

- **Warm Ivory/Bone** → primary background
- **Deep Walnut/Espresso** → primary dark
- **Sand/Taupe/Stone** → neutral surfaces
- **Muted Olive/Forest** → natural accent
- **Muted Gold or Terracotta** → very restrained highlight

The AI should finalize exact HEX values as centralized design tokens.

The palette must remain calm and sophisticated.

---

## Typography Direction

Use an expressive pairing:

### Display Font
Elegant editorial serif for:
- Hero headlines
- Collection names
- Large storytelling statements

Possible candidates:
- Cormorant Garamond
- DM Serif Display
- Playfair Display

### Body/UI Font
Modern sans-serif for:
- Navigation
- Product data
- Forms
- Buttons
- Dashboard

Possible candidates:
- Manrope
- DM Sans
- Plus Jakarta Sans
- Inter

The serif should not be used everywhere.

---

# 8. PHASE 3 — PUBLIC CASA WOOD WEBSITE

> HIGH PRIORITY: This is the key visual showcase of the entire project.

## Objective

Create a highly attractive, modern, visually memorable furniture website.

The website should make a real furniture business owner think:

> "I want my furniture business website to look like this."

---

## Homepage

### 1. Header
- [ ] Full Casa Wood logo
- [ ] Shop/Collections navigation
- [ ] About
- [ ] Custom Furniture
- [ ] Visit Showroom
- [ ] Search
- [ ] Wishlist/menu actions
- [ ] Responsive mobile navigation

### 2. Hero
The hero must create immediate visual impact.

Requirements:
- [ ] Strong furniture/lifestyle imagery
- [ ] Editorial composition
- [ ] Powerful short headline
- [ ] Primary CTA: Explore Collection
- [ ] Secondary CTA where useful
- [ ] Avoid generic centered landing-page composition

Possible approaches:
- Full-bleed image
- Asymmetric split layout
- Overlapping typography
- Architectural composition

### 3. Category Discovery
Examples:
- Living Room
- Bedroom
- Dining
- Office
- Storage
- Accent

Use compelling imagery, not a generic icon grid.

### 4. Editorial Collection
- [ ] Feature a collection
- [ ] Strong asymmetric composition
- [ ] Storytelling copy
- [ ] Collection CTA

### 5. Featured Products
- [ ] Visually elegant product cards
- [ ] Image-first presentation
- [ ] Wishlist interaction
- [ ] Product navigation

### 6. Craftsmanship
Tell a visual story around:
- Materials
- Wood
- Craftsmanship
- Design philosophy

### 7. Custom Furniture
Strong emotional CTA.

Suggested conceptual direction:

> Made for your space.

### 8. Inspiration / Lookbook
Create a visually rich editorial section.
Do NOT simply add another ordinary product grid.

### 9. Showroom CTA
Encourage customers to visit the physical showroom.

### 10. Footer
Premium, spacious, useful and visually aligned with the brand.

---

# 9. Other Public Pages

## Collections / Shop
- [ ] Product grid
- [ ] Search
- [ ] Category filtering
- [ ] Material/style filters
- [ ] Sorting
- [ ] Loading states
- [ ] Empty states

## Product Page
- [ ] Immersive gallery
- [ ] Product title
- [ ] SKU/model
- [ ] Description
- [ ] Material
- [ ] Dimensions
- [ ] Colour/finish options
- [ ] Customization availability
- [ ] Add to wishlist
- [ ] WhatsApp enquiry
- [ ] Request quotation
- [ ] Similar products

## About
- [ ] Brand story
- [ ] Philosophy
- [ ] Materials
- [ ] Craftsmanship
- [ ] Editorial visuals

## Custom Furniture
- [ ] Inspiring introduction
- [ ] How it works
- [ ] Custom request form
- [ ] Reference image upload

## Visit Showroom / Contact
- [ ] Location/map
- [ ] Hours
- [ ] Contact
- [ ] Appointment CTA

---

# 10. Image & Motion Guidelines

## Images
Furniture is highly visual.

Use:
- Large imagery
- Editorial crops
- Mixed portrait/landscape ratios
- Detail shots
- Full-width visuals
- Occasional collages

Avoid repetitive identical image card layouts.

## Motion
Motion must feel premium and subtle:
- Gentle image reveals
- Soft fades
- Small hover transformations
- Smooth transitions

Avoid:
- Bouncy effects
- Excessive parallax
- Constant animation
- Distracting motion

---

# 11. PHASE 4 — PRODUCT MANAGEMENT

- [ ] Product list
- [ ] Create product
- [ ] Edit product
- [ ] Archive/delete strategy
- [ ] Image upload
- [ ] Category management
- [ ] Search/filter
- [ ] Product status
- [ ] Featured products

Suggested fields:
- Name
- Slug
- SKU
- Description
- Short description
- Category
- Price / price on request
- Material
- Dimensions
- Colours/finishes
- Images
- Tags
- Featured
- Customizable
- Status

---

# 12. PHASE 5 — LEAD CRM

- [ ] Lead list
- [ ] Lead details
- [ ] Create lead
- [ ] Lead source
- [ ] Product interests
- [ ] Assign salesperson
- [ ] Update status
- [ ] Search/filter
- [ ] Pipeline/Kanban

Pipeline:

New → Contacted → Interested → Showroom Visit → Quotation Sent → Negotiation → Won

Alternative terminal state: Lost

---

# 13. PHASE 6 — FOLLOW-UPS

- [ ] Activity timeline
- [ ] Notes
- [ ] Calls
- [ ] Meetings
- [ ] Follow-up scheduling
- [ ] Today's follow-ups
- [ ] Overdue follow-ups
- [ ] Upcoming follow-ups

---

# 14. PHASE 7 — WISHLIST & QR

- [ ] Unique QR per product
- [ ] QR download/print
- [ ] Stable QR URLs
- [ ] Wishlist
- [ ] Shortlist page
- [ ] Share shortlist
- [ ] Optional lead capture

---

# 15. PHASE 8 — CUSTOM REQUESTS

- [ ] Furniture type
- [ ] Dimensions
- [ ] Material preference
- [ ] Colour preference
- [ ] Budget
- [ ] Description
- [ ] Reference image
- [ ] Convert into CRM lead

---

# 16. PHASE 9 — QUOTATIONS

- [ ] Quotation list
- [ ] Create quotation
- [ ] Products
- [ ] Custom items
- [ ] Discounts
- [ ] Taxes
- [ ] Terms
- [ ] Validity
- [ ] Printable view
- [ ] PDF generation

---

# 17. PHASE 10–13

## Analytics
- [ ] Leads
- [ ] Lead sources
- [ ] Conversion
- [ ] Follow-ups due
- [ ] Quotations
- [ ] Pipeline value
- [ ] Product interest

## Orders
- [ ] Convert to order
- [ ] Order status
- [ ] Delivery
- [ ] Payment status

## Notifications
- [ ] Internal notifications
- [ ] Email
- [ ] WhatsApp strategy
- [ ] Customer updates

## Production Readiness
- [ ] Type checks
- [ ] Linting
- [ ] Responsive testing
- [ ] Accessibility
- [ ] Security
- [ ] Performance
- [ ] Deployment

---

# 18. MVP PRIORITIES

## Priority 1
- [ ] Exceptional public Casa Wood website
- [ ] Product catalogue
- [ ] Product pages
- [ ] WhatsApp enquiry
- [ ] Product management
- [ ] Lead CRM
- [ ] Lead statuses
- [ ] Follow-ups

## Priority 2
- [ ] Wishlist
- [ ] QR
- [ ] Custom requests
- [ ] Quotations

## Priority 3
- [ ] Orders
- [ ] Advanced analytics
- [ ] WhatsApp automation
- [ ] Production tracking
- [ ] Inventory

---

# 19. Current Project Status

## Current Phase
**Phase 2 — Authentication & Roles**

## Overall Status
**Phase 1 (Architecture & Design Foundation) complete. Folder structure, design tokens, typography, and base shadcn/ui components established. Ready for Phase 2 (Authentication).**

## Last Updated
**2026-09-01**

## Completed
- [x] Furniture platform concept defined
- [x] Product modules defined
- [x] Sequential phases defined
- [x] MVP priorities defined
- [x] Casa Wood brand selected
- [x] Symbolic logo created
- [x] Full logo created
- [x] Public website design direction defined
- [x] GitHub repository selected
- [x] Clone/initialize the Casa Wood repository
- [x] Add logo assets
- [x] Create application foundation (Folder structure)
- [x] Finalize design tokens (Colors, Typography mapping)
- [x] Initialize shadcn/ui and add base components

## In Progress
- [ ] Setup Authentication (Better Auth / Auth.js / Clerk)
- [ ] Define User and Roles schema
- [ ] Setup database connection with Prisma (using Aiven DB)

## Next Immediate Task

**Begin Phase 2: Setup database schema (Prisma) and configure Authentication for dashboard access.**

---

# 20. Session Handover Log

After every meaningful work session append:

```markdown
### Session — YYYY-MM-DD

**Phase Worked On:**
Phase X — Name

**Completed:**
- ...

**Changed Files:**
- ...

**Database Changes:**
- ...

**Important Decisions:**
- ...

**Known Issues:**
- ...

**Next Step:**
- Exact next task
```

## Initial Planning — 2026-09-01

**Completed:**
- Platform concept and modules defined.
- Casa Wood brand selected.
- Two logo assets finalized.
- Premium public website direction documented.
- Canonical GitHub repository selected.

**Repository:**
`https://github.com/ayushb33/Casa-Wood.git`

**Next Step:**
Initialize the empty repository and establish the Casa Wood design system.

### Session — 2026-09-01

**Phase Worked On:**
Phase 0 — Repository & Project Setup

**Completed:**
- Initialized local directory as git repository connected to ayushb33/Casa-Wood.
- Created Next.js boilerplate using create-next-app with TypeScript, Tailwind, and App Router.
- Added Casa Wood logo assets to `public/brand`.
- Configured `.env` and `.env.example` with the Aiven database URL.

**Changed Files:**
- Added standard Next.js files (package.json, tsconfig.json, etc.).
- Created `.env` and `.env.example`.
- Moved logo files into `public/brand/`.
- Updated `Casa_Wood_CONTEXT.md`.

**Database Changes:**
- Aiven PostgreSQL DB URL added to environment files.

**Important Decisions:**
- Configured current directory directly as the root of the Casa Wood Git repository (no nested directories).

**Known Issues:**
- None.

**Next Step:**
- Start Phase 1: Architecture & Design Foundation (define color tokens, typography, reusable components).

### Session — 2026-09-01 (Phase 1)

**Phase Worked On:**
Phase 1 — Architecture & Design Foundation

**Completed:**
- Created initial folder structure (`src/features`, `src/components`, `src/lib`, etc.).
- Initialized shadcn/ui and installed base components (`button`, `card`, `dialog`, `input`, `badge`, `form`, `label`).
- Defined exact hex values for Casa Wood design tokens in `globals.css` (Warm Ivory, Deep Walnut, Sand, Muted Olive, Muted Gold).
- Configured Inter (body) and Playfair Display (heading) typography in `layout.tsx` and `globals.css`.

**Changed Files:**
- `src/app/layout.tsx`
- `src/app/globals.css`
- `components.json` (created by shadcn)
- `src/components/ui/*` (base components added)
- `Casa_Wood_CONTEXT.md`

**Database Changes:**
- None.

**Important Decisions:**
- Selected `Inter` for functional typography and `Playfair Display` for editorial headings.
- Configured Tailwind CSS v4 variables with standard Hex codes instead of raw OKLCH for easier maintainability while keeping Shadcn compatibility.

**Known Issues:**
- None.

**Next Step:**
- Start Phase 2: Set up database connection using Prisma and configure Authentication system.

---

# 21. Mandatory AI Continuation Protocol

When another AI/account takes over:

1. Read `AI.md`.
2. Read this entire `CONTEXT.md`.
3. Inspect the repository and existing code.
4. Check Current Project Status.
5. Continue from the next incomplete task.
6. Do not rebuild completed work.
7. Test meaningful changes.
8. Update this file before ending.

This file is the project's persistent memory.
