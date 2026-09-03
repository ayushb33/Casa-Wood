"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProduct, deleteProduct } from "@/actions/products";
import ProductImageUploader from "@/components/products/product-image-uploader";

type Category = { id: string; name: string };
type UploadedImage = { url: string; publicId: string };
type Product = {
  id: string;
  name: string;
  price: number | null;
  description: string | null;
  material: string | null;
  dimensions: string | null;
  status: string;
  categoryId: string | null;
  images: { url: string; altText: string | null; isPrimary: boolean }[];
};

export default function EditProductClient({
  product,
  categories,
}: {
  product: Product;
  categories: Category[];
}) {
  const router = useRouter();
  const [images, setImages] = useState<UploadedImage[]>(
    product.images.map((img) => ({ url: img.url, publicId: img.url }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.set("images", JSON.stringify(images));
    await updateProduct(product.id, formData);
    router.push("/dashboard/products");
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product? This cannot be undone.")) return;
    setIsDeleting(true);
    await deleteProduct(product.id);
    router.push("/dashboard/products");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/products"
            className="inline-flex items-center justify-center rounded-md hover:bg-muted h-10 w-10 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
            <p className="text-sm text-muted-foreground truncate max-w-xs">{product.name}</p>
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
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
            <Input id="name" name="name" required defaultValue={product.name} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                defaultValue={product.price ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={product.status}
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
              defaultValue={product.categoryId ?? ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Input id="material" name="material" defaultValue={product.material ?? ""} placeholder="e.g. Solid Oak" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input id="dimensions" name="dimensions" defaultValue={product.dimensions ?? ""} placeholder="e.g. W120 x D60 x H75 cm" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              defaultValue={product.description ?? ""}
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
