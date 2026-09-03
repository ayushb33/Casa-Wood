"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  const imageUrl = (formData.get("imageUrl") as string) || null;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  await db.category.create({
    data: {
      name,
      slug,
      description,
      imageUrl,
    },
  });

  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard/products/create");
  revalidatePath("/collections");
}

export async function deleteCategory(id: string) {
  await db.category.delete({ where: { id } });
  revalidatePath("/dashboard/categories");
  revalidatePath("/collections");
}
