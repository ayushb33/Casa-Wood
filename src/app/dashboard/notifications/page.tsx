import { requireAuth } from "@/lib/session";
import { getNotificationsForUser, markAllRead } from "@/actions/notifications";
import { Bell, CheckCheck, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function NotificationsPage() {
  const session = await requireAuth();
  const notifications = await getNotificationsForUser(session.user.id);
  const unread = notifications.filter(n => !n.isRead).length;

  const TYPE_ICON: Record<string, string> = {
    NEW_LEAD: "👤",
    NEW_CUSTOM_REQUEST: "✏️",
    NEW_WISHLIST: "🛒",
    ORDER_STATUS_CHANGE: "📦",
    FOLLOW_UP_DUE: "⏰",
    SYSTEM: "⚙️"
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {unread > 0 ? `You have ${unread} unread notification(s).` : "You're all caught up!"}
          </p>
        </div>
        {unread > 0 && (
          <form action={async () => {
            "use server";
            await markAllRead(session.user.id);
          }}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border hover:bg-muted text-foreground transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          </form>
        )}
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-24 border rounded-2xl border-dashed">
            <Bell className="w-10 h-10 mx-auto mb-4 text-muted" />
            <p className="text-muted-foreground">No notifications yet.</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                !notification.isRead ? "bg-primary/5 border-primary/20" : "bg-background"
              }`}
            >
              <div className="text-2xl shrink-0 pt-0.5">
                {TYPE_ICON[notification.type] ?? "🔔"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                    {notification.title}
                  </p>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(notification.createdAt).toLocaleDateString()}{" "}
                    {new Date(notification.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{notification.body}</p>
                {notification.link && (
                  <Link
                    href={notification.link}
                    className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
