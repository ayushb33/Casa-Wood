import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Strip ?sslmode=… from the URL — newer versions of pg treat sslmode=require
// as verify-full, which rejects Aiven's self-signed CA. We pass ssl explicitly.
const rawUrl = (process.env.DATABASE_URL ?? "").replace(/[?&]sslmode=[^&]*/g, "");

const pool = new Pool({ connectionString: rawUrl, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
