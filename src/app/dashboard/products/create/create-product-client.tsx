"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/actions/products";
import ProductImageUploader from "@/components/products/product-image-uploader";

type Category = { id: string; name: string };
type UploadedImage = { url: string; publicId: string };

export default function CreateProductClient({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.set("images", JSON.stringify(images));
    const productId = await createProduct(formData);
    router.push(`/dashboard/products/${productId}`);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/products"
          className="inline-flex items-center justify-center rounded-md hover:bg-muted h-10 w-10 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Add Product</h1>
          <p className="text-sm text-muted-foreground">
            Add a new piece of furniture to the catalogue.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border rounded-lg bg-background p-6 shadow-sm space-y-6">
          <h2 className="font-semibold text-base">Product Images</h2>
          <ProductImageUploader images={images} onChange={setImages} />
        </div>

        <div className="border rounded-lg bg-background p-6 shadow-sm space-y-6">
          <h2 className="font-semibold text-base">Product Details</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" required placeholder="e.g. Artisan Walnut Dining Table" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input id="price" name="price" type="number" step="0.01" required placeholder="1299.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue="ACTIVE"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="ACTIVE">Active</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <select
              id="categoryId"
              name="categoryId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Input id="material" name="material" placeholder="e.g. Solid Oak" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input id="dimensions" name="dimensions" placeholder="e.g. W120 x D60 x H75 cm" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Describe the materials, craftsmanship, and design..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/products"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-10 px-4 py-2"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
