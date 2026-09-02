import type { Metadata } from "next";
import { requireAuth } from "@/lib/session";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Package, Users, LogOut, CalendarClock, PenTool, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | Casa Wood",
  description: "Casa Wood internal management dashboard.",
};

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/follow-ups", label: "Follow-ups", icon: CalendarClock },
  { href: "/dashboard/custom-requests", label: "Custom Requests", icon: PenTool },
  { href: "/dashboard/quotations", label: "Quotations", icon: FileText },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAuth();

  return (
    <div className="flex h-screen bg-muted/20 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r bg-background">
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/brand/casa-wood-logo.png"
              alt="Casa Wood"
              width={110}
              height={32}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t p-4 space-y-2">
          <div className="px-3 py-1">
            <p className="text-xs font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <Link
            href="/api/auth/sign-out"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Mobile top bar */}
        <header className="md:hidden h-14 border-b bg-background flex items-center px-4 gap-4">
          <span className="font-semibold text-sm">Casa Wood Dashboard</span>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
