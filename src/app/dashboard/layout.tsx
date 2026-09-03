import type { Metadata } from "next";
import { requireAuth } from "@/lib/session";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Package, FolderTree, Users, CalendarClock, PenTool, FileText, ShoppingCart, Bell } from "lucide-react";
import { getUnreadCountForUser } from "@/actions/notifications";
import SignOutButton from "@/components/auth/sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard | Casa Wood",
  description: "Casa Wood internal management dashboard.",
};

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/categories", label: "Categories", icon: FolderTree },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/follow-ups", label: "Follow-ups", icon: CalendarClock },
  { href: "/dashboard/custom-requests", label: "Custom Requests", icon: PenTool },
  { href: "/dashboard/quotations", label: "Quotations", icon: FileText },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAuth();
  const unreadCount = await getUnreadCountForUser(user.id);

  return (
    <div className="flex h-screen bg-muted/20 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r bg-background">
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/brand/casa-wood-symbol.png"
              alt="Casa Wood"
              width={50}
              height={50}
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
            href="/dashboard/notifications"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors relative"
          >
            <Bell className="h-4 w-4" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Mobile top bar */}
        <header className="md:hidden h-14 border-b bg-background flex items-center px-4 gap-4">
          <span className="font-semibold text-sm flex-1">Casa Wood Dashboard</span>
          <Link href="/dashboard/notifications" className="relative p-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </Link>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
