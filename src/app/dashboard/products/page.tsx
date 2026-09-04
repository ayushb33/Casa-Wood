import { getProducts } from "@/actions/products";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon, Plus } from "lucide-react";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6 w-full animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your furniture catalogue and inventory.
          </p>
        </div>
        <Link
          href="/dashboard/products/create"
          className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-xl text-sm font-medium bg-stone-900 text-stone-100 hover:bg-stone-800 h-10 px-4 py-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="border rounded-2xl bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-stone-50 border-b">
              <tr>
                <th className="px-4 py-4 font-semibold w-16"></th>
                <th className="px-4 py-4 font-semibold">Product</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold">Price</th>
                <th className="px-4 py-4 font-semibold">Category</th>
                <th className="px-4 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No products found. Start by adding one.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const primaryImage = product.images[0];
                  return (
                    <tr key={product.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted border flex items-center justify-center shrink-0">
                          {primaryImage ? (
                            <Image
                              src={primaryImage.url}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-stone-900">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                          product.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : product.status === "DRAFT"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-stone-900">
                        ${product.price?.toFixed(2) || "0.00"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {product.category?.name || "Uncategorized"}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap space-x-3">
                        <Link
                          href={`/dashboard/products/${product.id}/qr`}
                          className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg border text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                        >
                          QR Code
                        </Link>
                        <Link
                          href={`/dashboard/products/${product.id}`}
                          className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-stone-900 text-stone-100 text-xs font-medium hover:bg-stone-800 transition-colors"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
