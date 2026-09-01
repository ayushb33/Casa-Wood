/**
 * Seed script — creates the initial ADMIN user for Casa Wood dashboard.
 * Run with: npx tsx scripts/seed-admin.ts
 *
 * You only need to run this ONCE. After that, log in at /login.
 */

import "dotenv/config";

const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

// ── Edit these before running ──────────────────────────────────────────────
const ADMIN_EMAIL = "admin@casawood.in";
const ADMIN_PASSWORD = "CasaWood@2026";
const ADMIN_NAME = "Casa Wood Admin";
// ──────────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌱 Seeding admin user via Better Auth at ${BETTER_AUTH_URL}...\n`);

  const res = await fetch(`${BETTER_AUTH_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 422 || (data as { code?: string }).code === "USER_ALREADY_EXISTS") {
      console.log("⚠️  User already exists — skipping creation.\n");
    } else {
      console.error("❌  Failed to create user:", JSON.stringify(data, null, 2));
      process.exit(1);
    }
  } else {
    console.log("✅  Admin user created successfully!\n");
  }

  console.log("─────────────────────────────────────────");
  console.log(`  URL:      http://localhost:3000/login`);
  console.log(`  Email:    ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log("─────────────────────────────────────────");
  console.log("\n  After login, navigate to /dashboard\n");
}

main().catch((err) => {
  console.error("Seed script failed:", err);
  process.exit(1);
});
