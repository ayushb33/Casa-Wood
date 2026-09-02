import { getProducts } from "@/actions/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage your furniture catalogue and inventory.
          </p>
        </div>
        <Link
          href="/dashboard/products/create"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Add Product
        </Link>
      </div>

      <div className="border rounded-lg bg-background shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  No products found. Start by adding one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    ${product.price?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {product.category?.name || "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link
                      href={`/dashboard/products/${product.id}/qr`}
                      className="text-muted-foreground hover:text-primary text-sm font-medium"
                    >
                      QR Code
                    </Link>
                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Edit
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
