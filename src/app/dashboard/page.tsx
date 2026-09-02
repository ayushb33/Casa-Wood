import { getServerSession } from "@/lib/session";
import { getDashboardAnalytics } from "@/actions/analytics";
import { 
  Users, 
  TrendingUp, 
  CalendarClock, 
  FileText, 
  ShoppingCart,
  Banknote,
  Wallet
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession();
  const analytics = await getDashboardAnalytics();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, <span className="font-medium text-foreground">{session?.user?.name ?? "User"}</span>. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">${analytics.revenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Across {analytics.totalOrders} active orders</p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Amount Collected</h3>
            <Wallet className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold">${analytics.collected.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
             ${(analytics.revenue - analytics.collected).toLocaleString()} outstanding balance
          </p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Total Leads</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{analytics.totalLeads}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600 font-medium">{analytics.conversionRate.toFixed(1)}%</span> conversion rate
          </p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Today's Tasks</h3>
            <CalendarClock className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold">{analytics.todayFollowUps}</div>
          <p className="text-xs text-muted-foreground">Follow-ups due today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl border bg-card shadow-sm p-6">
          <h2 className="font-semibold mb-4">Lead Sources</h2>
          {analytics.leadSources.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data available.</p>
          ) : (
            <div className="space-y-4">
              {analytics.leadSources.map(source => (
                <div key={source.source} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{source.source.replace("_", " ")}</span>
                  <span className="text-sm text-muted-foreground">{source._count.source} leads</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card shadow-sm p-6">
           <h2 className="font-semibold mb-4">Quick Links</h2>
           <div className="grid grid-cols-2 gap-4">
              <Link href="/dashboard/leads" className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                 <Users className="w-8 h-8 text-primary mb-2" />
                 <span className="text-sm font-medium">View Leads</span>
              </Link>
              <Link href="/dashboard/follow-ups" className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                 <CalendarClock className="w-8 h-8 text-primary mb-2" />
                 <span className="text-sm font-medium">Follow-ups</span>
              </Link>
              <Link href="/dashboard/quotations" className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                 <FileText className="w-8 h-8 text-primary mb-2" />
                 <span className="text-sm font-medium">Quotations</span>
              </Link>
              <Link href="/dashboard/orders" className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                 <ShoppingCart className="w-8 h-8 text-primary mb-2" />
                 <span className="text-sm font-medium">Sales Orders</span>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
