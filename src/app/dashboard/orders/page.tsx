import { getOrders } from "@/actions/orders";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">
            Manage production and delivery tracking for active orders.
          </p>
        </div>
      </div>

      <div className="border rounded-lg bg-background shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Reference</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Value</th>
              <th className="px-6 py-4 font-medium">Paid</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  <Package className="w-8 h-8 mx-auto mb-4 text-muted" />
                  No orders found. Convert an accepted quotation to create one.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {order.reference}
                  </td>
                  <td className="px-6 py-4">
                    {order.customer.name}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    ${order.paidAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      order.status === "CONFIRMED" ? "bg-gray-100 text-gray-800" :
                      order.status === "IN_PRODUCTION" ? "bg-blue-100 text-blue-800" :
                      order.status === "READY" ? "bg-yellow-100 text-yellow-800" :
                      order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
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
