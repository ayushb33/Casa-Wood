import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
};

const rawUrl = (process.env.DATABASE_URL ?? "").replace(/[?&]sslmode=[^&]*/g, "");

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: rawUrl,
    ssl: { rejectUnauthorized: false },
    max: 1, // Max 1 connection per serverless lambdas to stay under Aiven free tier limits
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 10000,
  });

globalForDb.pool = pool;

const adapter = new PrismaPg(pool);

export const db =
  globalForDb.prisma ??
  new PrismaClient({
    adapter,
    log: ["error"],
  });

globalForDb.prisma = db;
