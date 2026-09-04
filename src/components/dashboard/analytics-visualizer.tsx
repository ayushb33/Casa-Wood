"use client";

import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  PieChart as PieIcon, 
  BarChart3,
  ArrowUpRight,
  Sparkles
} from "lucide-react";

interface AnalyticsData {
  totalLeads: number;
  wonLeads: number;
  conversionRate: number;
  todayFollowUps: number;
  totalQuotations: number;
  totalOrders: number;
  revenue: number;
  collected: number;
  leadSources: Array<{ source: string; _count: { source: number } }>;
  leadStatuses: Array<{ status: string; _count: { status: number } }>;
  monthlyData: Array<{ name: string; revenue: number; collected: number }>;
  topCategories: Array<{ id: string; name: string; _count: { products: number } }>;
}

export default function AnalyticsVisualizer({ analytics }: { analytics: AnalyticsData }) {
  const maxRevenue = Math.max(...(analytics.monthlyData?.map(m => m.revenue) ?? [1000]), 1000);
  const totalLeadCount = analytics.totalLeads || 1;

  const STATUS_COLORS: Record<string, string> = {
    NEW: "bg-blue-500",
    CONTACTED: "bg-indigo-500",
    QUALIFIED: "bg-amber-500",
    PROPOSAL_SENT: "bg-purple-500",
    NEGOTIATION: "bg-pink-500",
    WON: "bg-emerald-500",
    LOST: "bg-rose-500",
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Top Banner / Hero Metric Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 p-8 text-white shadow-xl border border-stone-800">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Performance Summary
            </div>
            <h2 className="text-3xl font-serif font-semibold tracking-tight text-stone-100">
              ${(analytics.revenue || 0).toLocaleString()}
            </h2>
            <p className="text-xs text-stone-400">Total Booked Gross Sales Revenue</p>
          </div>

          <div className="space-y-2 border-l border-stone-700/50 pl-0 md:pl-8">
            <div className="text-sm font-medium text-stone-300">Collected Revenue</div>
            <div className="text-2xl font-bold text-emerald-400">
              ${(analytics.collected || 0).toLocaleString()}
            </div>
            <div className="w-full bg-stone-700/50 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (analytics.collected / (analytics.revenue || 1)) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 border-l border-stone-700/50 pl-0 md:pl-8">
            <div className="text-sm font-medium text-stone-300">Lead Conversion</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-400">
                {(analytics.conversionRate || 0).toFixed(1)}%
              </span>
              <span className="inline-flex items-center text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3 mr-1" /> High
              </span>
            </div>
            <p className="text-xs text-stone-400">{analytics.wonLeads} deals won out of {analytics.totalLeads} opportunities</p>
          </div>
        </div>
      </div>

      {/* Main Graphics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Bar Graphic Chart */}
        <div className="lg:col-span-2 rounded-2xl border bg-card p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-600" /> Revenue & Cash Flow Trend
              </h3>
              <p className="text-xs text-muted-foreground">Monthly growth trajectory breakdown</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-stone-800 inline-block" /> Gross Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> Collected</span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="h-64 flex items-end justify-between gap-3 pt-8 px-2 border-b">
            {analytics.monthlyData?.map((item, idx) => {
              const heightPct = Math.max(15, Math.round((item.revenue / maxRevenue) * 100));
              const collectedPct = Math.max(10, Math.round((item.collected / maxRevenue) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* Revenue Bar */}
                    <div 
                      className="w-1/2 bg-stone-800 hover:bg-stone-700 rounded-t-md transition-all duration-500 relative group-hover:shadow-md"
                      style={{ height: `${heightPct}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow border whitespace-nowrap transition-opacity pointer-events-none z-20">
                        ${item.revenue.toLocaleString()}
                      </div>
                    </div>
                    {/* Collected Bar */}
                    <div 
                      className="w-1/2 bg-amber-500 hover:bg-amber-400 rounded-t-md transition-all duration-500 relative group-hover:shadow-md"
                      style={{ height: `${collectedPct}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow border whitespace-nowrap transition-opacity pointer-events-none z-20">
                        ${item.collected.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground mt-2">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Sources Distribution (Pictorial Progress Bars) */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-1">
              <PieIcon className="w-5 h-5 text-amber-600" /> Lead Channel Acquisition
            </h3>
            <p className="text-xs text-muted-foreground">Where customer enquiries originate</p>
          </div>

          <div className="space-y-5 my-auto">
            {analytics.leadSources?.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No channels logged yet.</p>
            ) : (
              analytics.leadSources?.map((src) => {
                const count = src._count.source;
                const percentage = Math.round((count / totalLeadCount) * 100);
                const channelName = src.source ? src.source.replace("_", " ") : "Direct";

                return (
                  <div key={src.source || "direct"} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="capitalize">{channelName}</span>
                      <span className="text-muted-foreground">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Enquiries Logged</span>
            <span className="font-semibold text-foreground">{analytics.totalLeads} Leads</span>
          </div>
        </div>

      </div>
    </div>
  );
}
