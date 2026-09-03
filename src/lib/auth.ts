import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  // Email & password authentication only (no public sign-up)
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  // Allow access across multiple devices & origins
  trustedOrigins: [
    "https://casa-wood.vercel.app",
    "http://localhost:3000",
  ],

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh every 24 hours
  },

  // Expose role field on user
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STAFF",
        required: false,
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET || "casa-wood-secret-change-me-in-production-openssl-rand-base64-32",
  baseURL: process.env.BETTER_AUTH_URL || "https://casa-wood.vercel.app",
});

export type Session = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;
