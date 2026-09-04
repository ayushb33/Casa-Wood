import { getOrders } from "@/actions/orders";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6 w-full animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold tracking-tight">Sales Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage production and delivery tracking for active orders.
          </p>
        </div>
      </div>

      <div className="border rounded-2xl bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-stone-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Reference</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Value</th>
                <th className="px-6 py-4 font-semibold">Paid</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <Package className="w-8 h-8 mx-auto mb-4 text-muted opacity-50" />
                    No orders found. Convert an accepted quotation to create one.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-900 font-mono text-xs whitespace-nowrap">
                      {order.reference}
                    </td>
                    <td className="px-6 py-4 text-stone-900 font-medium whitespace-nowrap">
                      {order.customer.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-stone-900 whitespace-nowrap">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-emerald-700 font-medium whitespace-nowrap">
                      ${order.paidAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        order.status === "CONFIRMED" ? "bg-stone-100 text-stone-700 border-stone-200" :
                        order.status === "IN_PRODUCTION" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        order.status === "READY" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        "bg-rose-50 text-rose-700 border-rose-200"
                      }`}>
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
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
