import { getCustomRequests, convertRequestToLead } from "@/actions/custom-requests";
import Link from "next/link";
import { ArrowRight, MessageSquarePlus } from "lucide-react";

export default async function CustomRequestsPage() {
  const requests = await getCustomRequests();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Custom Requests</h1>
          <p className="text-sm text-muted-foreground">
            Manage bespoke furniture requests from customers.
          </p>
        </div>
      </div>

      <div className="border rounded-lg bg-background shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Item Type</th>
              <th className="px-6 py-4 font-medium">Budget</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Submitted</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No custom requests found.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{request.contactName}</p>
                    <p className="text-xs text-muted-foreground">{request.contactPhone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {request.furnitureType}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {request.budget ? `$${request.budget.toFixed(2)}` : "Not specified"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      request.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                      request.status === "REVIEWED" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {request.leadId ? (
                      <Link
                        href={`/dashboard/leads/${request.leadId}`}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                      >
                        View Lead <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <form action={async () => {
                        "use server";
                        await convertRequestToLead(request.id);
                      }}>
                        <button type="submit" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border hover:bg-muted text-foreground transition-colors">
                          <MessageSquarePlus className="w-4 h-4 text-green-600" />
                          Convert to Lead
                        </button>
                      </form>
                    )}
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
