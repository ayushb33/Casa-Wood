import { getQuotationById, updateQuotationStatus } from "@/actions/quotations";
import { convertQuotationToOrder } from "@/actions/orders";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer, Send, CheckCircle2, XCircle, Package } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default async function QuotationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await getQuotationById(id);

  if (!quote) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back and Actions */}
      <div className="flex items-center gap-4 print:hidden">
        <Link
          href="/dashboard/quotations"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-muted h-10 w-10 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">Quotation {quote.reference}</h1>
          <p className="text-sm text-muted-foreground">
             Created on {new Date(quote.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        {/* Status Actions */}
        <div className="flex gap-2">
          {quote.status === "DRAFT" && (
            <form action={async () => {
              "use server";
              await updateQuotationStatus(quote.id, "SENT");
            }}>
              <Button type="submit" variant="default" className="gap-2">
                <Send className="w-4 h-4" /> Mark as Sent
              </Button>
            </form>
          )}
          {quote.status === "SENT" && (
            <>
              <form action={async () => {
                "use server";
                await updateQuotationStatus(quote.id, "ACCEPTED");
              }}>
                <Button type="submit" variant="default" className="bg-green-600 hover:bg-green-700 gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Accepted
                </Button>
              </form>
              <form action={async () => {
                "use server";
                await updateQuotationStatus(quote.id, "REJECTED");
              }}>
                <Button type="submit" variant="destructive" className="gap-2">
                  <XCircle className="w-4 h-4" /> Rejected
                </Button>
              </form>
            </>
          )}
          {quote.status === "ACCEPTED" && !quote.order && (
            <form action={async () => {
              "use server";
              const orderId = await convertQuotationToOrder(quote.id, "");
              redirect(`/dashboard/orders/${orderId}`);
            }}>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 gap-2">
                <Package className="w-4 h-4" /> Convert to Order
              </Button>
            </form>
          )}
          {quote.order && (
            <Link href={`/dashboard/orders/${quote.order.id}`} className={buttonVariants({ variant: "outline", className: "gap-2" })}>
              <Package className="w-4 h-4" /> View Order
            </Link>
          )}
        </div>
      </div>

      {/* Invoice Printable View */}
      <div className="border rounded-lg bg-white p-12 shadow-sm text-gray-900 print:shadow-none print:border-none print:p-0">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-black">CASA WOOD</h2>
            <p className="text-gray-500 text-sm mt-1">Premium Furniture Design</p>
            <div className="mt-4 text-sm text-gray-600">
               <p>123 Design Avenue</p>
               <p>New York, NY 10001</p>
               <p>contact@casawood.in</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-light text-gray-400 mb-2">QUOTATION</h1>
            <p className="font-semibold text-lg">{quote.reference}</p>
            <p className="text-sm text-gray-500 mt-1">Date: {new Date(quote.createdAt).toLocaleDateString()}</p>
            {quote.validUntil && (
              <p className="text-sm text-gray-500">Valid Until: {new Date(quote.validUntil).toLocaleDateString()}</p>
            )}
            <div className="mt-4 inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full uppercase tracking-wider">
               {quote.status}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 border-b pb-2">Prepared For</h3>
          <p className="font-semibold text-lg">{quote.lead.customer.name}</p>
          {quote.lead.customer.email && <p className="text-sm text-gray-600">{quote.lead.customer.email}</p>}
          {quote.lead.customer.phone && <p className="text-sm text-gray-600">{quote.lead.customer.phone}</p>}
        </div>

        <table className="w-full text-left mb-12">
          <thead className="border-b-2 border-black">
            <tr>
              <th className="py-3 font-semibold">Description</th>
              <th className="py-3 font-semibold text-center">Qty</th>
              <th className="py-3 font-semibold text-right">Unit Price</th>
              <th className="py-3 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {quote.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4">{item.description}</td>
                <td className="py-4 text-center">{item.quantity}</td>
                <td className="py-4 text-right">${item.unitPrice.toFixed(2)}</td>
                <td className="py-4 text-right font-medium">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-12">
          <div className="w-64 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">${quote.subtotal.toFixed(2)}</span>
            </div>
            {quote.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${quote.discount.toFixed(2)}</span>
              </div>
            )}
            {quote.tax > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium">${quote.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t-2 border-black pt-3 text-lg font-bold">
              <span>Total</span>
              <span>${quote.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {(quote.notes || quote.terms) && (
          <div className="border-t pt-8 space-y-6">
            {quote.notes && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Notes</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{quote.notes}</p>
              </div>
            )}
            {quote.terms && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Terms & Conditions</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{quote.terms}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center print:hidden pt-8 pb-16">
        <Button onClick={() => window.print()} variant="outline" className="gap-2">
           <Printer className="w-4 h-4" /> Print / Export to PDF
        </Button>
      </div>
    </div>
  );
}
