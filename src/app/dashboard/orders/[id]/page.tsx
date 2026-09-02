import { getOrderById, updateOrderStatus, updateOrderPayment } from "@/actions/orders";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Truck, Wrench, Ban, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back and Actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-muted h-10 w-10 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">Order {order.reference}</h1>
          <p className="text-sm text-muted-foreground">
             Created on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        {/* Status Actions */}
        <div className="flex gap-2">
          {order.status === "CONFIRMED" && (
            <form action={async () => {
              "use server";
              await updateOrderStatus(order.id, "IN_PRODUCTION");
            }}>
              <Button type="submit" variant="default" className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Wrench className="w-4 h-4" /> Start Production
              </Button>
            </form>
          )}
          {order.status === "IN_PRODUCTION" && (
            <form action={async () => {
              "use server";
              await updateOrderStatus(order.id, "READY");
            }}>
              <Button type="submit" variant="default" className="bg-yellow-600 hover:bg-yellow-700 gap-2">
                <CheckCircle2 className="w-4 h-4" /> Mark as Ready
              </Button>
            </form>
          )}
          {order.status === "READY" && (
            <form action={async () => {
              "use server";
              await updateOrderStatus(order.id, "DELIVERED");
            }}>
              <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 gap-2">
                <Truck className="w-4 h-4" /> Mark Delivered
              </Button>
            </form>
          )}
          {(order.status !== "DELIVERED" && order.status !== "CANCELLED") && (
            <form action={async () => {
              "use server";
              await updateOrderStatus(order.id, "CANCELLED");
            }}>
              <Button type="submit" variant="destructive" className="gap-2">
                <Ban className="w-4 h-4" /> Cancel Order
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col - Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-lg bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
            <div className="space-y-2">
              <p><span className="text-muted-foreground w-24 inline-block">Name:</span> {order.customer.name}</p>
              {order.customer.phone && <p><span className="text-muted-foreground w-24 inline-block">Phone:</span> {order.customer.phone}</p>}
              {order.customer.email && <p><span className="text-muted-foreground w-24 inline-block">Email:</span> {order.customer.email}</p>}
              {order.deliveryAddress && <p><span className="text-muted-foreground w-24 inline-block">Delivery:</span> {order.deliveryAddress}</p>}
            </div>
          </div>

          <div className="border rounded-lg bg-background p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-semibold">Order Items</h2>
               {order.quotation && (
                 <Link href={`/dashboard/quotations/${order.quotationId}`} className="text-sm text-primary hover:underline">
                   View Original Quote
                 </Link>
               )}
            </div>
            
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="py-2 px-4 font-medium">Description</th>
                  <th className="py-2 px-4 font-medium text-center">Qty</th>
                  <th className="py-2 px-4 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.quotation?.items.map((item, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-right font-medium">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col - Financials */}
        <div className="space-y-6">
          <div className="border rounded-lg bg-background p-6 shadow-sm">
             <h2 className="text-lg font-semibold mb-4">Financials</h2>
             <div className="space-y-3 text-sm">
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Order Total</span>
                 <span className="font-semibold text-lg">${order.totalAmount.toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Amount Paid</span>
                 <span className="font-medium text-green-600">${order.paidAmount.toFixed(2)}</span>
               </div>
               <div className="flex justify-between pt-3 border-t">
                 <span className="font-medium">Balance Due</span>
                 <span className="font-bold text-red-600">${(order.totalAmount - order.paidAmount).toFixed(2)}</span>
               </div>
             </div>

             <div className="mt-6 border-t pt-4">
                <form action={async (formData: FormData) => {
                  "use server";
                  const additional = parseFloat(formData.get("amount") as string);
                  if (additional > 0) {
                     await updateOrderPayment(order.id, order.paidAmount + additional);
                  }
                }} className="space-y-3">
                  <h3 className="text-sm font-medium">Record Payment</h3>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      name="amount" 
                      min="1" 
                      step="0.01"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      placeholder="Amount" 
                      required
                    />
                    <Button type="submit" size="sm">
                      <CreditCard className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
             </div>
          </div>

          <div className="border rounded-lg bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Order Status</h2>
            <div className="mt-4">
               <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${
                 order.status === "CONFIRMED" ? "bg-gray-100 text-gray-800" :
                 order.status === "IN_PRODUCTION" ? "bg-blue-100 text-blue-800" :
                 order.status === "READY" ? "bg-yellow-100 text-yellow-800" :
                 order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                 "bg-red-100 text-red-800"
               }`}>
                 {order.status.replace("_", " ")}
               </span>
            </div>
            {order.notes && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
