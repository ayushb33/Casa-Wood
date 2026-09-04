import { getServerSession } from "@/lib/session";
import { getDashboardAnalytics } from "@/actions/analytics";
import AnalyticsVisualizer from "@/components/dashboard/analytics-visualizer";
import { 
  Users, 
  CalendarClock, 
  FileText, 
  ShoppingCart,
  Banknote,
  Wallet,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession();
  const analytics = await getDashboardAnalytics();

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Welcome back, <span className="font-medium text-foreground">{session?.user?.name ?? "Admin"}</span>. Real-time overview of Casa Wood business performance.
          </p>
        </div>
      </div>

      {/* Graphical Chart & Visual Representation */}
      <AnalyticsVisualizer analytics={analytics} />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3 hover:shadow-md transition-all border-l-4 border-l-stone-900">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-xs font-semibold uppercase text-muted-foreground">Total Revenue</h3>
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
              <Banknote className="h-4 w-4 text-stone-900" />
            </div>
          </div>
          <div className="text-3xl font-serif font-semibold">${(analytics?.revenue ?? 0).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span>Across</span> <span className="font-semibold text-foreground">{analytics?.totalOrders ?? 0}</span> <span>orders</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3 hover:shadow-md transition-all border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-xs font-semibold uppercase text-muted-foreground">Collected Amount</h3>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-serif font-semibold text-emerald-700">${(analytics?.collected ?? 0).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
             ${((analytics?.revenue ?? 0) - (analytics?.collected ?? 0)).toLocaleString()} pending balance
          </p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3 hover:shadow-md transition-all border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-xs font-semibold uppercase text-muted-foreground">Total Enquiries</h3>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Users className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-serif font-semibold">{analytics?.totalLeads ?? 0}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-600 font-semibold">{(analytics?.conversionRate ?? 0).toFixed(1)}%</span> deal win rate
          </p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3 hover:shadow-md transition-all border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-xs font-semibold uppercase text-muted-foreground">Follow-ups Due</h3>
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <CalendarClock className="h-4 w-4 text-orange-500" />
            </div>
          </div>
          <div className="text-3xl font-serif font-semibold">{analytics?.todayFollowUps ?? 0}</div>
          <p className="text-xs text-muted-foreground">Tasks pending today</p>
        </div>
      </div>

      {/* Quick Operations Links */}
      <div className="rounded-2xl border bg-card shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-semibold text-lg">Quick Operations</h2>
          <span className="text-xs text-muted-foreground">Direct Access Panel</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/leads" className="group flex flex-col items-center justify-center p-5 bg-stone-50/80 hover:bg-amber-50 rounded-xl border hover:border-amber-200 transition-all duration-200 shadow-xs">
            <Users className="w-6 h-6 text-stone-700 group-hover:text-amber-700 mb-2 transition-colors" />
            <span className="text-xs font-medium group-hover:text-amber-950 flex items-center gap-1">
              View Leads <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </Link>
          <Link href="/dashboard/follow-ups" className="group flex flex-col items-center justify-center p-5 bg-stone-50/80 hover:bg-amber-50 rounded-xl border hover:border-amber-200 transition-all duration-200 shadow-xs">
            <CalendarClock className="w-6 h-6 text-stone-700 group-hover:text-amber-700 mb-2 transition-colors" />
            <span className="text-xs font-medium group-hover:text-amber-950 flex items-center gap-1">
              Follow-ups <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </Link>
          <Link href="/dashboard/quotations" className="group flex flex-col items-center justify-center p-5 bg-stone-50/80 hover:bg-amber-50 rounded-xl border hover:border-amber-200 transition-all duration-200 shadow-xs">
            <FileText className="w-6 h-6 text-stone-700 group-hover:text-amber-700 mb-2 transition-colors" />
            <span className="text-xs font-medium group-hover:text-amber-950 flex items-center gap-1">
              Quotations <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </Link>
          <Link href="/dashboard/orders" className="group flex flex-col items-center justify-center p-5 bg-stone-50/80 hover:bg-amber-50 rounded-xl border hover:border-amber-200 transition-all duration-200 shadow-xs">
            <ShoppingCart className="w-6 h-6 text-stone-700 group-hover:text-amber-700 mb-2 transition-colors" />
            <span className="text-xs font-medium group-hover:text-amber-950 flex items-center gap-1">
              Sales Orders <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
