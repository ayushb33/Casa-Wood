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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">
            Track customer enquiries and manage your sales pipeline.
          </p>
        </div>
        <Link
          href="/dashboard/leads/create"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          + Add Lead
        </Link>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "New", key: "NEW" },
          { label: "Interested", key: "INTERESTED" },
          { label: "Quotation Sent", key: "QUOTATION_SENT" },
          { label: "Won", key: "WON" },
        ].map(({ label, key }) => (
          <div key={key} className="border rounded-lg bg-background p-4 shadow-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-semibold mt-1">{statusCounts[key] ?? 0}</p>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="border rounded-lg bg-background shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Last Activity</th>
              <th className="px-6 py-4 font-medium">Assigned To</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
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
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{lead.customer.name}</p>
                    {lead.customer.phone && (
                      <p className="text-xs text-muted-foreground">{lead.customer.phone}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        STATUS_BADGE[lead.status] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {lead.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {SOURCE_LABEL[lead.source] ?? lead.source}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {lead.activities[0]
                      ? new Date(lead.activities[0].createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {lead.assignedTo?.name ?? "Unassigned"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
