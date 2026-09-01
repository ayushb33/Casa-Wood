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

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const price = parseFloat(formData.get("price") as string) || 0;
  const description = formData.get("description") as string;
  
  await db.product.create({
    data: {
      name,
      slug,
      price,
      description,
      status: "ACTIVE",
    },
  });

  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function deleteProduct(id: string) {
  await db.product.delete({
    where: { id },
  });
  
  revalidatePath("/dashboard/products");
}
