import { getFollowUps, completeFollowUp } from "@/actions/follow-ups";
import Link from "next/link";
import { CheckCircle2, Clock, CalendarIcon, CalendarX2 } from "lucide-react";

export default async function FollowUpsPage() {
  const { overdue, today, upcoming } = await getFollowUps();

  const totalActive = overdue.length + today.length + upcoming.length;

  return (
    <div className="space-y-8 w-full animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold tracking-tight">Follow-Up Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your scheduled calls, visits, and reminders.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="border rounded-2xl bg-card p-5 shadow-sm flex items-center gap-4 border-l-4 border-l-rose-500">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <CalendarX2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overdue</p>
            <p className="text-3xl font-serif font-semibold text-rose-600 mt-0.5">{overdue.length}</p>
          </div>
        </div>
        <div className="border rounded-2xl bg-card p-5 shadow-sm flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Today</p>
            <p className="text-3xl font-serif font-semibold text-blue-600 mt-0.5">{today.length}</p>
          </div>
        </div>
        <div className="border rounded-2xl bg-card p-5 shadow-sm flex items-center gap-4 border-l-4 border-l-emerald-500">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upcoming</p>
            <p className="text-3xl font-serif font-semibold text-emerald-600 mt-0.5">{upcoming.length}</p>
          </div>
        </div>
        <div className="border rounded-2xl bg-card p-5 shadow-sm flex items-center justify-center border-l-4 border-l-stone-900">
           <div className="text-center">
             <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Active</p>
             <p className="text-3xl font-serif font-semibold mt-0.5 text-stone-900">{totalActive}</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Overdue and Today */}
        <div className="space-y-8">
          {/* Overdue Section */}
          <section>
            <h2 className="text-lg font-serif font-semibold text-rose-600 mb-4 flex items-center gap-2">
              <CalendarX2 className="w-5 h-5" /> Overdue
            </h2>
            {overdue.length === 0 ? (
              <p className="text-sm text-muted-foreground bg-card border p-5 rounded-2xl">No overdue follow-ups.</p>
            ) : (
              <div className="space-y-3">
                {overdue.map((fu) => (
                  <FollowUpCard key={fu.id} followUp={fu} variant="danger" />
                ))}
              </div>
            )}
          </section>

          {/* Today Section */}
          <section>
            <h2 className="text-lg font-serif font-semibold text-blue-600 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" /> Today
            </h2>
            {today.length === 0 ? (
              <p className="text-sm text-muted-foreground bg-card border p-5 rounded-2xl">No follow-ups scheduled for today.</p>
            ) : (
              <div className="space-y-3">
                {today.map((fu) => (
                  <FollowUpCard key={fu.id} followUp={fu} variant="primary" />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Upcoming */}
        <div className="space-y-8">
           <section>
            <h2 className="text-lg font-serif font-semibold text-emerald-600 mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" /> Upcoming
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground bg-card border p-5 rounded-2xl">No upcoming follow-ups.</p>
            ) : (
              <div className="space-y-3">
                {upcoming.map((fu) => (
                  <FollowUpCard key={fu.id} followUp={fu} variant="default" />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

type FollowUpItem = {
  id: string;
  leadId: string;
  scheduledAt: Date;
  notes: string | null;
  lead: { customer: { name: string } };
};

function FollowUpCard({ followUp, variant }: { followUp: FollowUpItem, variant: 'default' | 'danger' | 'primary' }) {
  const isDanger = variant === 'danger';
  const isPrimary = variant === 'primary';

  return (
    <div className={`border rounded-lg bg-background p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 ${isDanger ? 'border-l-red-500' : isPrimary ? 'border-l-blue-500' : 'border-l-green-500'}`}>
      <div className="space-y-1">
        <Link href={`/dashboard/leads/${followUp.leadId}`} className="font-semibold text-base hover:underline text-foreground">
          {followUp.lead.customer.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          {new Date(followUp.scheduledAt).toLocaleString("en-IN", {
             weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </p>
        {followUp.notes && (
          <p className="text-sm text-muted-foreground mt-2 italic border-l-2 pl-2">&ldquo;{followUp.notes}&rdquo;</p>
        )}
      </div>
      <div className="flex sm:flex-col items-end gap-2 shrink-0">
        <form action={async () => {
          "use server";
          await completeFollowUp(followUp.id, followUp.leadId);
        }}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border hover:bg-muted text-foreground transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Mark Done
          </button>
        </form>
      </div>
    </div>
  )
}
