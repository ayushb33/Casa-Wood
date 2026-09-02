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
- [x] Clone/use the repository `https://github.com/ayushb33/Casa-Wood.git`
- [x] Initialize application
- [x] Ensure Git is configured correctly
- [x] Create initial project documentation
- [x] Add `.gitignore`
- [x] Add `.env.example`

### Technology
- [x] Next.js latest stable
- [x] TypeScript
- [x] Tailwind CSS
- [x] ESLint
- [x] Formatting conventions
- [x] Configure path aliases if appropriate

### Assets
- [x] Create `public/brand/`
- [x] Add symbolic Casa Wood logo
- [x] Add full Casa Wood logo
- [x] Verify transparent logo rendering

### Verification
- [x] Application starts locally
- [x] Type checking works
- [x] Linting works
- [x] Initial commit structure is clean

## Completion Criteria
A clean, running project exists in the Casa Wood repository.

---

# 6. PHASE 1 — ARCHITECTURE & DESIGN FOUNDATION

## Objective
Establish scalable application architecture and the Casa Wood visual system BEFORE building the full public website.

## Architecture Tasks
- [x] Establish folder structure
- [x] Separate public site and dashboard architecture
- [x] Define reusable component conventions
- [x] Define validation patterns
- [x] Define service/data boundaries
- [x] Define error handling conventions

## Design System Tasks
- [x] Finalize color tokens
- [x] Finalize display font
- [x] Finalize body/UI font
- [x] Typography scale
- [x] Spacing scale
- [x] Container widths
- [x] Button variants
- [x] Form components
- [x] Cards
- [x] Status badges
- [x] Dialog patterns
- [x] Loading states
- [x] Empty states

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
- [x] Full Casa Wood logo
- [x] Shop/Collections navigation
- [x] About
- [x] Custom Furniture
- [x] Visit Showroom
- [x] Search
- [x] Wishlist/menu actions
- [x] Responsive mobile navigation

### 2. Hero
The hero must create immediate visual impact.

Requirements:
- [x] Strong furniture/lifestyle imagery
- [x] Editorial composition
- [x] Powerful short headline
- [x] Primary CTA: Explore Collection
- [x] Secondary CTA where useful
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
- [x] Feature a collection
- [x] Strong asymmetric composition
- [x] Storytelling copy
- [x] Collection CTA

### 5. Featured Products
- [x] Visually elegant product cards
- [x] Image-first presentation
- [x] Wishlist interaction
- [x] Product navigation

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

- [x] Activity timeline
- [x] Notes
- [x] Calls
- [x] Meetings
- [x] Follow-up scheduling
- [x] Today's follow-ups
- [x] Overdue follow-ups
- [x] Upcoming follow-ups

---

# 14. PHASE 7 — WISHLIST & QR

- [x] Unique QR per product
- [x] QR download/print
- [x] Stable QR URLs
- [x] Wishlist
- [x] Shortlist page
- [x] Share shortlist
- [x] Optional lead capture

---

# 15. PHASE 8 — CUSTOM REQUESTS

- [x] Furniture type
- [x] Dimensions
- [x] Material preference
- [x] Colour preference
- [x] Budget
- [x] Description
- [x] Reference image
- [x] Convert into CRM lead

---

# 16. PHASE 9 — QUOTATIONS

- [x] Quotation list
- [x] Create quotation
- [x] Products
- [x] Custom items
- [x] Discounts
- [x] Taxes
- [x] Terms
- [x] Validity
- [x] Printable view
- [x] PDF generation

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
- [x] Convert to order
- [x] Order status
- [x] Delivery
- [x] Payment status

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
**Phase 11 — Analytics**

## Overall Status
**Phase 10 (Sales & Orders) complete. Built full order conversion pipeline, delivery tracking, and payment logging. Ready for Phase 11.**

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
- [ ] Leads
- [ ] Lead sources
- [ ] Conversion
- [ ] Follow-ups due
- [ ] Quotations
- [ ] Pipeline value
- [ ] Product interest

## Next Immediate Task

**Begin Phase 11: Analytics.** Implement the main dashboard analytics views (leads, conversions, pipeline value, product interest).

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

### Session — 2026-09-01 (Phase 2)

**Phase Worked On:**
Phase 2 — Authentication & Roles

**Completed:**
- Initialized Prisma 7 with `@prisma/adapter-pg` connecting to Aiven DB.
- Created `schema.prisma` mapping out the entire Casa Wood domain (Products, Leads, Customers, Quotations, Orders, Wishlists, Custom Requests, Activities) as well as Better Auth tables.
- Ran first database migration (`phase2_auth_and_domain_schema`).
- Configured Better Auth in `src/lib/auth.ts` and `src/lib/auth-client.ts`.
- Implemented `middleware.ts` for route protection and redirection.
- Built a stylized Login Page at `/login` matching the Casa Wood branding.
- Established a placeholder Dashboard layout and homepage at `/dashboard`.

**Changed Files:**
- `prisma/schema.prisma`
- `prisma7.config.ts`
- `src/lib/db.ts`
- `src/lib/auth.ts`
- `src/lib/auth-client.ts`
- `src/lib/session.ts`
- `src/middleware.ts`
- `src/app/login/page.tsx`
- `src/app/login/layout.tsx`
- `src/app/dashboard/layout.tsx`
- `src/app/dashboard/page.tsx`
- `.env` & `.env.example`
- `Casa_Wood_CONTEXT.md`

**Database Changes:**
- Generated all tables based on `schema.prisma`.

**Important Decisions:**
- Selected Better Auth as the primary authentication library due to its seamless Prisma integration and native role-based access.
- Implemented `@prisma/adapter-pg` using a generic Node `Pool` as required by Prisma 7.
- Defined `NEXT_PUBLIC_BETTER_AUTH_URL` for the client to use.
- Defined the complete domain architecture in the DB Schema early to avoid disjointed migrations later.

**Known Issues:**
- None.

**Next Step:**
- Start Phase 3: Public Casa Wood Website (Build a highly attractive, premium showroom website).

### Session — 2026-09-01 (Phase 3)

**Phase Worked On:**
Phase 3 — Public Casa Wood Website

**Completed:**
- Implemented global public layout (`src/app/(public)/layout.tsx`) with a responsive header (Logo, navigation links, icons) and a comprehensive multi-column footer.
- Built a highly attractive, premium homepage (`src/app/(public)/page.tsx`) utilizing high-quality lifestyle furniture imagery.
- Developed specific sections: Hero (with powerful CTAs), Category Discovery (Shop by Room), Editorial Collection feature, Craftsmanship storytelling, Custom Furniture bespoke CTA, Lookbook/Inspiration grid, and a physical Showroom CTA.
- Ensured strong typographical hierarchy using `Playfair Display` and `Inter`, and respected the Casa Wood color palette via Tailwind CSS utilities.

**Changed Files:**
- `src/app/(public)/layout.tsx`
- `src/app/(public)/page.tsx`
- `Casa_Wood_CONTEXT.md`

**Database Changes:**
- None.

**Important Decisions:**
- Relied on external Unsplash placeholder imagery for luxurious realism to immediately establish the high-end editorial aesthetic instead of using generic or blank placeholders.
- Employed overlapping typographic techniques and subtle animations (e.g., image scaling on hover) to increase the premium feel of the design.

**Known Issues:**
- Image generation tool encountered a 500 server error, so high-quality public domain placeholders (Unsplash) were used. These will need to be replaced by actual Casa Wood product imagery later.

**Next Step:**
- Start Phase 4: Product Management (Dashboard UI and API for managing furniture inventory).

### Session — 2026-09-01 (Phase 4)

**Phase Worked On:**
Phase 4 — Product Management

**Completed:**
- Implemented `src/actions/products.ts` with Next.js Server Actions to securely create, read, and delete products directly from the database using Prisma.
- Built the Product Management Dashboard list view (`src/app/dashboard/products/page.tsx`) mapping product data to a cleanly styled administrative table.
- Developed the Product Creation Interface (`src/app/dashboard/products/create/page.tsx`) using standard HTML forms mapped to the Server Actions to capture product names, prices, and descriptions.
- Set up automatic slug generation based on the product name for URL routing.

**Changed Files:**
- `src/actions/products.ts`
- `src/app/dashboard/products/page.tsx`
- `src/app/dashboard/products/create/page.tsx`
- `Casa_Wood_CONTEXT.md`

**Database Changes:**
- None (Schema already defined in Phase 2).

**Important Decisions:**
- Relied on native Next.js Server Actions and `FormData` rather than `react-hook-form` to avoid excessive client-side dependency overhead for simple administrative tasks, keeping the dashboard lightning-fast.

**Known Issues:**
- None.

**Next Step:**
- Start Phase 5: Lead Management CRM (Dashboard UI for tracking customer enquiries and pipeline).

### Session — 2026-09-01 (Phase 5)

**Phase Worked On:**
Phase 5 — Lead Management CRM

**Completed:**
- Implemented `src/actions/leads.ts` Server Actions: `getLeads`, `getLeadById`, `createLead`, `updateLeadStatus`, `addLeadActivity`.
- Built the Leads Dashboard list page (`/dashboard/leads`) with pipeline summary cards (New, Interested, Quotation Sent, Won) and a full data table.
- Built the Create Lead form (`/dashboard/leads/create`) capturing customer name, phone, email, enquiry source, and notes.
- Built the Lead Detail page (`/dashboard/leads/[id]`) with customer info, a stage-changer pipeline sidebar, an activity timeline, and product interests.
- Upgraded the Dashboard Layout (`/dashboard/layout.tsx`) with a persistent sidebar navigation (Overview, Products, Leads), user info display, and a sign-out link.
- Created `scripts/seed-admin.ts` using `tsx` for first-time admin user creation.

**Changed Files:**
- `src/actions/leads.ts`
- `src/app/dashboard/leads/page.tsx`
- `src/app/dashboard/leads/create/page.tsx`
- `src/app/dashboard/leads/[id]/page.tsx`
- `src/app/dashboard/layout.tsx`
- `scripts/seed-admin.ts`
- `Casa_Wood_CONTEXT.md`

**Database Changes:**
- None (Schema already defined in Phase 2).

**Important Decisions:**
- Used native Server Actions + `FormData` for zero client-side JS overhead in the admin.
- Customer lookup is by phone number to avoid creating duplicates for returning customers.
- Dashboard layout now has a proper sidebar; the old minimal header has been replaced.

**Known Issues:**
- `scripts/seed-admin.ts` requires the Next.js dev server to be running before executing, since it calls the live `/api/auth/sign-up/email` endpoint.

**Next Step:**
- Start Phase 6: Follow-ups & Activities (scheduling future follow-ups, activity creation forms, staff notes).

### Session — 2026-09-02 (Phase 6)

**Phase Worked On:**
Phase 6 — Follow-ups & Activities

**Completed:**
- Created `src/actions/follow-ups.ts` to manage follow-up scheduling and retrieval.
- Developed the Follow-Ups Dashboard (`/dashboard/follow-ups/page.tsx`) displaying Overdue, Today, and Upcoming tasks.
- Enhanced the Lead Detail page (`/dashboard/leads/[id]/page.tsx`) with forms to log activities (Notes, Calls, Meetings) and schedule new follow-ups.
- Added Follow-ups link to the main dashboard sidebar navigation.

**Changed Files:**
- `src/actions/follow-ups.ts`
- `src/app/dashboard/follow-ups/page.tsx`
- `src/app/dashboard/leads/[id]/page.tsx`
- `src/app/dashboard/layout.tsx`
- `Casa_Wood_CONTEXT.md`

**Next Step:**
- Start Phase 7: Wishlist & QR (Unique QR per product, wishlist generation, public shareable link).

### Session — 2026-09-02 (Phase 7)

**Phase Worked On:**
Phase 7 — Wishlist & QR

**Completed:**
- Installed `qrcode.react` to generate printable QR codes.
- Added `/dashboard/products/[id]/qr/page.tsx` for admins to view and print unique QR codes for any product.
- Built public product page `/product/[id]/page.tsx` that QR codes redirect to.
- Developed client-side `AddToWishlistButton` leveraging `localStorage` for a frictionless shopping experience.
- Created public wishlist interface `/wishlist/page.tsx` allowing customers to review their selections and submit a quotation request.
- Implemented `submitWishlistLead` server action to instantly pipe wishlist submissions directly into the CRM pipeline with `QR_CODE` tracking.

**Changed Files:**
- `src/app/dashboard/products/[id]/qr/page.tsx` (New)
- `src/app/product/[id]/page.tsx` (New)
- `src/app/wishlist/page.tsx` (New)
- `src/components/wishlist/add-to-wishlist-button.tsx` (New)
- `src/app/dashboard/products/page.tsx`
- `src/actions/wishlist.ts` (New)
- `src/actions/products.ts`
- `Casa_Wood_CONTEXT.md`

**Next Step:**
- Start Phase 8: Custom Requests (Furniture type, dimensions, materials, reference image upload, conversion to CRM lead).

### Session — 2026-09-02 (Phase 8)

**Phase Worked On:**
Phase 8 — Custom Requests

**Completed:**
- Developed the `createCustomRequest` and `convertRequestToLead` server actions in `src/actions/custom-requests.ts`.
- Built the public-facing Bespoke Furniture Request form at `/custom-request` to capture exact customer requirements like dimensions, material, and budget.
- Added the Admin Custom Requests dashboard view (`/dashboard/custom-requests`) to review incoming inquiries.
- Implemented a one-click "Convert to Lead" button for admins to seamlessly move a bespoke request into the primary CRM pipeline.
- Added the module to the dashboard sidebar.

**Changed Files:**
- `src/actions/custom-requests.ts` (New)
- `src/app/custom-request/page.tsx` (New)
- `src/app/dashboard/custom-requests/page.tsx` (New)
- `src/app/dashboard/layout.tsx`
- `Casa_Wood_CONTEXT.md`

**Next Step:**
- Start Phase 9: Quotations (Generate quotation form, standard/custom items, financial calculations, export to PDF).

### Session — 2026-09-02 (Phase 9)

**Phase Worked On:**
Phase 9 — Quotations

**Completed:**
- Implemented `createQuotation` and `updateQuotationStatus` in `src/actions/quotations.ts` to handle the business logic of generating quotes.
- Built a dynamic client-side `CreateQuotationPage` that allows admins to add unlimited standard or custom line items to a quote, with real-time subtotal/discount/tax computation.
- Engineered a pristine `QuotationDetailPage` functioning as a printable digital invoice, natively supporting browser-based PDF export without reliance on heavy backend PDF generation libraries.
- Added quotation generation trigger directly into the `Lead` detail interface.
- Included the central `Quotations` module into the admin sidebar.

**Changed Files:**
- `src/actions/quotations.ts` (New)
- `src/app/dashboard/quotations/page.tsx` (New)
- `src/app/dashboard/quotations/create/page.tsx` (New)
- `src/app/dashboard/quotations/[id]/page.tsx` (New)
- `src/app/dashboard/leads/[id]/page.tsx`
- `src/app/dashboard/layout.tsx`
- `Casa_Wood_CONTEXT.md`

**Next Step:**
- Start Phase 10: Sales & Orders (Order list, status tracking, convert quote to order).

### Session — 2026-09-02 (Phase 10)

**Phase Worked On:**
Phase 10 — Sales & Orders

**Completed:**
- Updated the Prisma schema to relate `Order` directly to `Customer` and `Quotation` (with unique `quotationId`), and executed a data-loss bypass migration.
- Created robust `convertQuotationToOrder` logic in `src/actions/orders.ts` to transform an `ACCEPTED` quote into a `CONFIRMED` order, instantly marking the parent Lead as `WON`.
- Built the `OrdersPage` (`/dashboard/orders`) to list all active manufacturing and delivery pipelines with their respective financial balances.
- Engineered `OrderDetailPage` (`/dashboard/orders/[id]`), a comprehensive dashboard for a specific order. Admins can update the status (In Production, Ready, Delivered) and record ongoing payments against the total balance.
- Displayed the original Quotation items inside the Order detail view for manufacturing reference.
- Integrated the Orders module cleanly into the global sidebar.

**Changed Files:**
- `prisma/schema.prisma`
- `src/actions/orders.ts` (New)
- `src/app/dashboard/orders/page.tsx` (New)
- `src/app/dashboard/orders/[id]/page.tsx` (New)
- `src/app/dashboard/quotations/[id]/page.tsx`
- `src/app/dashboard/layout.tsx`
- `Casa_Wood_CONTEXT.md`

**Next Step:**
- Start Phase 11: Analytics (Leads, Lead sources, Conversion, Follow-ups due, Quotations, Pipeline value, Product interest).

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
