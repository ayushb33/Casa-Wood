import type { Metadata } from "next";
import { requireAuth } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dashboard | Casa Wood",
  description: "Casa Wood internal management dashboard.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Validates session on every dashboard route render
  await requireAuth();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--muted)" }}>
      {/* Dashboard shell — Navbar + Sidebar will be built in Phase 10 */}
      <header
        className="h-14 border-b flex items-center px-6"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        <span
          className="font-semibold text-sm tracking-wide"
          style={{ color: "var(--muted-foreground)" }}
        >
          Casa Wood — Dashboard
        </span>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
