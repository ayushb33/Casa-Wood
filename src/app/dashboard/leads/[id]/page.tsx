import { getLeadById, updateLeadStatus } from "@/actions/leads";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LeadStatus } from "@/generated/prisma/client";

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
