"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  return await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: {
        where: { isPrimary: true },
        take: 1,
      },
    },
  });
}

export async function getProductById(id: string) {
  return await db.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getCategories() {
  return await db.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  const price = parseFloat(formData.get("price") as string) || 0;
  const description = formData.get("description") as string;
  const material = (formData.get("material") as string) || null;
  const dimensions = (formData.get("dimensions") as string) || null;
  const categoryId = (formData.get("categoryId") as string) || null;
  const status = (formData.get("status") as string) || "ACTIVE";
  const imagesJson = formData.get("images") as string;

  const product = await db.product.create({
    data: {
      name,
      slug,
      price,
      description,
      material: material || undefined,
      dimensions: dimensions || undefined,
      categoryId: categoryId || undefined,
      status: status as "ACTIVE" | "DRAFT" | "ARCHIVED",
    },
  });

  // Create ProductImage records
  if (imagesJson) {
    const images: { url: string; publicId: string }[] = JSON.parse(imagesJson);
    if (images.length > 0) {
      await db.productImage.createMany({
        data: images.map((img, idx) => ({
          productId: product.id,
          url: img.url,
          altText: name,
          isPrimary: idx === 0,
          sortOrder: idx,
        })),
      });
    }
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/");
  return product.id;
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string) || 0;
  const description = formData.get("description") as string;
  const material = (formData.get("material") as string) || null;
  const dimensions = (formData.get("dimensions") as string) || null;
  const categoryId = (formData.get("categoryId") as string) || null;
  const status = (formData.get("status") as string) || "ACTIVE";
  const imagesJson = formData.get("images") as string;

  await db.product.update({
    where: { id },
    data: {
      name,
      price,
      description,
      material: material || undefined,
      dimensions: dimensions || undefined,
      categoryId: categoryId || undefined,
      status: status as "ACTIVE" | "DRAFT" | "ARCHIVED",
    },
  });

  // Replace images
  if (imagesJson) {
    const images: { url: string; publicId: string }[] = JSON.parse(imagesJson);
    await db.productImage.deleteMany({ where: { productId: id } });
    if (images.length > 0) {
      await db.productImage.createMany({
        data: images.map((img, idx) => ({
          productId: id,
          url: img.url,
          altText: name,
          isPrimary: idx === 0,
          sortOrder: idx,
        })),
      });
    }
  }

  revalidatePath("/dashboard/products");
  revalidatePath(`/dashboard/products/${id}`);
  revalidatePath("/");
  return { success: true };
}

export async function deleteProduct(id: string) {
  await db.productImage.deleteMany({ where: { productId: id } });
  await db.product.delete({ where: { id } });
  revalidatePath("/dashboard/products");
}
