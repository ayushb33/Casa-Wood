import { getQuotations } from "@/actions/quotations";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default async function QuotationsPage() {
  const quotations = await getQuotations();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Quotations</h1>
          <p className="text-sm text-muted-foreground">
            Manage estimates and pricing proposals for leads.
          </p>
        </div>
      </div>

      <div className="border rounded-lg bg-background shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Reference</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {quotations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  <FileText className="w-8 h-8 mx-auto mb-4 text-muted" />
                  No quotations found. Go to a Lead to generate one.
                </td>
              </tr>
            ) : (
              quotations.map((quote) => (
                <tr key={quote.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {quote.reference}
                  </td>
                  <td className="px-6 py-4">
                    {quote.lead.customer.name}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ${quote.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      quote.status === "DRAFT" ? "bg-gray-100 text-gray-800" :
                      quote.status === "SENT" ? "bg-blue-100 text-blue-800" :
                      quote.status === "ACCEPTED" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/quotations/${quote.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                    >
                      View <ArrowRight className="w-4 h-4" />
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
