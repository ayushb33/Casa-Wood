import { getProductById } from "@/actions/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Heart } from "lucide-react";
import AddToWishlistButton from "@/components/wishlist/add-to-wishlist-button";

export default async function PublicProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter">
            CASA WOOD
          </Link>
          <Link href="/wishlist" className="text-sm font-medium hover:underline flex items-center gap-2">
            <Heart className="w-4 h-4" /> Wishlist
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
              [Product Image Placeholder]
            </div>
            {/* If there was an image URL on product, we would render it here */}
          </div>

          {/* Details */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
               <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {product.category?.name || "Furniture"}
               </p>
               <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>
               <p className="text-2xl mt-4 font-medium">${product.price?.toFixed(2)}</p>
            </div>

            <div className="prose prose-sm text-muted-foreground">
               <p>{product.description || "No description available."}</p>
            </div>
            
            {product.dimensions && (
               <div className="space-y-2">
                  <h3 className="font-medium text-sm uppercase tracking-wider">Dimensions</h3>
                  <p className="text-sm text-muted-foreground">{product.dimensions}</p>
               </div>
            )}
            
            {product.material && (
               <div className="space-y-2">
                  <h3 className="font-medium text-sm uppercase tracking-wider">Material</h3>
                  <p className="text-sm text-muted-foreground">{product.material}</p>
               </div>
            )}

            <div className="pt-6 border-t">
               <AddToWishlistButton 
                 product={{
                    id: product.id, 
                    name: product.name, 
                    price: product.price ?? 0, 
                    categoryName: product.category?.name || "Uncategorized"
                 }} 
               />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
