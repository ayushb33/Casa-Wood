# Casa Wood CRM & Storefront - Project Handover

## Project Overview
Casa Wood is a comprehensive, full-stack Next.js application that serves as both a public-facing catalogue for luxury bespoke furniture and a powerful internal Customer Relationship Management (CRM) system for the sales team.

The application allows customers to browse products, add them to a wishlist, and submit custom bespoke furniture requests. On the backend, the sales team can track these leads, schedule follow-ups, generate and export PDF quotations, convert quotes into manufacturing orders, and track order fulfillment and payment balances.

## Technology Stack
- **Framework:** Next.js 16 (App Router)
- **Database ORM:** Prisma ORM 7
- **Database Provider:** PostgreSQL (Hosted on Aiven)
- **Authentication:** Better Auth (with Role-Based Access Control)
- **Image Storage:** Cloudinary (via `next-cloudinary` + `cloudinary` SDK)
- **UI Components:** shadcn/ui & Tailwind CSS
- **Icons:** lucide-react
- **Form Handling:** Next.js Server Actions (No external API routes for data mutation)

## Core Modules & Features

### 1. Public Storefront
- **Product Catalogue:** Dynamic fetching of active products directly from the database, displayed with real Cloudinary images.
- **Product Images:** Admins upload product images via the Cloudinary widget in the dashboard (`/dashboard/products/create` and `/dashboard/products/[id]`). The first image is automatically set as the primary display image.
- **Wishlist System:** Client-side local storage cart that converts into a qualified CRM lead when submitted.
- **Custom Requests:** A dedicated form for users to request bespoke furniture, which feeds directly into the admin pipeline.

### 2. CRM & Lead Management (`/dashboard/leads`)
- **Lead Pipeline:** Tracks leads through various stages (NEW, CONTACTED, INTERESTED, SHOWROOM_VISIT, QUOTATION_SENT, WON, LOST).
- **Activity Timeline:** Automatically logs every interaction (e.g., "Quotation Sent", "Converted to Order").
- **Follow-ups Engine:** Schedule calls and meetings. Integrates into a daily dashboard (`/dashboard/follow-ups`) alerting staff of overdue and today's tasks.

### 3. Sales & Financials (`/dashboard/quotations`, `/dashboard/orders`)
- **Dynamic Quotation Builder:** Allows staff to draft quotes with custom line items, dynamic subtotaling, discounts, and tax calculations.
- **PDF Generation:** Native CSS print-media queries transform the web view into a professional, export-ready A4 PDF invoice.
- **Order Conversion & Fulfillment:** One-click conversion of an ACCEPTED quotation into an active Order.
- **Payment Tracking:** Log partial payments against order balances and track manufacturing states (`CONFIRMED` -> `IN_PRODUCTION` -> `READY` -> `DELIVERED`).

### 4. Real-Time Notifications
- **Global Broadcasts:** Internal notification system alerts the entire staff when a new wishlist or custom request is submitted.
- **Unread Badges:** Live notification bell in the sidebar.

### 5. Analytics Dashboard
- High-level KPIs tracking Total Leads, Conversion Rates, Revenue Pipeline, Collected Balances, and Lead Source breakdowns.

## Local Development Setup

1. **Clone & Install:**
   ```bash
   git clone <repo_url>
   cd Furniture
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file based on `.env.example`. You will need:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `BETTER_AUTH_SECRET` (Generate using `openssl rand -base64 32`)
   - `BETTER_AUTH_URL` (e.g., `http://localhost:3000`)
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (from your Cloudinary dashboard)
   - `CLOUDINARY_API_KEY` (from your Cloudinary dashboard)
   - `CLOUDINARY_API_SECRET` (from your Cloudinary dashboard)

3. **Database Sync:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Initial Admin Setup:**
   Since the application requires an admin account, you can seed one by temporarily modifying a server action or accessing the database directly via Prisma Studio (`npx prisma studio`).

## Deployment Guidelines
The application is production-ready.
1. **Platform:** Recommended to deploy on Vercel or Netlify.
2. **Build Command:** `npm run build`
3. **Environment Variables:** Ensure all `.env` variables are securely added to your host's environment settings.
4. **Security:** The app includes strict Next.js security headers (X-Frame-Options, Permissions-Policy, etc.) in `next.config.ts`.
5. **Database:** Ensure your production Aiven PostgreSQL instance allows connections from your hosting provider's IP range.

## Maintenance Notes
- **Prisma V7:** This project uses Prisma V7. Be aware of the breaking changes if upgrading or modifying the database adapter. Check the local `skills/prisma-upgrade-v7` markdown if needed.
- **Server Actions:** Data mutations heavily rely on Next.js Server Actions (`src/actions/*`). Avoid creating standard REST API endpoints in `src/app/api` unless strictly necessary (e.g., webhooks).
- **Styling:** Stick to the established Tailwind + shadcn/ui pattern. The `globals.css` file contains essential CSS variables for the color palette.
- **Cloudinary Upload Preset:** The product image uploader uses an **unsigned** Cloudinary upload preset named `casawood_products`. This must be created in the Cloudinary dashboard under **Settings → Upload → Upload Presets**. Set it to "Unsigned", and optionally restrict the upload folder to `casawood/products`.

---
*End of Handover Document.*
