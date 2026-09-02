/**
 * Seed script — creates the initial ADMIN user for Casa Wood dashboard.
 * Run with: npx tsx scripts/seed-admin.ts
 *
 * This writes directly to the database — no running server required.
 * You only need to run this ONCE.
 */

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
// Use the same password hasher that Better Auth uses internally
import { hashPassword } from "@better-auth/utils/password";

// ── Edit these before running ──────────────────────────────────────────────
const ADMIN_EMAIL = "admin@casawood.in";
const ADMIN_PASSWORD = "CasaWood@2026";
const ADMIN_NAME = "Casa Wood Admin";
// ──────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🌱 Seeding admin user directly into the database...\n");

  // Strip ?sslmode=require from the URL so we can pass ssl config ourselves.
  // The pg library in newer versions treats sslmode=require as verify-full,
  // which rejects Aiven's self-signed CA. Passing ssl:{rejectUnauthorized:false}
  // explicitly overrides that.
  const rawUrl = (process.env.DATABASE_URL ?? "").replace(/[?&]sslmode=[^&]*/g, "");
  const pool = new Pool({
    connectionString: rawUrl,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  const db = new PrismaClient({ adapter });

  try {
    // Check if user already exists
    const existing = await db.user.findUnique({ where: { email: ADMIN_EMAIL } });
    if (existing) {
      console.log("⚠️  User already exists — skipping creation.\n");
      // Delete any stale accounts for this user (e.g. from a previous failed seed)
      await db.account.deleteMany({ where: { userId: existing?.id ?? "" } });
      // Delete the stale user too so we recreate cleanly
      await db.user.delete({ where: { id: existing.id } });
      console.log("🗑️  Removed stale user+account, recreating...\n");
    }

    // Hash password with scrypt (same as Better Auth does internally)
    const hashed = await hashPassword(ADMIN_PASSWORD);

    // Create the user row
    const user = await db.user.create({
      data: {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        emailVerified: true,
        role: "ADMIN",
      },
    });

    // Create the credential account row
    // Better Auth v1.7+ checks: providerId="credential", issuer="local:credential", accountId=user.id
    await db.account.create({
      data: {
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        issuer: "local:credential",   // ← required by Better Auth v1.7+
        password: hashed,
      },
    });

    console.log("✅  Admin user created successfully!\n");
  } finally {
    await db.$disconnect();
    await pool.end();
  }

  console.log("─────────────────────────────────────────");
  console.log("  URL:      http://localhost:3000/login");
  console.log(`  Email:    ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log("─────────────────────────────────────────");
  console.log("\n  After login, navigate to /dashboard\n");
}

main().catch((err) => {
  console.error("Seed script failed:", err);
  process.exit(1);
});
