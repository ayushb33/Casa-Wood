import { getLeads } from "@/actions/leads";
import Link from "next/link";

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

const SOURCE_LABEL: Record<string, string> = {
  WEBSITE: "Website",
  WHATSAPP: "WhatsApp",
  WALK_IN: "Walk-in",
  QR_CODE: "QR Code",
  REFERRAL: "Referral",
  SOCIAL_MEDIA: "Social Media",
  OTHER: "Other",
};

export default async function LeadsPage() {
  const leads = await getLeads();

  // Pipeline summary counts
  const statusCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8 w-full animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold tracking-tight">Leads & Enquiries</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track customer enquiries and manage your sales pipeline.
          </p>
        </div>
        <Link
          href="/dashboard/leads/create"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium bg-stone-900 text-stone-100 hover:bg-stone-800 h-10 px-4 py-2 shadow-sm transition-all"
        >
          + Add Lead
        </Link>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "New Enquiries", key: "NEW", border: "border-l-blue-500" },
          { label: "Interested", key: "INTERESTED", border: "border-l-amber-500" },
          { label: "Quotation Sent", key: "QUOTATION_SENT", border: "border-l-purple-500" },
          { label: "Won Deals", key: "WON", border: "border-l-emerald-500" },
        ].map(({ label, key, border }) => (
          <div key={key} className={`border rounded-2xl bg-card p-5 shadow-sm space-y-1 border-l-4 ${border}`}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-serif font-semibold">{statusCounts[key] ?? 0}</p>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="border rounded-2xl bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-stone-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Source</th>
                <th className="px-6 py-4 font-semibold">Last Activity</th>
                <th className="px-6 py-4 font-semibold">Assigned To</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No leads yet. Add your first customer enquiry.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-stone-50/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-stone-900">{lead.customer.name}</p>
                      {lead.customer.phone && (
                        <p className="text-xs text-muted-foreground">{lead.customer.phone}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          STATUS_BADGE[lead.status] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {lead.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {SOURCE_LABEL[lead.source] ?? lead.source}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {lead.activities[0]
                        ? new Date(lead.activities[0].createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {lead.assignedTo?.name ?? "Unassigned"}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-stone-900 text-stone-100 text-xs font-medium hover:bg-stone-800 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
