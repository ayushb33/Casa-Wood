import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Get the current session on the server.
 * Returns null if not authenticated.
 */
export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Require authentication for a server component or action.
 * Redirects to /login if not authenticated.
 */
export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

/**
 * Require ADMIN role.
 * Redirects to /dashboard if authenticated but not admin.
 */
export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return session;
}
