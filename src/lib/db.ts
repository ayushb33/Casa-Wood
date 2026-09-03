import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
};

const rawUrl = (process.env.DATABASE_URL ?? "").replace(/[?&]sslmode=[^&]*/g, "");

const pool = globalForDb.pool ?? new Pool({
  connectionString: rawUrl,
  ssl: { rejectUnauthorized: false },
  max: 10, // Limit connections per serverless container
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

const adapter = new PrismaPg(pool);

export const db =
  globalForDb.prisma ??
  new PrismaClient({
    adapter,
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForDb.prisma = db;
