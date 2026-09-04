import { requireAuth } from "@/lib/session";
import { getNotificationsForUser, markAllRead } from "@/actions/notifications";
import { Bell, CheckCheck, ExternalLink, Sparkles, UserPlus, ShoppingBag, AlertCircle, FileSpreadsheet, Clock } from "lucide-react";
import Link from "next/link";

export default async function NotificationsPage() {
  const session = await requireAuth();
  const notifications = await getNotificationsForUser(session.user.id);
  const unread = notifications.filter(n => !n.isRead).length;

  const TYPE_BADGE: Record<string, { icon: any; color: string; label: string }> = {
    NEW_LEAD: { icon: UserPlus, color: "bg-blue-500/10 text-blue-600 border-blue-500/20", label: "New Lead" },
    NEW_CUSTOM_REQUEST: { icon: FileSpreadsheet, color: "bg-amber-500/10 text-amber-600 border-amber-500/20", label: "Custom Request" },
    NEW_WISHLIST: { icon: ShoppingBag, color: "bg-purple-500/10 text-purple-600 border-purple-500/20", label: "Wishlist" },
    ORDER_STATUS_CHANGE: { icon: ShoppingBag, color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", label: "Order Update" },
    FOLLOW_UP_DUE: { icon: Clock, color: "bg-rose-500/10 text-rose-600 border-rose-500/20", label: "Follow Up" },
    SYSTEM: { icon: AlertCircle, color: "bg-stone-500/10 text-stone-600 border-stone-500/20", label: "System" }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-serif font-semibold tracking-tight">Notifications Center</h1>
            {unread > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950 animate-pulse shadow-sm">
                {unread} UNREAD
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {unread > 0 ? `You have ${unread} unread alert(s) requiring your attention.` : "You're all caught up! No unread notifications."}
          </p>
        </div>
        {unread > 0 && (
          <form action={async () => {
            "use server";
            await markAllRead(session.user.id);
          }}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 transition-all shadow-sm"
            >
              <CheckCheck className="w-4 h-4 text-amber-400" />
              Mark all as read
            </button>
          </form>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-20 border rounded-3xl bg-card border-dashed shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-semibold text-lg">No Notifications Yet</h3>
            <p className="text-sm text-muted-foreground mt-1">When new leads or sales updates arrive, they will appear here.</p>
          </div>
        ) : (
          notifications.map(notification => {
            const badge = TYPE_BADGE[notification.type] ?? { icon: Bell, color: "bg-amber-500/10 text-amber-600 border-amber-500/20", label: "Alert" };
            const IconComponent = badge.icon;

            return (
              <div
                key={notification.id}
                className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                  !notification.isRead 
                    ? "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-card border-amber-500/40 shadow-md ring-1 ring-amber-500/20" 
                    : "bg-card hover:bg-stone-50/50 border-border shadow-xs"
                }`}
              >
                {!notification.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 to-amber-600" />
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border shrink-0 ${badge.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <h4 className={`text-sm font-semibold ${!notification.isRead ? "text-stone-900" : "text-stone-700"}`}>
                          {notification.title}
                        </h4>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(notification.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}{" "}
                        at {new Date(notification.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <p className={`text-sm mt-2 leading-relaxed ${!notification.isRead ? "text-stone-800 font-medium" : "text-muted-foreground"}`}>
                      {notification.body}
                    </p>

                    {notification.link && (
                      <Link
                        href={notification.link}
                        className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline"
                      >
                        View Related Entry <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  {!notification.isRead && (
                    <div className="shrink-0 flex items-center justify-center">
                      <span className="w-3 h-3 bg-amber-500 rounded-full animate-ping opacity-75" />
                      <span className="w-2.5 h-2.5 bg-amber-500 rounded-full relative -ml-2.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
