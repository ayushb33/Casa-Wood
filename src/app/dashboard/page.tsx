import { getServerSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div className="space-y-4">
      <h1
        className="text-3xl font-semibold"
        style={{ fontFamily: "var(--font-playfair)", color: "var(--foreground)" }}
      >
        Dashboard
      </h1>
      <p style={{ color: "var(--muted-foreground)" }}>
        Welcome back,{" "}
        <span style={{ color: "var(--foreground)", fontWeight: 500 }}>
          {session?.user?.name ?? "User"}
        </span>
        .
      </p>
      <div
        className="rounded-lg border p-6 text-sm"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
          color: "var(--muted-foreground)",
        }}
      >
        🚧 The dashboard is being built. Product management, lead CRM, and
        analytics will appear here in upcoming phases.
      </div>
    </div>
  );
}
