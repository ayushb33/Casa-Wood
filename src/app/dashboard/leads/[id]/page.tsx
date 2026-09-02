import { getLeadById, updateLeadStatus, addLeadActivity } from "@/actions/leads";
import { scheduleFollowUp, completeFollowUp } from "@/actions/follow-ups";
import { requireAuth } from "@/lib/session";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle2, MessageSquare, PhoneCall } from "lucide-react";
import { LeadStatus } from "@/generated/prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const STATUS_BADGE: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  INTERESTED: "bg-orange-100 text-orange-700",
  SHOWROOM_VISIT: "bg-purple-100 text-purple-700",
  QUOTATION_SENT: "bg-indigo-100 text-indigo-700",
  NEGOTIATION: "bg-pink-100 text-pink-700",
  WON: "bg-green-100 text-green-700",
  LOST: "bg-gray-100 text-gray-500",
};

const PIPELINE_STAGES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "INTERESTED",
  "SHOWROOM_VISIT",
  "QUOTATION_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
];

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) notFound();

  const { user } = await requireAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/leads"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-muted h-10 w-10 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">{lead.customer.name}</h1>
          <p className="text-sm text-muted-foreground">
            Lead · {lead.source.replace(/_/g, " ")} · Created{" "}
            {new Date(lead.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            STATUS_BADGE[lead.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {lead.status.replace(/_/g, " ")}
        </span>
        <div className="ml-auto">
          <Link
            href={`/dashboard/quotations/create?leadId=${lead.id}`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Create Quotation
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="border rounded-lg bg-background p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Customer Details
            </h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium mt-0.5">{lead.customer.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium mt-0.5">{lead.customer.phone ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium mt-0.5">{lead.customer.email ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Assigned To</dt>
                <dd className="font-medium mt-0.5">{lead.assignedTo?.name ?? "Unassigned"}</dd>
              </div>
            </dl>
            {lead.notes && (
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Notes</p>
                <p className="text-sm">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="border rounded-lg bg-background p-6 shadow-sm">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Activity Timeline
            </h2>
            {lead.activities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No activities recorded yet.
              </p>
            ) : (
              <ol className="relative border-l border-border space-y-6 pl-6">
                {lead.activities.map((activity) => (
                  <li key={activity.id} className="relative">
                    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-primary" />
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.createdAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" · "}
                      <span className="uppercase font-medium">{activity.type}</span>
                    </p>
                    <p className="font-medium text-sm mt-0.5">{activity.title}</p>
                    {activity.body && (
                      <p className="text-sm text-muted-foreground mt-1">{activity.body}</p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
          
          {/* Log Activity Form */}
          <div className="border rounded-lg bg-background p-6 shadow-sm">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Log Activity
            </h2>
            <form action={async (formData) => {
              "use server";
              formData.append("leadId", id);
              formData.append("createdById", user.id);
              await addLeadActivity(formData);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select id="type" name="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                       <option value="NOTE">Note</option>
                       <option value="CALL">Call</option>
                       <option value="MEETING">Meeting</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required placeholder="e.g. Discovery Call" />
                 </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Details</Label>
                <textarea id="body" name="body" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Notes from the interaction..." required></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Log Activity
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column — Pipeline Actions */}
        <div className="space-y-6">
          {/* Update Status */}
          <div className="border rounded-lg bg-background p-6 shadow-sm">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Move Stage
            </h2>
            <div className="space-y-2">
              {PIPELINE_STAGES.map((stage) => {
                const isCurrent = stage === lead.status;
                return (
                  <form key={stage} action={async () => {
                    "use server";
                    await updateLeadStatus(id, stage);
                  }}>
                    <button
                      type="submit"
                      disabled={isCurrent}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isCurrent
                          ? "bg-primary text-primary-foreground cursor-default"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {stage.replace(/_/g, " ")}
                    </button>
                  </form>
                );
              })}
            </div>
          </div>

          {/* Follow-ups */}
          <div className="border rounded-lg bg-background p-6 shadow-sm space-y-6">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Follow-ups
            </h2>

            {lead.followUps && lead.followUps.filter(f => !f.completedAt).length > 0 && (
              <div className="space-y-3 mb-6">
                {lead.followUps.filter(f => !f.completedAt).map(fu => (
                  <div key={fu.id} className="flex items-start justify-between gap-4 p-3 border rounded-md bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">Scheduled for</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(fu.scheduledAt).toLocaleString("en-IN", {
                           month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                      {fu.notes && <p className="text-xs mt-2 italic">"{fu.notes}"</p>}
                    </div>
                    <form action={async () => {
                      "use server";
                      await completeFollowUp(fu.id, id);
                    }}>
                      <button type="submit" className="text-muted-foreground hover:text-green-600 p-1">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}

            <form action={async (formData) => {
              "use server";
              formData.append("leadId", id);
              formData.append("createdById", user.id);
              await scheduleFollowUp(formData);
            }} className="space-y-4 border-t pt-4">
               <p className="text-sm font-medium">Schedule New</p>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="date">Date</Label>
                   <Input id="date" name="date" type="date" required />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="time">Time</Label>
                   <Input id="time" name="time" type="time" required />
                 </div>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="fu-notes">Notes (optional)</Label>
                 <Input id="fu-notes" name="notes" placeholder="What to discuss..." />
               </div>
               <button type="submit" className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                 Schedule Reminder
               </button>
            </form>
          </div>

          {/* Product Interests */}
          {lead.productInterests.length > 0 && (
            <div className="border rounded-lg bg-background p-6 shadow-sm">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Interested In
              </h2>
              <ul className="space-y-2">
                {lead.productInterests.map((pi) => (
                  <li key={pi.id} className="text-sm font-medium">
                    {pi.product.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
